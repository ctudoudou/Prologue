export const ENHANCE_FIELD_TYPES = ['summary', 'experience', 'general'] as const;

export type EnhanceFieldType = (typeof ENHANCE_FIELD_TYPES)[number];

export const MAX_ENHANCE_TEXT_LENGTH = 8000;

type ValidationResult =
  | {
      ok: true;
      text: string;
      fieldType: EnhanceFieldType;
    }
  | {
      ok: false;
      error: string;
      status: 400;
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isEnhanceFieldType(value: unknown): value is EnhanceFieldType {
  return (
    typeof value === 'string' &&
    (ENHANCE_FIELD_TYPES as readonly string[]).includes(value)
  );
}

export function validateEnhanceRequest(body: unknown): ValidationResult {
  if (!isRecord(body)) {
    return { ok: false, error: 'Request body must be a JSON object', status: 400 };
  }

  if (typeof body.text !== 'string') {
    return { ok: false, error: 'Text is required', status: 400 };
  }

  const text = body.text.trim();
  if (!text) {
    return { ok: false, error: 'Text is required', status: 400 };
  }

  if (text.length > MAX_ENHANCE_TEXT_LENGTH) {
    return {
      ok: false,
      error: `Text must be ${MAX_ENHANCE_TEXT_LENGTH} characters or fewer`,
      status: 400,
    };
  }

  const fieldType =
    body.fieldType === undefined || body.fieldType === null
      ? 'general'
      : body.fieldType;

  if (!isEnhanceFieldType(fieldType)) {
    return { ok: false, error: 'Unsupported field type', status: 400 };
  }

  return { ok: true, text, fieldType };
}

export function buildEnhancePrompt(text: string, fieldType: EnhanceFieldType) {
  if (fieldType === 'summary') {
    return `Rewrite and enhance the following professional summary for a resume. Make it impactful, concise, and professional.
Do not add any preamble or conversational text. Output ONLY the improved summary:

${text}`;
  }

  if (fieldType === 'experience') {
    return `Rewrite and enhance the following job experience description for a resume. Use strong action verbs and make it result-oriented (e.g., using XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]"). Keep it concise and professional. Use bullet points if appropriate (dash -).
Do not add any preamble or conversational text. Output ONLY the improved description:

${text}`;
  }

  return `Enhance the following text for a professional resume. Make it impactful and concise.
Do not add any preamble or conversational text. Output ONLY the improved text:

${text}`;
}
