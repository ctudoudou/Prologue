import { PDFParse } from 'pdf-parse';
import { validateAiConfig, generateAiText } from '@/lib/ai-provider';
import {
  buildResumeImportPrompt,
  parseResumeDataFromAiText,
  summarizeResumeImport,
} from '@/lib/resume-import';

export const runtime = 'nodejs';

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
const SUPPORTED_MARKDOWN_EXTENSIONS = ['.md', '.markdown'];

function jsonResponse(payload: unknown, status = 200) {
  return Response.json(payload, { status });
}

function extensionForFile(file: File) {
  const lowerName = file.name.toLowerCase();
  if (lowerName.endsWith('.pdf')) return '.pdf';
  return SUPPORTED_MARKDOWN_EXTENSIONS.find(extension => lowerName.endsWith(extension)) ?? '';
}

async function extractTextFromFile(file: File) {
  const extension = extensionForFile(file);

  if (!extension) {
    return {
      ok: false as const,
      error: 'Only Markdown and PDF resumes are supported',
      status: 400,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      ok: false as const,
      error: 'Resume file must be 8MB or smaller',
      status: 400,
    };
  }

  if (extension === '.pdf') {
    const parser = new PDFParse({ data: Buffer.from(await file.arrayBuffer()) });
    const result = await parser.getText();

    return { ok: true as const, text: result.text };
  }

  return { ok: true as const, text: await file.text() };
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const rawAiConfig = formData.get('aiConfig');

  if (!(file instanceof File)) {
    return jsonResponse({ error: 'Resume file is required' }, 400);
  }

  if (typeof rawAiConfig !== 'string') {
    return jsonResponse({ error: 'AI service configuration is required' }, 400);
  }

  let aiConfigPayload: unknown;
  try {
    aiConfigPayload = JSON.parse(rawAiConfig);
  } catch {
    return jsonResponse({ error: 'AI service configuration is invalid' }, 400);
  }

  const aiConfig = validateAiConfig(aiConfigPayload);
  if (!aiConfig.ok) {
    return jsonResponse({ error: aiConfig.error }, aiConfig.status);
  }

  const extracted = await extractTextFromFile(file);
  if (!extracted.ok) {
    return jsonResponse({ error: extracted.error }, extracted.status);
  }

  const resumeText = extracted.text.trim();
  if (!resumeText) {
    return jsonResponse({ error: 'No readable resume text was found' }, 400);
  }

  const generated = await generateAiText(aiConfig.config, [
    {
      role: 'system',
      content:
        'You are a careful resume parser. Return strict JSON only and never include commentary.',
    },
    {
      role: 'user',
      content: buildResumeImportPrompt(resumeText),
    },
  ]);

  if (!generated.ok) {
    return jsonResponse({ error: generated.error }, 502);
  }

  try {
    const data = parseResumeDataFromAiText(generated.text);
    return jsonResponse({
      data,
      summary: summarizeResumeImport(data),
    });
  } catch {
    return jsonResponse({ error: 'AI response could not be parsed as resume data' }, 502);
  }
}
