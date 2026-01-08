# 生产环境准备清单

## ✅ 已完成的优化

模板已完成以下改进：

1. **配置**
   - 设置集中在 `src/config/site.ts`，区域元数据在 `src/config/locales.ts`。
   - 导航、分类、项目和联系链接根据语言环境自动解析。
   - 动态清单文件 (`src/pages/manifest.webmanifest.ts`) 和 robots.txt (`src/pages/robots.txt.js`)。

2. **SEO 与元数据**
   - ✅ 安全头配置（CSP 升级、X-Content-Type-Options、Referrer-Policy）。
   - ✅ 主题色媒体查询、规范链接、上一页/下一页分页标签。
   - ✅ 支持语言环境的 RSS 订阅源（`/rss.xml`）和站点地图索引。
   - ✅ OpenGraph/Twitter 标签从配置和文章元数据解析。

3. **性能**
   - ✅ 通过 `astro-purgecss` 进行 CSS 清除，构建后脚本进行 CSSO 压缩。
   - ✅ 使用 esbuild 组装关键客户端包（`scripts/build-client.mjs`）。
   - ✅ 将 Medium-zoom 类加入白名单以避免 PurgeCSS 误删。
   - ✅ 每页只注入一次分类/搜索数据以保持客户端脚本精简。

4. **中文优化**
   - ✅ 仅保留简体中文语言支持。
   - ✅ 集成微信、QQ、Bilibili、抖音等国内社交媒体链接。
   - ✅ 针对中文环境进行了深度定制。

## 📋 生产环境部署前的必要操作

### 1. **更新配置**

编辑 `src/config/site.ts`：

- [ ] 更新 `title` 为你的博客名称
- [ ] 更新 `description`
- [ ] 将 `siteUrl` 替换为你的实际域名
- [ ] 更新作者信息（`author.name`、`author.email`、`author.bio`）
- [ ] 更新 `contactLinks` 为你的社交或联系方式
- [ ] 配置功能开关（深色模式、搜索、RSS 等）
- [ ] 更新分类或添加新分类
- [ ] 设置 Google Analytics ID（如需使用）

#### `package.json`
- [ ] 更新 `name` 字段
- [ ] 更新 `description`
- [ ] 更新 `author` 字段
- [ ] 更新 `repository` 仓库地址
- [ ] 更新 `homepage` 主页地址

#### 清单文件 (`src/pages/manifest.webmanifest.ts`)
- [ ] 更新 `name`、`short_name` 和 `description`
- [ ] 如果部署在子路径下，调整 `start_url` / `scope`
- [ ] 将图标定义指向你的真实网站图标
- [ ] 将 `theme_color` 和 `background_color` 设置为你的品牌色

### 2. **替换资源文件**

#### 网站图标
- [ ] 替换 `/public/favicon.ico`
- [ ] 替换 `/public/favicon.svg`
- [ ] 替换 `/public/favicon-16x16.png`
- [ ] 替换 `/public/favicon-32x32.png`

#### 图片
- [ ] 替换 `/public/img/profile.png`（头像）
- [ ] 替换 `/public/img/og-image.svg`（Open Graph 社交分享图片）
- [ ] 替换 `/public/img/rss-logo.svg` 或 `/public/img/rss-logo.png`（RSS 频道 logo，144x144px）
- [ ] 考虑替换文章中的占位图片

### 3. **内容更新**
- [ ] 更新或删除示例博客文章
- [ ] 更新关于页面内容
- [ ] 添加你自己的博客文章
- [ ] 根据需要审查和更新分类

### 4. **可选增强**

#### 无障碍改进
- [ ] 为所有图片添加适当的 alt 文本
- [ ] 为交互元素添加 aria-labels
- [ ] 使用屏幕阅读器测试
- [ ] 确保颜色对比度符合 WCAG 标准

#### 安全性
- [ ] 考虑添加内容安全策略（CSP）头
- [ ] 在托管服务上启用 HTTPS
- [ ] 如需要，配置适当的 CORS

#### 性能
- [ ] 优化图片（WebP 格式、适当尺寸）
- [ ] 考虑为静态资源使用 CDN
- [ ] 在服务器上启用 HTTP/2
- [ ] 配置适当的缓存头

#### 分析与监控
- [ ] 设置 Google Analytics 或替代方案
- [ ] 配置错误追踪（如 Sentry）
- [ ] 设置正常运行时间监控
- [ ] 配置性能监控

## 🚀 部署清单

1. [ ] 本地运行 `npm run build` 并确认没有错误
2. [ ] 本地测试所有页面和功能
3. [ ] 在 https://validator.w3.org/feed/ 验证 RSS 订阅源
4. [ ] 在 Google Search Console 测试站点地图
5. [ ] 使用社交媒体调试工具检查所有 meta 标签
6. [ ] 在多种设备和浏览器上测试
7. [ ] 设置自动化部署（GitHub Actions、Netlify、Vercel 等）
8. [ ] 配置自定义域名和 SSL
9. [ ] 向搜索引擎提交站点地图
10. [ ] 上线后监控 Core Web Vitals

## 📝 上线后任务

1. [ ] 监控 404 错误并修复断链
2. [ ] 检查 Google Search Console 的问题
3. [ ] 监控页面加载性能
4. [ ] 收集用户反馈
5. [ ] 定期更新内容
6. [ ] 保持依赖项更新

### 5. **功能验证**

1. [ ] 检查所有分类页面是否正确加载
2. [ ] 验证 RSS 订阅源（`/rss.xml`）
3. [ ] 测试 `/sitemap-index.xml` 的站点地图生成
4. [ ] 验证 `/robots.txt`
5. [ ] 测试主题切换功能
6. [ ] 测试搜索功能

---

**注意**：此模板从技术角度已具备生产准备状态。剩余任务主要是针对你的具体用例的自定义和内容更新。
