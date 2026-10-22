# 部署与零本地依赖维护

本项目是纯静态 Vite 站点，不需要服务器、数据库或 Docker。所有构建与测试都在 GitHub Actions 的云端 runner 完成。

## 当前目标环境

| 项目 | 值 |
| --- | --- |
| 仓库 | <https://github.com/cvcingcvc-code/wy> |
| 开发分支 | `feat/gorgon-company-website-v1` |
| 预览地址 | <https://cvcingcvc-code.github.io/wy/>（由 Pages workflow 发布） |
| 构建 base | `/wy/` |
| 站点源 | `https://cvcingcvc-code.github.io` |

预览构建与正式构建使用同一套源码，仅 `VITE_BASE` 与 `VITE_SITE_URL` 不同。

## GitHub Pages 首次设置

1. 打开仓库 **Settings → Pages**。
2. **Build and deployment → Source** 选择 **GitHub Actions**。
3. 打开 **Actions → Deploy GitHub Pages preview**，确认最近一次运行成功。
4. 访问 `https://cvcingcvc-code.github.io/wy/`。

workflow 的权限要求：

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

仓库设置中不要将 Pages 的 Source 设为 "Deploy from a branch"；本项目的 `dist/` 由 Actions 生成，不提交到 Git。

## 发布链路

```
push / workflow_dispatch
  → npm install
  → tsc --noEmit
  → vitest run
  → playwright install --with-deps chromium
  → node scripts/generate-og.mjs   （public/og.png）
  → tsc --noEmit && vite build && node scripts/postbuild.mjs
  → upload-pages-artifact(dist)
  → deploy-pages
```

`postbuild.mjs` 生成：

- `dist/sitemap.xml`（含所有公共路由与最后更新日期）
- `dist/robots.txt`
- `dist/404.html`（Vite 构建入口的副本，用于 SPA 深链）
- `dist/.nojekyll`

`public/og.png` 不提交到 Git；它在构建时生成后被 Vite 复制进 `dist/`。

## 正式上线（main）

合并 `feat/gorgon-company-website-v1` 到 `main` 会触发同一 Pages workflow，自动更新正式预览。合并前应完成：

- CI 全绿（typecheck、unit、build、Playwright、axe）
- 人工审阅预览站点的桌面与手机视觉
- 确认 [`docs/PENDING-CONFIRMATION.md`](PENDING-CONFIRMATION.md) 中的必要事实
- 法务 / 品牌与联系渠道确认

合并操作属于对外可见的发布动作，应由仓库所有者确认后执行。

## 自定义域名

当前没有购买域名，也没有配置 DNS。接入时：

1. 在 Pages 设置中填写域名，按 GitHub 提示配置 `A` / `AAAA` 或 `CNAME` 记录。
2. 在 Pages 设置中启用 HTTPS。
3. 修改 Pages workflow 的环境变量：
   - `VITE_BASE=/`
   - `VITE_SITE_URL=https://你的域名`
4. 同步更新 `index.html` 中静态的 canonical、`og:image`、`twitter:image` 与 JSON-LD `url`，以及 `public/robots.txt`。运行时会由 `usePageMeta` 覆盖页面级 metadata，但爬虫首屏读取的静态标签也应正确。
5. 若 `<head>` 中的静态 OG 图 URL 仍指向旧域名，使用 `npm run og` 重新生成并在构建后检查 `dist/og.png` 是否可访问。

不要在没有 DNS 生效前把预览 URL 写成正式域名。

## Vercel（可选）

仓库包含 `vercel.json`，所有路由回退到 `index.html`，静态资源缓存一年。导入仓库后：

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- 环境变量：`VITE_BASE=/`、`VITE_SITE_URL=https://<vercel-domain>`

Vercel 的免费静态托管额度足够本 V1。若使用 GitHub Pages，无需部署 Vercel。

## 中国大陆与备案

GitHub Pages 在部分网络环境下可能访问不稳定。项目没有配置中国大陆服务器、CDN 或备案。如果正式面向中国大陆用户，应先评估可访问性、ICP 备案与隐私合规，再决定是否迁移到合规的静态托管服务。这属于尚未完成的事项，不应在官网上宣称已就绪。

## 零本地依赖的日常维护

1. **内容更新**：直接在 GitHub 网页编辑 `src/content/zh.ts` 与 `src/content/en.ts`，或让云端智能体提交。
2. **配置更新**：修改 `src/config/site.ts`（邮箱、公开链接、更新日期）。
3. **等待 Actions**：CI 运行结果与 Playwright 报告可在 Actions 页面查看；失败截图和 trace 作为 artifact 下载。
4. **验收预览**：Pages workflow 会发布相同提交；在浏览器中检查桌面与手机。
5. **合并 main**：确认后通过 Pull Request 合并，正式站点自动更新。

全程无需在个人 Windows 电脑上克隆、安装 Node.js、下载依赖或运行 Docker。

## 常见问题

### 页面刷新后出现 404

确认 `dist/404.html` 存在，且 Pages 站点使用的是 workflow 构建产物。直接访问 `/wy/products/gorgon-workbench` 时，GitHub Pages 会返回 `404.html`，React Router 的 `basename` 再接管路由。

### 静态资源 404 / 白屏

检查构建时 `VITE_BASE` 是否为部署子路径（Pages 为 `/wy/`，根域名部署为 `/`）。浏览器 Network 面板中资源 URL 应包含 `/wy/assets/...`。

### 社交分享图为空

确认 `npm run og` 在构建前成功执行，且 `dist/og.png` 存在、大小约为 1200×630。Pages 构建使用绝对 URL `https://cvcingcvc-code.github.io/wy/og.png`。

### OG 生成失败

`scripts/generate-og.mjs` 需要 Playwright Chromium。workflow 已先运行 `npx playwright install --with-deps chromium`；在云端环境手动执行时也需要先安装浏览器。

### 表单没有发送

这是预期行为。V1 是静态站，联系表单只生成 `mailto:` 草稿，不向服务器提交或存储数据。邮件客户端是否可用取决于访客设备。
