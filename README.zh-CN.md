# Prologue

[English](README.md)

每一段伟大的旅程，都值得一个美丽的序章。

在一片干燥、机械的要点列表之中，你的职业足迹理应被读成一段史诗。Prologue 打破传统简历冰冷的惯例。我相信，一份出色的求职材料不只是僵硬的技能清单，而是一门讲述故事的艺术。

借助 Claude 或 Qwen 等先进语言模型的深度理解能力，Prologue 会成为你耐心的文字匠人与专属编辑。它轻轻拂去粗糙草稿上的尘埃，将你零散的提交记录、深夜调试、项目里程碑编织成一段有说服力且连贯的叙事。它不只是格式化你的过去，更会照亮你的潜力，让下一段冒险的第一章以无法忽视的光芒开启。

## 项目概述

Prologue 是一个 AI 辅助的简历构建器，专注于编辑式表达、结构化简历填写和精致的可打印输出。它将表单化简历编辑器、实时 A4 预览、多种视觉模板、支持 Markdown 的内容字段，以及用于职业摘要和工作经历润色的服务端 AI 增强能力结合在一起。

该项目基于 Next.js 构建，可以在本地运行，也可以作为独立 Web 应用部署。

## 功能特性

- 实时简历编辑器，支持个人信息、职业摘要、工作经历、教育经历、项目经历和技能等模块。
- 实时 A4 简历预览，并支持打印/PDF 导出。
- 多种简历模板：modern、minimal、classic、creative 和 professional。
- 支持主题色、字体、语言、图标显示、模块标题和模块可见性配置。
- 长文本简历内容支持 Markdown 编辑。
- 支持自定义个人信息字段，并可隐藏部分联系方式。
- 通过服务端 Gemini API route 提供 AI 简历文本润色能力。
- 响应式布局：移动端可在编辑和预览间切换，桌面端为左右分栏工作流。

## 技术栈

- **框架：** Next.js 15 App Router
- **界面：** React 19、Tailwind CSS 4
- **语言：** TypeScript
- **图标：** lucide-react
- **Markdown 渲染：** react-markdown
- **打印导出：** react-to-print
- **AI 集成：** 通过 Next.js API route 使用 @google/genai
- **工具链：** ESLint 9、PostCSS、npm


## 快速开始

### 前置要求

- Node.js
- npm
- 用于 AI 润色功能的 Gemini API key

### 安装依赖

```bash
npm install
```

### 环境变量

创建 `.env.local` 文件并配置：

```bash
GEMINI_API_KEY="your-gemini-api-key"
APP_URL="http://localhost:3000"
```

`GEMINI_API_KEY` 是 `/api/enhance` 接口所需的环境变量。应用会将该 key 保留在服务端，不会暴露给客户端组件。

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
- `npm run clean`：运行当前配置的 Next.js 清理命令。

## AI 文本增强

Prologue 使用 `app/api/enhance/route.ts` 中的服务端 API route 来增强简历文本。该接口接收简历内容和字段类型，构造聚焦的提示词，并以 JSON 形式返回润色后的文案。

当前支持的增强目标包括：

- 职业摘要
- 工作经历描述
- 通用简历文本

AI 层被有意隔离在服务端，以确保密钥不会暴露到客户端。

## 授权

本项目基于 MIT License 授权。详情请查看 [LICENSE](LICENSE) 文件。
