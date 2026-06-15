#!/usr/bin/env node
/**
 * Execute buffer-redistribution-plan.json moves using Buffer GraphQL API.
 * Reads post content from buffer-scheduled-export.json; fetches latest state per post.
 */
import fs from "fs";
import os from "os";
import path from "path";

const ORG_ID = "69d26bdf0f822245c9a723c4";
const API_URL = "https://api.buffer.com";
const DELAY_MS = 500;
const MAX_RETRIES = 8;

const ROOT = process.cwd();
const PLAN_PATH = path.join(
  ROOT,
  "seo-growth-police-station-agent/buffer/buffer-redistribution-plan.json",
);
const EXPORT_PATH = path.join(
  ROOT,
  "seo-growth-police-station-agent/buffer/buffer-scheduled-export.json",
);
const OUT_PATH = path.join(
  ROOT,
  "seo-growth-police-station-agent/buffer/buffer-redistribution-results.json",
);

function loadApiKey() {
  if (process.env.BUFFER_API_KEY?.trim()) return process.env.BUFFER_API_KEY.trim();
  const mcpPath = path.join(os.homedir(), ".cursor/mcp.json");
  if (fs.existsSync(mcpPath)) {
    const mcp = JSON.parse(fs.readFileSync(mcpPath, "utf8"));
    const auth = mcp?.mcpServers?.buffer?.headers?.Authorization;
    if (auth?.startsWith("Bearer ")) return auth.slice(7);
  }
  throw new Error("No BUFFER_API_KEY or ~/.cursor/mcp.json buffer token found");
}

const apiKey = loadApiKey();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryAfterMs(errJson, res) {
  const header = res?.headers?.get?.("retry-after");
  if (header) {
    const secs = Number(header);
    if (!Number.isNaN(secs) && secs > 0) return Math.min(secs, 900) * 1000;
  }
  try {
    const parsed = JSON.parse(errJson);
    if (parsed?.[0]?.extensions?.code === "RATE_LIMIT_EXCEEDED") return 60_000;
  } catch {
    /* ignore */
  }
  if (String(errJson).includes("RATE_LIMIT_EXCEEDED")) return 60_000;
  return 30_000;
}

async function graphql(query, variables = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query, variables }),
    });
    const data = await res.json();
    if (res.status === 429 || data.errors?.some((e) => e.extensions?.code === "RATE_LIMIT_EXCEEDED")) {
      const waitMs = parseRetryAfterMs(JSON.stringify(data.errors || data), res);
      console.warn(`Rate limited — waiting ${Math.ceil(waitMs / 1000)}s (attempt ${attempt + 1}/${MAX_RETRIES + 1})`);
      await sleep(waitMs + 1000);
      lastErr = new Error(JSON.stringify(data.errors || data));
      continue;
    }
    if (!res.ok || data.errors?.length) {
      throw new Error(JSON.stringify(data.errors || data));
    }
    return data.data;
  }
  throw lastErr || new Error("GraphQL request failed after retries");
}

async function getPost(postId) {
  const query = `
    query GetPost($id: PostId!) {
      post(input: { id: $id }) {
        id
        channelId
        dueAt
        shareMode
        schedulingType
        text
        allowedActions
        assets {
          type
          source
          thumbnail
          ... on ImageAsset {
            image { altText width height }
          }
        }
        tags { id }
        metadata {
          ... on FacebookPostMetadata { type linkAttachment { url } }
          ... on GoogleBusinessPostMetadata { type title }
          ... on LinkedInPostMetadata { linkAttachment { url } }
          ... on TwitterPostMetadata { thread { text } }
        }
      }
    }
  `;
  const data = await graphql(query, { id: postId });
  if (!data.post) throw new Error("Post not found");
  return data.post;
}

function rewriteUtm(text, utmSlug) {
  return text.replace(/utm_campaign=([^&\s]+)/g, (_, campaign) => {
    const base = campaign.replace(
      /_(linkedin|twitter|googlebusiness|facebook[^&\s]*|facebook)$/i,
      "",
    );
    const cleaned = base.replace(/_+$/, "");
    return `utm_campaign=${cleaned}_${utmSlug}`;
  });
}

function textForService(text, service) {
  if (service !== "twitter") return text;
  if (text.length <= 280) return text;
  const urlMatch = text.match(/https?:\/\/\S+/);
  const url = urlMatch?.[0] || "";
  const body = text.replace(/https?:\/\/\S+/g, "").trim();
  const suffix = url ? `\n\n${url}` : "";
  const maxBody = 280 - suffix.length;
  if (maxBody < 20) return text.slice(0, 280);
  return `${body.slice(0, maxBody).trim()}${suffix}`;
}

function mapAssets(assets) {
  if (!assets?.length) return [];
  return assets
    .map((asset) => {
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
    })
    .filter(Boolean);
}

function metadataForService(service, sourceMetadata) {
  switch (service) {
    case "facebook":
      return { facebook: { type: "post" } };
    case "googlebusiness":
      return {
        google: {
          type: "whats_new",
          detailsWhatsNew: { button: "none" },
        },
      };
    case "linkedin":
      if (sourceMetadata?.linkAttachment?.url) {
        return {
          linkedin: { linkAttachment: { url: sourceMetadata.linkAttachment.url } },
        };
      }
      return undefined;
    case "twitter":
      if (sourceMetadata?.thread?.length) {
        return {
          twitter: {
            thread: sourceMetadata.thread.map((t) => ({
              text: textForService(t.text, "twitter"),
            })),
          },
        };
      }
      return undefined;
    default:
      return undefined;
  }
}

function buildCreateInput(exportPost, move, livePost) {
  const text = textForService(rewriteUtm(exportPost.text, move.utmSlug), move.toService);
  const schedulingType = livePost.schedulingType || move.schedulingType || "automatic";
  const mode = move.shareMode;
  const input = {
    channelId: move.toChannelId,
    text,
    schedulingType,
    mode,
    assets: move.toService === "googlebusiness" ? [] : mapAssets(exportPost.assets),
  };

  if (mode === "customScheduled" && move.dueAt) {
    input.dueAt = move.dueAt;
  }

  const tagIds = exportPost.tags?.map((t) => t.id).filter(Boolean);
  if (tagIds?.length) input.tagIds = tagIds;

  const metadata = metadataForService(move.toService, exportPost.metadata);
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

async function main() {
  const startFrom = process.argv.includes("--start-from")
    ? Number(process.argv[process.argv.indexOf("--start-from") + 1])
    : 0;

  const plan = JSON.parse(fs.readFileSync(PLAN_PATH, "utf8"));
  const exportData = JSON.parse(fs.readFileSync(EXPORT_PATH, "utf8"));
  const postsById = Object.fromEntries(exportData.posts.map((p) => [p.id, p]));
  const moves = plan.moves;

  let results = {
    organizationId: ORG_ID,
    executedAt: new Date().toISOString(),
    movesPlanned: moves.length,
    moved: [],
    failed: [],
    skipped: [],
  };

  if (fs.existsSync(OUT_PATH) && process.argv.includes("--resume")) {
    const prev = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
    results.moved = prev.moved || [];
    results.skipped = prev.skipped || [];
    const doneIds = new Set([
      ...results.moved.map((m) => m.oldId),
      ...results.skipped.map((s) => s.postId),
    ]);
    console.log(`Resuming — ${doneIds.size} already completed`);
  }

  console.log(`Executing ${moves.length} redistribution moves (from index ${startFrom})…`);

  const doneIds = new Set([
    ...results.moved.map((m) => m.oldId),
    ...results.skipped.map((s) => s.postId),
  ]);

  for (let i = startFrom; i < moves.length; i++) {
    const move = moves[i];
    const label = `[${i + 1}/${moves.length}] ${move.postId}`;

    if (doneIds.has(move.postId)) {
      console.log(`${label} SKIP — already done`);
      continue;
    }

    const exportPost = postsById[move.postId];
    if (!exportPost) {
      results.failed.push({
        postId: move.postId,
        to: move.toName,
        error: "Post not found in export",
      });
      console.error(`${label} FAILED — not in export`);
      continue;
    }

    try {
      const livePost = await getPost(move.postId);
      await sleep(DELAY_MS);

      if (!livePost.allowedActions?.includes("deletePost")) {
        results.skipped.push({
          postId: move.postId,
          to: move.toName,
          reason: "deletePost not allowed",
        });
        console.warn(`${label} SKIP — deletePost not allowed`);
        await sleep(DELAY_MS);
        continue;
      }

      const input = buildCreateInput(exportPost, move, livePost);
      const created = await createPost(input);
      await sleep(DELAY_MS);
      await deletePost(move.postId);

      results.moved.push({
        oldId: move.postId,
        newId: created.id,
        dueAt: move.dueAt,
        fromChannelId: move.fromChannelId,
        to: move.toName,
        toChannelId: move.toChannelId,
      });
      doneIds.add(move.postId);
      console.log(`${label} → ${move.toName}`);
    } catch (err) {
      const msg = err.message || String(err);
      if (msg.includes("NOT_FOUND") || msg.includes("Post not found")) {
        results.skipped.push({
          postId: move.postId,
          to: move.toName,
          reason: "post not found (already moved or deleted)",
        });
        doneIds.add(move.postId);
        console.warn(`${label} SKIP — post not found`);
      } else {
        results.failed.push({
          postId: move.postId,
          dueAt: move.dueAt,
          to: move.toName,
          error: msg,
        });
        console.error(`${label} FAILED:`, msg);
      }
    }

    if ((i + 1) % 10 === 0) {
      console.log(
        `Progress: ${i + 1}/${moves.length} — moved ${results.moved.length}, failed ${results.failed.length}, skipped ${results.skipped.length}`,
      );
      fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
      fs.writeFileSync(OUT_PATH, JSON.stringify({ ...results, executedAt: new Date().toISOString() }, null, 2) + "\n");
    }

    await sleep(DELAY_MS);
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2) + "\n");

  console.log(
    `\nDone: ${results.moved.length} moved, ${results.failed.length} failed, ${results.skipped.length} skipped`,
  );
  console.log(`Results: ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
