import { chromium } from 'playwright';
import { renderResumePdfHtml, validatePdfExportPayload } from '@/lib/pdf-export';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: 'PDF export payload is malformed' }, { status: 400 });
  }

  const validation = validatePdfExportPayload(payload);
  if (!validation.ok) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
    await page.setContent(
      renderResumePdfHtml(validation.payload.data, validation.payload.config),
      { waitUntil: 'networkidle' }
    );
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });
    const pdfBytes = Uint8Array.from(pdf);

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
        'Cache-Control': 'no-store',
      },
    });
  } finally {
    await browser.close();
  }
}
