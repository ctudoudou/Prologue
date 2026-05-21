import { describe, expect, it } from 'vitest';
import {
  buildResumeImportPrompt,
  extractJsonObject,
  normalizeResumeData,
  parseResumeDataFromAiText,
  summarizeResumeImport,
} from './resume-import';

describe('resume import helpers', () => {
  it('builds a strict JSON parsing prompt', () => {
    const prompt = buildResumeImportPrompt('Jane Doe\nEngineer');

    expect(prompt).toContain('Return JSON only');
    expect(prompt).toContain('"personalInfo"');
    expect(prompt).toContain('Jane Doe');
  });

  it('extracts JSON from fenced AI responses', () => {
    expect(extractJsonObject('```json\n{"summary":"hello"}\n```')).toBe('{"summary":"hello"}');
  });

  it('normalizes malformed resume data into the app shape', () => {
    const data = normalizeResumeData({
      personalInfo: { name: ' Jane ', hiddenFields: ['phone', 123] },
      experience: [{ company: 'Acme' }],
      education: 'none',
      projects: [{ id: 'p1', name: 'Tool' }],
      skills: 'TypeScript, React',
    });

    expect(data).toMatchObject({
      personalInfo: {
        name: 'Jane',
        hiddenFields: ['phone'],
      },
      experience: [{ id: 'experience-1', company: 'Acme' }],
      education: [],
      projects: [{ id: 'p1', name: 'Tool' }],
      skills: 'TypeScript, React',
    });
  });

  it('parses AI JSON and produces a preview summary', () => {
    const data = parseResumeDataFromAiText(`{
      "personalInfo": { "name": "Jane Doe", "title": "Staff Engineer" },
      "summary": "Builds products",
      "experience": [{ "company": "Acme", "role": "Lead" }],
      "education": [],
      "projects": [],
      "skills": "TypeScript, Next.js, Node.js"
    }`);

    expect(summarizeResumeImport(data)).toEqual({
      name: 'Jane Doe',
      title: 'Staff Engineer',
      experienceCount: 1,
      educationCount: 0,
      projectCount: 0,
      skillsPreview: ['TypeScript', 'Next.js', 'Node.js'],
    });
  });
});
