import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './route';
import type { ResumeConfig, ResumeData } from '@/types/resume';

const close = vi.fn();
const setContent = vi.fn();
const pdf = vi.fn();

vi.mock('playwright', () => ({
  chromium: {
    launch: vi.fn(async () => ({
      close,
      newPage: vi.fn(async () => ({
        setContent,
        pdf,
      })),
    })),
  },
}));

const pdfTestData: ResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    title: 'Staff Engineer',
    email: 'jane@example.com',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    website: '',
  },
  summary: 'Builds products.',
  experience: [],
  education: [],
  projects: [],
  skills: 'TypeScript',
};

const pdfTestConfig: ResumeConfig = {
  themeColor: '#123456',
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

describe('/api/export/pdf', () => {
  beforeEach(() => {
    close.mockClear();
    setContent.mockClear();
    pdf.mockReset();
    pdf.mockResolvedValue(new Uint8Array([37, 80, 68, 70]));
  });

  it('streams PDF bytes with download headers', async () => {
    const response = await POST(new Request('http://localhost/api/export/pdf', {
      method: 'POST',
      body: JSON.stringify({ data: pdfTestData, config: pdfTestConfig }),
    }));

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/pdf');
    expect(response.headers.get('Content-Disposition')).toBe('attachment; filename="resume.pdf"');
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array([37, 80, 68, 70]));
    expect(setContent).toHaveBeenCalledOnce();
    expect(close).toHaveBeenCalledOnce();
  });

  it('rejects invalid payloads', async () => {
    const response = await POST(new Request('http://localhost/api/export/pdf', {
      method: 'POST',
      body: JSON.stringify({ data: pdfTestData, config: { ...pdfTestConfig, template: 'bad' } }),
    }));

    expect(response.status).toBe(400);
  });
});
