# 快速开始

## 🎉 恭喜！你的 Apple 风格个人博客已创建完成！

## 📋 下一步操作

### 1. 本地预览（推荐先测试）

```bash
npm run dev
```

访问 http://localhost:4321 查看效果。

### 2. 自定义你的信息

#### 修改个人信息（`src/pages/index.astro`）
- 你的名字：将 "KuroJim" 改为你的名字
- 个人简介：修改 bio 部分
- 技能列表：添加或删除技能

#### 更新社交链接（`src/components/Footer.astro`）
- GitHub 链接
- 邮箱地址

### 3. 配置评论系统（可选但推荐）

1. 访问 https://giscus.app
2. 用 GitHub 登录并授权
3. 配置你的评论设置
4. 复制配置到 `src/components/Comments.astro`

详细步骤见 [SETUP_GUIDE.md](./SETUP_GUIDE.md)

### 4. 添加你的博客文章

在 `src/content/blog/` 目录下创建新的 `.md` 文件：

```markdown
---
title: '我的第一篇文章'
description: '文章简介'
pubDate: 2024-02-20
tags: ['生活', '技术']
draft: false
---

# 这里写文章标题

这里是文章内容...
```

### 5. 部署到 GitHub Pages

#### 方法一：使用 GitHub CLI（推荐）

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 我的个人博客"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/KuroJim/KuroJim.github.io.git

# 推送到 GitHub
git push -u origin main
```

#### 方法二：通过网页上传

1. 在 GitHub 上创建新仓库：`KuroJim.github.io`
2. 上传所有文件到仓库
3. 在仓库设置中启用 GitHub Pages

### 6. 配置 GitHub Pages

1. 进入仓库的 **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**
3. 等待几分钟，访问 `https://KuroJim.github.io`

## 📁 项目结构

```
KuroJim.github.io/
├── public/              # 静态资源（图片、favicon 等）
├── src/
│   ├── components/      # 组件（Header、Footer、评论等）
│   ├── content/         # 博客文章（Markdown 格式）
│   │   └── blog/
│   ├── layouts/         # 页面布局
│   └── pages/           # 页面（首页、博客列表等）
├── astro.config.mjs     # Astro 配置
├── tailwind.config.mjs  # Tailwind CSS 配置
├── package.json         # 依赖管理
└── README.md            # 项目说明
```

## 🎨 功能特性

✅ Apple 风格设计
✅ 完全响应式布局
✅ 博客文章系统
✅ 评论功能（Giscus）
✅ 代码高亮
✅ SEO 优化
✅ 极致性能

## 🛠️ 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview

# 类型检查
npm run astro check
```

## 📚 更多文档

- [README.md](./README.md) - 项目说明
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - 详细配置指南
- [PROJECT_PLAN.md](./PROJECT_PLAN.md) - 技术方案
- [Astro 文档](https://docs.astro.build)
- [Tailwind CSS 文档](https://tailwindcss.com)

## 💡 提示

- 博客文章支持完整 Markdown 语法
- 图片放在 `public/images/` 目录
- 示例文章在 `src/content/blog/` 目录
- 所有颜色、字体都可以在 `tailwind.config.mjs` 中自定义

## 🐛 遇到问题？

1. 确保已安装 Node.js 18+
2. 删除 `node_modules` 并重新运行 `npm install`
3. 检查 Astro 和 Tailwind CSS 文档
4. 在 GitHub 上提 Issue

---

**祝你使用愉快！如有问题随时提问。**
