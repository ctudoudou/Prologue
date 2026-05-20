import type { ResumeConfig } from '@/types/resume';
import { ArrowRight, Languages, PenLine, Sparkles } from 'lucide-react';

type LandingLanguage = ResumeConfig['language'];

interface LandingPageProps {
  language: LandingLanguage;
  onLanguageChange: (language: LandingLanguage) => void;
  onStart: () => void;
}

const copy = {
  en: {
    languageLabel: 'Language',
    kicker: 'Editorial resume builder',
    title: 'Prologue',
    headline: 'Turn a career record into a first chapter worth reading.',
    body: 'Shape rough notes, shipped work, and project milestones into a composed resume with live print preview and AI-assisted prose.',
    primaryCta: 'Start writing',
    secondaryCta: 'Live A4 preview',
    proof: ['AI refinement', 'Markdown editing', 'Print-ready templates'],
    supportTitle: 'From scattered notes to composed narrative.',
    supportBody: 'Write in focused sections, refine the language, then watch the resume settle into an editorial page.',
    detailTitle: 'Designed like a quiet studio.',
    detailBody: 'Compact controls, restrained typography, and printable layouts keep the work centered on your story.',
    finalCta: 'Open the editor',
    previewName: 'Jane Doe',
    previewRole: 'Senior Software Engineer',
    previewSummary: 'Architected resilient product systems, mentored teams, and translated complex engineering work into measurable outcomes.',
    previewSections: ['Profile', 'Experience', 'Projects'],
  },
  zh: {
    languageLabel: '语言',
    kicker: '编辑式简历构建器',
    title: 'Prologue',
    headline: '把职业记录写成值得阅读的第一章。',
    body: '将零散笔记、交付成果和项目里程碑整理成有叙事感的简历，并通过实时打印预览和 AI 润色完成表达。',
    primaryCta: '开始撰写',
    secondaryCta: '实时 A4 预览',
    proof: ['AI 润色', 'Markdown 编辑', '可打印模板'],
    supportTitle: '从零散素材，到完整叙事。',
    supportBody: '按模块填写内容，打磨语言，再让简历自然落入精致的编辑式版面。',
    detailTitle: '像一间安静的写作工作室。',
    detailBody: '紧凑控件、克制排版和可打印布局，让注意力始终落在你的故事上。',
    finalCta: '打开编辑器',
    previewName: 'Jane Doe',
    previewRole: 'Senior Software Engineer',
    previewSummary: 'Architected resilient product systems, mentored teams, and translated complex engineering work into measurable outcomes.',
    previewSections: ['职业摘要', '工作经历', '项目成果'],
  },
} satisfies Record<LandingLanguage, Record<string, string | string[]>>;

export function LandingPage({ language, onLanguageChange, onStart }: LandingPageProps) {
  const t = copy[language];

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans">
      <section className="min-h-[100svh] border-b border-[#D9D9D3] bg-[#F5F5F0]">
        <header className="flex h-16 items-center justify-between border-b border-[#D9D9D3] px-5 md:px-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8C8C85]">Prologue</p>
            <p className="font-serif text-sm italic text-[#333]">{t.kicker}</p>
          </div>
          <div className="flex items-center gap-2">
            <Languages size={14} className="text-[#8C8C85]" aria-hidden="true" />
            <span className="sr-only">{t.languageLabel}</span>
            {(['en', 'zh'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onLanguageChange(option)}
                className={`h-8 min-w-10 border px-3 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                  language === option
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                    : 'border-[#D9D9D3] bg-transparent text-[#8C8C85] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {option === 'en' ? 'EN' : '中文'}
              </button>
            ))}
          </div>
        </header>

        <div className="grid min-h-[calc(100svh-4rem)] grid-cols-1 overflow-hidden md:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
          <div className="flex flex-col justify-center px-5 py-14 md:px-12 xl:px-16">
            <div className="max-w-[680px] animate-in fade-in slide-in-from-bottom-4 duration-700">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#8C8C85]">
                {t.kicker}
              </p>
              <h1 className="mb-6 font-serif text-6xl leading-none tracking-normal text-[#1A1A1A] md:text-8xl xl:text-9xl">
                {t.title}
              </h1>
              <p className="max-w-xl text-2xl leading-tight text-[#333] md:text-4xl">
                {t.headline}
              </p>
              <p className="mt-6 max-w-lg text-sm leading-7 text-[#5E5E57] md:text-base">
                {t.body}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onStart}
                  className="group inline-flex h-12 items-center justify-center gap-3 bg-[#1A1A1A] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black"
                >
                  {t.primaryCta}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
                <div className="inline-flex h-12 items-center justify-center border border-[#D9D9D3] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#4A4A45]">
                  {t.secondaryCta}
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[520px] overflow-hidden border-t border-[#D9D9D3] bg-[#E6E6E1] md:border-l md:border-t-0">
            <div className="absolute inset-x-0 top-0 flex justify-between border-b border-[#D9D9D3] bg-[#F9F9F7]/70 px-5 py-4 backdrop-blur-sm">
              {(t.proof as string[]).map((item) => (
                <span key={item} className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C8C85]">
                  {item}
                </span>
              ))}
            </div>
            <div className="absolute left-1/2 top-[55%] w-[420px] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] bg-white p-10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.24)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] md:w-[500px]">
              <div className="mb-10 border-b border-[#E5E5E0] pb-7">
                <h2 className="font-serif text-5xl leading-none">{t.previewName}</h2>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8C85]">
                  {t.previewRole}
                </p>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-8">
                <div className="space-y-3">
                  {(t.previewSections as string[]).map((section) => (
                    <div key={section} className="border-b border-[#F0F0EB] pb-2 text-[10px] font-black uppercase tracking-[0.16em]">
                      {section}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="border-l-2 border-[#1A1A1A] pl-4 font-serif text-[15px] leading-7 text-[#4A4A45]">
                    {t.previewSummary}
                  </p>
                  <div className="mt-8 space-y-4">
                    {[0, 1, 2].map((line) => (
                      <div key={line} className="space-y-2">
                        <div className="h-2 w-full bg-[#E6E6E1]" />
                        <div className="h-2 w-[82%] bg-[#F0F0EB]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid border-b border-[#D9D9D3] bg-white md:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-[#D9D9D3] p-8 md:border-b-0 md:border-r md:p-12">
          <PenLine size={22} className="mb-8 text-[#8C8C85]" />
          <h2 className="max-w-lg font-serif text-4xl leading-tight md:text-5xl">{t.supportTitle}</h2>
        </div>
        <div className="flex items-center p-8 md:p-12">
          <p className="max-w-2xl text-lg leading-8 text-[#4A4A45]">{t.supportBody}</p>
        </div>
      </section>

      <section className="grid bg-[#F9F9F7] md:grid-cols-[1.15fr_0.85fr]">
        <div className="flex items-center p-8 md:p-12">
          <p className="max-w-2xl text-lg leading-8 text-[#4A4A45]">{t.detailBody}</p>
        </div>
        <div className="border-t border-[#D9D9D3] p-8 md:border-l md:border-t-0 md:p-12">
          <Sparkles size={22} className="mb-8 text-[#8C8C85]" />
          <h2 className="max-w-lg font-serif text-4xl leading-tight md:text-5xl">{t.detailTitle}</h2>
          <button
            type="button"
            onClick={onStart}
            className="group mt-10 inline-flex h-12 items-center gap-3 border border-[#1A1A1A] px-6 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-[#1A1A1A] hover:text-white"
          >
            {t.finalCta}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </main>
  );
}
