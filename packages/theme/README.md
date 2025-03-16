# hirsun-vuepress-theme-hope

> 一个具有打字机效果的Vuepress主题，基于vuepress-theme-hope

## 特点

- 包含原vuepress-theme-hope的所有功能
- 在博客主页增加了打字机效果，支持多行文字轮流显示
- 支持响应式布局，在各种设备上都能良好显示

## 安装

```bash
npm install hirsun-vuepress-theme-hope
# 或者
yarn add hirsun-vuepress-theme-hope
# 或者
pnpm add hirsun-vuepress-theme-hope
```

## 使用方法

### 打字机效果

在博客主页配置文件中添加`heroTexts`数组：

```yaml
---
layout: BlogHome
home: true
heroImage: /logo.svg
heroTexts:
  - "Welcome to My Blog"
  - "A Place to Share Knowledge"
  - "Happy Coding!"
---
```

## 配置

详细配置与原vuepress-theme-hope主题一致，参考[原主题文档](https://theme-hope.vuejs.press/)。

## 许可证

MIT License
