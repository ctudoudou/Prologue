# Prologue Development Charter

本宪章定义 Prologue 后续开发必须遵循的工程规范、测试流程和交付标准。任何功能开发、重构、修复和文档更新都应以此为准。

## 1. 基本原则

- **用户隐私优先**：不得在服务端持久化 API key、简历内容、上传文件、解析文本或导出的 PDF 数据。
- **本地优先验证**：所有改动必须能在本地通过可复现命令验证，不能只依赖手工判断。
- **小步提交**：一次提交只解决一个清晰目标，避免把功能、重构、格式化和依赖升级混在一起。
- **保持一致性**：优先沿用现有 Next.js、React、Tailwind、类型定义、组件结构和测试模式。
- **先读后改**：修改前必须理解相关代码路径，不允许凭猜测改共享类型、API contract 或 PDF/AI 流程。

## 2. 开发流程

1. 明确变更目标和影响范围。
2. 检查当前工作树，确认是否存在与任务无关的未提交改动。
3. 阅读相关文件和测试，确定现有约定。
4. 先改核心逻辑，再改 UI，最后补文档和测试。
5. 每个阶段运行对应验证命令。
6. 提交前复查 `git diff`，确认没有调试代码、密钥、生成噪音或无关改动。

推荐命令：

```bash
git status --short
npm run test
npm run lint
npm run build
```

## 3. 代码规范

- TypeScript 必须保持严格类型约束，不得通过 `any`、类型断言或关闭规则逃避设计问题。
- `ResumeData` 和 `ResumeConfig` 是编辑器、预览、导入、备份和 PDF 导出的核心 contract。任何字段变化必须同步更新类型、初始数据、编辑 UI、预览渲染、导入/备份校验和测试。
- React 状态更新必须保持不可变；依赖旧状态时使用 functional update。
- 不引入全局状态库、样式系统或大型依赖，除非已有方案无法合理支持需求。
- UI 控件优先使用真实 `button`、`input`、`textarea`，保持键盘可访问。
- 图标按钮优先使用 `lucide-react`，并与现有编辑器视觉风格一致。

## 4. AI 与隐私规范

- AI provider 配置只允许保存在浏览器 `sessionStorage`，当前 key 为 `prologue.aiConfig.v1`。
- 后端 API 只能在当前请求中临时使用 API key 和简历内容，不得记录日志、写文件、写数据库或放入缓存。
- Provider 请求统一经过 `lib/ai-provider.ts`，不得在组件中直接调用 OpenAI/OpenRouter/Volcengine API。
- 新增 provider 时必须补齐：
  - `lib/ai-config.ts` 中的 provider 类型、默认模型和默认 Base URL。
  - `lib/ai-provider.ts` 中的请求构建和验证。
  - OpenAI-compatible payload 测试。
  - README / 中文 README 中的配置说明。
- AI 导入必须要求严格 JSON，返回前必须 validate/normalize，不得直接信任模型输出。

## 5. 导入、备份与 PDF 规范

- Markdown/PDF 导入必须先预览，再由用户确认替换当前简历。
- JSON 恢复必须独立于 AI，不得要求 API key。
- JSON 备份格式必须保持版本化：

```json
{
  "version": 1,
  "exportedAt": "ISO string",
  "data": {},
  "config": {}
}
```

- PDF 导出必须走 Node runtime 的 `/api/export/pdf`，并返回：
  - `Content-Type: application/pdf`
  - `Content-Disposition: attachment; filename="resume.pdf"`
  - `Cache-Control: no-store`
- Cloudflare Worker 部署不能直接承担 Playwright PDF 渲染；如需云端 PDF，必须接入 Node/Chromium-capable 服务。

## 6. UI 设计规范

- 编辑器保持左侧配置、右侧 A4 预览的核心工作流。
- 不做营销式落地页替代主工作台；用户进入编辑器后应直接可用。
- 控件文案要短、明确、可扫描，不用说明性长段落塞满操作区。
- 避免嵌套卡片和过度装饰；页面应保持克制、专业、文档编辑器气质。
- 移动端必须保留编辑/预览切换能力，按钮文字不能溢出。

## 7. 测试流程

根据改动范围选择最低但充分的验证集：

- 纯文档改动：复查链接、命令和术语即可。
- 类型、API、构建路径、依赖变化：必须运行 `npm run build`。
- React 组件、UI 状态、导入/备份交互变化：必须运行 `npm run test` 和 `npm run lint`。
- AI provider、prompt、JSON parsing、validation 变化：必须补单元测试并运行 `npm run test`。
- PDF 导出变化：必须覆盖 HTML 渲染或 route response headers，并运行 `npm run build`。
- 视觉布局变化：应启动 `npm run dev`，检查桌面和移动宽度的关键页面。

完整交付前推荐运行：

```bash
npm run test
npm run lint
npm run build
```

## 8. 依赖管理

- 新依赖必须有明确用途，不能为了少量代码引入重型库。
- 升级依赖时必须确认构建和测试通过。
- 删除功能时必须同步移除未使用依赖、文档引用和测试假设。
- `package-lock.json` 必须与 `package.json` 同步提交。

## 9. Git 与提交规范

- 提交信息使用英文，简短描述用户可见或工程层面的实际变化。
- 推荐使用 Conventional Commits 风格，但不强制机械套用。
- 不得提交：
  - `.env*`
  - API key 或 token
  - 临时日志
  - 无关格式化
  - `.next` 生成噪音
- 提交前必须确认：

```bash
git status --short
git diff --stat
```

## 10. 交付标准

一个变更只有同时满足以下条件才算完成：

- 功能行为符合需求。
- 相关测试已补充或明确说明为何不需要。
- 必要验证命令已运行并通过，或明确记录无法运行的原因。
- 文档已更新，尤其是 setup、AI provider、隐私、导入/导出、部署要求发生变化时。
- 工作树没有无关改动。
