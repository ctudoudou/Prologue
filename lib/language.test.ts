import { describe, expect, it } from 'vitest';
import { detectBrowserLanguage } from './language';

describe('detectBrowserLanguage', () => {
  it('uses Chinese for zh browser locales', () => {
    expect(detectBrowserLanguage('zh-CN')).toBe('zh');
    expect(detectBrowserLanguage('zh-TW')).toBe('zh');
    expect(detectBrowserLanguage('zh-Hans')).toBe('zh');
  });

  it('detects Japanese and Korean browser locales', () => {
    expect(detectBrowserLanguage('ja-JP')).toBe('ja');
    expect(detectBrowserLanguage('ko-KR')).toBe('ko');
  });

  it('falls back to English for unsupported browser locales', () => {
    expect(detectBrowserLanguage('en-US')).toBe('en');
    expect(detectBrowserLanguage('fr-FR')).toBe('en');
    expect(detectBrowserLanguage()).toBe('en');
  });
});
