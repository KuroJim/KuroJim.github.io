# 配置指南

## 首次部署步骤

### 1. 启用 GitHub Pages

1. 进入你的 GitHub 仓库设置
2. 点击 "Pages" 选项卡
3. 在 "Build and deployment" 部分：
   - Source 选择 "GitHub Actions"

### 2. 配置 Giscus 评论系统

#### 步骤 1：启用 Discussions

1. 进入你的 GitHub 仓库
2. 点击 "Settings" → "General"
3. 滚动到 "Features" 部分
4. 勾选 "Discussions"

#### 步骤 2：配置 Giscus

1. 访问 https://giscus.app
2. 填写你的仓库信息：`KuroJim/KuroJim.github.io`
3. 选择配置：
   - 页面 ↔️ discussions 映射关系：`pathname`
   - Discussion 分类：`General` 或 `Announcements`
   - 主题：选择你喜欢的主题（推荐 `light` 或 `preferred_color_scheme`）
   - 语言：`zh-CN`
   - 特色：根据需要选择

4. 复制生成的配置数据

#### 步骤 3：更新配置文件

编辑 `src/components/Comments.astro`，替换以下值：

```astro
const GISCUS_CONFIG = {
  repo: '你的用户名/仓库名',
  repositoryId: '你的仓库ID',  // 从 Giscus 获取
  category: 'General',          // 或你选择的分类
  categoryId: '你的分类ID',     // 从 Giscus 获取
  mapping: 'pathname',
  strict: '0',
  theme: 'light',
  lang: 'zh-CN',
  loading: 'lazy',
};
```

### 3. 自定义个人信息

编辑以下文件以自定义你的个人信息：

#### `src/pages/index.astro`

修改首页内容：
- 你的名字
- 头像（使用你的图片替换）
- 个人简介
- 技能列表
- 社交链接

#### `src/components/Footer.astro`

更新页脚信息：
- 年份会自动更新
- 社交链接（GitHub、Email 等）

#### `astro.config.mjs`

更新网站配置：
```javascript
site: 'https://你的用户名.github.io',
```

### 4. 添加博客文章

在 `src/content/blog/` 目录下创建新的 `.md` 文件：

```markdown
---
title: '你的文章标题'
description: '文章描述'
pubDate: 2024-02-20
tags: ['标签1', '标签2']
heroImage: '/images/blog/cover.jpg'  # 可选
draft: false
---

# 文章内容

在这里写你的文章内容...
```

### 5. 添加图片

将图片放在 `public/images/` 目录下，引用时使用：
```
/images/your-image.jpg
```

## 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:4321

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 部署

提交代码到 `main` 分支，GitHub Actions 会自动构建并部署：

```bash
git add .
git commit -m "你的提交信息"
git push origin main
```

几分钟后，访问 `https://你的用户名.github.io` 即可看到你的网站。

## 自定义域名（可选）

### 1. 添加 CNAME 文件

在 `public/` 目录下创建 `CNAME` 文件：
```
yourdomain.com
```

### 2. 配置 DNS

在你的域名提供商处添加 DNS 记录：
- 类型：CNAME
- 名称：@（或你的子域名）
- 值：`你的用户名.github.io`

### 3. 启用自定义域名

在 GitHub 仓库设置中：
1. 进入 "Pages" 选项卡
2. 在 "Custom domain" 处输入你的域名
3. 等待 DNS 检查通过
4. 启用 "Enforce HTTPS"

## 常见问题

### 构建失败

检查 `package.json` 中的依赖是否正确安装：
```bash
rm -rf node_modules package-lock.json
npm install
```

### 评论不显示

1. 确认仓库已启用 Discussions
2. 检查 Giscus 配置是否正确
3. 确保评论系统配置中的 repositoryId 和 categoryId 正确

### 样式不正确

清除浏览器缓存或尝试无痕模式浏览。

## 需要帮助？

- 查看 [Astro 文档](https://docs.astro.build)
- 查看 [Tailwind CSS 文档](https://tailwindcss.com/docs)
- 查看 [Giscus 文档](https://github.com/giscus/giscus)

祝你使用愉快！
