import type { ResumeConfig, ResumeData } from '@/types/resume';
import { normalizeResumeData } from './resume-import';

export const RESUME_BACKUP_VERSION = 1;

export interface ResumeBackup {
  version: typeof RESUME_BACKUP_VERSION;
  exportedAt: string;
  data: ResumeData;
  config: ResumeConfig;
}

type BackupParseResult =
  | {
      ok: true;
      backup: ResumeBackup;
    }
  | {
      ok: false;
      error: string;
    };

const templates: ResumeConfig['template'][] = [
  'modern',
  'classic',
  'minimal',
  'creative',
  'professional',
];

const languages: ResumeConfig['language'][] = ['en', 'zh', 'ja', 'ko'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function hasSectionTitles(value: unknown): value is ResumeConfig['sectionTitles'] {
  if (!isRecord(value)) return false;

  return (
    isString(value.summary) &&
    isString(value.experience) &&
    isString(value.education) &&
    isString(value.projects) &&
    isString(value.skills)
  );
}

function hasVisibleSections(value: unknown): value is ResumeConfig['visibleSections'] {
  if (!isRecord(value)) return false;

  return (
    typeof value.summary === 'boolean' &&
    typeof value.experience === 'boolean' &&
    typeof value.education === 'boolean' &&
    typeof value.projects === 'boolean' &&
    typeof value.skills === 'boolean'
  );
}

export function normalizeResumeConfig(value: unknown): ResumeConfig | null {
  if (!isRecord(value)) return null;

  if (
    !isString(value.themeColor) ||
    !isString(value.fontFamily) ||
    !templates.includes(value.template as ResumeConfig['template']) ||
    !languages.includes(value.language as ResumeConfig['language']) ||
    typeof value.showIcons !== 'boolean' ||
    !hasSectionTitles(value.sectionTitles) ||
    !hasVisibleSections(value.visibleSections)
  ) {
    return null;
  }

  return {
    themeColor: value.themeColor,
    fontFamily: value.fontFamily,
    template: value.template as ResumeConfig['template'],
    language: value.language as ResumeConfig['language'],
    showIcons: value.showIcons,
    sectionTitles: value.sectionTitles,
    visibleSections: value.visibleSections,
  };
}

export function createResumeBackup(data: ResumeData, config: ResumeConfig): ResumeBackup {
  return {
    version: RESUME_BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data,
    config,
  };
}

export function parseResumeBackupText(text: string): BackupParseResult {
  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, error: 'Backup JSON is malformed' };
  }

  if (!isRecord(parsed)) {
    return { ok: false, error: 'Backup must be a JSON object' };
  }

  if (parsed.version !== RESUME_BACKUP_VERSION) {
    return { ok: false, error: 'Unsupported backup version' };
  }

  if (!isString(parsed.exportedAt) || Number.isNaN(Date.parse(parsed.exportedAt))) {
    return { ok: false, error: 'Backup export timestamp is invalid' };
  }

  const data = normalizeResumeData(parsed.data);
  if (!data || !isRecord(parsed.data)) {
    return { ok: false, error: 'Backup resume data is invalid' };
  }

  const config = normalizeResumeConfig(parsed.config);
  if (!config) {
    return { ok: false, error: 'Backup resume config is invalid' };
  }

  return {
    ok: true,
    backup: {
      version: RESUME_BACKUP_VERSION,
      exportedAt: parsed.exportedAt,
      data,
      config,
    },
  };
}
