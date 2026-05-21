export const AI_CONFIG_STORAGE_KEY = 'prologue.aiConfig.v1';

export const AI_PROVIDERS = ['openai', 'openrouter', 'volcengine'] as const;

export type AiProvider = (typeof AI_PROVIDERS)[number];

export interface AiConfig {
  provider: AiProvider;
  apiKey: string;
  model: string;
  baseUrl?: string;
}

export const DEFAULT_AI_MODELS: Record<AiProvider, string> = {
  openai: 'gpt-4.1-mini',
  openrouter: 'openai/gpt-4.1-mini',
  volcengine: 'doubao-seed-1-6-250615',
};

export const DEFAULT_AI_BASE_URLS: Record<AiProvider, string> = {
  openai: 'https://api.openai.com/v1/chat/completions',
  openrouter: 'https://openrouter.ai/api/v1/chat/completions',
  volcengine: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
};

export const DEFAULT_AI_CONFIG: AiConfig = {
  provider: 'openai',
  apiKey: '',
  model: DEFAULT_AI_MODELS.openai,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isAiProvider(value: unknown): value is AiProvider {
  return (
    typeof value === 'string' &&
    (AI_PROVIDERS as readonly string[]).includes(value)
  );
}

export function defaultModelForProvider(provider: AiProvider) {
  return DEFAULT_AI_MODELS[provider];
}

export function defaultBaseUrlForProvider(provider: AiProvider) {
  return DEFAULT_AI_BASE_URLS[provider];
}

export function normalizeAiConfig(value: unknown): AiConfig {
  if (!isRecord(value)) return DEFAULT_AI_CONFIG;

  const provider = isAiProvider(value.provider) ? value.provider : DEFAULT_AI_CONFIG.provider;
  const apiKey = typeof value.apiKey === 'string' ? value.apiKey : '';
  const model =
    typeof value.model === 'string' && value.model.trim()
      ? value.model
      : defaultModelForProvider(provider);
  const baseUrl =
    typeof value.baseUrl === 'string' && value.baseUrl.trim()
      ? value.baseUrl
      : undefined;

  return {
    provider,
    apiKey,
    model,
    ...(baseUrl ? { baseUrl } : {}),
  };
}

export function loadSessionAiConfig(storage?: Storage | null): AiConfig {
  if (!storage) return DEFAULT_AI_CONFIG;

  const stored = storage.getItem(AI_CONFIG_STORAGE_KEY);
  if (!stored) return DEFAULT_AI_CONFIG;

  try {
    return normalizeAiConfig(JSON.parse(stored));
  } catch {
    return DEFAULT_AI_CONFIG;
  }
}

export function saveSessionAiConfig(config: AiConfig, storage?: Storage | null) {
  if (!storage) return;

  storage.setItem(AI_CONFIG_STORAGE_KEY, JSON.stringify(config));
}
