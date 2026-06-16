#!/usr/bin/env node
/**
 * Audit and fix scheduled/error Google Business Profile posts in Buffer.
 * Converts old format (URL in body, no image, button none) to GBP-safe format.
 *
 * Usage:
 *   node scripts/audit-fix-gbp-buffer-posts.mjs --dry-run
 *   node scripts/audit-fix-gbp-buffer-posts.mjs
 */
import fs from "fs";
import os from "os";
import path from "path";
import {
  GBP_CHANNEL_ID,
  GBP_FALLBACK_IMAGE,
  gbpFallbackAssets,
  gbpLinkFromItem,
  gbpPostText,
  googleBusinessMetadata,
  rewriteUtm,
} from "./lib/buffer-gbp.mjs";

const dryRun = process.argv.includes("--dry-run");
const ORG_ID = "69d26bdf0f822245c9a723c4";
const API_URL = "https://api.buffer.com";
const DELAY_MS = 1500;

function loadApiKey() {
  if (process.env.BUFFER_API_KEY?.trim()) return process.env.BUFFER_API_KEY.trim();
  const mcpPath = path.join(os.homedir(), ".cursor/mcp.json");
  if (fs.existsSync(mcpPath)) {
    const mcp = JSON.parse(fs.readFileSync(mcpPath, "utf8"));
    const auth = mcp?.mcpServers?.buffer?.headers?.Authorization;
    if (auth?.startsWith("Bearer ")) return auth.slice(7);
  }
  return null;
}

const apiKey = loadApiKey();
if (!apiKey && !dryRun) {
  console.error("No BUFFER_API_KEY found.");
  process.exit(1);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function graphql(query, variables = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  if (!res.ok || data.errors?.length) {
    throw new Error(JSON.stringify(data.errors || data));
  }
  return data.data;
}

function hasSquareGbpImage(assets) {
  if (!assets?.length) return false;
  for (const asset of assets) {
    const w = asset.image?.metadata?.dimensions?.width ?? asset.image?.width ?? 0;
    const h = asset.image?.metadata?.dimensions?.height ?? asset.image?.height ?? 0;
    if (w >= 250 && h >= 250 && Math.abs(w - h) <= Math.max(w, h) * 0.15) return true;
    const url = asset.image?.url || asset.source || "";
    if (url.includes("/images/buffer/gbp/policestationagent-default.jpg")) return true;
  }
  return false;
}

function needsFix(post) {
  const text = post.text || "";
  const urlInText = /https?:\/\//.test(text);
  const assets = post.assets || [];
  const meta = post.metadata?.google || post.metadata;
  const button = meta?.detailsWhatsNew?.button ?? meta?.detailsWhatsNew?.buttonType;
  const noImage = !hasSquareGbpImage(assets);
  const badButton = !button || button === "none";
  const badLink = badButton && urlInText;
  return noImage || badLink || (urlInText && button !== "learn_more");
}

function buildFixedInput(post) {
  const link = gbpLinkFromItem({ text: post.text });
  const text = gbpPostText(post.text);
  return {
    text,
    assets: gbpFallbackAssets(),
    metadata: googleBusinessMetadata({ url: link }),
  };
}

async function listGbpPosts() {
  const posts = [];
  let after = null;
  for (;;) {
    const query = `
      query ListPosts($organizationId: OrganizationId!, $channelIds: [ChannelId!], $status: [PostStatus!], $first: Int, $after: String) {
        posts(organizationId: $organizationId, channelIds: $channelIds, status: $status, first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              text
              status
              dueAt
              schedulingType
              shareMode
              allowedActions
              assets {
                ... on ImageAsset { source thumbnail image { altText width height } }
              }
              metadata {
                ... on GoogleBusinessPostMetadata {
                  type
                  detailsWhatsNew { button link }
                }
              }
              errorMessage
            }
          }
          pageInfo { hasNextPage endCursor }
        }
      }
    `;
    const data = await graphql(query, {
      organizationId: ORG_ID,
      channelIds: [GBP_CHANNEL_ID],
      status: ["scheduled", "error", "needs_approval"],
      first: 50,
      after,
    });
    for (const edge of data.posts.edges) {
      posts.push(edge.node);
    }
    if (!data.posts.pageInfo.hasNextPage) break;
    after = data.posts.pageInfo.endCursor;
    await sleep(300);
  }
  return posts;
}

async function editPost(post, input) {
  const mutation = `
    mutation EditPost($input: EditPostInput!) {
      editPost(input: $input) {
        ... on PostActionSuccess { post { id status dueAt } }
        ... on InvalidInputError { message }
        ... on RestProxyError { message }
        ... on UnexpectedError { message }
      }
    }
  `;
  const editInput = {
    postId: post.id,
    schedulingType: post.schedulingType || "automatic",
    mode: post.shareMode || "customScheduled",
    dueAt: post.dueAt,
    ...input,
  };
  const data = await graphql(mutation, { input: editInput });
  const result = data.editPost;
  if (result?.message) throw new Error(result.message);
  return result?.post;
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
  if (data.deletePost?.message) throw new Error(data.deletePost.message);
}

async function recreatePost(post, input) {
  const mutation = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess { post { id status dueAt } }
        ... on InvalidInputError { message }
        ... on RestProxyError { message }
      }
    }
  `;
  const createInput = {
    channelId: GBP_CHANNEL_ID,
    schedulingType: post.schedulingType || "automatic",
    mode: post.shareMode || "customScheduled",
    dueAt: post.dueAt,
    ...input,
  };
  const data = await graphql(mutation, { input: createInput });
  const result = data.createPost;
  if (result?.message) throw new Error(result.message);
  return result?.post;
}

async function main() {
  console.log(dryRun ? "DRY RUN" : "LIVE — fixing GBP posts");
  const posts = await listGbpPosts();
  console.log(`Found ${posts.length} scheduled/error GBP posts`);

  const toFix = posts.filter(needsFix);
  console.log(`${toFix.length} need GBP-safe format`);

  const results = { fixed: [], skipped: [], failed: [], recreated: [] };

  for (const post of toFix) {
    const preview = (post.text || "").slice(0, 60).replace(/\n/g, " ");
    const fixed = buildFixedInput(post);
    if (dryRun) {
      console.log(`[dry-run] ${post.id} ${post.status}: ${preview}…`);
      results.fixed.push(post.id);
      continue;
    }

    try {
      const canUpdate = post.allowedActions?.includes("updatePost");
      if (canUpdate) {
        await editPost(post, fixed);
        results.fixed.push(post.id);
        console.log(`Fixed (edit) ${post.id}: ${preview}…`);
      } else {
        await deletePost(post.id);
        const created = await recreatePost(post, fixed);
        results.recreated.push({ old: post.id, new: created?.id });
        console.log(`Fixed (recreate) ${post.id} → ${created?.id}: ${preview}…`);
      }
      await sleep(DELAY_MS);
    } catch (err) {
      results.failed.push({ id: post.id, error: err.message });
      console.error(`Failed ${post.id}: ${err.message}`);
    }
  }

  const outPath = path.join(
    process.cwd(),
    "seo-growth-police-station-agent/buffer/gbp-audit-fix-results.json",
  );
  fs.writeFileSync(outPath, JSON.stringify({ at: new Date().toISOString(), ...results }, null, 2) + "\n");
  console.log(`\nWrote ${outPath}`);
  console.log(`Fixed: ${results.fixed.length}, recreated: ${results.recreated.length}, failed: ${results.failed.length}`);
  if (results.failed.length) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
