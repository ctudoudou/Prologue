import type { ResumeConfig } from '@/types/resume';

export type AppLanguage = ResumeConfig['language'];

export function detectBrowserLanguage(language?: string): AppLanguage {
  if (!language) return 'en';

  return language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}
