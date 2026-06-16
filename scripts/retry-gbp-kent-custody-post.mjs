#!/usr/bin/env node
/**
 * Retry the failed GBP post for Kent custody after arrest.
 * Uses Buffer GraphQL with GBP-safe square image + Learn more button.
 *
 * Usage:
 *   node scripts/retry-gbp-kent-custody-post.mjs --dry-run
 *   node scripts/retry-gbp-kent-custody-post.mjs
 *   node scripts/retry-gbp-kent-custody-post.mjs --share-now
 */
import {
  GBP_CHANNEL_ID,
  gbpFallbackAssets,
  gbpLinkFromItem,
  gbpPostText,
  googleBusinessMetadata,
} from "./lib/buffer-gbp.mjs";

const dryRun = process.argv.includes("--dry-run");
const shareNow = process.argv.includes("--share-now");
const apiKey = process.env.BUFFER_API_KEY?.trim();

const POST = {
  url: "https://www.policestationagent.com/blog/kent-custody-after-arrest-process?utm_source=buffer&utm_medium=social&utm_campaign=policestationagent_googlebusiness",
  text: `Kent Custody Suites: What Happens After Arrest
What typically happens after arrest at a Kent police station — booking in, legal advice, interview, and outcomes. Plain English guide for the public.`,
};

function buildInput() {
  const link = gbpLinkFromItem(POST);
  return {
    channelId: GBP_CHANNEL_ID,
    text: gbpPostText(POST.text),
    schedulingType: "automatic",
    mode: shareNow ? "shareNow" : "addToQueue",
    assets: gbpFallbackAssets(),
    metadata: googleBusinessMetadata({ url: link }),
  };
}

async function main() {
  const input = buildInput();
  if (dryRun) {
    console.log(JSON.stringify(input, null, 2));
    return;
  }
  if (!apiKey) {
    console.error("Set BUFFER_API_KEY to schedule the retry.");
    process.exit(1);
  }

  const query = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess { post { id dueAt channelId status } }
        ... on InvalidInputError { message }
        ... on LimitReachedError { message }
        ... on RestProxyError { message }
        ... on UnexpectedError { message }
        ... on NotFoundError { message }
        ... on UnauthorizedError { message }
      }
    }
  `;

  const res = await fetch("https://api.buffer.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query, variables: { input } }),
  });
  const data = await res.json();
  if (!res.ok || data.errors?.length) {
    console.error(JSON.stringify(data.errors || data, null, 2));
    process.exit(1);
  }
  const result = data.data?.createPost;
  if (result?.message) {
    console.error(result.message);
    process.exit(1);
  }
  console.log("GBP retry scheduled:", result?.post);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
