import { describe, expect, it } from 'vitest';
import {
  RESUME_BACKUP_VERSION,
  createResumeBackup,
  parseResumeBackupText,
} from './resume-backup';
import type { ResumeConfig, ResumeData } from '@/types/resume';

const data: ResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    title: 'Engineer',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    website: '',
  },
  summary: 'Builds products',
  experience: [],
  education: [],
  projects: [],
  skills: 'TypeScript',
};

const config: ResumeConfig = {
  themeColor: '#1A1A1A',
  fontFamily: 'font-sans',
  template: 'modern',
  language: 'en',
  showIcons: false,
  sectionTitles: {
    summary: 'Profile',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
  },
  visibleSections: {
    summary: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
  },
};

describe('resume backup helpers', () => {
  it('creates and parses a versioned backup', () => {
    const backup = createResumeBackup(data, config);
    const parsed = parseResumeBackupText(JSON.stringify(backup));

    expect(backup.version).toBe(RESUME_BACKUP_VERSION);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) {
      expect(parsed.backup.data.personalInfo.name).toBe('Jane Doe');
      expect(parsed.backup.config.template).toBe('modern');
    }
  });

  it('rejects malformed JSON and unsupported versions', () => {
    expect(parseResumeBackupText('{').ok).toBe(false);
    expect(parseResumeBackupText(JSON.stringify({ version: 99 })).ok).toBe(false);
  });

  it('rejects invalid config', () => {
    const parsed = parseResumeBackupText(JSON.stringify({
      version: RESUME_BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      data,
      config: { ...config, template: 'unknown' },
    }));

    expect(parsed).toEqual({
      ok: false,
      error: 'Backup resume config is invalid',
    });
  });
});
