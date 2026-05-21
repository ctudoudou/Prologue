import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ResumeImportPanel } from './ResumeImportPanel';
import type { AiConfig } from '@/lib/ai-config';
import { createResumeBackup } from '@/lib/resume-backup';
import type { ResumeConfig, ResumeData } from '@/types/resume';

const aiConfig: AiConfig = {
  provider: 'openai',
  apiKey: 'sk-test',
  model: 'gpt-test',
};

const parsedData: ResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    title: 'Staff Engineer',
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
  skills: 'TypeScript, React',
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

function renderPanel(props: Partial<ComponentProps<typeof ResumeImportPanel>> = {}) {
  return render(
    <ResumeImportPanel
      aiConfig={aiConfig}
      data={parsedData}
      config={config}
      onApply={vi.fn()}
      onRestore={vi.fn()}
      onClose={vi.fn()}
      {...props}
    />
  );
}

describe('ResumeImportPanel', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('parses a selected resume and applies the preview', async () => {
    const onApply = vi.fn();
    const onClose = vi.fn();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: parsedData,
        summary: {
          name: 'Jane Doe',
          title: 'Staff Engineer',
          experienceCount: 0,
          educationCount: 0,
          projectCount: 0,
          skillsPreview: ['TypeScript', 'React'],
        },
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderPanel({ onApply, onClose });

    const file = new File(['# Jane Doe'], 'resume.md', { type: 'text/markdown' });
    fireEvent.change(screen.getByLabelText(/choose/i), {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByRole('button', { name: /parse/i }));

    await waitFor(() => expect(screen.getByText('Jane Doe')).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledWith('/api/import/resume', expect.objectContaining({
      method: 'POST',
      body: expect.any(FormData),
    }));

    fireEvent.click(screen.getByRole('button', { name: /apply/i }));

    expect(onApply).toHaveBeenCalledWith(parsedData);
  });

  it('requires an API key before parsing', () => {
    renderPanel({ aiConfig: { ...aiConfig, apiKey: '' } });

    expect(screen.getByText(/add an api key/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /parse/i })).toBeDisabled();
  });

  it('previews and restores a JSON backup without fetch', async () => {
    const onRestore = vi.fn();
    renderPanel({ onRestore });

    const backup = createResumeBackup(
      {
        ...parsedData,
        personalInfo: { ...parsedData.personalInfo, name: 'Restored User' },
      },
      { ...config, template: 'professional' }
    );
    const file = new File([JSON.stringify(backup)], 'backup.json', {
      type: 'application/json',
    });

    fireEvent.change(screen.getByLabelText(/import json/i), {
      target: { files: [file] },
    });

    await waitFor(() => expect(screen.getByText('Restored User')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /restore backup/i }));

    expect(onRestore).toHaveBeenCalledWith(
      expect.objectContaining({
        personalInfo: expect.objectContaining({ name: 'Restored User' }),
      }),
      expect.objectContaining({ template: 'professional' })
    );
  });
});
