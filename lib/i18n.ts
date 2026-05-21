import type { ResumeConfig } from '@/types/resume';

export type AppLanguage = ResumeConfig['language'];

export const SUPPORTED_LANGUAGES: Array<{ id: AppLanguage; label: string }> = [
  { id: 'en', label: 'EN' },
  { id: 'zh', label: '中文' },
  { id: 'ja', label: '日本語' },
  { id: 'ko', label: '한국어' },
];

export const sectionTitlesByLanguage: Record<AppLanguage, ResumeConfig['sectionTitles']> = {
  en: {
    summary: 'Profile',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
  },
  zh: {
    summary: '职业摘要',
    experience: '工作经历',
    education: '教育经历',
    projects: '项目经历',
    skills: '技能',
  },
  ja: {
    summary: 'プロフィール',
    experience: '職務経歴',
    education: '学歴',
    projects: 'プロジェクト',
    skills: 'スキル',
  },
  ko: {
    summary: '프로필',
    experience: '경력',
    education: '학력',
    projects: '프로젝트',
    skills: '기술',
  },
};

export const appCopy: Record<AppLanguage, {
  mobileEditor: string;
  mobilePreview: string;
  shellKicker: string;
  shellTitle: string;
  intro: string;
  config: string;
  import: string;
  exporting: string;
  pdfError: string;
  nav: Record<string, string>;
}> = {
  en: {
    mobileEditor: 'Editor',
    mobilePreview: 'Preview',
    shellKicker: 'Resume Engine',
    shellTitle: 'Editorial Suite',
    intro: 'Intro',
    config: 'Config',
    import: 'Import',
    exporting: 'Exporting',
    pdfError: 'Server PDF export failed. This deployment needs a Node/Chromium-capable PDF runtime.',
    nav: {
      design: 'Design',
      personal: 'Personal',
      summary: 'Summary',
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
      skills: 'Skills',
    },
  },
  zh: {
    mobileEditor: '编辑',
    mobilePreview: '预览',
    shellKicker: '简历引擎',
    shellTitle: '编辑套件',
    intro: '介绍',
    config: '配置',
    import: '导入',
    exporting: '导出中',
    pdfError: '服务端 PDF 导出失败。当前部署需要支持 Node/Chromium 的 PDF 运行环境。',
    nav: {
      design: '设计',
      personal: '个人',
      summary: '摘要',
      experience: '经历',
      education: '教育',
      projects: '项目',
      skills: '技能',
    },
  },
  ja: {
    mobileEditor: '編集',
    mobilePreview: 'プレビュー',
    shellKicker: '履歴書エンジン',
    shellTitle: '編集スイート',
    intro: '紹介',
    config: '設定',
    import: '取込',
    exporting: '出力中',
    pdfError: 'サーバー PDF 出力に失敗しました。このデプロイには Node/Chromium 対応の PDF 実行環境が必要です。',
    nav: {
      design: 'デザイン',
      personal: '個人情報',
      summary: '要約',
      experience: '職務経歴',
      education: '学歴',
      projects: 'プロジェクト',
      skills: 'スキル',
    },
  },
  ko: {
    mobileEditor: '편집',
    mobilePreview: '미리보기',
    shellKicker: '이력서 엔진',
    shellTitle: '편집 스위트',
    intro: '소개',
    config: '설정',
    import: '가져오기',
    exporting: '내보내는 중',
    pdfError: '서버 PDF 내보내기에 실패했습니다. 이 배포에는 Node/Chromium 지원 PDF 런타임이 필요합니다.',
    nav: {
      design: '디자인',
      personal: '개인정보',
      summary: '요약',
      experience: '경력',
      education: '학력',
      projects: '프로젝트',
      skills: '기술',
    },
  },
};

export const configCopy: Record<AppLanguage, {
  title: string;
  body: string;
  language: string;
  aiProvider: string;
  model: string;
  baseUrl: string;
  apiKey: string;
  privacy: string;
  closeLabel: string;
}> = {
  en: {
    title: 'Config',
    body: 'Choose page language and the AI provider used by enhance and import requests.',
    language: 'Language',
    aiProvider: 'AI Provider',
    model: 'Model',
    baseUrl: 'Base URL',
    apiKey: 'API Key',
    privacy: 'Stored in this browser session only. Keys and resume content are sent only for the current AI request and are not persisted by Prologue.',
    closeLabel: 'Close config panel',
  },
  zh: {
    title: '配置',
    body: '设置页面语言，以及润色和导入请求使用的 AI 服务。',
    language: '语言',
    aiProvider: 'AI 服务',
    model: '模型',
    baseUrl: 'Base URL',
    apiKey: 'API Key',
    privacy: '仅存储在当前浏览器会话中。密钥和简历内容只会随当前 AI 请求发送，Prologue 不会持久化保存。',
    closeLabel: '关闭配置面板',
  },
  ja: {
    title: '設定',
    body: 'ページ言語と、文章改善・インポートで使う AI プロバイダーを設定します。',
    language: '言語',
    aiProvider: 'AI プロバイダー',
    model: 'モデル',
    baseUrl: 'Base URL',
    apiKey: 'API Key',
    privacy: '現在のブラウザーセッションにのみ保存されます。キーと履歴書内容は現在の AI リクエストにだけ送信され、Prologue には永続保存されません。',
    closeLabel: '設定パネルを閉じる',
  },
  ko: {
    title: '설정',
    body: '페이지 언어와 개선 및 가져오기 요청에 사용할 AI 제공자를 설정합니다.',
    language: '언어',
    aiProvider: 'AI 제공자',
    model: '모델',
    baseUrl: 'Base URL',
    apiKey: 'API Key',
    privacy: '현재 브라우저 세션에만 저장됩니다. 키와 이력서 내용은 현재 AI 요청에만 전송되며 Prologue에 영구 저장되지 않습니다.',
    closeLabel: '설정 패널 닫기',
  },
};

export const formCopy: Record<AppLanguage, {
  designTemplate: string;
  colorPalette: string;
  typography: string;
  personalDetails: string;
  showIcons: string;
  photo: string;
  photoPlaceholder: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  customFields: string;
  newField: string;
  addCustomField: string;
  visible: string;
  summaryRefiner: string;
  summaryPlaceholder: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  addExperience: string;
  school: string;
  degree: string;
  addEducation: string;
  projectName: string;
  projectLink: string;
  addProject: string;
  skillsPlaceholder: string;
  enhance: string;
  enhancing: string;
  showField: string;
  hideField: string;
}> = {
  en: {
    designTemplate: 'Design Template',
    colorPalette: 'Color Palette',
    typography: 'Typography',
    personalDetails: 'Personal Details',
    showIcons: 'Show Icons',
    photo: 'Photo',
    photoPlaceholder: 'Paste Photo URL here',
    fullName: 'Full Name',
    title: 'Title',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    website: 'Website',
    customFields: 'Custom Fields',
    newField: 'New Field',
    addCustomField: 'Add Custom Field',
    visible: 'Visible',
    summaryRefiner: 'Summary Refiner',
    summaryPlaceholder: 'Write a brief professional background...',
    company: 'Company',
    role: 'Role',
    startDate: 'Start Date',
    endDate: 'End Date',
    description: 'Description',
    addExperience: 'Add Experience',
    school: 'School',
    degree: 'Degree',
    addEducation: 'Add Education',
    projectName: 'Project Name',
    projectLink: 'Link (URL)',
    addProject: 'Add Project',
    skillsPlaceholder: 'e.g. Figma (Adv), Framer, Midjourney...',
    enhance: 'Enhance with AI',
    enhancing: 'Enhancing...',
    showField: 'Show field',
    hideField: 'Hide field',
  },
  zh: {
    designTemplate: '设计模板',
    colorPalette: '色彩方案',
    typography: '字体',
    personalDetails: '个人信息',
    showIcons: '显示图标',
    photo: '照片',
    photoPlaceholder: '粘贴照片 URL',
    fullName: '姓名',
    title: '头衔',
    email: '邮箱',
    phone: '电话',
    location: '地点',
    website: '网站',
    customFields: '自定义字段',
    newField: '新字段',
    addCustomField: '添加自定义字段',
    visible: '显示',
    summaryRefiner: '摘要润色',
    summaryPlaceholder: '写一段简短的职业背景...',
    company: '公司',
    role: '职位',
    startDate: '开始日期',
    endDate: '结束日期',
    description: '描述',
    addExperience: '添加工作经历',
    school: '学校',
    degree: '学历/学位',
    addEducation: '添加教育经历',
    projectName: '项目名称',
    projectLink: '链接 (URL)',
    addProject: '添加项目',
    skillsPlaceholder: '例如 Figma（高级）、Framer、Midjourney...',
    enhance: '使用 AI 润色',
    enhancing: '润色中...',
    showField: '显示字段',
    hideField: '隐藏字段',
  },
  ja: {
    designTemplate: 'デザインテンプレート',
    colorPalette: 'カラーパレット',
    typography: 'タイポグラフィ',
    personalDetails: '個人情報',
    showIcons: 'アイコンを表示',
    photo: '写真',
    photoPlaceholder: '写真 URL を貼り付け',
    fullName: '氏名',
    title: '肩書き',
    email: 'メール',
    phone: '電話',
    location: '所在地',
    website: 'Web サイト',
    customFields: 'カスタム項目',
    newField: '新しい項目',
    addCustomField: 'カスタム項目を追加',
    visible: '表示',
    summaryRefiner: '要約の改善',
    summaryPlaceholder: '短い職務プロフィールを書いてください...',
    company: '会社',
    role: '役割',
    startDate: '開始日',
    endDate: '終了日',
    description: '説明',
    addExperience: '職務経歴を追加',
    school: '学校',
    degree: '学位',
    addEducation: '学歴を追加',
    projectName: 'プロジェクト名',
    projectLink: 'リンク (URL)',
    addProject: 'プロジェクトを追加',
    skillsPlaceholder: '例: Figma（上級）, Framer, Midjourney...',
    enhance: 'AI で改善',
    enhancing: '改善中...',
    showField: '項目を表示',
    hideField: '項目を非表示',
  },
  ko: {
    designTemplate: '디자인 템플릿',
    colorPalette: '색상 팔레트',
    typography: '타이포그래피',
    personalDetails: '개인정보',
    showIcons: '아이콘 표시',
    photo: '사진',
    photoPlaceholder: '사진 URL 붙여넣기',
    fullName: '이름',
    title: '직함',
    email: '이메일',
    phone: '전화',
    location: '위치',
    website: '웹사이트',
    customFields: '사용자 정의 필드',
    newField: '새 필드',
    addCustomField: '사용자 정의 필드 추가',
    visible: '표시',
    summaryRefiner: '요약 개선',
    summaryPlaceholder: '간단한 전문 배경을 작성하세요...',
    company: '회사',
    role: '역할',
    startDate: '시작일',
    endDate: '종료일',
    description: '설명',
    addExperience: '경력 추가',
    school: '학교',
    degree: '학위',
    addEducation: '학력 추가',
    projectName: '프로젝트명',
    projectLink: '링크 (URL)',
    addProject: '프로젝트 추가',
    skillsPlaceholder: '예: Figma(고급), Framer, Midjourney...',
    enhance: 'AI로 개선',
    enhancing: '개선 중...',
    showField: '필드 표시',
    hideField: '필드 숨기기',
  },
};

export const importCopy: Record<AppLanguage, {
  title: string;
  body: string;
  closeLabel: string;
  chooseFile: string;
  apiKeyRequired: string;
  importFailed: string;
  roles: string;
  schools: string;
  projects: string;
  parse: string;
  apply: string;
  jsonBackup: string;
  jsonBody: string;
  exportJson: string;
  importJson: string;
  untitledCandidate: string;
  backupFrom: string;
  backupSummary: (roles: number, projects: number, template: string) => string;
  restoreBackup: string;
}> = {
  en: {
    title: 'Import Resume',
    body: 'Upload Markdown or PDF. AI will parse it for review before replacing this resume.',
    closeLabel: 'Close import panel',
    chooseFile: 'Choose .md, .markdown, or .pdf',
    apiKeyRequired: 'Add an API key in Config before AI import.',
    importFailed: 'Resume import failed',
    roles: 'Roles',
    schools: 'Schools',
    projects: 'Projects',
    parse: 'Parse',
    apply: 'Apply',
    jsonBackup: 'JSON Backup',
    jsonBody: 'Export a portable backup or restore one without using AI.',
    exportJson: 'Export JSON',
    importJson: 'Import JSON',
    untitledCandidate: 'Untitled candidate',
    backupFrom: 'Backup from',
    backupSummary: (roles, projects, template) => `${roles} roles, ${projects} projects, template ${template}.`,
    restoreBackup: 'Restore Backup',
  },
  zh: {
    title: '导入简历',
    body: '上传 Markdown 或 PDF。AI 会先解析并预览，确认后再替换当前简历。',
    closeLabel: '关闭导入面板',
    chooseFile: '选择 .md、.markdown 或 .pdf',
    apiKeyRequired: '请先在配置中添加 API key，再使用 AI 导入。',
    importFailed: '简历导入失败',
    roles: '职位',
    schools: '学校',
    projects: '项目',
    parse: '解析',
    apply: '应用',
    jsonBackup: 'JSON 备份',
    jsonBody: '导出可携带备份，或在不使用 AI 的情况下恢复。',
    exportJson: '导出 JSON',
    importJson: '导入 JSON',
    untitledCandidate: '未命名候选人',
    backupFrom: '备份时间',
    backupSummary: (roles, projects, template) => `${roles} 段经历，${projects} 个项目，模板 ${template}。`,
    restoreBackup: '恢复备份',
  },
  ja: {
    title: '履歴書を取り込む',
    body: 'Markdown または PDF をアップロードします。AI が解析し、置き換え前にプレビューします。',
    closeLabel: 'インポートパネルを閉じる',
    chooseFile: '.md、.markdown、.pdf を選択',
    apiKeyRequired: 'AI インポートの前に設定で API key を追加してください。',
    importFailed: '履歴書のインポートに失敗しました',
    roles: '職歴',
    schools: '学校',
    projects: 'プロジェクト',
    parse: '解析',
    apply: '適用',
    jsonBackup: 'JSON バックアップ',
    jsonBody: 'AI を使わずにバックアップをエクスポートまたは復元します。',
    exportJson: 'JSON 出力',
    importJson: 'JSON 取込',
    untitledCandidate: '無題の候補者',
    backupFrom: 'バックアップ日時',
    backupSummary: (roles, projects, template) => `${roles} 件の職歴、${projects} 件のプロジェクト、テンプレート ${template}。`,
    restoreBackup: 'バックアップを復元',
  },
  ko: {
    title: '이력서 가져오기',
    body: 'Markdown 또는 PDF를 업로드하세요. AI가 분석하고 교체 전 미리보기를 제공합니다.',
    closeLabel: '가져오기 패널 닫기',
    chooseFile: '.md, .markdown 또는 .pdf 선택',
    apiKeyRequired: 'AI 가져오기를 사용하기 전에 설정에서 API key를 추가하세요.',
    importFailed: '이력서 가져오기 실패',
    roles: '경력',
    schools: '학교',
    projects: '프로젝트',
    parse: '분석',
    apply: '적용',
    jsonBackup: 'JSON 백업',
    jsonBody: 'AI 없이 휴대 가능한 백업을 내보내거나 복원합니다.',
    exportJson: 'JSON 내보내기',
    importJson: 'JSON 가져오기',
    untitledCandidate: '제목 없는 후보자',
    backupFrom: '백업 시각',
    backupSummary: (roles, projects, template) => `${roles}개 경력, ${projects}개 프로젝트, 템플릿 ${template}.`,
    restoreBackup: '백업 복원',
  },
};
