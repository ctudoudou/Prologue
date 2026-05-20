# Prologue

[中文版本](README.zh-CN.md)

Every great journey deserves a beautiful prologue.

Amidst a sea of dry, mechanical bullet points, your professional footprint deserves to be read like an epic. Prologue breaks the cold conventions of traditional resumes. I believe that a great job application isn't just a rigid list of skills—it is the art of storytelling.

Powered by the deep comprehension of advanced language models like Claude or Qwen, Prologue acts as your patient wordsmith and dedicated editor. It gently brushes the dust off your rough drafts, weaving your scattered commits, late-night debugging sessions, and project milestones into a compelling, coherent prose. It doesn't just format your past; it illuminates your potential, ensuring the first chapter of your next adventure opens with undeniable brilliance.

## Overview

Prologue is an AI-assisted resume builder focused on editorial presentation, structured resume editing, and polished printable output. It combines a form-based resume editor with a live A4 preview, multiple visual templates, markdown-friendly content fields, and server-side AI enhancement for professional summaries and experience descriptions.

The project is built as a Next.js application and is designed to run locally or be deployed as a standalone web app.

## Features

- Live resume editor with sections for personal details, summary, experience, education, projects, and skills.
- Real-time A4 resume preview with print/PDF export support.
- Multiple resume templates: modern, minimal, classic, creative, and professional.
- Theme color, typography, language, icon visibility, section title, and section visibility controls.
- Markdown editing for long-form resume content.
- Custom personal information fields and optional hidden contact fields.
- AI-powered resume text enhancement through a server-side Gemini API route.
- Responsive layout with mobile edit/preview switching and desktop side-by-side workflow.

## Tech Stack

- **Framework:** Next.js 15 App Router
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript
- **Icons:** lucide-react
- **Markdown Rendering:** react-markdown
- **Print Export:** react-to-print
- **AI Integration:** @google/genai through a Next.js API route
- **Tooling:** ESLint 9, PostCSS, npm

## Getting Started

### Prerequisites

- Node.js
- npm
- A Gemini API key for AI enhancement features

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file and configure:

```bash
GEMINI_API_KEY="your-gemini-api-key"
APP_URL="http://localhost:3000"
```

`GEMINI_API_KEY` is required for the `/api/enhance` endpoint. The application keeps this key on the server side and does not expose it to client components.

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
- `npm run clean`: run the configured Next.js clean command.

## AI Enhancement

Prologue uses a server-side API route at `app/api/enhance/route.ts` to enhance resume text. The endpoint accepts resume content and a field type, builds a focused prompt, and returns improved copy as JSON.

Current enhancement targets include:

- Professional summaries
- Experience descriptions
- General resume text

The AI layer is intentionally isolated from the client so secrets remain server-side.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
