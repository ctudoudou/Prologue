import { describe, expect, it, vi } from 'vitest';
import {
  buildChatCompletionRequest,
  generateAiText,
  validateAiConfig,
} from './ai-provider';

describe('validateAiConfig', () => {
  it('accepts valid OpenAI config', () => {
    expect(validateAiConfig({
      provider: 'openai',
      apiKey: ' sk-test ',
      model: 'gpt-test',
    })).toEqual({
      ok: true,
      config: {
        provider: 'openai',
        apiKey: 'sk-test',
        model: 'gpt-test',
      },
    });
  });

  it('rejects missing API keys', () => {
    expect(validateAiConfig({ provider: 'openrouter', apiKey: '', model: 'test' })).toEqual({
      ok: false,
      error: 'AI API key is required',
      status: 400,
    });
  });
});

describe('buildChatCompletionRequest', () => {
  it('builds an OpenAI request', () => {
    const request = buildChatCompletionRequest(
      { provider: 'openai', apiKey: 'sk-test', model: 'gpt-test' },
      [{ role: 'user', content: 'Improve this' }]
    );

    expect(request.url).toBe('https://api.openai.com/v1/chat/completions');
    expect(request.init.headers).toMatchObject({
      Authorization: 'Bearer sk-test',
      'Content-Type': 'application/json',
    });
    expect(JSON.parse(request.init.body as string)).toMatchObject({
      model: 'gpt-test',
      messages: [{ role: 'user', content: 'Improve this' }],
    });
  });

  it('builds an OpenRouter request with attribution headers', () => {
    const request = buildChatCompletionRequest(
      { provider: 'openrouter', apiKey: 'sk-or-test', model: 'openai/test' },
      [{ role: 'user', content: 'Improve this' }]
    );

    expect(request.url).toBe('https://openrouter.ai/api/v1/chat/completions');
    expect(request.init.headers).toMatchObject({
      Authorization: 'Bearer sk-or-test',
      'HTTP-Referer': 'https://github.com/ctudoudou/Prologue',
      'X-Title': 'Prologue',
    });
  });
});

describe('generateAiText', () => {
  it('returns assistant text from provider response', async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({
      choices: [{ message: { content: 'Improved resume text' } }],
    }))) as unknown as typeof fetch;

    await expect(generateAiText(
      { provider: 'openai', apiKey: 'sk-test', model: 'gpt-test' },
      [{ role: 'user', content: 'Improve this' }],
      fetchImpl
    )).resolves.toEqual({ ok: true, text: 'Improved resume text' });
  });
});
