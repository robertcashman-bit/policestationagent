import { getAllBlogSlugs } from '@/lib/blog/content';
import { getAllGuideSlugs } from '@/lib/guides/content';
import { getAllLegalAdvicePaths } from '@/lib/legal-advice/content';
import { allTrainingSeoSlugs } from '@/lib/training-seo-landings';
import { getTrafficDigestConfig } from './config';
import { sendTrafficDigest, type TrafficDigestResult } from './email';
import { fetchGa4Report } from './ga4';
import { fetchGscReport } from './gsc';

const STATIC_ROUTE_COUNT = 26;

function countIndexableUrls(): number {
  return (
    STATIC_ROUTE_COUNT +
    getAllGuideSlugs().length +
    getAllBlogSlugs().length +
    getAllLegalAdvicePaths().length +
    allTrainingSeoSlugs().length
  );
}

export async function runTrafficDigest(): Promise<TrafficDigestResult> {
  const cfg = getTrafficDigestConfig();
  const indexableUrls = countIndexableUrls();

  const [gsc, ga4] = await Promise.all([
    fetchGscReport(cfg.gscSiteUrl, 7),
    fetchGa4Report(cfg.ga4PropertyId, 7),
  ]);

  const result: TrafficDigestResult = {
    gsc,
    ga4,
    indexableUrls,
    emailSent: false,
  };

  const email = await sendTrafficDigest(result);
  result.emailSent = email.sent;
  result.emailError = email.error;

  return result;
}
