import type { Dispatch, SetStateAction } from 'react';
import { Bot, X } from 'lucide-react';
import {
  AI_PROVIDERS,
  type AiConfig,
  type AiProvider,
  defaultBaseUrlForProvider,
  defaultModelForProvider,
} from '@/lib/ai-config';

interface AiConfigPanelProps {
  aiConfig: AiConfig;
  setAiConfig: Dispatch<SetStateAction<AiConfig>>;
  onClose: () => void;
}

const providerLabels: Record<AiProvider, string> = {
  openai: 'OpenAI',
  openrouter: 'OpenRouter',
  volcengine: 'Volcengine',
};

const apiKeyPlaceholders: Record<AiProvider, string> = {
  openai: 'sk-...',
  openrouter: 'sk-or-...',
  volcengine: 'Volcengine Ark API key',
};

export function AiConfigPanel({ aiConfig, setAiConfig, onClose }: AiConfigPanelProps) {
  const switchProvider = (provider: AiProvider) => {
    setAiConfig(current => ({
      ...current,
      provider,
      model:
        current.model === defaultModelForProvider(current.provider)
          ? defaultModelForProvider(provider)
          : current.model,
      baseUrl:
        !current.baseUrl || current.baseUrl === defaultBaseUrlForProvider(current.provider)
          ? defaultBaseUrlForProvider(provider)
          : current.baseUrl,
    }));
  };

  return (
    <section className="border-t border-[#F0F0EB] bg-white p-4 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1A1A1A]">
            AI Model Config
          </h2>
          <p className="mt-2 text-xs leading-5 text-[#666]">
            Configure the provider used by enhance and AI import requests.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-[#8C8C85] transition-colors hover:text-[#1A1A1A]"
          aria-label="Close AI config panel"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-4 space-y-4 bg-[#F9F9F7] border border-[#EBEBE6] p-4">
        <div className="grid grid-cols-3 gap-2">
          {AI_PROVIDERS.map(provider => (
            <button
              key={provider}
              type="button"
              onClick={() => switchProvider(provider)}
              className={`py-3 text-[10px] uppercase tracking-widest border transition-colors ${
                aiConfig.provider === provider
                  ? 'bg-[#1A1A1A] border-black text-white'
                  : 'border-[#E5E5E0] text-[#8C8C85] hover:bg-white'
              }`}
            >
              {providerLabels[provider]}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="text-[10px] uppercase tracking-widest font-bold mb-1.5 block text-[#1A1A1A] opacity-80">
            Model
          </span>
          <input
            value={aiConfig.model}
            onChange={event => setAiConfig(current => ({ ...current, model: event.target.value }))}
            placeholder={defaultModelForProvider(aiConfig.provider)}
            className="w-full border-b border-[#D9D9D3] focus:border-black outline-none py-1 text-sm bg-transparent transition-colors"
          />
        </label>

        <label className="block">
          <span className="text-[10px] uppercase tracking-widest font-bold mb-1.5 block text-[#1A1A1A] opacity-80">
            Base URL
          </span>
          <input
            value={aiConfig.baseUrl ?? defaultBaseUrlForProvider(aiConfig.provider)}
            onChange={event => setAiConfig(current => ({ ...current, baseUrl: event.target.value }))}
            placeholder={defaultBaseUrlForProvider(aiConfig.provider)}
            className="w-full border-b border-[#D9D9D3] focus:border-black outline-none py-1 text-sm bg-transparent transition-colors"
          />
        </label>

        <label className="block">
          <span className="text-[10px] uppercase tracking-widest font-bold mb-1.5 block text-[#1A1A1A] opacity-80">
            API Key
          </span>
          <input
            type="password"
            value={aiConfig.apiKey}
            onChange={event => setAiConfig(current => ({ ...current, apiKey: event.target.value }))}
            placeholder={apiKeyPlaceholders[aiConfig.provider]}
            className="w-full border-b border-[#D9D9D3] focus:border-black outline-none py-1 text-sm bg-transparent transition-colors"
          />
        </label>

        <div className="flex items-start gap-3 border-t border-[#E5E5E0] pt-4 text-[11px] leading-5 text-[#8C8C85]">
          <Bot size={16} className="mt-0.5 shrink-0 text-[#1A1A1A]" />
          <p>
            Stored in this browser session only. Keys and resume content are sent only for
            the current AI request and are not persisted by Prologue.
          </p>
        </div>
      </div>
    </section>
  );
}
