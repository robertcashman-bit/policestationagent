import {
  runSiteBufferScheduler,
  verifySiteBufferSchedule,
  runSiteBufferSelfTest,
  type ScheduleOptions,
  type ScheduleResult,
  type VerifyResult,
  type SelfTestResult,
} from '@robertcashman/buffer-engine';
import { createCustodyNoteBufferAdapter } from './site-adapter';

export async function runBufferScheduler(options?: ScheduleOptions): Promise<ScheduleResult> {
  return runSiteBufferScheduler(createCustodyNoteBufferAdapter(), options);
}

export async function verifyCustodyNoteBufferSchedule(options?: {
  now?: Date;
  gapFill?: boolean;
}): Promise<VerifyResult> {
  return verifySiteBufferSchedule(createCustodyNoteBufferAdapter(), options);
}

export async function runCustodyNoteBufferSelfTest(options?: {
  now?: Date;
}): Promise<SelfTestResult> {
  return runSiteBufferSelfTest(createCustodyNoteBufferAdapter(), options);
}
