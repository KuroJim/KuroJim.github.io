# KuroJim.github.io

欢迎来到我的个人博客！这是一个使用 Astro 和 Tailwind CSS 构建的静态网站，采用 Apple 风格设计。

## 技术栈

- **Astro** - 现代化的静态网站生成器
- **Tailwind CSS** - 实用优先的 CSS 框架
- **TypeScript** - 类型安全的 JavaScript
- **MDX** - 增强的 Markdown 体验
- **Giscus** - 基于 GitHub Discussions 的评论系统

## 功能特性

- 📝 博客文章系统（支持 Markdown）
- 💬 文章评论功能（通过 Giscus）
- 🎨 Apple 风格设计
- 📱 完全响应式布局
- ⚡ 极致的性能优化
- 🌙 优雅的动画效果
- 🔍 SEO 友好

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:4321 查看网站。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
.
├── public/              # 静态资源
├── src/
│   ├── components/      # Astro 组件
│   ├── content/         # Markdown 内容
│   │   └── blog/        # 博客文章
│   ├── layouts/         # 页面布局
│   └── pages/           # 页面路由
├── astro.config.mjs     # Astro 配置
├── tailwind.config.mjs  # Tailwind CSS 配置
└── package.json
```

## 写作指南

博客文章存放在 `src/content/blog/` 目录下，使用 Markdown 格式编写。

### 文章 Front Matter

```yaml
---
title: '文章标题'
description: '文章描述'
pubDate: 2024-02-20
tags: ['标签1', '标签2']
heroImage: '/images/blog/cover.jpg'  # 可选
draft: false  # 是否为草稿
---
```

## 评论系统配置

本站使用 [Giscus](https://giscus.app) 作为评论系统。要启用评论功能，请按以下步骤操作：

1. 在你的 GitHub 仓库中启用 Discussions
2. 访问 https://giscus.app
3. 配置 Giscus 并获取配置参数
4. 更新 `src/components/Comments.astro` 文件中的配置：

```astro
const GISCUS_CONFIG = {
  repo: '你的用户名/仓库名',
  repositoryId: '你的仓库ID',
  category: 'General',
  categoryId: '你的分类ID',
  // ... 其他配置
};
```

## 部署

### GitHub Pages

本项目已配置 GitHub Actions，当代码推送到 `main` 分支时，会自动构建并部署到 GitHub Pages。

确保在仓库设置中：
1. 启用 GitHub Pages
2. 选择源为 `GitHub Actions`
3. 在 Settings > Pages > Build and deployment > Source 中选择 `GitHub Actions`

## 许可证

MIT License

## 联系方式

- GitHub: [@KuroJim](https://github.com/KuroJim)
- Email: your.email@example.com

---

使用 ❤️ 和 Astro 构建
