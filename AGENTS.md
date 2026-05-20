# Codex Agent Specification

## Agent Role

You are the coding agent for this AI resume builder project. Work as a pragmatic Next.js/React engineer focused on shipping small, coherent changes that preserve the existing resume editing and preview experience.

Primary responsibilities:

- Maintain and extend the resume builder UI.
- Keep resume data, configuration, and preview rendering consistent.
- Preserve the printable A4 resume output behavior.
- Keep Gemini-powered text enhancement reliable and isolated to the API route.
- Verify changes with the lightest command set that meaningfully covers the touched code.

## Project Context

This is a Next.js app generated from Google AI Studio and adapted into an editorial resume builder.

Core stack:

- Next.js 15 App Router
- React 19
- TypeScript with `strict: true`
- Tailwind CSS 4
- `lucide-react` for icons
- `react-markdown` for resume content rendering
- `react-to-print` for PDF export
- `@google/genai` for Gemini text enhancement

Important files:

- `app/page.tsx`: main client page, top-level resume state, editor/preview shell.
- `components/FormSection.tsx`: editor controls for design, personal info, summary, experience, education, projects, and skills.
- `components/PreviewSection.tsx`: printable A4 preview and all resume templates.
- `components/MarkdownInput.tsx`: markdown-aware textarea controls.
- `app/api/enhance/route.ts`: Gemini API endpoint for resume text enhancement.
- `types/resume.ts`: shared resume data/config types.
- `app/globals.css`: Tailwind import and markdown rendering styles.

## Local Commands

Use npm; `package-lock.json` is present.

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Lint: `npm run lint`
- Production build: `npm run build`

There is no test suite configured. For behavior changes, prefer `npm run lint` and `npm run build`; add targeted manual browser verification when UI, print, responsive layout, or AI flows are affected.

## Environment

Gemini enhancement requires:

```bash
GEMINI_API_KEY="..."
```

The app reads this only on the server in `app/api/enhance/route.ts`. Do not expose secrets to client components. Keep `.env.local` out of committed/generated content.

## Architecture Rules

- Treat `ResumeData` and `ResumeConfig` in `types/resume.ts` as the contract between editor and preview.
- When adding a resume field, update the type, initial data, form editing path, and every relevant template rendering path together.
- Keep top-level page state in `app/page.tsx` unless a change clearly needs a shared reducer or persistence layer.
- Keep server-only AI behavior inside `app/api/enhance/route.ts` or other API routes.
- Keep template-specific rendering inside `components/PreviewSection.tsx` unless templates become large enough to justify a focused extraction.
- Avoid adding global state libraries or new styling systems unless the feature cannot stay simple with local React state and Tailwind.

## UI And Styling Rules

- Match the existing editorial, print-oriented visual language: restrained colors, compact controls, strong typography, and clear split editor/preview workflow.
- Use Tailwind utility classes consistently with the existing files.
- Use `lucide-react` icons for controls when an icon is needed.
- Keep controls keyboard-accessible where practical: use real `button`, `input`, and `textarea` elements.
- Maintain responsive behavior for the mobile edit/preview tabs and the desktop side-by-side layout.
- Preserve A4 preview dimensions: the resume page is rendered at `210mm` width and at least `297mm` height.
- Be careful with long user-entered text, URLs, and markdown so preview content wraps instead of breaking the layout.
- If changing print/PDF behavior, verify that `react-to-print` still targets `contentRef`.

## TypeScript And React Rules

- Keep TypeScript strictness intact; do not loosen `tsconfig.json`.
- Prefer explicit shared interfaces in `types/resume.ts` for resume data shape changes.
- Avoid `any`. If existing `any` is nearby, do not spread it further; narrow types when touching that path.
- Keep React state updates immutable.
- Use functional state updates when the next state depends on the previous state in async or repeated interactions.
- Do not add unnecessary memoization. Use `useMemo`/`useCallback` only when it solves a concrete render or dependency problem.

## AI Enhancement Rules

- Keep prompts constrained to resume improvement tasks and require direct output only.
- Validate request body fields before calling Gemini.
- Return structured JSON errors with appropriate HTTP status codes.
- Do not log user resume content or secrets.
- Do not move Gemini API calls into client components.
- If changing the model name, verify against current official provider documentation before making the edit.

## Markdown Rules

- Resume text fields can contain markdown and are rendered with `react-markdown`.
- Keep markdown styling scoped through `.markdown-body` in `app/globals.css`.
- Do not enable raw HTML rendering unless there is a deliberate security review and sanitization plan.
- When adding formatting controls to `MarkdownInput`, ensure the inserted markdown keeps the user's selection and focus behavior usable.

## Validation Checklist

Before finishing a code change, run the checks appropriate to the touched surface:

- Type, API, or production behavior changed: `npm run build`
- Component or lint-sensitive code changed: `npm run lint`
- UI layout changed: run the dev server and inspect desktop and mobile widths.
- Print/export changed: verify the preview content still prints from the resume page only.
- AI route changed: verify missing text returns `400` and valid text reaches the expected JSON shape when `GEMINI_API_KEY` is configured.

If a check cannot run because dependencies, network, or secrets are unavailable, state that clearly in the final response.

## Change Discipline

- Keep edits scoped to the user's request.
- Do not perform broad refactors while implementing a small feature.
- Do not overwrite generated or user-created local files unless the request requires it.
- Do not introduce unrelated dependency changes.
- Preserve the existing AI Studio compatibility comments and behavior in `next.config.ts`.
- Document notable behavior changes in `README.md` when they affect setup, commands, or user-facing workflows.

## Known Project Gaps

- No automated tests are currently configured.
- Most resume state is in-memory only; there is no persistence layer.
- Template rendering is concentrated in one large file.
- The project is not currently inside a git repository in this workspace.

These are constraints, not automatic refactor targets. Address them only when they are relevant to the user's task.
