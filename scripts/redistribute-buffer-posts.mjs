#!/usr/bin/env node
/**
 * Redistribute scheduled Buffer posts evenly across all 7 channels.
 * Moves posts by create-on-target + delete-original (editPost cannot change channelId).
 *
 * Usage:
 *   node scripts/redistribute-buffer-posts.mjs --dry-run
 *   node scripts/redistribute-buffer-posts.mjs
 */
import fs from "fs";
import path from "path";
import {
  gbpLinkFromItem,
  gbpPostText,
  gbpSafeAssets,
  googleBusinessMetadata,
  rewriteUtm,
} from "./lib/buffer-gbp.mjs";

const dryRun = process.argv.includes("--dry-run");
const inputIdx = process.argv.indexOf("--input");
const inputPath = inputIdx >= 0 ? process.argv[inputIdx + 1] : null;
const apiKey = process.env.BUFFER_API_KEY?.trim();

const ORG_ID = "69d26bdf0f822245c9a723c4";
const API_URL = "https://api.buffer.com";
const DELAY_MS = 1500;
const IMMINENT_MS = 30 * 60 * 1000;

const CHANNELS = [
  { id: "69d26c06031bfa423cd0c50d", service: "linkedin", name: "Police Station Agent (LinkedIn)", utmSlug: "linkedin" },
  { id: "69d26c3d031bfa423cd0c6b3", service: "twitter", name: "Policestationag (Twitter)", utmSlug: "twitter" },
  { id: "69d26c8b031bfa423cd0c8b7", service: "googlebusiness", name: "Police Station Agent (GBP)", utmSlug: "googlebusiness" },
  { id: "6a304bd838b55793459b4247", service: "facebook", name: "Criminal Solicitor (Facebook)", utmSlug: "facebook_criminal_solicitor" },
  { id: "6a304bd838b55793459b4248", service: "facebook", name: "Robert Cashman (Facebook)", utmSlug: "facebook_robert_cashman" },
  { id: "6a304bd938b55793459b4254", service: "facebook", name: "Policestationrepuk (Facebook)", utmSlug: "facebook_policestationrepuk" },
  { id: "6a304bd938b55793459b4255", service: "facebook", name: "Police Station Agent (Facebook)", utmSlug: "facebook_police_station_agent" },
];

const OUT_PATH = path.join(
  process.cwd(),
  "seo-growth-police-station-agent",
  "buffer",
  "buffer-redistribution-results.json",
);

if (!apiKey && !dryRun && !inputPath) {
  console.error("Set BUFFER_API_KEY to run redistribution (Buffer → Settings → API → Personal Keys).");
  process.exit(1);
}

function loadPostsFromFile(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data.posts;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function graphql(query, variables = {}, retries = 5) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query, variables }),
    });
    const data = await res.json();
    const rateLimited = data.errors?.some((e) => e.extensions?.code === "RATE_LIMIT_EXCEEDED");
    if (rateLimited && attempt < retries) {
      const waitMs = 60_000 * (attempt + 1);
      console.warn(`Rate limited — waiting ${waitMs / 1000}s before retry ${attempt + 1}/${retries}`);
      await sleep(waitMs);
      continue;
    }
    if (!res.ok || data.errors?.length) {
      throw new Error(JSON.stringify(data.errors || data));
    }
    return data.data;
  }
}

async function fetchAllScheduledPosts() {
  const posts = [];
  let after = null;
  const query = `
    query Posts($input: PostsInput!, $first: Int, $after: String) {
      posts(input: $input, first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            channelId
            channelService
            dueAt
            shareMode
            schedulingType
            text
            allowedActions
            assets {
              type
              mimeType
              source
              thumbnail
              ... on ImageAsset {
                image { altText width height isAnimated animatedThumbnail }
              }
              ... on VideoAsset {
                video { width height }
              }
            }
            tags { id }
            metadata {
              ... on FacebookPostMetadata { type linkAttachment { url } }
              ... on GoogleBusinessPostMetadata { type title }
              ... on LinkedInPostMetadata { linkAttachment { url } }
              ... on TwitterPostMetadata { thread { text } threadCount }
            }
          }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  `;

  do {
    const data = await graphql(query, {
      input: {
        organizationId: ORG_ID,
        filter: { status: ["scheduled"] },
        sort: [{ field: "dueAt", direction: "asc" }],
      },
      first: 100,
      after,
    });
    for (const edge of data.posts.edges) {
      posts.push(edge.node);
    }
    after = data.posts.pageInfo.hasNextPage ? data.posts.pageInfo.endCursor : null;
    if (after) await sleep(DELAY_MS);
  } while (after);

  return posts;
}

function countByChannel(posts, keyFn = (p) => p.channelId) {
  const counts = Object.fromEntries(CHANNELS.map((c) => [c.id, 0]));
  for (const p of posts) {
    if (counts[keyFn(p)] !== undefined) counts[keyFn(p)]++;
    else counts[keyFn(p)] = (counts[keyFn(p)] || 0) + 1;
  }
  return counts;
}

function channelById(id) {
  return CHANNELS.find((c) => c.id === id);
}

function assignTargets(posts) {
  return posts.map((post, index) => ({
    post,
    target: CHANNELS[index % CHANNELS.length],
  }));
}

function truncateForTwitter(text, maxLen = 280) {
  if (text.length <= maxLen) return text;
  const urlMatch = text.match(/https?:\/\/[^\s]+/);
  if (urlMatch) {
    const url = urlMatch[0];
    const prefix = text.slice(0, text.indexOf(url)).trim();
    const budget = maxLen - url.length - 1;
    if (budget > 20) {
      return `${prefix.slice(0, budget).trim()} ${url}`;
    }
    return url.slice(0, maxLen);
  }
  return `${text.slice(0, maxLen - 1).trim()}…`;
}

function mapAssets(assets) {
  if (!assets?.length) return [];
  return assets.map((asset) => {
    if (asset.type === "image") {
      const altText = asset.image?.altText || "Post image";
      const item = {
        image: {
          url: asset.source,
          thumbnailUrl: asset.thumbnail || asset.source,
          metadata: { altText },
        },
      };
      if (asset.image?.width && asset.image?.height) {
        item.image.metadata.dimensions = {
          width: asset.image.width,
          height: asset.image.height,
        };
      }
      return item;
    }
    if (asset.type === "video") {
      return {
        video: {
          url: asset.source,
          thumbnailUrl: asset.thumbnail || asset.source,
        },
      };
    }
    return null;
  }).filter(Boolean);
}

function metadataForService(service, sourceMetadata) {
  switch (service) {
    case "facebook":
      return { facebook: { type: "post" } };
    case "googlebusiness":
      return googleBusinessMetadata({
        url: gbpLinkFromItem({ text: sourceMetadata?.text || "" }),
        utmSlug: "googlebusiness",
      });
    case "linkedin":
      if (sourceMetadata?.linkAttachment?.url) {
        return { linkedin: { linkAttachment: { url: sourceMetadata.linkAttachment.url } } };
      }
      return undefined;
    case "twitter":
      if (sourceMetadata?.thread?.length) {
        return {
          twitter: {
            thread: sourceMetadata.thread.map((t) => ({ text: t.text })),
          },
        };
      }
      return undefined;
    default:
      return undefined;
  }
}

function buildCreateInput(post, target) {
  const rewritten = rewriteUtm(post.text, target.utmSlug);
  let text =
    target.service === "googlebusiness"
      ? gbpPostText(rewritten, target.utmSlug)
      : rewritten;
  if (target.service === "twitter") {
    text = truncateForTwitter(text);
  }
  const schedulingType = post.schedulingType || "automatic";
  const mode = post.shareMode || "customScheduled";
  const input = {
    channelId: target.id,
    text,
    schedulingType,
    mode,
    assets: target.service === "googlebusiness" ? gbpSafeAssets() : mapAssets(post.assets),
  };

  if (mode === "customScheduled" && post.dueAt) {
    input.dueAt = post.dueAt;
  }

  const tagIds = post.tags?.map((t) => t.id).filter(Boolean);
  if (tagIds?.length) input.tagIds = tagIds;

  const metadata =
    target.service === "googlebusiness"
      ? googleBusinessMetadata({
          url: gbpLinkFromItem({ text: post.text }),
          utmSlug: target.utmSlug,
        })
      : metadataForService(target.service, post.metadata);
  if (metadata) input.metadata = metadata;

  return input;
}

async function createPost(input) {
  const mutation = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess { post { id dueAt channelId } }
        ... on InvalidInputError { message }
        ... on LimitReachedError { message }
        ... on RestProxyError { message }
        ... on UnexpectedError { message }
        ... on NotFoundError { message }
        ... on UnauthorizedError { message }
      }
    }
  `;
  const data = await graphql(mutation, { input });
  const result = data.createPost;
  if (result?.message) throw new Error(result.message);
  if (!result?.post?.id) throw new Error(JSON.stringify(result));
  return result.post;
}

async function deletePost(id) {
  const mutation = `
    mutation DeletePost($input: DeletePostInput!) {
      deletePost(input: $input) {
        ... on DeletePostSuccess { id }
        ... on VoidMutationError { message }
      }
    }
  `;
  const data = await graphql(mutation, { input: { id } });
  const result = data.deletePost;
  if (result?.message) throw new Error(result.message);
  return result;
}

function printCountTable(label, counts) {
  console.log(`\n${label}`);
  console.log("-".repeat(60));
  let total = 0;
  for (const ch of CHANNELS) {
    const n = counts[ch.id] || 0;
    total += n;
    console.log(`  ${ch.name.padEnd(42)} ${String(n).padStart(3)}`);
  }
  console.log("-".repeat(60));
  console.log(`  ${"TOTAL".padEnd(42)} ${String(total).padStart(3)}`);
}

async function main() {
  console.log(dryRun ? "DRY RUN — no API writes" : "LIVE RUN — moving posts");
  let posts;
  if (inputPath) {
    console.log(`Loading posts from ${inputPath}…`);
    posts = loadPostsFromFile(inputPath);
  } else {
    console.log("Fetching scheduled posts…");
    posts = await fetchAllScheduledPosts();
  }
  console.log(`Found ${posts.length} scheduled posts`);

  const assignments = assignTargets(posts);
  const beforeCounts = countByChannel(posts);
  const afterCounts = countByChannel(
    assignments.map((a) => ({ channelId: a.target.id })),
  );

  printCountTable("Before (current channel)", beforeCounts);
  printCountTable("After (target round-robin)", afterCounts);

  const moves = assignments.filter((a) => a.post.channelId !== a.target.id);
  const stays = assignments.length - moves.length;
  console.log(`\n${stays} posts stay on current channel`);
  console.log(`${moves.length} posts need to move`);

  const now = Date.now();
  const imminent = moves.filter((m) => {
    const due = new Date(m.post.dueAt).getTime();
    return due - now < IMMINENT_MS && due > now;
  });
  if (imminent.length) {
    console.log(`\nWarning: ${imminent.length} move(s) due within 30 minutes:`);
    for (const m of imminent) {
      console.log(`  ${m.post.id} due ${m.post.dueAt} → ${m.target.name}`);
    }
  }

  if (dryRun) {
    const planPath = path.join(
      process.cwd(),
      "seo-growth-police-station-agent",
      "buffer",
      "buffer-redistribution-plan.json",
    );
    const plan = {
      generatedAt: new Date().toISOString(),
      totalPosts: posts.length,
      moves: moves.map(({ post, target }) => ({
        postId: post.id,
        fromChannelId: post.channelId,
        toChannelId: target.id,
        toService: target.service,
        toName: target.name,
        utmSlug: target.utmSlug,
        dueAt: post.dueAt,
        shareMode: post.shareMode,
        schedulingType: post.schedulingType || "automatic",
      })),
    };
    fs.mkdirSync(path.dirname(planPath), { recursive: true });
    fs.writeFileSync(planPath, JSON.stringify(plan, null, 2) + "\n");
    console.log(`\nMove plan written: ${planPath}`);

    console.log("\nSample moves (first 10):");
    for (const m of moves.slice(0, 10)) {
      const from = channelById(m.post.channelId)?.name || m.post.channelId;
      console.log(`  ${m.post.dueAt?.slice(0, 10)}  ${from} → ${m.target.name}`);
    }
    console.log("\nDry run complete. Re-run without --dry-run to execute.");
    return;
  }

  const results = {
    organizationId: ORG_ID,
    executedAt: new Date().toISOString(),
    totalPosts: posts.length,
    movesPlanned: moves.length,
    moved: [],
    failed: [],
    skipped: [],
  };

  for (let i = 0; i < moves.length; i++) {
    const { post, target } = moves[i];
    const from = channelById(post.channelId)?.name || post.channelId;
    const label = `[${i + 1}/${moves.length}] ${post.id}`;

    if (!post.allowedActions?.includes("deletePost")) {
      results.skipped.push({ id: post.id, reason: "deletePost not allowed" });
      console.warn(`${label} SKIP — deletePost not allowed`);
      continue;
    }

    try {
      const input = buildCreateInput(post, target);
      const created = await createPost(input);
      await sleep(DELAY_MS);
      await deletePost(post.id);
      results.moved.push({
        oldId: post.id,
        newId: created.id,
        dueAt: post.dueAt,
        from,
        to: target.name,
        toChannelId: target.id,
      });
      console.log(`${label} ${from} → ${target.name}`);
    } catch (err) {
      results.failed.push({
        id: post.id,
        dueAt: post.dueAt,
        from,
        to: target.name,
        error: err.message || String(err),
      });
      console.error(`${label} FAILED:`, err.message || err);
    }
    await sleep(DELAY_MS);
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2) + "\n");

  console.log(`\nDone: ${results.moved.length} moved, ${results.failed.length} failed, ${results.skipped.length} skipped`);
  console.log(`Audit log: ${OUT_PATH}`);

  if (results.failed.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
