# 码言-GitSay-码上有言，技术有料

一个基于 Astro 构建的现代化、高性能的博客。

> **致谢 / Credits**
>
> 本项目使用的模板是基于 [morethan-log-astro](https://github.com/JustSereja/morethan-log-astro) 进行的二次开发。感谢原作者 [JustSereja](https://github.com/JustSereja) 提供的优秀基础。
>
> 原始模板项目地址: https://github.com/JustSereja/morethan-log-astro

## 🌟 特性

- **⚡️ 极速体验** - 基于 Astro 构建，性能卓越。
- **📱 响应式设计** - 完美适配桌面端和移动端。
- **🀄️ 中文优化** - 针对中文环境进行了深度定制和优化 (默认简体中文)。
- **🌙 深色模式** - 支持自动切换和手动切换深色/浅色主题。
- **🔍 全局搜索** - 内置强大的文章搜索功能。
- **📂 分类管理** - 支持博客、技术、项目等多种分类。
- **🛰 社交链接** - 集成微信、QQ、Bilibili、抖音等国内主流社交媒体链接。
- **👌 SEO 友好** - 内置 Sitemap、RSS 订阅和详细的 Meta 标签配置。

## 🛠️ 技术栈

- **Astro 5.0+**
- **React 19**
- **TypeScript**

## 🔓 快速开始

### 环境要求

- Node.js 18+
- npm

### 安装与运行

1. 下载或克隆本项目：

```bash
git clone https://github.com/gbmomo/GitSay-Astro.git
cd GitSay-Astro
```

2. 安装依赖：

```bash
npm install
```

3. 启动开发服务器：

```bash
npm run dev
```

访问 `http://localhost:4321` 即可预览。

## ⚙️ 配置说明

项目的核心配置位于 `src/config/site.ts` 文件中，你可以在这里修改：

- 网站标题、描述
- 作者信息 (头像、简介)
- 社交媒体链接
- 开启/关闭特定功能 (如搜索、RSS、Sitemap 等)

## 📝 编写文章

在 `src/content/posts/zh/` 目录下创建 Markdown (`.md`) 或 MDX (`.mdx`) 文件即可开始写作。

## 📄 许可证

本项目的**源代码**遵循 [MIT 许可证](LICENSE)。

本项目的**网站内容**（文章、图片等资源）遵循 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议。转载请注明出处，禁止用于商业目的。
