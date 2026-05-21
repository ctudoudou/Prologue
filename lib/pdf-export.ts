import type { ResumeConfig, ResumeData } from '@/types/resume';
import { normalizeResumeConfig } from './resume-backup';
import { normalizeResumeData } from './resume-import';

export interface PdfExportPayload {
  data: ResumeData;
  config: ResumeConfig;
}

type PdfExportValidation =
  | {
      ok: true;
      payload: PdfExportPayload;
    }
  | {
      ok: false;
      error: string;
    };

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function markdownLinesToHtml(value: string) {
  const lines = value
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return '';

  const bulletLines = lines.map(line => line.replace(/^[-*]\s*/, ''));
  return `<ul>${bulletLines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul>`;
}

function renderSection(title: string, body: string) {
  if (!body.trim()) return '';

  return `
    <section>
      <h2>${escapeHtml(title)}</h2>
      ${body}
    </section>
  `;
}

function renderDatedBlock(title: string, subtitle: string, dates: string, description: string) {
  return `
    <article class="item">
      <div class="item-head">
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(subtitle)}</p>
        </div>
        <span>${escapeHtml(dates)}</span>
      </div>
      ${markdownLinesToHtml(description)}
    </article>
  `;
}

export function validatePdfExportPayload(value: unknown): PdfExportValidation {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return { ok: false, error: 'PDF export payload must be an object' };
  }

  const record = value as Record<string, unknown>;
  const data = normalizeResumeData(record.data);
  const config = normalizeResumeConfig(record.config);

  if (!data) {
    return { ok: false, error: 'PDF export resume data is invalid' };
  }

  if (!config) {
    return { ok: false, error: 'PDF export resume config is invalid' };
  }

  return { ok: true, payload: { data, config } };
}

export function renderResumePdfHtml(data: ResumeData, config: ResumeConfig) {
  const titles = config.sectionTitles;
  const visible = config.visibleSections;
  const contact = [
    data.personalInfo.email,
    data.personalInfo.phone,
    data.personalInfo.location,
    data.personalInfo.github,
    data.personalInfo.linkedin,
    data.personalInfo.website,
    ...(data.personalInfo.customFields ?? []).map(field => `${field.label}: ${field.value}`),
  ].filter(Boolean);

  const experience = data.experience
    .map(item =>
      renderDatedBlock(
        item.role || item.company,
        item.company,
        [item.startDate, item.endDate].filter(Boolean).join(' - '),
        item.description
      )
    )
    .join('');

  const education = data.education
    .map(item =>
      renderDatedBlock(
        item.degree || item.school,
        item.school,
        [item.startDate, item.endDate].filter(Boolean).join(' - '),
        item.description
      )
    )
    .join('');

  const projects = data.projects
    .map(item => `
      <article class="item">
        <div class="item-head">
          <div>
            <h3>${escapeHtml(item.name)}</h3>
            ${item.link ? `<p>${escapeHtml(item.link)}</p>` : ''}
          </div>
        </div>
        ${markdownLinesToHtml(item.description)}
      </article>
    `)
    .join('');

  const skills = data.skills
    .split(',')
    .map(skill => skill.trim())
    .filter(Boolean)
    .map(skill => `<span>${escapeHtml(skill)}</span>`)
    .join('');

  return `<!doctype html>
<html lang="${config.language}">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(data.personalInfo.name || 'Resume')}</title>
    <style>
      @page { size: A4; margin: 0; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        color: #1A1A1A;
        background: #F5F5F0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        line-height: 1.45;
      }
      main {
        width: 210mm;
        min-height: 297mm;
        margin: 0 auto;
        background: white;
        padding: 20mm 18mm;
      }
      header {
        border-bottom: 3px solid ${escapeHtml(config.themeColor)};
        padding-bottom: 18px;
        margin-bottom: 22px;
      }
      h1 {
        margin: 0;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 34px;
        font-weight: 500;
        letter-spacing: 0;
      }
      .title {
        margin: 6px 0 0;
        color: ${escapeHtml(config.themeColor)};
        font-size: 14px;
        font-weight: 700;
      }
      .contact {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        margin-top: 14px;
        color: #555;
      }
      section { margin-top: 20px; break-inside: avoid; }
      h2 {
        margin: 0 0 10px;
        color: ${escapeHtml(config.themeColor)};
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      h3 {
        margin: 0;
        font-size: 14px;
      }
      p { margin: 0; color: #555; }
      .item { margin-top: 12px; break-inside: avoid; }
      .item-head {
        display: flex;
        justify-content: space-between;
        gap: 16px;
      }
      .item-head span {
        color: #777;
        white-space: nowrap;
      }
      ul {
        margin: 8px 0 0;
        padding-left: 16px;
      }
      li { margin: 3px 0; }
      .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .skills span {
        border: 1px solid #D9D9D3;
        padding: 5px 8px;
        color: #333;
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>${escapeHtml(data.personalInfo.name)}</h1>
        <p class="title">${escapeHtml(data.personalInfo.title)}</p>
        <div class="contact">${contact.map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div>
      </header>
      ${visible.summary ? renderSection(titles.summary, `<p>${escapeHtml(data.summary)}</p>`) : ''}
      ${visible.experience ? renderSection(titles.experience, experience) : ''}
      ${visible.education ? renderSection(titles.education, education) : ''}
      ${visible.projects ? renderSection(titles.projects, projects) : ''}
      ${visible.skills ? renderSection(titles.skills, `<div class="skills">${skills}</div>`) : ''}
    </main>
  </body>
</html>`;
}
