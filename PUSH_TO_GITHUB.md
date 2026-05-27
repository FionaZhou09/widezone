# 推送到 GitHub 的步骤

## 方式 1：直接从这个沙盒推送（需要 GitHub token）

如果你有 GitHub Personal Access Token，运行：

```bash
cd /home/user/wide-zone-crm
git remote set-url origin https://YOUR_GITHUB_TOKEN@github.com/FionaZhou09/widezone.git
git branch -M main
git push -u origin main --force
```

## 方式 2：下载后从本地推送（推荐）

1. 下载源代码：
   - 在 Vercel 部署后，从 Vercel dashboard 下载
   - 或者让我帮你生成 ZIP 文件

2. 在本地解压后执行：

```bash
cd widezone
git init
git add .
git commit -m "Initial commit: Wide Zone Food CRM"
git branch -M main
git remote add origin https://github.com/FionaZhou09/widezone.git
git push -u origin main
```

## 项目结构

- `/src/app/` - Next.js App Router 页面和 API 路由
- `/src/components/` - React 组件
- `/src/lib/` - 工具函数、数据库查询、MCP 工具
- `/scripts/` - 数据库种子脚本

## 环境变量（已自动配置）

项目使用 Eazo 平台内置服务：
- EAZO_PRIVATE_KEY - 认证和 AI
- DATABASE_URL - PostgreSQL 数据库
- NEXT_PUBLIC_EAZO_APP_ID - 应用 ID

这些变量在 Vercel 部署时会自动配置。

