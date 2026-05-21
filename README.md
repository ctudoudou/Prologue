# Prologue

[中文版本](README.zh-CN.md)

Every great journey deserves a beautiful prologue.

Amidst a sea of dry, mechanical bullet points, your professional footprint deserves to be read like an epic. Prologue breaks the cold conventions of traditional resumes. I believe that a great job application isn't just a rigid list of skills—it is the art of storytelling.

Powered by the deep comprehension of advanced language models like Claude or Qwen, Prologue acts as your patient wordsmith and dedicated editor. It gently brushes the dust off your rough drafts, weaving your scattered commits, late-night debugging sessions, and project milestones into a compelling, coherent prose. It doesn't just format your past; it illuminates your potential, ensuring the first chapter of your next adventure opens with undeniable brilliance.

## Overview

Prologue is an AI-assisted resume builder focused on editorial presentation, structured resume editing, and polished PDF output. It combines a form-based resume editor with a live A4 preview, multiple visual templates, markdown-friendly content fields, and server-side AI enhancement for professional summaries and experience descriptions.

The project is built as a Next.js application and is designed to run locally or be deployed as a standalone web app.

## Features

- Live resume editor with sections for personal details, summary, experience, education, projects, and skills.
- Real-time A4 resume preview with server-rendered PDF export support.
- Multiple resume templates: modern, minimal, classic, creative, and professional.
- Theme color, typography, language, icon visibility, section title, and section visibility controls.
- Full-page language support for English, Chinese, Japanese, and Korean, with the default selected from the browser locale.
- Markdown editing for long-form resume content.
- Custom personal information fields and optional hidden contact fields.
- OpenAI-compatible AI text enhancement through OpenAI, OpenRouter, or Volcengine Ark.
- AI-assisted Markdown and PDF resume import with preview before replacing the current resume.
- Versioned JSON backup and restore that works locally without an AI key.
- Responsive layout with mobile edit/preview switching and desktop side-by-side workflow.

## Tech Stack

- **Framework:** Next.js 16 App Router
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript
- **Icons:** lucide-react
- **Markdown Rendering:** react-markdown
- **PDF Export:** Playwright for Node PDF streaming
- **AI Integration:** OpenAI-compatible chat completions through Next.js API routes
- **Resume Import:** pdf-parse for PDF text extraction
- **Testing:** Vitest, Testing Library, jsdom
- **Tooling:** ESLint 9, PostCSS, npm

## Getting Started

### Prerequisites

- Node.js
- npm
- Optional OpenAI, OpenRouter, or Volcengine Ark API key for AI enhancement and AI import features

### Installation

```bash
npm install
```

### AI Provider Setup

Open the editor and choose **Config** to change the page language or AI provider. Select OpenAI, OpenRouter, or Volcengine, then enter an API key, model name, and compatible chat completions base URL. The key is stored only in browser `sessionStorage` under `prologue.aiConfig.v1`; it is sent to the server only for the current request and is never stored by the app.

Default model values:

- OpenAI: `gpt-4.1-mini`
- OpenRouter: `openai/gpt-4.1-mini`
- Volcengine: `doubao-seed-1-6-250615`

### Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Available Scripts

- `npm run dev`: start the local Next.js development server.
- `npm run build`: create a production build.
- `npm run start`: start the production server.
- `npm run lint`: run ESLint.
- `npm run test`: run Vitest.
- `npm run clean`: run the configured Next.js clean command.

## AI Workflows

Prologue uses server-side API routes for AI work while keeping provider credentials session-only in the browser:

- `app/api/enhance/route.ts`: enhances summaries and experience descriptions.
- `app/api/import/resume/route.ts`: extracts Markdown/PDF resume text and asks the configured AI provider to return strict `ResumeData` JSON.

Current enhancement targets include:

- Professional summaries
- Experience descriptions
- General resume text

AI import always shows a summary preview before replacing the current resume. API keys and resume file contents are treated as transient request data; the app does not log or persist them.

## Import And Backup

- Markdown import supports `.md` and `.markdown` files.
- PDF import supports `.pdf` files and extracts text server-side before AI parsing.
- JSON export downloads `{ version: 1, exportedAt, data, config }`.
- JSON import validates the backup version, resume data, and resume config, then previews before restore.

## PDF Export

The **PDF** button calls `app/api/export/pdf/route.ts`, which uses a Node runtime and Playwright to stream `application/pdf` bytes with a download filename.

This route requires a Node/Chromium-capable deployment. Cloudflare Worker deployments need a separate Node PDF service for this export path.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
