import { describe, expect, it } from 'vitest';
import { renderResumePdfHtml, validatePdfExportPayload } from './pdf-export';
import type { ResumeConfig, ResumeData } from '@/types/resume';

const pdfTestData: ResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    title: 'Staff Engineer',
    email: 'jane@example.com',
    phone: '',
    location: 'San Francisco',
    github: '',
    linkedin: '',
    website: '',
  },
  summary: 'Builds reliable products.',
  experience: [
    {
      id: 'experience-1',
      company: 'Acme',
      role: 'Lead Engineer',
      startDate: '2020',
      endDate: 'Present',
      description: '- Built platform\n- Led team',
    },
  ],
  education: [],
  projects: [],
  skills: 'TypeScript, Next.js',
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

describe('pdf export helpers', () => {
  it('validates export payloads', () => {
    const validation = validatePdfExportPayload({
      data: pdfTestData,
      config: pdfTestConfig,
    });

    expect(validation.ok).toBe(true);
  });

  it('renders escaped printable resume HTML', () => {
    const html = renderResumePdfHtml(
      {
        ...pdfTestData,
        personalInfo: { ...pdfTestData.personalInfo, name: '<Jane>' },
      },
      pdfTestConfig
    );

    expect(html).toContain('&lt;Jane&gt;');
    expect(html).toContain('Lead Engineer');
    expect(html).toContain('TypeScript');
  });
});
