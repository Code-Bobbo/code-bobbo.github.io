# VitePress 项目部署到 GitHub Pages

这是一个使用 VitePress 构建的静态网站项目，配置为自动部署到 GitHub Pages。

## 部署步骤

### 1. 创建 GitHub 仓库

有两种部署方式：

#### 方式一：部署到 `username.github.io` (推荐)
1. 在 GitHub 上创建一个名为 `username.github.io` 的仓库（将 `username` 替换为你的 GitHub 用户名）
2. 将此项目代码推送到该仓库
3. 网站将可通过 `https://username.github.io` 访问

#### 方式二：部署到普通仓库
1. 创建任意名称的 GitHub 仓库（例如：`my-vitepress-site`）
2. 修改 `.vitepress/config.mjs` 中的 `base` 配置：
   ```js
   base: '/my-vitepress-site/', // 替换为你的仓库名
   ```
3. 网站将可通过 `https://username.github.io/my-vitepress-site` 访问

### 2. 配置 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

### 3. 推送代码

```bash
# 初始化 git 仓库（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/username/username.github.io.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送到 main 分支
git push -u origin main
```

### 4. 自动部署

一旦代码推送到 `main` 分支，GitHub Actions 将自动：
1. 安装依赖
2. 构建 VitePress 网站
3. 部署到 GitHub Pages

你可以在仓库的 **Actions** 标签中查看部署进度。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 项目结构

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── .vitepress/
│   ├── config.mjs              # VitePress 配置文件
│   └── theme/                  # 主题文件
├── index.md                    # 首页
├── markdown-examples.md        # Markdown 示例
├── api-examples.md            # API 示例
└── package.json               # 项目依赖
```

## 自定义配置

- 修改网站标题和描述：编辑 `.vitepress/config.mjs`
- 添加新页面：在根目录创建 `.md` 文件
- 自定义主题：修改 `.vitepress/theme/` 目录下的文件
- 配置导航和侧边栏：在 `.vitepress/config.mjs` 中的 `themeConfig` 部分

## 注意事项

1. 确保 GitHub 仓库是公开的（GitHub Pages 免费版只支持公开仓库）
2. 首次部署可能需要几分钟时间
3. 每次推送到 `main` 分支都会触发重新部署
4. 如果使用自定义域名，需要在仓库根目录添加 `CNAME` 文件