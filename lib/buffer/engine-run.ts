import {
  runSiteBufferScheduler,
  verifySiteBufferSchedule,
  runSiteBufferSelfTest,
  type ScheduleOptions,
  type ScheduleResult,
  type VerifyResult,
  type SelfTestResult,
} from '@robertcashman/buffer-engine';
import { createPsrtrainBufferAdapter } from './site-adapter';

export async function runBufferScheduler(
  options: ScheduleOptions & { slugs?: string[]; limit?: number; dryRun?: boolean } = {},
): Promise<ScheduleResult> {
  return runSiteBufferScheduler(createPsrtrainBufferAdapter(), options);
}

export async function verifyPsrtrainBufferSchedule(options?: {
  now?: Date;
  gapFill?: boolean;
}): Promise<VerifyResult> {
  return verifySiteBufferSchedule(createPsrtrainBufferAdapter(), options);
}

export async function runPsrtrainBufferSelfTest(options?: { now?: Date }): Promise<SelfTestResult> {
  return runSiteBufferSelfTest(createPsrtrainBufferAdapter(), options);
}
