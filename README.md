# hirsun-vuepress-theme-hope-plus

> Hirsun 基于 vuepress-theme-hope: 2.0.0- beta.228 二次开发的 vuepress 博客主题。

![cover](https://raw.githubusercontent.com/guomaimang/hirsun-vuepress-theme-hope-plus/refs/heads/main/cover.gif)

## 功能特点

- 保留了原主题的所有功能
- 在博客主页增加了打字机效果，支持多行文字轮流显示
- 响应式设计，在所有设备上都有良好的显示效果

## 本地开发与调试指南

你应该预先安装 Node.js 和 Git，并使用 corepack enable 启用 corepack。

本项目是一个 monorepo，使用 pnpm 管理。

- docs: 放置各插件与主题的文档，每个子文件夹为一个项目
- demo: 主题演示项目
- packages: 放置各插件与主题的代码，每个子文件夹为一个项目


```
.
├── .github → GitHub 配置
├── .husky → husky 配置
│
├── demo → 演示项目
│
├── docs → 文档目录
│ ├── components → components 插件文档
│ ├── lightgallery → lightgallery 插件文档
│ ├── md-enhance → md-enhance 插件文档
│ ├── shared → vuepress-shared 文档
│ └── theme → 主题文档
│
├── docs-shared → 文档的通用文件
|
├── packages → 项目源代码
│ ├── components → components 插件
│ ├── create → create-vuepress-theme-hope 助手
│ ├── lightgallery → lightgallery 插件
│ ├── md-enhance → md-enhance 插件
│ ├── shared → 共享文件
│ └── theme → vuepress-theme-hope 主题
│
├── scripts → 命令脚本
│
├── ... → 一些配置文件
│
├── LICENSE → 协议
├── package.json → 项目根 package.json
├── README.md → 项目介绍
├── SECURITY.md → 安全政策文件
│
└── tsconfig.* → TypeScript 配置文件
```

每个项目的结构都大致如下:

```
.
├── lib → 编译后的输出文件
│    │
│    ├── client → 客户端侧代码
│    │
│    └── node → Node.js 侧代码
│
└── src → 源文件
     │
     ├── client → 客户端侧代码
     │
     ├── node → Node.js 侧代码
     │
     └── shared → 客户端和 Node.js 的共享文件
```

VuePress 同时运行在客户端和 Node 端。 Node 侧有像 `fs` 这样的 node 模块，而客户端运行在有`document``windows``navigator`等全局变量的浏览器中，你应该清楚一段代码运行在哪里。

- `client` 目录存储在浏览器中运行的代码
- `node` 目录存储在 Node.js 中运行的代码
- `shared` 目录存储在客户端和 Node 中使用的文件，因此代码不应引用任何浏览器全局变量或 node 模块。

为了更好的性能，所有插件在发布时都会使用 rollup 进行打包并压缩。

项目的运行与开发:

0. 先在根目录运行 `pnpm i` 和 `pnpm build`
1. 在 packages/theme 中构建项目: `pnpm build`
   - 使用 rollup 打包并压缩代码，并输出到 `lib` 文件夹
   - 使用 `rollup-plugin-copy` 复制其他文件到 `lib` 文件夹
2. 修改  packages/theme/packages.json 中的版本号
3. 在项目的根目录运行 `pnpm release:publish`, 将项目发布到 npm.

## 安装和使用

请查看[主题包README](./packages/theme/README.md)获取更多信息。

## 许可证

MIT License
