# 博客编辑指南

本博客使用 GitHub 作为内容管理系统（CMS），你可以直接在浏览器中创建和编辑博客文章。

## 📝 创建新文章

### 方法一：使用博客列表页快捷入口

1. 访问 [博客列表页](https://kurojim.github.io/blog)
2. 点击页面顶部的 **"新建文章"** 按钮
3. 这会打开 GitHub 的文件创建页面

### 方法二：使用 GitHub 界面

1. 访问 [src/content/blog/](https://github.com/KuroJim/KuroJim.github.io/tree/master/src/content/blog)
2. 点击 **"Create new file"** 按钮
3. 命名文件为 `your-post-title.md`（使用小写字母和连字符）

### 使用文章模板

建议参考或复制 [`_template.md`](https://github.com/KuroJim/KuroJim.github.io/blob/master/src/content/blog/_template.md) 作为起始模板。

## 📄 文章格式

每篇博客文章需要在文件顶部包含 frontmatter（元数据）：

```yaml
---
title: '文章标题'
description: '文章简介，1-2句话概括文章内容'
pubDate: 2026-02-21
updatedDate: 2026-02-21  # 可选
tags: ['标签1', '标签2']
heroImage: '/images/blog/your-image.jpg'  # 可选
draft: true  # 设为 false 才会发布
---
```

### 元数据说明

| 字段 | 必需 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题 |
| `description` | ✅ | 文章简介（用于 SEO 和卡片描述） |
| `pubDate` | ✅ | 发布日期 |
| `updatedDate` | ⚪ | 最后更新日期（可选） |
| `tags` | ⚪ | 标签数组（可选） |
| `heroImage` | ⚪ | 特色图片路径（可选） |
| `draft` | ⚪ | 是否为草稿（默认 false） |

## 🖼️ 添加图片

1. 将图片放入 `public/images/blog/` 目录
2. 在文章中引用：`![alt text](/images/blog/your-image.jpg)`
3. 或设置为 heroImage：`heroImage: '/images/blog/your-image.jpg'`

## ✏️ 编辑现有文章

### 方法一：在文章页面直接编辑

1. 访问任意博客文章页面
2. 滚动到页面底部
3. 点击 **"编辑文章"** 按钮

### 方法二：通过 GitHub

1. 访问 [src/content/blog/](https://github.com/KuroJim/KuroJim.github.io/tree/master/src/content/blog)
2. 找到要编辑的 `.md` 文件
3. 点击文件名，然后点击铅笔图标 ✏️ 编辑

## 📤 发布文章

编辑完成后：

1. 在 GitHub 页面底部填写提交信息
2. 选择 **"Commit directly to the master branch"**
3. 点击 **"Commit changes"**

提交后，GitHub Actions 会自动构建并部署网站，通常在 1-2 分钟内生效。

## 🔄 草稿模式

如果想先保存文章但不发布，设置 `draft: true`：

```yaml
---
draft: true
---
```

草稿文章只在本地开发环境（`npm run dev`）中可见，生产环境不会显示。

准备发布时，将 `draft: false` 或删除这一行。

## 💡 Markdown 语法支持

- **标题**：`# H1` 到 `###### H6`
- **代码块**：\`\`\`language ... \`\`\`
- **行内代码**：\`code\`
- **粗体**：`**bold**`
- **斜体**：`*italic*`
- **链接**：`[text](url)`
- **图片**：`![alt](url)`
- **引用**：`> quote`
- **列表**：`- item` 或 `1. item`
- **表格**：支持 Markdown 表格语法

## 📱 预览更改

提交后可以在 [GitHub Actions](https://github.com/KuroJim/KuroJim.github.io/actions) 页面查看构建状态。

构建完成后访问 https://kurojim.github.io 查看效果。

## ❓ 反馈问题

如果在文章中发现错误，或有任何建议，可以点击文章底部的 **"反馈问题"** 按钮提交 Issue。
