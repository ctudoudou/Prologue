import type { ResumeData } from '@/types/resume';

export const RESUME_IMPORT_MAX_TEXT_LENGTH = 30000;

export interface ResumeImportSummary {
  name: string;
  title: string;
  experienceCount: number;
  educationCount: number;
  projectCount: number;
  skillsPreview: string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

function asRecordArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter(isRecord);
}

function withId(value: unknown, fallback: string) {
  const id = asString(value);
  return id || fallback;
}

export function buildResumeImportPrompt(text: string) {
  const clippedText = text.slice(0, RESUME_IMPORT_MAX_TEXT_LENGTH);

  return `Parse the resume text into strict JSON matching this TypeScript shape:

{
  "personalInfo": {
    "name": "string",
    "title": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "github": "string",
    "linkedin": "string",
    "website": "string",
    "customFields": [{ "id": "string", "label": "string", "value": "string" }],
    "hiddenFields": ["string"]
  },
  "summary": "string",
  "experience": [{ "id": "string", "company": "string", "role": "string", "startDate": "string", "endDate": "string", "description": "string" }],
  "education": [{ "id": "string", "school": "string", "degree": "string", "startDate": "string", "endDate": "string", "description": "string" }],
  "projects": [{ "id": "string", "name": "string", "description": "string", "link": "string" }],
  "skills": "string"
}

Rules:
- Return JSON only. Do not include markdown fences or commentary.
- Preserve facts from the source. Do not invent employers, schools, links, or dates.
- Use empty strings for missing scalar fields and empty arrays for missing lists.
- Keep descriptions concise and readable. Use newline-separated bullets when the source has bullet points.
- Use stable string IDs such as "experience-1", "education-1", and "project-1".

Resume text:
${clippedText}`;
}

export function extractJsonObject(text: string) {
  const trimmed = text.trim();
  const withoutFence = trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const firstBrace = withoutFence.indexOf('{');
  const lastBrace = withoutFence.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error('AI response did not contain a JSON object');
  }

  return withoutFence.slice(firstBrace, lastBrace + 1);
}

export function normalizeResumeData(value: unknown): ResumeData | null {
  if (!isRecord(value)) return null;

  const personalInfo = isRecord(value.personalInfo) ? value.personalInfo : {};

  return {
    personalInfo: {
      name: asString(personalInfo.name),
      title: asString(personalInfo.title),
      email: asString(personalInfo.email),
      phone: asString(personalInfo.phone),
      location: asString(personalInfo.location),
      github: asString(personalInfo.github),
      linkedin: asString(personalInfo.linkedin),
      website: asString(personalInfo.website),
      photo: asString(personalInfo.photo) || undefined,
      customFields: asRecordArray(personalInfo.customFields).map((field, index) => ({
        id: withId(field.id, `custom-${index + 1}`),
        label: asString(field.label),
        value: asString(field.value),
      })),
      hiddenFields: asStringArray(personalInfo.hiddenFields),
    },
    summary: asString(value.summary),
    experience: asRecordArray(value.experience).map((item, index) => ({
      id: withId(item.id, `experience-${index + 1}`),
      company: asString(item.company),
      role: asString(item.role),
      startDate: asString(item.startDate),
      endDate: asString(item.endDate),
      description: asString(item.description),
    })),
    education: asRecordArray(value.education).map((item, index) => ({
      id: withId(item.id, `education-${index + 1}`),
      school: asString(item.school),
      degree: asString(item.degree),
      startDate: asString(item.startDate),
      endDate: asString(item.endDate),
      description: asString(item.description),
    })),
    projects: asRecordArray(value.projects).map((item, index) => ({
      id: withId(item.id, `project-${index + 1}`),
      name: asString(item.name),
      description: asString(item.description),
      link: asString(item.link),
    })),
    skills: asString(value.skills),
  };
}

export function parseResumeDataFromAiText(text: string): ResumeData {
  const parsed = JSON.parse(extractJsonObject(text));
  const data = normalizeResumeData(parsed);

  if (!data) {
    throw new Error('AI response did not match the resume data shape');
  }

  return data;
}

export function summarizeResumeImport(data: ResumeData): ResumeImportSummary {
  return {
    name: data.personalInfo.name || 'Untitled candidate',
    title: data.personalInfo.title || 'No title detected',
    experienceCount: data.experience.length,
    educationCount: data.education.length,
    projectCount: data.projects.length,
    skillsPreview: data.skills
      .split(',')
      .map(skill => skill.trim())
      .filter(Boolean)
      .slice(0, 6),
  };
}
