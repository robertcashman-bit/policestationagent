import { gbpSafeImageUrl, isGbpSafeImageUrl } from './gbp-image';
import type { BufferChannelService } from './types';

const BUFFER_API_URL = 'https://api.buffer.com';
const GRAPHQL_MAX_RETRIES = 4;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class BufferApiError extends Error {
  constructor(message: string, readonly details?: unknown) {
    super(message);
    this.name = 'BufferApiError';
  }
}

interface BufferGraphQLError {
  message: string;
  extensions?: { code?: string; retryAfter?: number };
}

async function bufferGraphql<T>(
  apiKey: string,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  let lastError: BufferApiError | null = null;
  for (let attempt = 0; attempt <= GRAPHQL_MAX_RETRIES; attempt++) {
    const res = await fetch(BUFFER_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ query, variables }),
    });
    const json = (await res.json()) as { data?: T; errors?: BufferGraphQLError[] };

    if (json.errors?.length) {
      const message = json.errors.map((e) => e.message).join('; ');
      if (/too many requests/i.test(message) && attempt < GRAPHQL_MAX_RETRIES) {
        const retryAfter = json.errors.find((e) => e.extensions?.retryAfter)?.extensions?.retryAfter;
        await sleep(retryAfter ? retryAfter * 1000 : Math.min(60_000, 2000 * 2 ** attempt));
        continue;
      }
      throw new BufferApiError(message, json.errors);
    }
    if (!json.data) {
      lastError = new BufferApiError(`Buffer API returned no data (HTTP ${res.status})`, json);
      if (res.status === 429 && attempt < GRAPHQL_MAX_RETRIES) {
        await sleep(Math.min(60_000, 2000 * 2 ** attempt));
        continue;
      }
      throw lastError;
    }
    return json.data;
  }
  throw lastError ?? new BufferApiError('Buffer API request failed after retries');
}

export interface CreatedBufferPost {
  id: string;
  dueAt: string | null;
  channelId: string;
  channelService: string;
}

type MutationError = { __typename: string; message?: string };

export function metadataForService(service: BufferChannelService, url: string) {
  if (service === 'googlebusiness') {
    return { google: { type: 'whats_new', detailsWhatsNew: { button: 'learn_more', link: url } } };
  }
  if (service === 'facebook') {
    return { facebook: { type: 'post' } };
  }
  return undefined;
}

/**
 * Build Buffer's `AssetInput` (a GraphQL OneOf type). It must use the `image`
 * key — `{ __typename, source, alt }` is rejected by the API.
 */
export function buildPostAssets(
  imageUrl?: string,
  imageAlt?: string,
  channelService?: BufferChannelService,
) {
  let url = imageUrl;
  if (channelService === 'googlebusiness') {
    url = gbpSafeImageUrl(imageUrl);
    if (url && !isGbpSafeImageUrl(url)) return undefined;
  }
  if (!url) return undefined;
  return [{ image: { url, metadata: { altText: imageAlt ?? '' } } }];
}

export async function createScheduledBufferPost(
  apiKey: string,
  input: {
    channelId: string;
    channelService: BufferChannelService;
    text: string;
    dueAt: string;
    url: string;
    imageUrl?: string;
    imageAlt?: string;
  },
): Promise<CreatedBufferPost> {
  const metadata = metadataForService(input.channelService, input.url);
  const assets = buildPostAssets(input.imageUrl, input.imageAlt, input.channelService);

  const data = await bufferGraphql<{
    createPost: { __typename: 'PostActionSuccess'; post: CreatedBufferPost } | MutationError;
  }>(
    apiKey,
    `mutation CreateScheduledPost($input: CreatePostInput!) {
      createPost(input: $input) {
        __typename
        ... on PostActionSuccess { post { id dueAt channelId channelService } }
        ... on InvalidInputError { message }
        ... on UnauthorizedError { message }
        ... on UnexpectedError { message }
        ... on LimitReachedError { message }
        ... on NotFoundError { message }
      }
    }`,
    {
      input: {
        channelId: input.channelId,
        schedulingType: 'automatic',
        mode: 'customScheduled',
        dueAt: input.dueAt,
        text: input.text,
        ...(assets ? { assets } : {}),
        ...(metadata ? { metadata } : {}),
      },
    },
  );

  const result = data.createPost;
  if (result.__typename !== 'PostActionSuccess' || !('post' in result)) {
    const message = 'message' in result ? result.message : result.__typename;
    throw new BufferApiError(`createPost failed: ${message}`, result);
  }
  return result.post;
}

/** List scheduled posts (text only) for dedup, keyed by channel id. */
export async function listScheduledTextsByChannel(
  apiKey: string,
  organizationId: string,
  window: { dueAtStart: string; dueAtEnd: string },
): Promise<Map<string, string[]>> {
  const byChannel = new Map<string, string[]>();
  let after: string | undefined;
  do {
    const data = await bufferGraphql<{
      posts: {
        edges: Array<{ node: { channelId: string; text: string } }>;
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    }>(
      apiKey,
      `query ListScheduledPosts($input: PostsInput!, $first: Int!, $after: String) {
        posts(input: $input, first: $first, after: $after) {
          edges { node { channelId text } }
          pageInfo { hasNextPage endCursor }
        }
      }`,
      {
        first: 100,
        after,
        input: {
          organizationId,
          filter: {
            status: ['scheduled'],
            dueAt: { start: window.dueAtStart, end: window.dueAtEnd },
          },
        },
      },
    );
    for (const edge of data.posts.edges) {
      const list = byChannel.get(edge.node.channelId) ?? [];
      list.push(edge.node.text ?? '');
      byChannel.set(edge.node.channelId, list);
    }
    after = data.posts.pageInfo.hasNextPage ? (data.posts.pageInfo.endCursor ?? undefined) : undefined;
  } while (after);
  return byChannel;
}
