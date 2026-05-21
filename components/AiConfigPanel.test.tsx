import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AiConfigPanel } from './AiConfigPanel';
import type { AiConfig } from '@/lib/ai-config';

const baseConfig: AiConfig = {
  provider: 'openai',
  apiKey: '',
  model: 'gpt-4.1-mini',
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
});
