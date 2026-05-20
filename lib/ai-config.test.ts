import { describe, expect, it } from 'vitest';
import {
  AI_CONFIG_STORAGE_KEY,
  DEFAULT_AI_CONFIG,
  defaultModelForProvider,
  loadSessionAiConfig,
  normalizeAiConfig,
  saveSessionAiConfig,
} from './ai-config';

describe('ai config helpers', () => {
  it('normalizes invalid config to defaults', () => {
    expect(normalizeAiConfig({ provider: 'unknown' })).toEqual(DEFAULT_AI_CONFIG);
  });

  it('uses provider defaults when model is empty', () => {
    expect(normalizeAiConfig({ provider: 'openrouter', apiKey: 'key', model: '' })).toEqual({
      provider: 'openrouter',
      apiKey: 'key',
      model: defaultModelForProvider('openrouter'),
    });
  });

  it('saves and loads config from session storage', () => {
    sessionStorage.clear();
    const config = {
      provider: 'openai' as const,
      apiKey: 'sk-test',
      model: 'gpt-test',
    };

    saveSessionAiConfig(config, sessionStorage);

    expect(sessionStorage.getItem(AI_CONFIG_STORAGE_KEY)).toBe(JSON.stringify(config));
    expect(loadSessionAiConfig(sessionStorage)).toEqual(config);
  });
});
