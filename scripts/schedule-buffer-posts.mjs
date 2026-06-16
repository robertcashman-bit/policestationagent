#!/usr/bin/env node
/**
 * Schedule Buffer posts from buffer-posts.json.
 * Round-robins new posts across all 7 channels (set BUFFER_CHANNEL_ID to pin one channel).
 * Supports Buffer GraphQL API (BUFFER_API_KEY) and legacy v1 (BUFFER_ACCESS_TOKEN).
 *
 * Usage:
 *   node scripts/schedule-buffer-posts.mjs --dry-run
 *   node scripts/schedule-buffer-posts.mjs
 */
import fs from "fs";
import path from "path";

const dryRun = process.argv.includes("--dry-run");
const apiKey = process.env.BUFFER_API_KEY?.trim();
const legacyToken = process.env.BUFFER_ACCESS_TOKEN?.trim();
const forceChannelId =
  process.env.BUFFER_CHANNEL_ID?.trim() || process.env.BUFFER_PROFILE_ID?.trim();
const DELAY_MS = Number(process.env.BUFFER_SCHEDULE_DELAY_MS ?? 1500);

const ORG_ID = "69d26bdf0f822245c9a723c4";
const GBP_FALLBACK_IMAGE = {
  url: "https://policestationrepuk.org/images/buffer/gbp/policestationagent-default.jpg",
  thumbnailUrl: "https://policestationrepuk.org/images/buffer/gbp/policestationagent-default.jpg",
  altText: "Police station legal advice",
  width: 720,
  height: 720,
};

const CHANNELS = [
  { id: "69d26c06031bfa423cd0c50d", service: "linkedin", name: "Police Station Agent (LinkedIn)", utmSlug: "linkedin" },
  { id: "69d26c3d031bfa423cd0c6b3", service: "twitter", name: "Policestationag (Twitter)", utmSlug: "twitter" },
  { id: "69d26c8b031bfa423cd0c8b7", service: "googlebusiness", name: "Police Station Agent (GBP)", utmSlug: "googlebusiness" },
  { id: "6a304bd838b55793459b4247", service: "facebook", name: "Criminal Solicitor (Facebook)", utmSlug: "facebook_criminal_solicitor" },
  { id: "6a304bd838b55793459b4248", service: "facebook", name: "Robert Cashman (Facebook)", utmSlug: "facebook_robert_cashman" },
  { id: "6a304bd938b55793459b4254", service: "facebook", name: "Policestationrepuk (Facebook)", utmSlug: "facebook_policestationrepuk" },
  { id: "6a304bd938b55793459b4255", service: "facebook", name: "Police Station Agent (Facebook)", utmSlug: "facebook_police_station_agent" },
];

const bufferPath = path.join(process.cwd(), "seo-growth-police-station-agent", "buffer", "buffer-posts.json");
const posts = JSON.parse(fs.readFileSync(bufferPath, "utf8")).sort((a, b) =>
  a.date.localeCompare(b.date),
);

const token = apiKey || legacyToken;

if (!token && !dryRun) {
  const inCi = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";
  console.log("No Buffer credentials found. Set BUFFER_API_KEY (preferred) or BUFFER_ACCESS_TOKEN.");
  console.log("  Generate a key: Buffer → Settings → API → Personal Keys");
  console.log("  For GitHub Actions: add BUFFER_API_KEY as a repository secret");
  console.log("\nCalendar files ready:");
  console.log("  seo-growth-police-station-agent/buffer/buffer-posts.csv");
  console.log("  seo-growth-police-station-agent/buffer/buffer-posts.json");
  console.log(`\n${posts.length} posts ready. Upload at https://publish.buffer.com`);
  if (inCi) {
    console.log("\nSkipping schedule in CI until BUFFER_API_KEY or BUFFER_ACCESS_TOKEN is configured.");
    process.exit(0);
  }
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function channelForIndex(index) {
  if (forceChannelId) {
    return (
      CHANNELS.find((c) => c.id === forceChannelId) ?? {
        id: forceChannelId,
        service: "linkedin",
        name: "Custom channel",
        utmSlug: "linkedin",
      }
    );
  }
  return CHANNELS[index % CHANNELS.length];
}

function rewriteUtm(text, utmSlug) {
  return text.replace(/utm_campaign=([^&\s]+)/g, (_, campaign) => {
    const base = campaign.replace(/_(linkedin|twitter|googlebusiness|facebook[^&\s]*|facebook)$/i, "");
    const cleaned = base.replace(/_+$/, "");
    return `utm_campaign=${cleaned}_${utmSlug}`;
  });
}

function truncateForTwitter(text, maxLen = 280) {
  if (text.length <= maxLen) return text;
  const urlMatch = text.match(/https?:\/\/[^\s]+/);
  if (urlMatch) {
    const url = urlMatch[0];
    const prefix = text.slice(0, text.indexOf(url)).trim();
    const budget = maxLen - url.length - 1;
    if (budget > 20) return `${prefix.slice(0, budget).trim()} ${url}`;
    return url.slice(0, maxLen);
  }
  return `${text.slice(0, maxLen - 1).trim()}…`;
}

function calendarAssets(item) {
  if (!item.image) return [];
  return [
    {
      type: "image",
      source: item.image,
      thumbnail: item.image,
      image: { altText: "Post image" },
    },
  ];
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
      return null;
    })
    .filter(Boolean);
}

function gbpSafeAssets(assets) {
  const mapped = mapAssets(assets);
  if (!mapped.length) {
    return [
      {
        image: {
          url: GBP_FALLBACK_IMAGE.url,
          thumbnailUrl: GBP_FALLBACK_IMAGE.thumbnailUrl,
          metadata: {
            altText: GBP_FALLBACK_IMAGE.altText,
            dimensions: { width: GBP_FALLBACK_IMAGE.width, height: GBP_FALLBACK_IMAGE.height },
          },
        },
      },
    ];
  }
  return mapped;
}

function metadataForChannel(channel, item) {
  switch (channel.service) {
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
      if (item.url) {
        return { linkedin: { linkAttachment: { url: rewriteUtm(item.url, channel.utmSlug) } } };
      }
      return undefined;
    default:
      return undefined;
  }
}

function buildCreateInput(item, channel) {
  let text = rewriteUtm(`${item.text}\n\n${item.hashtags}`, channel.utmSlug);
  if (channel.service === "twitter") text = truncateForTwitter(text);

  const input = {
    channelId: channel.id,
    text,
    schedulingType: "automatic",
    mode: "customScheduled",
    dueAt: `${item.date}T08:30:00.000Z`,
    assets:
      channel.service === "googlebusiness"
        ? gbpSafeAssets(calendarAssets(item))
        : mapAssets(calendarAssets(item)),
  };

  const metadata = metadataForChannel(channel, item);
  if (metadata) input.metadata = metadata;
  return input;
}

const results = {
  organization: "My Organization",
  organizationId: ORG_ID,
  distribution: forceChannelId ? "single-channel" : "round-robin",
  channels: forceChannelId ? [channelForIndex(0).name] : CHANNELS.map((c) => c.name),
  scheduledAt: new Date().toISOString(),
  api: apiKey ? "graphql" : "v1",
  posts: [],
};

async function scheduleGraphQL(item, channel) {
  const input = buildCreateInput(item, channel);
  const query = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on PostActionSuccess {
          post { id dueAt channelId }
        }
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
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: { input } }),
  });
  const data = await res.json();
  if (!res.ok || data.errors?.length) {
    throw new Error(JSON.stringify(data.errors || data));
  }
  const result = data.data?.createPost;
  if (result?.message) throw new Error(result.message);
  return {
    id: result?.post?.id,
    dueAt: result?.post?.dueAt || input.dueAt,
    channelId: result?.post?.channelId || channel.id,
  };
}

async function scheduleV1(item, channel) {
  let text = rewriteUtm(`${item.text}\n\n${item.hashtags}`, channel.utmSlug);
  if (channel.service === "twitter") text = truncateForTwitter(text);
  const body = new URLSearchParams({
    access_token: token,
    profile_ids: channel.id,
    text,
    scheduled_at: `${item.date}T08:30:00Z`,
    shorten: "false",
  });
  if (item.image && channel.service !== "googlebusiness") {
    body.set("media[photo]", item.image);
  }
  const res = await fetch("https://api.bufferapp.com/1/updates/create.json", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(JSON.stringify(data));
  }
  return {
    id: data.updates?.[0]?.id || data.id,
    dueAt: data.updates?.[0]?.due_at || `${item.date}T08:30:00.000Z`,
    channelId: channel.id,
  };
}

if (dryRun) {
  console.log(
    forceChannelId
      ? `DRY RUN — all posts → ${channelForIndex(0).name}`
      : `DRY RUN — round-robin across ${CHANNELS.length} channels`,
  );
}

for (let i = 0; i < posts.length; i++) {
  const item = posts[i];
  const channel = channelForIndex(i);

  if (dryRun) {
    console.log(`[dry-run] ${item.date} → ${channel.name}: ${item.slug}`);
    continue;
  }

  try {
    const scheduled = apiKey ? await scheduleGraphQL(item, channel) : await scheduleV1(item, channel);
    results.posts.push({
      id: scheduled.id,
      dueAt: scheduled.dueAt,
      channelId: scheduled.channelId,
      channel: channel.name,
      url: item.url,
      slug: item.slug,
    });
    console.log(`Scheduled ${item.date} → ${channel.name}: ${item.slug}`);
    await sleep(DELAY_MS);
  } catch (err) {
    console.error(`Failed ${item.slug} (${channel.name}):`, err.message || err);
    process.exit(1);
  }
}

if (!dryRun) {
  const outPath = path.join(
    process.cwd(),
    "seo-growth-police-station-agent",
    "buffer",
    "buffer-scheduled-results.json",
  );
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2) + "\n");
  console.log(`\nWrote ${results.posts.length} scheduled posts to buffer-scheduled-results.json`);
  if (!forceChannelId) {
    const byChannel = Object.fromEntries(CHANNELS.map((c) => [c.name, 0]));
    for (const p of results.posts) byChannel[p.channel] = (byChannel[p.channel] || 0) + 1;
    console.log("Distribution:");
    for (const [name, n] of Object.entries(byChannel)) {
      if (n) console.log(`  ${n}\t${name}`);
    }
  }
}
