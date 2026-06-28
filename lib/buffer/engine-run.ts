import {
  runSiteBufferScheduler,
  verifySiteBufferSchedule,
  runSiteBufferSelfTest,
  type ScheduleOptions,
  type ScheduleResult,
  type VerifyResult,
  type SelfTestResult,
} from '@robertcashman/buffer-engine';
import { createPsaBufferAdapter } from './site-adapter';

export async function runBufferScheduler(options?: ScheduleOptions): Promise<ScheduleResult> {
  return runSiteBufferScheduler(createPsaBufferAdapter(), options);
}

export async function verifyPsaBufferSchedule(options?: {
  now?: Date;
  gapFill?: boolean;
}): Promise<VerifyResult> {
  return verifySiteBufferSchedule(createPsaBufferAdapter(), options);
}

export async function runPsaBufferSelfTest(options?: { now?: Date }): Promise<SelfTestResult> {
  return runSiteBufferSelfTest(createPsaBufferAdapter(), options);
}
