import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AiConfigPanel } from './AiConfigPanel';
import type { AiConfig } from '@/lib/ai-config';
import type { ResumeConfig } from '@/types/resume';

const baseConfig: AiConfig = {
  provider: 'openai',
  apiKey: '',
  model: 'gpt-4.1-mini',
};

const resumeConfig: ResumeConfig = {
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

describe('AiConfigPanel', () => {
  it('switches to Volcengine defaults and edits API config', () => {
    let currentConfig = baseConfig;
    const setAiConfig = vi.fn(updater => {
      currentConfig =
        typeof updater === 'function' ? updater(currentConfig) : updater;
    });

    render(
      <AiConfigPanel
        aiConfig={currentConfig}
        config={resumeConfig}
        setConfig={vi.fn()}
        setAiConfig={setAiConfig}
        onClose={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /volcengine/i }));

    expect(currentConfig).toMatchObject({
      provider: 'volcengine',
      model: 'doubao-seed-1-6-250615',
      baseUrl: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    });
  });

  it('switches page language and section titles', () => {
    let currentResumeConfig = resumeConfig;
    const setConfig = vi.fn(updater => {
      currentResumeConfig =
        typeof updater === 'function' ? updater(currentResumeConfig) : updater;
    });

    render(
      <AiConfigPanel
        aiConfig={baseConfig}
        config={currentResumeConfig}
        setConfig={setConfig}
        setAiConfig={vi.fn()}
        onClose={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '日本語' }));

    expect(currentResumeConfig).toMatchObject({
      language: 'ja',
      sectionTitles: {
        summary: 'プロフィール',
        experience: '職務経歴',
      },
    });
  });
});
