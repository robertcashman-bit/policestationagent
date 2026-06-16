#!/usr/bin/env node
/**
 * Execute buffer-redistribution-plan.json moves using Buffer GraphQL API.
 * Reads post content from buffer-scheduled-export.json; fetches latest state per post.
 *
 * Usage:
 *   node scripts/execute-buffer-redistribution-plan.mjs --resume
 *   node scripts/execute-buffer-redistribution-plan.mjs --resume --batch=20
 *   node scripts/execute-buffer-redistribution-plan.mjs --verify-counts
 *   node scripts/execute-buffer-redistribution-plan.mjs --status
 */
import fs from "fs";
import os from "os";
import path from "path";

const ORG_ID = "69d26bdf0f822245c9a723c4";
const API_URL = "https://api.buffer.com";
const DELAY_MS = Number(process.env.BUFFER_REDIST_DELAY_MS ?? 1500);
const MAX_RETRIES = 6;
/** Wait up to 1h when Buffer returns retryAfter (then save + exit for --resume). */
const MAX_RATE_LIMIT_WAIT_MS = Number(process.env.BUFFER_REDIST_MAX_WAIT_MS ?? 3_600_000);
const DEFAULT_BATCH_SIZE = Number(process.env.BUFFER_REDIST_BATCH ?? 15);
const DUPLICATE_SLOT_BUMP_MS = Number(process.env.BUFFER_REDIST_SLOT_BUMP_MS ?? 15 * 60_000);

const CHANNELS = [
  { id: "69d26c06031bfa423cd0c50d", name: "Police Station Agent (LinkedIn)" },
  { id: "69d26c3d031bfa423cd0c6b3", name: "Policestationag (Twitter)" },
  { id: "69d26c8b031bfa423cd0c8b7", name: "Police Station Agent (GBP)" },
  { id: "6a304bd838b55793459b4247", name: "Criminal Solicitor (Facebook)" },
  { id: "6a304bd838b55793459b4248", name: "Robert Cashman (Facebook)" },
  { id: "6a304bd938b55793459b4254", name: "Policestationrepuk (Facebook)" },
  { id: "6a304bd938b55793459b4255", name: "Police Station Agent (Facebook)" },
];

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

function numArg(name, fallback) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  const n = Number(hit.split("=")[1]);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function parseRetryAfterMs(errJson, res) {
  let errors;
  try {
    errors = typeof errJson === "string" ? JSON.parse(errJson) : errJson;
  } catch {
    errors = null;
  }
  if (Array.isArray(errors)) {
    for (const e of errors) {
      const secs = e?.extensions?.retryAfter;
      if (typeof secs === "number" && secs > 0) return secs * 1000;
    }
  }
  const header = res?.headers?.get?.("retry-after");
  if (header) {
    const secs = Number(header);
    if (!Number.isNaN(secs) && secs > 0) return secs * 1000;
  }
  if (String(errJson).includes("RATE_LIMIT_EXCEEDED")) return 90_000;
  return 45_000;
}

class RateLimitPause extends Error {
  constructor(waitMs) {
    super(`RATE_LIMIT_PAUSE:${waitMs}`);
    this.waitMs = waitMs;
  }
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
      const waitMs = parseRetryAfterMs(data.errors || data, res);
      if (waitMs > MAX_RATE_LIMIT_WAIT_MS) {
        throw new RateLimitPause(waitMs);
      }
      console.warn(
        `Rate limited — waiting ${Math.ceil(waitMs / 1000)}s (attempt ${attempt + 1}/${MAX_RETRIES + 1})`,
      );
      await sleep(waitMs + 2000);
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

function summarize(results, movesLength) {
  const moved = results.moved.length;
  const skipped = results.skipped.length;
  const failed = results.failed.length;
  const done = moved + skipped;
  return {
    moved,
    failed,
    skipped,
    remaining: Math.max(0, movesLength - done),
    pendingRetry: failed,
  };
}

function writeResults(results, movesLength, extra = {}) {
  const summary = summarize(results, movesLength);
  const payload = {
    ...results,
    executedAt: new Date().toISOString(),
    status:
      summary.remaining === 0 && summary.pendingRetry === 0
        ? "complete"
        : summary.remaining === 0
          ? "complete_with_failures"
          : "partial",
    summary,
    ...extra,
  };
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2) + "\n");
  return payload;
}

function isDuplicateSlotError(msg) {
  return /already got this one scheduled|same thing twice/i.test(msg);
}

async function countScheduledForChannel(channelId) {
  let count = 0;
  let after = null;
  do {
    const data = await graphql(
      `query Posts($input: PostsInput!, $first: Int, $after: String) {
        posts(input: $input, first: $first, after: $after) {
          edges { node { id } }
          pageInfo { hasNextPage endCursor }
        }
      }`,
      {
        first: 100,
        after,
        input: {
          organizationId: ORG_ID,
          filter: { status: ["scheduled"], channelIds: [channelId] },
        },
      },
    );
    count += data.posts.edges.length;
    after = data.posts.pageInfo.hasNextPage ? data.posts.pageInfo.endCursor : null;
    if (after) await sleep(DELAY_MS);
  } while (after);
  return count;
}

async function verifyChannelCounts() {
  const counts = {};
  for (const ch of CHANNELS) {
    counts[ch.name] = await countScheduledForChannel(ch.id);
    await sleep(DELAY_MS);
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const values = Object.values(counts);
  const min = Math.min(...values);
  const max = Math.max(...values);
  console.log("\nScheduled posts per channel:");
  for (const [name, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${n}\t${name}`);
  }
  console.log(`  —\n  ${total}\ttotal scheduled (spread ${min}–${max})`);
  return { counts, total, min, max };
}

function printLocalStatus() {
  if (!fs.existsSync(OUT_PATH)) {
    console.log("No results file yet — run without --resume first.");
    return;
  }
  const plan = JSON.parse(fs.readFileSync(PLAN_PATH, "utf8"));
  const prev = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
  const summary = summarize(
    {
      moved: prev.moved || [],
      skipped: prev.skipped || [],
      failed: prev.failed || [],
    },
    plan.moves.length,
  );
  console.log("Buffer redistribution status (local results file):");
  console.log(`  planned:   ${plan.moves.length}`);
  console.log(`  moved:     ${summary.moved}`);
  console.log(`  skipped:   ${summary.skipped}`);
  console.log(`  failed:    ${summary.failed}`);
  console.log(`  remaining: ${summary.remaining}`);
  if (prev.rateLimitNote) console.log(`  note:      ${prev.rateLimitNote}`);
  if (prev.executedAt) console.log(`  saved:     ${prev.executedAt}`);
}

async function createPostWithSlotFallback(input, move) {
  try {
    return await createPost(input);
  } catch (err) {
    const msg = err.message || String(err);
    if (!isDuplicateSlotError(msg) || !move.dueAt) throw err;
    const bumped = new Date(new Date(move.dueAt).getTime() + DUPLICATE_SLOT_BUMP_MS).toISOString();
    console.warn(`  retrying with dueAt +${DUPLICATE_SLOT_BUMP_MS / 60_000}min → ${bumped}`);
    return await createPost({ ...input, dueAt: bumped });
  }
}

async function main() {
  if (process.argv.includes("--status")) {
    printLocalStatus();
    return;
  }

  if (process.argv.includes("--verify-counts")) {
    await verifyChannelCounts();
    return;
  }

  const batchSize = numArg("batch", DEFAULT_BATCH_SIZE);
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
    results.failed = [];
    const doneIds = new Set([
      ...results.moved.map((m) => m.oldId),
      ...results.skipped.map((s) => s.postId),
    ]);
    console.log(`Resuming — ${doneIds.size} completed (${results.moved.length} moved, ${results.skipped.length} skipped)`);
    if (prev.failed?.length) {
      console.log(`Retrying ${prev.failed.length} previously failed move(s)`);
    }
  }

  console.log(
    `Executing up to ${batchSize} moves (delay ${DELAY_MS}ms, plan ${moves.length} total, from index ${startFrom})…`,
  );

  const doneIds = new Set([
    ...results.moved.map((m) => m.oldId),
    ...results.skipped.map((s) => s.postId),
  ]);

  let processedThisRun = 0;

  for (let i = startFrom; i < moves.length; i++) {
    if (processedThisRun >= batchSize) {
      console.log(`\nBatch limit (${batchSize}) reached — run again with --resume`);
      break;
    }

    const move = moves[i];
    const label = `[${i + 1}/${moves.length}] ${move.postId}`;

    if (doneIds.has(move.postId)) {
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
      processedThisRun++;
      writeResults(results, moves.length);
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
        doneIds.add(move.postId);
        console.warn(`${label} SKIP — deletePost not allowed`);
        processedThisRun++;
        writeResults(results, moves.length);
        await sleep(DELAY_MS);
        continue;
      }

      const input = buildCreateInput(exportPost, move, livePost);
      const created = await createPostWithSlotFallback(input, move);
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
      processedThisRun++;
      console.log(`${label} → ${move.toName}`);
    } catch (err) {
      if (err instanceof RateLimitPause) {
        const mins = Math.ceil(err.waitMs / 60_000);
        writeResults(results, moves.length, {
          rateLimitNote: `Buffer wants ${mins}min wait — re-run: node scripts/execute-buffer-redistribution-plan.mjs --resume`,
        });
        console.warn(
          `\nRate limit needs ~${mins} min — saved progress. Re-run with --resume after waiting.`,
        );
        process.exit(0);
      }

      const msg = err.message || String(err);
      if (msg.includes("NOT_FOUND") || msg.includes("Post not found")) {
        results.skipped.push({
          postId: move.postId,
          to: move.toName,
          reason: "post not found (already moved or deleted)",
        });
        doneIds.add(move.postId);
        processedThisRun++;
        console.warn(`${label} SKIP — post not found`);
      } else if (isDuplicateSlotError(msg)) {
        results.skipped.push({
          postId: move.postId,
          to: move.toName,
          reason: "duplicate_slot_same_time",
        });
        doneIds.add(move.postId);
        processedThisRun++;
        console.warn(`${label} SKIP — duplicate slot (content already scheduled nearby)`);
      } else {
        results.failed.push({
          postId: move.postId,
          dueAt: move.dueAt,
          to: move.toName,
          error: msg,
        });
        processedThisRun++;
        console.error(`${label} FAILED:`, msg.slice(0, 200));
      }
    }

    writeResults(results, moves.length);
    await sleep(DELAY_MS);
  }

  const final = writeResults(results, moves.length);
  console.log(
    `\nDone this run: processed ${processedThisRun}, moved ${final.summary.moved}, failed ${final.summary.failed}, skipped ${final.summary.skipped}, remaining ${final.summary.remaining}`,
  );
  console.log(`Results: ${OUT_PATH}`);

  if (final.summary.remaining === 0 && final.summary.pendingRetry === 0) {
    console.log("\nAll moves complete — verifying channel counts…");
    await verifyChannelCounts();
  } else if (final.summary.remaining > 0) {
    console.log(`\nRe-run: node scripts/execute-buffer-redistribution-plan.mjs --resume --batch=${batchSize}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
