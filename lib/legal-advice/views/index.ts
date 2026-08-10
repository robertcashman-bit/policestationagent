import type { ComponentType } from 'react';
import { ArticleBody as DoIHaveToAnswerBody } from './do-i-have-to-answer-police-questions';
import { ArticleBody as WithoutSolicitorBody } from './can-police-interview-me-without-a-solicitor';
import { ArticleBody as LeaveVoluntaryBody } from './can-i-leave-a-voluntary-police-interview';
import { ArticleBody as FreeAdviceBody } from './is-legal-advice-free-at-a-police-station';

export const LEGAL_ADVICE_VIEW_MAP: Record<string, ComponentType> = {
  'do-i-have-to-answer-police-questions': DoIHaveToAnswerBody,
  'can-police-interview-me-without-a-solicitor': WithoutSolicitorBody,
  'can-i-leave-a-voluntary-police-interview': LeaveVoluntaryBody,
  'is-legal-advice-free-at-a-police-station': FreeAdviceBody,
};
