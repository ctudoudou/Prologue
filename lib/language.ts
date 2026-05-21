import type { ResumeConfig } from '@/types/resume';

export type AppLanguage = ResumeConfig['language'];

export function detectBrowserLanguage(language?: string): AppLanguage {
  if (!language) return 'en';

  const normalized = language.toLowerCase();

  if (normalized.startsWith('zh')) return 'zh';
  if (normalized.startsWith('ja')) return 'ja';
  if (normalized.startsWith('ko')) return 'ko';

  return 'en';
}
