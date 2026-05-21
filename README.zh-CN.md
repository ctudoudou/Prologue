# Prologue

[English](README.md)

每一段伟大的旅程，都值得一个美丽的序章。

在一片干燥、机械的要点列表之中，你的职业足迹理应被读成一段史诗。Prologue 打破传统简历冰冷的惯例。我相信，一份出色的求职材料不只是僵硬的技能清单，而是一门讲述故事的艺术。

借助 Claude 或 Qwen 等先进语言模型的深度理解能力，Prologue 会成为你耐心的文字匠人与专属编辑。它轻轻拂去粗糙草稿上的尘埃，将你零散的提交记录、深夜调试、项目里程碑编织成一段有说服力且连贯的叙事。它不只是格式化你的过去，更会照亮你的潜力，让下一段冒险的第一章以无法忽视的光芒开启。

## 项目概述

Prologue 是一个 AI 辅助的简历构建器，专注于编辑式表达、结构化简历填写和精致的 PDF 输出。它将表单化简历编辑器、实时 A4 预览、多种视觉模板、支持 Markdown 的内容字段，以及用于职业摘要和工作经历润色的服务端 AI 增强能力结合在一起。

该项目基于 Next.js 构建，可以在本地运行，也可以作为独立 Web 应用部署。

## 功能特性

- 实时简历编辑器，支持个人信息、职业摘要、工作经历、教育经历、项目经历和技能等模块。
- 实时 A4 简历预览，并支持服务端渲染 PDF 导出。
- 多种简历模板：modern、minimal、classic、creative 和 professional。
- 支持主题色、字体、语言、图标显示、模块标题和模块可见性配置。
- 全页面支持英文、中文、日语和韩语，并默认根据浏览器语言自动选择。
- 长文本简历内容支持 Markdown 编辑。
- 支持自定义个人信息字段，并可隐藏部分联系方式。
- 通过 OpenAI 兼容接口支持 OpenAI、OpenRouter 和火山引擎方舟的 AI 简历文本润色。
- 支持通过 AI 导入 Markdown/PDF 简历，并在替换当前简历前预览解析结果。
- 支持版本化 JSON 备份和恢复，JSON 恢复不需要 API key。
- 响应式布局：移动端可在编辑和预览间切换，桌面端为左右分栏工作流。

## 技术栈

- **框架：** Next.js 16 App Router
- **界面：** React 19、Tailwind CSS 4
- **语言：** TypeScript
- **图标：** lucide-react
- **Markdown 渲染：** react-markdown
- **PDF 导出：** Node PDF 流式导出使用 Playwright
- **AI 集成：** 通过 Next.js API route 使用 OpenAI 兼容 Chat Completions
- **简历导入：** pdf-parse 用于 PDF 文本提取
- **测试：** Vitest、Testing Library、jsdom
- **工具链：** ESLint 9、PostCSS、npm


## 快速开始

### 前置要求

- Node.js
- npm
- 可选的 OpenAI、OpenRouter 或火山引擎方舟 API key，用于 AI 润色和 AI 导入功能

### 安装依赖

```bash
npm install
```

### AI 服务配置

进入编辑器后，点击 **Config** 可以切换页面语言或配置 AI 服务。选择 OpenAI、OpenRouter 或火山引擎，并填写 API key、模型名称和兼容 Chat Completions 的 Base URL。API key 只存储在浏览器 `sessionStorage` 的 `prologue.aiConfig.v1` 下，只会随当前请求发送到后端，应用不会持久化存储。

默认模型：

- OpenAI：`gpt-4.1-mini`
- OpenRouter：`openai/gpt-4.1-mini`
- 火山引擎：`doubao-seed-1-6-250615`

### 本地开发

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:3000`。

### 生产构建

```bash
npm run build
npm run start
```

## 可用脚本

- `npm run dev`：启动本地 Next.js 开发服务器。
- `npm run build`：创建生产构建。
- `npm run start`：启动生产服务器。
- `npm run lint`：运行 ESLint。
- `npm run test`：运行 Vitest。
- `npm run clean`：运行当前配置的 Next.js 清理命令。

## AI 工作流

Prologue 使用服务端 API route 处理 AI 工作，同时让用户的 provider 凭证只保存在浏览器会话中：

- `app/api/enhance/route.ts`：润色职业摘要和工作经历描述。
- `app/api/import/resume/route.ts`：提取 Markdown/PDF 简历文本，并要求配置的 AI provider 返回严格的 `ResumeData` JSON。

当前支持的增强目标包括：

- 职业摘要
- 工作经历描述
- 通用简历文本

AI 导入会先展示摘要预览，用户确认后才会替换当前简历。API key 和简历文件内容都只作为临时请求数据处理，应用不会记录或保存。

## 导入与备份

- Markdown 导入支持 `.md` 和 `.markdown` 文件。
- PDF 导入支持 `.pdf` 文件，并在服务端提取文本后交给 AI 解析。
- JSON 导出会下载 `{ version: 1, exportedAt, data, config }`。
- JSON 导入会校验备份版本、简历数据和简历配置，并在恢复前预览。

## PDF 导出

**PDF** 按钮会调用 `app/api/export/pdf/route.ts`，该 route 使用 Node runtime 和 Playwright 流式返回 `application/pdf` 下载文件。

该能力需要支持 Node/Chromium 的部署环境。Cloudflare Worker 部署需要额外接入独立的 Node PDF 服务。

## 授权

本项目基于 MIT License 授权。详情请查看 [LICENSE](LICENSE) 文件。
