export type BufferChannelService = 'linkedin' | 'facebook' | 'twitter' | 'googlebusiness';

export interface BufferChannelConfig {
  id: string;
  service: BufferChannelService;
  /** UTM slug used in tracking links + dedup marker. */
  utmSlug: string;
}

/** A site post that can be promoted to Buffer. */
export interface SchedulablePost {
  slug: string;
  title: string;
  /** Short summary / description used to build social copy. */
  description: string;
  /** Canonical absolute URL (no UTM). */
  url: string;
  /** Absolute hero image URL (JPEG/PNG), optional. */
  imageUrl?: string;
  imageAlt?: string;
  published: string;
}

export interface PlannedBufferPost {
  slug: string;
  channel: BufferChannelConfig;
  text: string;
  url: string;
  dueAt: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Stable dedup marker contained in the tracking URL. */
  marker: string;
}
