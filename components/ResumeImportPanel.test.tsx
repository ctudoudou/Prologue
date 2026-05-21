import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ResumeImportPanel } from './ResumeImportPanel';
import type { AiConfig } from '@/lib/ai-config';
import type { ResumeData } from '@/types/resume';

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

    render(<ResumeImportPanel aiConfig={aiConfig} onApply={onApply} onClose={onClose} />);

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
    render(
      <ResumeImportPanel
        aiConfig={{ ...aiConfig, apiKey: '' }}
        onApply={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText(/add an api key/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /parse/i })).toBeDisabled();
  });
});
