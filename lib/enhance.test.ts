import { describe, expect, it } from 'vitest';
import {
  MAX_ENHANCE_TEXT_LENGTH,
  buildEnhancePrompt,
  validateEnhanceRequest,
} from './enhance';

describe('validateEnhanceRequest', () => {
  it('accepts valid summary requests and trims text', () => {
    const result = validateEnhanceRequest({
      text: '  Built reliable systems  ',
      fieldType: 'summary',
    });

    expect(result).toEqual({
      ok: true,
      text: 'Built reliable systems',
      fieldType: 'summary',
    });
  });

  it('defaults fieldType to general', () => {
    const result = validateEnhanceRequest({ text: 'Improve this sentence' });

    expect(result).toEqual({
      ok: true,
      text: 'Improve this sentence',
      fieldType: 'general',
    });
  });

  it('rejects empty text', () => {
    const result = validateEnhanceRequest({ text: '   ', fieldType: 'summary' });

    expect(result).toEqual({
      ok: false,
      error: 'Text is required',
      status: 400,
    });
  });

  it('rejects unsupported field types', () => {
    const result = validateEnhanceRequest({
      text: 'Improve this',
      fieldType: 'cover-letter',
    });

    expect(result).toEqual({
      ok: false,
      error: 'Unsupported field type',
      status: 400,
    });
  });

  it('rejects overly long text', () => {
    const result = validateEnhanceRequest({
      text: 'x'.repeat(MAX_ENHANCE_TEXT_LENGTH + 1),
      fieldType: 'general',
    });

    expect(result).toEqual({
      ok: false,
      error: `Text must be ${MAX_ENHANCE_TEXT_LENGTH} characters or fewer`,
      status: 400,
    });
  });
});

describe('buildEnhancePrompt', () => {
  it('builds a summary-specific prompt', () => {
    const prompt = buildEnhancePrompt('Led platform migrations.', 'summary');

    expect(prompt).toContain('professional summary');
    expect(prompt).toContain('Output ONLY the improved summary');
    expect(prompt).toContain('Led platform migrations.');
  });

  it('builds an experience-specific prompt', () => {
    const prompt = buildEnhancePrompt('Fixed slow APIs.', 'experience');

    expect(prompt).toContain('job experience description');
    expect(prompt).toContain('strong action verbs');
    expect(prompt).toContain('Fixed slow APIs.');
  });

  it('builds a general resume prompt', () => {
    const prompt = buildEnhancePrompt('Make this sharper.', 'general');

    expect(prompt).toContain('professional resume');
    expect(prompt).toContain('Output ONLY the improved text');
    expect(prompt).toContain('Make this sharper.');
  });
});
