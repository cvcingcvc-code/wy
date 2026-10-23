# 参考站只读审计

审计对象：[`cvcingcvc-code/guanzhi-oriental-website`](https://github.com/cvcingcvc-code/guanzhi-oriental-website)

审计方式：通过 GitHub API 读取 README、LICENSE、package.json、目录结构与文档；**没有克隆仓库，没有下载或复用任何图片、视频、字体、数据库、Docker 配置或源代码文件**。

## 参考站事实

- **业务与品牌**：观止东方，东方文化深度体验产品研发与供应机构。
- **产品形态**：React 多路由官网 + Fastify 后端 + PostgreSQL CMS + Docker Compose / Caddy 部署，含后台内容管理、媒体上传、询盘入库与导出。
- **路由**：首页、关于、能力、入江南、伙伴、联系六个公共路由，中英双语，内容来自 CMS。
- **技术**：React 18、TypeScript、Vite 6、Tailwind CSS 3、GSAP 3 / ScrollTrigger、Fastify 5、Drizzle ORM、JWT、Docker。
- **设计**：浅色宣纸底、墨色文字、朱砂与青瓷强调色，编辑式排版，自托管 Noto Serif SC / Source Serif 4，图片与 Hero 视频。
- **许可**：MIT 覆盖软件代码，版权归北京见山观止文化有限公司；品牌名称、文案、图片、视频、字体与设计资产明确排除在 MIT 之外。

## 可借鉴的软件模式（仅模式，不复制代码）

| 模式 | 在本项目中的独立实现 |
| --- | --- |
| 多路由官网 + 共享页头页脚 | React Router 7 + 独立 `Header` / `Footer`；全部代码为本项目新写 |
| 内容与展示分离 | `src/content` 双语内容层 + `SiteCopy` 类型约束；无 CMS，改为类型安全的静态内容 |
| 双语切换 | 自建 React context、`localStorage` 持久化、`html lang` 同步；与参考站实现不同 |
| 集中设计 token | 新的深色 tokens、排版与间距体系，视觉方向与参考站相反 |
| SPA 深链回退 | 构建后生成 `404.html` + `.nojekyll`，适配 GitHub Pages；参考站使用 Caddy 回退 |
| CI 质量门禁 | GitHub Actions 中执行 typecheck、Vitest、构建、Playwright 与 axe；不复制工作流文件 |
| 状态与边界披露 | 作为内容策略参考，所有产品文案、阶段标签与限制均为本项目重新撰写 |

## 可借鉴的视觉思路（重新设计，不复制资产）

- 首屏用大字号主张建立清晰层级，而非堆叠功能卡片。
- 用连续区块编号（01–06）和 section kicker 形成编辑式节奏。
- 强调色只承担信号作用，不大面积铺色。
- 在页面侧栏放置索引、状态图例或事实信息，增加可读性。
- 在营销页中明确标注阶段、边界与限制，避免“演示即产品”。

上述思路在**深色科技、抽象系统、冷白与银灰**的新方向下重新实现，排版、色彩、图形、动效与组件结构均与参考站不同。

## 明确未复用的内容

- 任何观止东方的品牌名称、Logo、文案、图片、视频、字体或设计稿。
- 任何后端、数据库 schema、CMS、媒体上传、询盘、Docker、Caddy 或部署脚本。
- 任何参考站源代码文件。项目中没有复制粘贴的组件或样式；仅参考了通用架构模式。
- 参考站的自托管字体。本项目仅使用系统字体栈，无下载字体文件。

## 品牌资产替换

| 资产 | 本项目处理 |
| --- | --- |
| Logo / favicon | 原创 G 形连接标记 SVG（`src/components/Logo.tsx`、`public/favicon.svg`、`public/logo.svg`） |
| OG 图 | 原创 `public/og.svg`，CI 中由 Chromium 渲染为 `og.png` |
| 图像 / 视频 | 无摄影或视频资产；背景为 CSS 图形 + Canvas 粒子 |
| 字体 | 系统字体栈，无第三方字体文件 |
| 文案 | 中英文全部为本项目原创内容，依据公开仓库与验收记录编写 |

## 许可结论

本项目未复制参考站的受版权保护内容，也未复制其 MIT 代码文件。为保持透明，仍在 [`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md) 中注明参考站及其 MIT 代码版权声明。若未来需要直接复用参考站代码，必须保留原 MIT 版权与许可文本，并单独获得品牌内容授权。
