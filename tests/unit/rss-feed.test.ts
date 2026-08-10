import { describe, expect, test } from 'vitest';
import { buildRssFeedXml } from '../../lib/rss-feed.ts';
import { GUIDES } from '../../lib/guides/content.ts';
import { SITE } from '../../lib/site.ts';

describe('rss-feed', () => {
  test('buildRssFeedXml emits valid RSS with every guide', () => {
    const xml = buildRssFeedXml();

    expect(xml).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    expect(xml).toMatch(/<rss version="2\.0"/);
    expect(xml).toMatch(/<channel>/);
    expect(xml).toMatch(new RegExp(`<atom:link href="${SITE.url}/feed"`));
    expect(xml).toMatch(/<link>https:\/\/psrtrain\.com\/guides<\/link>/);

    const itemCount = (xml.match(/<item>/g) ?? []).length;
    expect(itemCount).toBe(GUIDES.length);

    for (const guide of GUIDES) {
      expect(xml).toMatch(new RegExp(`https://psrtrain\\.com/guides/${guide.slug}`));
    }
  });

  test('guide links and summaries are escaped for XML', () => {
    const xml = buildRssFeedXml();
    expect(xml).not.toMatch(/<description>[^<]*&[^a][^<]*<\/description>/);
    expect(xml.includes('&amp; Wales')).toBeTruthy();
  });

  test('every item includes a JPEG or PNG enclosure', () => {
    const xml = buildRssFeedXml();
    const itemBlocks = xml.split('<item>').slice(1);
    expect(itemBlocks.length).toBe(GUIDES.length);
    for (const block of itemBlocks) {
      expect(block).toMatch(/<enclosure url="[^"]+" type="image\/(jpeg|png)" length="\d+" \/>/);
    }
  });
});