import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PreviewSection } from './PreviewSection';
import type { ResumeConfig, ResumeData } from '@/types/resume';

const baseData: ResumeData = {
  personalInfo: {
    name: 'Ada Lovelace',
    title: 'Computing Pioneer',
    email: 'ada@example.com',
    phone: '+44 1234',
    location: 'London',
    github: 'github.com/ada',
    linkedin: 'linkedin.com/in/ada',
    website: 'ada.dev',
    hiddenFields: ['email'],
    customFields: [{ id: 'field-1', label: 'Portfolio', value: 'prologue.dev' }],
  },
  summary: 'Designed analytical engines.',
  experience: [
    {
      id: 'exp-1',
      company: 'Analytical Engines Ltd.',
      role: 'Mathematician',
      startDate: '1842',
      endDate: '1843',
      description: '- Wrote the first algorithm.',
    },
  ],
  education: [],
  projects: [
    {
      id: 'project-1',
      name: 'Notes on the Analytical Engine',
      description: 'Translated and expanded a foundational paper.',
      link: 'ada.dev/notes',
    },
  ],
  skills: 'Mathematics, Algorithms',
};

const baseConfig: ResumeConfig = {
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

function renderPreview(config: Partial<ResumeConfig> = {}) {
  return render(
    <PreviewSection
      data={baseData}
      config={{ ...baseConfig, ...config }}
    />
  );
}

describe('PreviewSection', () => {
  it('renders visible resume content and hides configured contact fields', () => {
    renderPreview();

    expect(screen.getByText(/Ada Lovelace Portfolio/)).toBeInTheDocument();
    expect(screen.getByText('Analytical Engines Ltd.')).toBeInTheDocument();
    expect(screen.queryByText('ada@example.com')).not.toBeInTheDocument();
    expect(screen.getByText('prologue.dev')).toBeInTheDocument();
  });

  it('uses a dedicated Links heading in the creative template', () => {
    renderPreview({ template: 'creative' });

    expect(screen.getByText('Links')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });
});
