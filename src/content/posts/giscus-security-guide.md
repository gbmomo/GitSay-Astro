---
title: '给网站添加评论区:giscus部署与垃圾评论过滤'
h1: 给网站添加评论区:giscus部署与垃圾评论过滤
description: >-
  从零配置Giscus评论系统，接入Akismet反垃圾过滤，再到防止他人滥用你的评论区配置，一站式解决网站评论安全问题。
date: '2025-01-16'
---
![Giscus评论系统安全配置](/img/posts/giscus-security-guide/cover.png)

想给网站加个评论系统，又不想自己搭服务器？Giscus 是个好选择！但评论区暴露在公网，垃圾评论和配置被盗用的问题也随之而来。这篇文章教你**从头搭建到全面防护**，让评论区既好用又安全。

---

## 🚀 快速部署 Giscus

Giscus 巧妙地把 GitHub Discussions 当成评论数据库，完全免费、无需自建服务器。

### 第一步：准备仓库

1. 创建一个 **公开仓库**（建议新开一个干净的空仓库专门存评论）
2. 进入仓库设置，启用 **Discussions** 功能

![启用 GitHub Discussions 功能](/img/posts/giscus-security-guide/02-giscus-repo-verify.png)

### 第二步：获取配置代码

前往 [giscus.app](https://giscus.app/zh-CN)，输入你的仓库地址，通过验证：

![验证仓库](/img/posts/giscus-security-guide/03-mapping-options.png)

#### 映射关系（重要！）

这决定了"哪条评论属于哪篇文章"：

![映射关系配置](/img/posts/giscus-security-guide/04-category-select.png)

| 选项 | 推荐度 | 说明 |
|------|--------|------|
| `pathname` | ⭐⭐⭐ | 只要文章路径不变，评论永远匹配 |
| `url` | ⭐ | 换域名就完蛋 |
| `title` | ⭐ | 改标题就完蛋 |

> 💡 **强烈推荐使用 `pathname`**。假如文章路径是 `posts/hello-world`，只要这个路径不变，评论和页面就永远对应。

#### 分类选择

推荐选择 `公告（Announcements）`：

![分类选择](/img/posts/giscus-security-guide/05-features.png)

#### 特性与主题

按需勾选特性，按喜好选择主题：

![特性配置](/img/posts/giscus-security-guide/06-theme-select.png)

![主题选择](/img/posts/giscus-security-guide/07-script-code.png)

#### 获取代码

最后复制生成的 JS 代码，放到你想展示评论的位置即可！

![生成的脚本代码](/img/posts/giscus-security-guide/08-akismet-register.png)

---

## 🛡️ 接入 Akismet 反垃圾系统

Giscus 搭建好了，但评论区迟早会被机器人盯上。Akismet 是 WordPress 创始人打造的老牌反垃圾系统，准确率极高。

### 获取 API Key

1. 注册 [akismet.com](https://akismet.com/)
2. 选择 **Akismet Personal** 订阅
3. 把价格滑块拖到 **$0**（个人博客免费用！）
4. 记下你的 **API Key**

![获取 API Key](/img/posts/giscus-security-guide/09-akismet-apikey.png)

### 部署 GitHub Action

前往:[https://github.com/gbmomo/GitSay-Astro-giscus/blob/main/.github/workflows/akismet-comment-check.yml](https://github.com/gbmomo/GitSay-Astro-giscus/blob/main/.github/workflows/akismet-comment-check.yml)

在你的 Giscus 仓库添加这个 Action(实在不会就把这个仓库fork一下然后添加Secret和修改giscus.json)。

然后配置两个 Secret：

首先创建 GitHub Token，需要 `repo`、`write:discussion`、`user` 权限：

![创建 GitHub Token](/img/posts/giscus-security-guide/10-github-token.png)

然后在仓库设置中添加 Secrets：

![配置仓库 Secrets](/img/posts/giscus-security-guide/ScreenShot_2026-01-16_123444_120.png)

| Secret 名称 | 获取方式 |
|-------------|----------|
| `AKISMET_API_KEY` | 刚才记下的 API Key |
| `GH_TOKEN` | 在 [GitHub Tokens](https://github.com/settings/tokens) 创建 |

### 测试是否生效

发一条内容为 `viagra-test-123` 的评论——这是 Akismet 的测试关键词，**保证被识别为垃圾**。

去 GitHub Actions 页面看看是否自动删掉了这条评论：

![垃圾评论被自动删除](/img/posts/giscus-security-guide/11-github-secrets.png)

成功就说明配置完成！

---

## 🚫 封禁恶意用户

有人绕过反垃圾疯狂刷屏？两招解决：

### 方法一：封禁特定用户

进入捣乱者的 GitHub 个人主页，点击封禁按钮即可。详见 [GitHub 官方文档](https://docs.github.com/zh/communities/maintaining-your-safety-on-github/blocking-a-user-from-your-personal-account)。

### 方法二：限制新用户

如果有人开小号刷评，开启仓库的临时交互限制：

```
https://github.com/你的用户名/你的仓库/settings/interaction_limits
```

![限制新用户](/img/posts/giscus-security-guide/12-spam-deleted.png)

配置后，新注册的账号就无法在你的仓库捣乱了。

---

## 🔒 防止评论区被"借用"

开源网站有个尴尬问题：有人 Fork 完代码直接上线，**连你的 Giscus 配置都没改**。

结果就是——别人的评论全跑到你这来了：

![收到别人网站的评论通知](/img/posts/giscus-security-guide/13-fork-email.png)

### 限制 Giscus 只为自己服务

在启用 Giscus 的仓库根目录创建 `giscus.json`：

```json
{
  "origins": ["https://你的域名.com"]
}
```

配置完成后，即使别人网站上还挂着你的评论区代码，**也会被直接拒绝加载**。

![拒绝加载](/img/posts/giscus-security-guide/15.png)

---

## ✅ 配置清单

Fork 开源网站模板后，上线前请确认：

- [ ] Giscus 仓库改成自己的
- [ ] `giscus.json` 配置了域名白名单
- [ ] Akismet 反垃圾已部署
- [ ] 所有 API 端点都指向自己的服务

> ⚠️ **重要提醒**：开源是为了学习，不是照搬。上线前一定要把别人的配置换成自己的！

---

*这篇文章帮到你了吗？欢迎在评论区告诉我！*
