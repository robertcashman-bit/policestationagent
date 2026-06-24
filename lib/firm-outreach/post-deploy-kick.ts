import { getKV } from '@/lib/kv';
import { runServerProductionKick } from './run-server-production-kick';

const POST_DEPLOY_KICK_KEY = 'firmoutreach:kick:deployment';

export interface PostDeployKickResult {
  skipped: boolean;
  reason?: string;
  deploymentId?: string;
  kick?: Awaited<ReturnType<typeof runServerProductionKick>>;
}

/** Run production kick once per Vercel deployment (first enrich/send cron after deploy). */
export async function maybeRunPostDeployKick(): Promise<PostDeployKickResult> {
  const deploymentId = process.env.VERCEL_DEPLOYMENT_ID?.trim();
  if (!deploymentId) {
    return { skipped: true, reason: 'no_deployment_id' };
  }

  const kv = getKV();
  if (!kv) {
    return { skipped: true, reason: 'no_kv', deploymentId };
  }

  const last = await kv.get<string>(POST_DEPLOY_KICK_KEY);
  if (last === deploymentId) {
    return { skipped: true, reason: 'already_kicked', deploymentId };
  }

  const kick = await runServerProductionKick();
  await kv.set(POST_DEPLOY_KICK_KEY, deploymentId);
  return { skipped: false, deploymentId, kick };
}
