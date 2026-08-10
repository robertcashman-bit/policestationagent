import { describe, it, expect, vi, afterEach } from 'vitest';
import { assertBufferPostImageReady, isBufferMediaError } from './image-url';

describe('assertBufferPostImageReady text-only soft path', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns undefined for missing image on non-GBP channels', async () => {
    await expect(
      assertBufferPostImageReady(undefined, 'https://example.com', fetch, {
        channelService: 'twitter',
      }),
    ).resolves.toBeUndefined();
  });

  it('still requires an image for Google Business', async () => {
    await expect(
      assertBufferPostImageReady(undefined, 'https://example.com', fetch, {
        channelService: 'googlebusiness',
      }),
    ).rejects.toThrow(/requires a blog image URL/i);
  });

  it('returns undefined when non-GBP image probe fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      headers: new Headers(),
    });
    await expect(
      assertBufferPostImageReady(
        'https://example.com/missing.jpg',
        'https://example.com',
        fetchMock as unknown as typeof fetch,
        { channelService: 'linkedin' },
      ),
    ).resolves.toBeUndefined();
  });
});

describe('isBufferMediaError', () => {
  it('detects Buffer media failure messages', () => {
    expect(isBufferMediaError('issue with the attached media')).toBe(true);
    expect(isBufferMediaError('image validation failed')).toBe(true);
    expect(isBufferMediaError('rate limited')).toBe(false);
  });
});
