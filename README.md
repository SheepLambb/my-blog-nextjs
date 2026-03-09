# my-blog-nextjs（Next.js 全栈博客最小可运行项目）

网站地址
https://traemy-blog-nextjs2706.vercel.app
https://sheeplamb.vercel.app/

终端更新
npx vercel login
npx vercel --prod

git的更新
git
git add .
git commit -m "Update content and fonts"
git push

这是一个 **Next.js App Router + TypeScript** 的个人博客项目：
- 文章用 **MDX** 存在 `content/posts/`
- 首页展示文章列表
- 文章详情页：`/blog/[slug]`
- 后端 API：`/api/posts` 返回文章元数据 JSON

## 1) 本地运行（推荐）

### 环境要求
- Node.js 18+（建议 20+）
- npm 9+（或 pnpm / yarn 也可以）

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```
打开： http://localhost:3000

## 2) 添加新文章
在 `content/posts/` 新建 `.mdx` 文件，例如：
`content/posts/my-post.mdx`

MDX 顶部 Frontmatter 例子：
```mdx
---
title: "标题"
date: "2026-01-06"
description: "一句话简介"
---

# 正文
```

## 3) 打包与本地生产环境运行
```bash
npm run build
npm run start
```

## 4) 部署到 Vercel（最省事）
1. 把项目推到 GitHub（或 GitLab）
2. 打开 https://vercel.com/ → Add New Project → 选择你的仓库 → Deploy
3. 部署完成后会得到一个默认链接，例如 `https://xxx.vercel.app`

### 绑定你自己的域名（可选）
1. 在 Vercel 项目 → Settings → Domains → Add Domain
2. 按提示去域名服务商 DNS 添加记录：
   - 常见是 `CNAME` 指向 Vercel 给你的目标
   - 根域名可能提示添加 `A` 记录
3. Vercel 会自动配置 HTTPS（SSL）

## 5) 常见问题
- Windows 解压后路径太长：尽量解压到较短路径，比如 `D:\projects\`
- 如果文章中文乱码：确保你的 `.mdx` 文件用 UTF-8 保存


