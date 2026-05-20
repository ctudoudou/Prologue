import { describe, expect, it } from 'vitest';
import { detectBrowserLanguage } from './language';

describe('detectBrowserLanguage', () => {
  it('uses Chinese for zh browser locales', () => {
    expect(detectBrowserLanguage('zh-CN')).toBe('zh');
    expect(detectBrowserLanguage('zh-TW')).toBe('zh');
    expect(detectBrowserLanguage('zh-Hans')).toBe('zh');
  });

  it('falls back to English for non-Chinese browser locales', () => {
    expect(detectBrowserLanguage('en-US')).toBe('en');
    expect(detectBrowserLanguage('ja-JP')).toBe('en');
    expect(detectBrowserLanguage()).toBe('en');
  });
});
