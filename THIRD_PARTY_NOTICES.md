# 第三方软件与资产声明

本项目代码以 MIT 许可发布，但下列第三方依赖、参考项目与品牌资产遵循各自条款。

## 运行时依赖

| 包 | 版本范围 | 许可证 |
| --- | --- | --- |
| `react` | ^18.3.1 | MIT |
| `react-dom` | ^18.3.1 | MIT |
| `react-router-dom` | ^7.18.2 | MIT |

## 开发与测试依赖

| 包 | 版本范围 | 许可证 |
| --- | --- | --- |
| `typescript` | ^5.6.3 | Apache-2.0 |
| `vite` | ^6.0.3 | MIT |
| `@vitejs/plugin-react` | ^4.3.4 | MIT |
| `vitest` | ^3.2.7 | MIT |
| `jsdom` | ^26.1.0 | MIT |
| `@testing-library/react` | ^16.3.0 | MIT |
| `@testing-library/jest-dom` | ^6.6.3 | MIT |
| `@testing-library/user-event` | ^14.6.1 | MIT |
| `@playwright/test` | ^1.64.0 | Apache-2.0 |
| `@axe-core/playwright` | ^4.14.0 | MPL-2.0 |
| `@types/node` | ^24.0.0 | MIT |
| `@types/react` | ^18.3.12 | MIT |
| `@types/react-dom` | ^18.3.1 | MIT |

完整依赖树与许可证文本由 npm 安装到 `node_modules`；这些目录不会提交到 Git。发布或再分发时请保留各包自带的许可证文件。

## 参考项目

- **观止东方 Guanzhi Oriental**：<https://github.com/cvcingcvc-code/guanzhi-oriental-website>
- 代码许可：MIT，Copyright (c) 2026 北京见山观止文化有限公司
- 品牌名称、文案、图片、视频、字体与设计资产**不在 MIT 范围内**。

本项目未复制该项目的任何源文件或品牌资产，仅参考通用软件模式。完整审计记录见 [`docs/reference-audit.md`](reference-audit.md)。

## 字体与图像

- **字体**：仅使用操作系统自带的 sans-serif / monospace 字体栈，不下载、不自托管、不再分发第三方字体。
- **Logo / favicon / OG 图**：为本项目原创 SVG 与由该 SVG 在 CI 中生成的 PNG。
- **背景与图示**：CSS 渐变、网格、边框、内联 SVG 与 Canvas 粒子，均为本项目原创实现。
- **摄影 / 视频 / 图标库**：无。项目不包含任何第三方照片、视频或图标字体。

## 品牌内容

上海戈尔贡科技有限公司 / 戈尔贡科技 / GORGON TECHNOLOGY 的名称、Logo、页面文案、产品描述与视觉设计保留所有权利。MIT 许可证只覆盖软件代码，不覆盖这些品牌与内容资产。

## 参考站之外的链接

站内指向 GitHub 仓库、Release 或公司邮箱的链接仅作为真实入口引用；目标站点内容与可用性由相应服务方负责。
