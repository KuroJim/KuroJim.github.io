# GitHub 个人主页技术方案

## 项目概述
创建一个 Apple 风格的 GitHub 个人主页，包含个人介绍和博客功能（带评论）。

## 技术栈选择

### 静态网站生成器
**推荐：Astro 5+**
- ✅ 极快的构建速度
- ✅ 默认零 JS 发送
- ✅ GitHub Pages 原生支持
- ✅ 支持 Markdown/MDX
- ✅ 内置图片优化
- ✅ 多框架支持（React/Vue/Svelte 等）

### UI 框架
**推荐：Tailwind CSS**
- ✅ 快速实现 Apple 风格设计
- ✅ 响应式设计
- ✅ 自定义配置简单

### 评论系统
**推荐：Giscus**
- ✅ 基于 GitHub Discussions
- ✅ 完全免费
- ✅ 支持主题定制
- ✅ 无需后端
- ✅ 支持 Markdown 和 LaTeX

### 样式组件库
**推荐：Framer Motion**
- ✅ 优雅的动画效果
- ✅ Apple 风格的过渡动画

## Apple 风格设计特点

### 视觉元素
- **配色**：简洁的白色/浅灰色背景，深色文字
- **字体**：SF Pro Display（或系统字体）
- **圆角**：大圆角（20px+）
- **阴影**：柔和的投影
- **毛玻璃效果**：backdrop-filter: blur()
- **动画**：流畅的 ease-out 过渡

### 布局特点
- 大量留白
- 卡片式设计
- 居中对齐
- 清晰的层次结构

## 项目结构

```
KuroJim.github.io/
├── public/
│   └── images/             # 静态图片资源
├── src/
│   ├── components/
│   │   ├── Header.astro      # 导航栏
│   │   ├── Footer.astro      # 页脚
│   │   ├── BlogCard.astro    # 博客卡片
│   │   └── Comments.astro    # Giscus 评论组件
│   ├── layouts/
│   │   └── Layout.astro      # 基础布局
│   ├── pages/
│   │   ├── index.astro       # 首页（个人介绍）
│   │   └── blog/
│   │       ├── index.astro   # 博客列表页
│   │       └── [slug].astro  # 博客文章详情页
│   └── content/
│       └── blog/             # Markdown 博客文章
│           └── *.md
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

## 核心功能

### 1. 首页（个人介绍）
- Hero 区域：头像、姓名、简介
- 关于我：个人背景
- 技能展示：技术栈列表
- 社交链接：GitHub、Twitter、Email 等
- 联系方式

### 2. 博客系统
- **文章列表页**：
  - 卡片式布局
  - 发布日期、标签、摘要
  - 分页/加载更多

- **文章详情页**：
  - Markdown 渲染
  - 代码高亮
  - 目录导航
  - 上一篇/下一篇导航
  - Giscus 评论

### 3. 评论系统（Giscus）
- 配置项：
  - GitHub 仓库
  - Discussion 分类
  - 主题映射（支持明暗主题）
  - 语言设置

## 响应式设计
- 移动端优先
- 断点：sm (640px), md (768px), lg (1024px), xl (1280px)
- 导航栏：移动端汉堡菜单

## 部署方案

### GitHub Pages
1. Astro 自动构建静态 HTML
2. 推送到 main 分支
3. GitHub Actions 自动部署
4. 使用自定义域名（可选）

### 部署配置
- 构建输出：`dist` 目录
- 构建命令：`npm run build`
- 自动部署通过 GitHub Actions

## 性能优化
- 图片懒加载
- 代码分割
- 字体优化
- CSS 压缩
- 缓存策略

## 开发步骤

1. ✅ 初始化 Next.js 项目
2. ✅ 配置 Tailwind CSS
3. ✅ 创建布局组件
4. ✅ 实现首页
5. ✅ 实现博客列表页
6. ✅ 实现博客详情页
7. ✅ 集成 Giscus 评论
8. ✅ 添加动画效果
9. ✅ 响应式适配
10. ✅ 部署上线

## 待办事项
- [ ] 配置 Giscus（需要 GitHub 仓库）
- [ ] 准备个人信息和内容
- [ ] 添加博客文章
- [ ] 配置自定义域名（可选）
