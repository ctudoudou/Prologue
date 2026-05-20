import type { ResumeConfig } from '@/types/resume';
import {
  ArrowRight,
  Code2,
  ExternalLink,
  FileText,
  Languages,
  LockKeyhole,
  PenLine,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from 'lucide-react';

type LandingLanguage = ResumeConfig['language'];

interface LandingPageProps {
  language: LandingLanguage;
  onLanguageChange: (language: LandingLanguage) => void;
  onStart: () => void;
}

const githubUrl = 'https://github.com/ctudoudou/Prologue';
const trustIcons = [Sparkles, LockKeyhole, Code2] as const;

interface LandingCopy {
  languageLabel: string;
  nav: string[];
  githubLabel: string;
  kicker: string;
  title: string;
  headline: string;
  body: string;
  primaryCta: string;
  secondaryCta: string;
  proof: string[];
  marginNotes: string[];
  previewName: string;
  previewRole: string;
  previewSummary: string;
  previewSections: string[];
  workflowEyebrow: string;
  workflowTitle: string;
  workflowBody: string;
  workflow: Array<{
    title: string;
    body: string;
  }>;
  rewriteEyebrow: string;
  rewriteTitle: string;
  beforeLabel: string;
  afterLabel: string;
  beforeText: string;
  afterText: string;
  trustEyebrow: string;
  trustTitle: string;
  trustBody: string;
  trust: Array<{
    title: string;
    body: string;
  }>;
  templatesEyebrow: string;
  templatesTitle: string;
  templatesBody: string;
  templates: Array<{
    name: string;
    tone: string;
  }>;
  finalTitle: string;
  finalBody: string;
  finalCta: string;
}

const copy: Record<LandingLanguage, LandingCopy> = {
  en: {
    languageLabel: 'Language',
    nav: ['Method', 'Trust', 'Templates'],
    githubLabel: 'GitHub',
    kicker: 'Editorial resume builder',
    title: 'Prologue',
    headline: 'Turn a career record into a first chapter worth reading.',
    body: 'Shape rough notes, shipped work, and project milestones into a composed resume with live print preview and AI-assisted prose. Free to use, open source, and designed to keep private resume data out of storage.',
    primaryCta: 'Start writing',
    secondaryCta: 'View source',
    proof: ['Free to use', 'No stored resume data', 'Open source audit'],
    marginNotes: ['Draft', 'Refine', 'Compose'],
    previewName: 'Jane Doe',
    previewRole: 'Senior Software Engineer',
    previewSummary: 'Architected resilient product systems, mentored teams, and translated complex engineering work into measurable outcomes.',
    previewSections: ['Profile', 'Experience', 'Projects'],
    workflowEyebrow: 'The editorial method',
    workflowTitle: 'A focused studio for turning work into narrative.',
    workflowBody: 'Prologue keeps the workflow narrow and deliberate: collect facts, refine language, and judge the result on the page.',
    workflow: [
      {
        title: 'Collect',
        body: 'Enter the raw material: roles, shipped systems, outcomes, links, and the moments that prove momentum.',
      },
      {
        title: 'Refine',
        body: 'Ask the writing assistant to compress rough notes into clear, result-oriented resume language.',
      },
      {
        title: 'Compose',
        body: 'Move through restrained templates while the A4 preview keeps spacing, hierarchy, and print output honest.',
      },
    ],
    rewriteEyebrow: 'Before and after',
    rewriteTitle: 'Less noise. More signal.',
    beforeLabel: 'Rough note',
    afterLabel: 'Prologue pass',
    beforeText: 'Worked on backend and made API faster. Helped teammates and fixed production issues.',
    afterText: 'Improved API response times by redesigning backend data flows, while mentoring teammates through production incident response.',
    trustEyebrow: 'Trust by design',
    trustTitle: 'Free, private, and open to inspection.',
    trustBody: 'Your resume is edited in the browser session. Prologue does not add accounts, databases, tracking profiles, or hidden storage for personal resume content.',
    trust: [
      {
        title: 'Free to use',
        body: 'The core resume builder is free. No paywall sits between you and the editor.',
      },
      {
        title: 'No private resume storage',
        body: 'Resume content stays in local app state during the session. The project does not persist user privacy data to a database.',
      },
      {
        title: 'Fully open source',
        body: 'The code is public on GitHub, so data handling, AI calls, and build configuration can be reviewed by anyone.',
      },
    ],
    templatesEyebrow: 'Template language',
    templatesTitle: 'Five ways to set the tone without changing the story.',
    templatesBody: 'Each layout shares the same data model, so structure stays stable while the visual voice adapts to the role.',
    templates: [
      { name: 'Modern', tone: 'Editorial and balanced' },
      { name: 'Minimal', tone: 'Quiet and precise' },
      { name: 'Classic', tone: 'Formal and familiar' },
      { name: 'Creative', tone: 'Expressive with restraint' },
      { name: 'Professional', tone: 'Dense and executive' },
    ],
    finalTitle: 'Open with a stronger first page.',
    finalBody: 'Start with the sample resume, replace it with your own work, and let the page show you what still needs editing.',
    finalCta: 'Open the editor',
  },
  zh: {
    languageLabel: '语言',
    nav: ['方法', '安全', '模板'],
    githubLabel: 'GitHub',
    kicker: '编辑式简历构建器',
    title: 'Prologue',
    headline: '把职业记录写成值得阅读的第一章。',
    body: '将零散笔记、交付成果和项目里程碑整理成有叙事感的简历，并通过实时打印预览和 AI 润色完成表达。免费使用、完全开源，并且不会存储你的隐私简历数据。',
    primaryCta: '开始撰写',
    secondaryCta: '查看源码',
    proof: ['免费使用', '不存储简历隐私', '开源可审计'],
    marginNotes: ['草稿', '润色', '成稿'],
    previewName: 'Jane Doe',
    previewRole: 'Senior Software Engineer',
    previewSummary: 'Architected resilient product systems, mentored teams, and translated complex engineering work into measurable outcomes.',
    previewSections: ['职业摘要', '工作经历', '项目成果'],
    workflowEyebrow: '编辑方法',
    workflowTitle: '把工作经历整理成清晰叙事的写作空间。',
    workflowBody: 'Prologue 让流程保持克制：收集事实，打磨语言，再回到页面上判断结构、层次和打印效果。',
    workflow: [
      {
        title: '收集',
        body: '填入角色、系统、成果、链接和能证明成长轨迹的具体时刻。',
      },
      {
        title: '润色',
        body: '让写作助手把粗糙笔记压缩成清晰、有结果导向的简历语言。',
      },
      {
        title: '成稿',
        body: '在克制的模板中切换，并通过 A4 预览校准间距、层级和打印输出。',
      },
    ],
    rewriteEyebrow: '润色前后',
    rewriteTitle: '减少噪音，放大信号。',
    beforeLabel: '原始笔记',
    afterLabel: 'Prologue 润色',
    beforeText: '做了后端，让 API 快了一些。帮助同事，也修过线上问题。',
    afterText: '通过重构后端数据流提升 API 响应速度，并在生产事故处理中辅导团队成员完成排查与恢复。',
    trustEyebrow: '信任设计',
    trustTitle: '免费、私密、代码可检查。',
    trustBody: '你的简历只在当前浏览器会话中编辑。Prologue 不设置账号系统，不建立数据库，也不为个人简历内容加入隐藏存储。',
    trust: [
      {
        title: '免费使用',
        body: '核心简历构建功能免费开放，不把编辑器放在付费墙后面。',
      },
      {
        title: '不存储隐私简历',
        body: '简历内容保留在当前会话的本地状态中，项目不会把用户隐私数据持久化到数据库。',
      },
      {
        title: '完全开源',
        body: '代码公开在 GitHub 上，数据处理、AI 调用和构建配置都可以被任何人审计。',
      },
    ],
    templatesEyebrow: '模板语气',
    templatesTitle: '同一份经历，五种不同的表达姿态。',
    templatesBody: '所有模板共用同一套数据结构，因此内容稳定，视觉语气可以根据岗位和场景调整。',
    templates: [
      { name: 'Modern', tone: '编辑感与平衡感' },
      { name: 'Minimal', tone: '安静、精确' },
      { name: 'Classic', tone: '正式、熟悉' },
      { name: 'Creative', tone: '有表达但克制' },
      { name: 'Professional', tone: '密集、职业' },
    ],
    finalTitle: '让第一页更有力量。',
    finalBody: '从示例简历开始，替换成你的真实经历，让页面告诉你哪些地方还需要继续编辑。',
    finalCta: '打开编辑器',
  },
};

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
          <div className="hidden items-center gap-7 md:flex">
            {t.nav.map((item) => (
              <span key={item} className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8C8C85]">
                {item}
              </span>
            ))}
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] transition-colors hover:text-[#8C8C85]"
            >
              {t.githubLabel}
              <ExternalLink size={12} />
            </a>
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
            <div className="max-w-[720px] animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-3 border border-[#D9D9D3] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#4A4A45] transition-colors hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                >
                  {t.secondaryCta}
                  <ExternalLink size={13} />
                </a>
              </div>

              <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-[#D9D9D3]">
                {t.marginNotes.map((note, index) => (
                  <div
                    key={note}
                    className="border-r border-[#D9D9D3] py-4 pr-4 last:border-r-0"
                  >
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A1A19A]">
                      0{index + 1}
                    </p>
                    <p className="font-serif text-xl italic text-[#333]">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[620px] overflow-hidden border-t border-[#D9D9D3] bg-[#E6E6E1] md:border-l md:border-t-0">
            <div className="absolute inset-x-0 top-0 flex justify-between border-b border-[#D9D9D3] bg-[#F9F9F7]/70 px-5 py-4 backdrop-blur-sm">
              {t.proof.map((item) => (
                <span key={item} className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C8C85]">
                  {item}
                </span>
              ))}
            </div>

            <div className="absolute left-[12%] top-[20%] hidden w-40 rotate-[-5deg] border border-[#D9D9D3] bg-[#F9F9F7] p-4 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)] md:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8C8C85]">{t.beforeLabel}</p>
              <p className="mt-3 text-xs leading-5 text-[#5E5E57]">{t.beforeText}</p>
            </div>

            <div className="absolute bottom-[12%] right-[8%] hidden w-48 rotate-[4deg] border border-[#1A1A1A] bg-white p-4 shadow-[0_20px_44px_-30px_rgba(0,0,0,0.45)] lg:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8C8C85]">{t.afterLabel}</p>
              <p className="mt-3 text-xs leading-5 text-[#4A4A45]">{t.afterText}</p>
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
                  {t.previewSections.map((section) => (
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

      <section className="grid border-b border-[#D9D9D3] bg-white md:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-[#D9D9D3] p-8 md:border-b-0 md:border-r md:p-12">
          <PenLine size={22} className="mb-8 text-[#8C8C85]" />
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8C8C85]">
            {t.workflowEyebrow}
          </p>
          <h2 className="max-w-lg font-serif text-4xl leading-tight md:text-5xl">{t.workflowTitle}</h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#5E5E57]">{t.workflowBody}</p>
        </div>
        <div className="divide-y divide-[#E5E5E0]">
          {t.workflow.map((step, index) => (
            <div key={step.title} className="grid gap-5 p-8 md:grid-cols-[96px_1fr] md:p-12">
              <div className="font-mono text-xs font-bold text-[#A1A19A]">0{index + 1}</div>
              <div>
                <h3 className="font-serif text-3xl leading-tight">{step.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5E5E57]">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid border-b border-[#D9D9D3] bg-[#F9F9F7] md:grid-cols-[1.1fr_0.9fr]">
        <div className="p-8 md:p-12">
          <WandSparkles size={22} className="mb-8 text-[#8C8C85]" />
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8C8C85]">
            {t.rewriteEyebrow}
          </p>
          <h2 className="max-w-lg font-serif text-4xl leading-tight md:text-5xl">{t.rewriteTitle}</h2>
        </div>
        <div className="border-t border-[#D9D9D3] md:border-l md:border-t-0">
          <div className="border-b border-[#D9D9D3] p-8 md:p-10">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A1A19A]">{t.beforeLabel}</p>
            <p className="font-serif text-2xl leading-9 text-[#4A4A45]">{t.beforeText}</p>
          </div>
          <div className="bg-white p-8 md:p-10">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A1A19A]">{t.afterLabel}</p>
            <p className="border-l-2 border-[#1A1A1A] pl-5 font-serif text-2xl leading-9 text-[#1A1A1A]">
              {t.afterText}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#D9D9D3] bg-[#1A1A1A] text-white">
        <div className="grid md:grid-cols-[0.82fr_1.18fr]">
          <div className="border-b border-white/15 p-8 md:border-b-0 md:border-r md:p-12">
            <ShieldCheck size={24} className="mb-8 text-[#D9D9D3]" />
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A1A19A]">
              {t.trustEyebrow}
            </p>
            <h2 className="max-w-lg font-serif text-4xl leading-tight md:text-5xl">{t.trustTitle}</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#D9D9D3]">{t.trustBody}</p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex h-11 items-center gap-3 border border-white/30 px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-[#1A1A1A]"
            >
              {t.githubLabel}
              <ExternalLink size={13} />
            </a>
          </div>
          <div className="divide-y divide-white/15">
            {t.trust.map((item, index) => {
              const Icon = trustIcons[index] ?? ShieldCheck;

              return (
                <div key={item.title} className="grid gap-5 p-8 md:grid-cols-[72px_1fr] md:p-10">
                  <div className="flex h-10 w-10 items-center justify-center border border-white/20 text-[#D9D9D3]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl leading-tight">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#D9D9D3]">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-[#D9D9D3] bg-white">
        <div className="grid md:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-[#D9D9D3] p-8 md:border-b-0 md:border-r md:p-12">
            <FileText size={22} className="mb-8 text-[#8C8C85]" />
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8C8C85]">
              {t.templatesEyebrow}
            </p>
            <h2 className="max-w-lg font-serif text-4xl leading-tight md:text-5xl">{t.templatesTitle}</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#5E5E57]">{t.templatesBody}</p>
          </div>
          <div className="divide-y divide-[#E5E5E0]">
            {t.templates.map((template, index) => (
              <div
                key={template.name}
                className="group grid items-baseline gap-4 p-6 transition-colors hover:bg-[#F9F9F7] md:grid-cols-[72px_1fr_1fr] md:p-8"
              >
                <span className="font-mono text-xs font-bold text-[#A1A19A]">0{index + 1}</span>
                <span className="font-serif text-3xl leading-none">{template.name}</span>
                <span className="text-sm leading-6 text-[#5E5E57] md:text-right">{template.tone}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-[#F5F5F0] md:grid-cols-[1fr_1fr]">
        <div className="border-b border-[#D9D9D3] p-8 md:border-b-0 md:border-r md:p-12">
          <Sparkles size={22} className="mb-8 text-[#8C8C85]" />
          <h2 className="max-w-lg font-serif text-5xl leading-tight md:text-6xl">{t.finalTitle}</h2>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="max-w-xl text-lg leading-8 text-[#4A4A45]">{t.finalBody}</p>
          <button
            type="button"
            onClick={onStart}
            className="group mt-10 inline-flex h-12 w-fit items-center gap-3 border border-[#1A1A1A] px-6 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-[#1A1A1A] hover:text-white"
          >
            {t.finalCta}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </main>
  );
}
