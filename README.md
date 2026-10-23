# 戈尔贡科技 GORGON TECHNOLOGY · 官网 V1

上海戈尔贡科技有限公司的官方网站。用 React + TypeScript + Vite 构建，默认中文，提供英文切换，以静态站点方式部署，不依赖数据库或后端服务。

> **线上预览（GitHub Pages）**：https://cvcingcvc-code.github.io/wy/
>
> 预览由 `feat/gorgon-company-website-v1` 分支经 GitHub Actions 自动构建并发布；合并到 `main` 前不构成正式上线。

## 项目范围

站点包含六个公共页面与三个产品详情页：

| 路径 | 内容 |
| --- | --- |
| `/` | 首页：主张、公司介绍、四个技术方向、产品、场景、技术理念、合作入口 |
| `/about` | 关于：公司定位、三条信念、工作方式、明确边界、当前进展 |
| `/solutions` | 解决方案：四个方向、适用场景、可共同探索的范围、合作方式 |
| `/products` | 产品与实验室：三个项目的真实阶段与状态说明 |
| `/products/:slug` | 详情：已实现能力、研发中能力、限制、技术构成、真实链接 |
| `/technology` | 技术理念：参考架构、五条工程原则、持续循环、技术范围 |
| `/contact` | 联系：公开邮箱、可复制的邮件模板、合作方向、FAQ |

产品阶段严格按公开仓库与验收记录标注：

- **Gorgon Workbench** — Alpha · 公开测试
- **本地 AI 智能客服** — 研发中 · 未商用
- **本地模型与智能自动化** — 研究性原型 · 非商用

没有公开证据的客户数量、收入、性能、部署量或测试结论，站点不会展示。Demo 入口只在真实可访问时配置，目前均标为“暂无公开 Demo”。

## 设计

- 深海军蓝 / 近黑底色，冷白与银灰为主，技术蓝作为少量强调色
- 首页的「技术理念」使用一条反相的浅色蓝图带（纸面 + 工程网格），是全站唯一的亮色区块
- 大字号编辑式排版，原创的 G 形连接标识、抽象网格、轨道与粒子背景
- 动效轻量：CSS 过渡配合一块低帧率 Canvas 粒子层；阴影与模糊克制使用
- 完整响应式：桌面、平板、390px 与 375px 手机视口分别验证
- `prefers-reduced-motion: reduce` 下关闭粒子动画、渐显、入场动画延迟与平滑滚动
- 不使用第三方字体、CDN、分析脚本或追踪代码

## 界面预览

以下截图由 CI 中的 Playwright 在 Chromium 中生成，为完整页面（WebP 压缩）：

| 页面 | 1440 × 900 | 390 × 844 | 375 × 812 |
| --- | --- | --- | --- |
| 首页 | [查看](docs/screenshots/home-1440.webp) | [查看](docs/screenshots/home-390.webp) | [查看](docs/screenshots/home-375.webp) |
| 产品与实验室 | [查看](docs/screenshots/products-1440.webp) | [查看](docs/screenshots/products-390.webp) | [查看](docs/screenshots/products-375.webp) |
| 联系我们 | [查看](docs/screenshots/contact-1440.webp) | [查看](docs/screenshots/contact-390.webp) | [查看](docs/screenshots/contact-375.webp) |

## 技术栈

| 层级 | 选择 |
| --- | --- |
| UI | React 18、React Router 7 |
| 语言 | TypeScript 5（`strict`、未使用变量检查） |
| 构建 | Vite 6，静态输出 |
| 样式 | 原生 CSS + 集中式 CSS Custom Properties，无 UI 框架 |
| 内容 | 类型约束的中英双语内容层（`src/content`） |
| 单元测试 | Vitest 3、Testing Library、jsdom |
| 浏览器测试 | Playwright、@axe-core/playwright |
| CI / 托管 | GitHub Actions、GitHub Pages（免费静态托管） |

未引入 GSAP、CMS、数据库、Docker 或服务端运行时。项目保留了后续接入 CMS 的内容层边界，但 V1 没有实现后台。

## 本地与云端命令

本项目采用 **Cloud-Only** 交付：维护者无需在个人电脑上安装 Node.js 或下载依赖。以下命令均在 GitHub Actions 或任意云端开发环境中执行。

```bash
npm install        # 安装依赖
npm run dev        # 云端开发服务器（默认 5173）
npm run typecheck  # TypeScript 严格检查
npm test           # Vitest 单元测试
npm run build      # 生产构建 + sitemap/robots/404 生成
npm run preview    # 预览生产构建（默认 4173）
npm run test:e2e   # Playwright 浏览器、响应式、无障碍与截图测试
npm run og         # 从 public/og.svg 生成 public/og.png（需要 Chromium）
```

### 环境变量

| 变量 | 用途 | GitHub Pages | Vercel / 自定义域名 |
| --- | --- | --- | --- |
| `VITE_BASE` | 部署子路径 | `/wy/` | `/` |
| `VITE_SITE_URL` | canonical / sitemap 的站点源 | `https://cvcingcvc-code.github.io` | 你的正式域名 |

`.env.example` 仅作为说明，不包含任何密钥。真实联系邮箱在 [`src/config/site.ts`](src/config/site.ts) 中集中配置。

## 测试与持续集成

推送到 `main` 或 `feat/gorgon-company-website-v1`、或创建 Pull Request 时，[`.github/workflows/ci.yml`](.github/workflows/ci.yml) 会在 Ubuntu 与 Node.js 22 上依次执行：

1. `npm install`
2. `npm run typecheck`
3. `npm test`
4. `npm run build`
5. 安装 Chromium 并运行 `npm run test:e2e`
6. 上传 Playwright 报告、失败 trace 与截图附件

浏览器测试覆盖：

- 十个 URL 的直接访问与刷新（含三个产品详情与 404）
- 1440 / 390 / 375 三种视口、所有主路由的水平溢出检查
- 桌面导航、移动菜单开合、Escape、焦点管理、语言切换与持久化
- 联系表单校验、首个错误聚焦、合作方向 query 预选、mailto 草稿生成
- 站内链接可达性、外链 `https` 与 `noopener`
- axe WCAG 2.0/2.1 A/AA 扫描（阻断 serious / critical）
- 桌面与手机整页截图作为 CI artifact

单元测试覆盖中英文内容结构一致性、产品阶段边界、mailto 编码、语言上下文与菜单交互。

## 部署

### GitHub Pages（当前预览）

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) 在分支更新时构建 `dist/` 并发布到 `https://cvcingcvc-code.github.io/wy/`。

构建链路：

```
npm install → typecheck + unit tests → Playwright Chromium
→ npm run og → npm run build（VITE_BASE=/wy/）
→ upload-pages-artifact → deploy-pages
```

`scripts/postbuild.mjs` 会写入站点地图、robots、`.nojekyll` 与 `404.html`，使 `/wy/products/...` 等深层链接可以直接访问和刷新。

要在正式上线时使用：

1. 审阅并合并 `feat/gorgon-company-website-v1` 到 `main`（合并后 `main` 会自动重新部署）。
2. 在仓库 **Settings → Pages** 中保持 Source 为 **GitHub Actions**。
3. 如需自定义域名，在 Pages 设置中填写域名并按 GitHub 指引配置 DNS；本项目不包含域名购买或付费资源。

### Vercel（可选免费静态托管）

仓库内已有 [`vercel.json`](vercel.json)：所有路径重写到 `index.html`，静态资源长缓存。导入仓库后设置：

- Build command: `npm run build`
- Output directory: `dist`
- 环境变量：`VITE_BASE=/`，`VITE_SITE_URL=https://你的域名`

若绑定自定义域名，同时把 `index.html` 中静态的 canonical / OG URL 与 `siteConfig` 更新为正式域名。运行时页面 metadata 会按 `VITE_SITE_URL` 覆盖。

### 零本地依赖的更新流程

1. 在 GitHub 网页或云端智能体中修改 `src/content/zh.ts`、`src/content/en.ts`、`src/config/site.ts` 或样式文件。
2. 提交到功能分支；CI 自动类型检查、运行测试、构建并给出浏览器测试结果。
3. 通过后由 Pages workflow 自动发布新预览。
4. 验收完成后合并到 `main`，正式站点同步更新。

无需把仓库下载到个人电脑，也无需在本地运行 `npm install`、构建或 Docker。

## 内容与配置

- **公司信息 / 联系方式 / 公开链接**：[`src/config/site.ts`](src/config/site.ts)
- **中文文案**：[`src/content/zh.ts`](src/content/zh.ts)
- **英文文案**：[`src/content/en.ts`](src/content/en.ts)
- **产品阶段与边界**：各语言文件中的 `products`
- **SEO 标题与描述**：各页面 `seo` 字段；`usePageMeta` 负责运行时 canonical 与 OG 更新
- **页面路由**：[`src/App.tsx`](src/App.tsx)
- **设计 tokens**：[`src/styles/tokens.css`](src/styles/tokens.css)

中英文共享同一结构类型（`SiteCopy`），漏翻或结构不一致会在 `npm run typecheck` 时失败。

## 联系渠道

当前唯一公开渠道为 **cvcingcvc@gmail.com**，通过真实 `mailto:` 链接使用。联系表单不会向服务器提交或存储任何数据：校验通过后只是在浏览器中生成邮件草稿，并把内容交给用户本机的邮件客户端。公司电话与办公地址尚未确认公开，因此页面不展示占位信息。

若未来启用表单后端，需要另行实现接收、反滥用、隐私告知与数据保留策略；V1 明确不包含这些能力。

## 已知限制

- 无 CMS、无数据库、无表单后端
- 未配置正式域名，GitHub Pages 预览路径为 `/wy/`
- GitHub Pages 首次请求深层链接会返回状态 404 的引导页，随即跳转并在 200 文档上恢复路径；需要直接 200 的深链与完整 SEO 时建议使用 Vercel rewrite
- 英文公司法定名称、电话、办公地址等待公司确认（见 [`docs/PENDING-CONFIRMATION.md`](docs/PENDING-CONFIRMATION.md)）
- 产品 Demo 均未公开，站点只提供真实仓库与 Workbench Alpha APK
- 站内所有产品声明以公开仓库与验收记录为依据，不构成性能或商业承诺

## 许可证与归属

项目代码采用 MIT 许可证；品牌名称、Logo、文案、视觉与产品信息保留所有权利。详见 [`LICENSE`](LICENSE)、[`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) 与 [`docs/reference-audit.md`](docs/reference-audit.md)。

© 2026 上海戈尔贡科技有限公司 · GORGON TECHNOLOGY
