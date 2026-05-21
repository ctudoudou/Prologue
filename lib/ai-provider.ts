import {
  type AiConfig,
  type AiProvider,
  defaultBaseUrlForProvider,
  defaultModelForProvider,
  isAiProvider,
} from './ai-config';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

type AiConfigValidation =
  | {
      ok: true;
      config: AiConfig;
    }
  | {
      ok: false;
      error: string;
      status: 400;
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function endpointForProvider(provider: AiProvider, baseUrl?: string) {
  if (baseUrl?.trim()) {
    return baseUrl.trim();
  }

  return defaultBaseUrlForProvider(provider);
}

export function validateAiConfig(value: unknown): AiConfigValidation {
  if (!isRecord(value)) {
    return { ok: false, error: 'AI service configuration is required', status: 400 };
  }

  if (!isAiProvider(value.provider)) {
    return { ok: false, error: 'Unsupported AI provider', status: 400 };
  }

  if (typeof value.apiKey !== 'string' || !value.apiKey.trim()) {
    return { ok: false, error: 'AI API key is required', status: 400 };
  }

  const model =
    typeof value.model === 'string' && value.model.trim()
      ? value.model.trim()
      : defaultModelForProvider(value.provider);
  const baseUrl =
    typeof value.baseUrl === 'string' && value.baseUrl.trim()
      ? value.baseUrl.trim()
      : undefined;

  return {
    ok: true,
    config: {
      provider: value.provider,
      apiKey: value.apiKey.trim(),
      model,
      ...(baseUrl ? { baseUrl } : {}),
    },
  };
}

export function buildChatCompletionRequest(
  config: AiConfig,
  messages: ChatMessage[]
) {
  return {
    url: endpointForProvider(config.provider, config.baseUrl),
    init: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        ...(config.provider === 'openrouter'
          ? {
              'HTTP-Referer': 'https://github.com/ctudoudou/Prologue',
              'X-Title': 'Prologue',
            }
          : {}),
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        temperature: 0.3,
      }),
    },
  } satisfies { url: string; init: RequestInit };
}

export async function generateAiText(
  config: AiConfig,
  messages: ChatMessage[],
  fetchImpl: typeof fetch = fetch
) {
  const request = buildChatCompletionRequest(config, messages);
  const response = await fetchImpl(request.url, request.init);

  if (!response.ok) {
    return {
      ok: false as const,
      error: `AI provider request failed with status ${response.status}`,
    };
  }

  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;

  if (typeof content !== 'string' || !content.trim()) {
    return {
      ok: false as const,
      error: 'AI provider returned an empty response',
    };
  }

  return {
    ok: true as const,
    text: content.trim(),
  };
}
