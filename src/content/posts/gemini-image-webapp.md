---
title: '从零搭建私有化 AI 图片生成网站：Gemini Image Webapp 开源项目详解'
h1: 从零搭建私有化 AI 图片生成网站
description: >-
  基于 Google Gemini API 打造的开源 AI 图片生成平台，支持文生图、图生图、多轮对话迭代、用户管理与点数计费系统，5 分钟即可部署属于你自己的 AI 绘图网站。
date: '2026-02-10'
---
![开源 AI 图片生成网站](/img/posts/gemini-image-webapp/cover.jpeg)

你有没有想过，搭建一个属于自己的 AI 图片生成网站？不依赖第三方平台，完全私有化部署，数据安全可控？

**[Gemini Image Webapp](https://github.com/gbmomo/gemini-image-webapp)** 就是为此而生的开源项目。只需一个 Google Gemini API Key，5 分钟内就能拥有一个功能完整的 AI 绘图平台——用户注册、点数计费、卡密充值、管理后台，一应俱全。

> 🔗 **GitHub 仓库**：[github.com/gbmomo/gemini-image-webapp](https://github.com/gbmomo/gemini-image-webapp)
>
> 🌐 **在线演示**：[https://nano.gitsay.com/](https://nano.gitsay.com/)

---

## 它能做什么？

简单来说，这是一个 **开箱即用的 AI 图片生成网站系统**。底层调用 Google Gemini 图像生成模型，前端是精心打磨的 Web 界面，后端用 Flask 搭建，中间有一套完整的用户和计费体系。

### 🎨 AI 生图能力

| 功能 | 描述 |
|------|------|
| **文生图** | 输入一段文字描述，AI 自动生成对应图片 |
| **图生图** | 上传参考图片 + 描述，AI 在此基础上修改创作 |
| **多轮对话** | AI 记住上下文，你可以不断对图片进行迭代调整 |
| **多参考图** | 最多同时上传 14 张参考图片 |
| **高分辨率** | 支持 1K / 2K / 4K 三种分辨率输出 |
| **多纵横比** | 1:1、16:9、9:16、4:3、21:9 等多种比例自由选择 |

举个例子，你可以先生成一张"樱花树下奔跑的柯基犬"，然后对 AI 说"把背景换成星空"、"让色彩更鲜艳"——AI 记住之前的图片，持续帮你迭代优化，直到满意为止。

---

## 效果展示

先上图，感受一下实际效果：

### 登录与注册

![登录界面](/img/posts/gemini-image-webapp/login.png)

![注册页面](/img/posts/gemini-image-webapp/register.png)

极简的登录注册界面，支持邮箱验证码注册，防止滥注册。新用户注册即送 4 点数，开箱即用。

### 网站首页

![网站首页](/img/posts/gemini-image-webapp/homepage.png)

首页即工作台。左侧是会话管理，中间是对话区域，会话管理下方可以选择分辨率和纵横比。界面简洁现代，所有功能触手可及。

### AI 图片生成效果

![AI 图片生成效果](/img/posts/gemini-image-webapp/generation.png)

实际生成效果展示。支持多轮对话迭代——你可以不断调整描述，AI 会基于之前的结果持续优化。

### 管理员后台

![管理员后台](/img/posts/gemini-image-webapp/admin.png)

功能完备的管理后台，用户管理、点数充值、卡密生成、数据清理，一目了然。

---

## 不只是能画图

很多 AI 绘图工具都能画图，但这个项目真正的价值在于它是一个 **完整的网站系统**。

### 👥 用户管理系统

- **邮箱验证注册** — 防止机器人注册，需要邮箱验证码
- **安全登录** — 密码哈希存储，不是明文
- **多会话管理** — 可以同时维护多个对话，随时切换

### 💰 点数计费体系

按分辨率精细化计费：

| 分辨率 | 消耗点数 | 适用场景 |
|--------|----------|----------|
| **1K** | 🪙 1 点 | 快速预览、看个大概效果 |
| **2K** | 🪙 2 点 | 日常使用（推荐） |
| **4K** | 🪙 4 点 | 高清壁纸、需要印刷的场景 |

管理员账号免费使用，不消耗点数。

### 🎫 卡密充值系统

管理员可以批量生成充值卡密，用户通过卡密自助充值。适合小团队内部分发或者做小规模运营。

---

## 安全性

作为一个可能面向公网的 Web 应用，安全性不能马虎。这个项目内置了多重安全防护：

- ✅ **CSRF 防护** — 阻止跨站请求伪造攻击
- ✅ **速率限制** — 防暴力破解登录密码
- ✅ **密码哈希** — bcrypt 安全存储，不存明文
- ✅ **Session 安全** — 合理的会话配置
- ✅ **路径遍历防护** — 防止通过 URL 访问系统文件
- ✅ **HTTPS 强制** — 生产环境自动强制 HTTPS
- ✅ **本地数据** — 所有数据存储在本地 SQLite，不会上传到任何第三方

> 🛡️ 你的用户数据、对话记录、生成的图片，全部加密存储在你自己的服务器上，隐私完全可控。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| **后端** | Python 3.10+ / Flask 3.0+ |
| **数据库** | SQLite（零配置，开箱即用） |
| **前端** | 原生 HTML / CSS / JavaScript |
| **AI 引擎** | Google Gemini API（gemini-3-pro-image-preview） |
| **部署** | Gunicorn + Nginx / 1Panel / Docker |

项目结构清晰，代码量不大但功能完整，非常适合作为 Flask + AI API 的学习项目。

---

## 5 分钟快速部署

下面是最精简的部署教程。如果你在某个步骤遇到问题，建议查看 **[GitHub 仓库的完整 README](https://github.com/gbmomo/gemini-image-webapp#readme)**，那里有更详细的说明和常见问题解答。

### 1. 克隆仓库

```bash
git clone https://github.com/gbmomo/gemini-image-webapp.git
cd gemini-image-webapp
```

### 2. 安装依赖

确保你的系统已安装 **Python 3.10+**，然后：

```bash
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate # macOS/Linux

pip install -r requirements.txt
```

### 3. 获取 Gemini API Key

1. 访问 [Google AI Studio](https://aistudio.google.com/apikey)
2. 登录你的 Google 账号
3. 点击「Create API Key」创建一个新的 API Key
4. 复制生成的 API Key（形如 `AIzaSy...`）

> ⚠️ 请妥善保管你的 API Key，不要泄露给他人！

### 4. 配置环境变量

```bash
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux
```

编辑 `.env` 文件，以下是 **必填** 和 **可选** 配置的完整说明：

#### 必填项（填这三个就能跑起来！）

```env
GEMINI_API_KEY=你的Gemini_API_Key
SECRET_KEY=一串随机复杂字符串（用于加密用户会话）
ADMIN_PASSWORD=管理员密码
```

#### 可选配置一览

除了三项必填配置外，项目还支持以下环境变量，用于自定义各项功能：

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `GEMINI_MODEL` | 使用的 Gemini 模型名称 | `gemini-3-pro-image-preview` |
| `GEMINI_API_BASE_URL` | 自定义 API 代理地址（见下方说明） | Google 官方地址 |
| `EMAIL_SENDER` | 发送验证码的邮箱地址 | 空 |
| `EMAIL_PASSWORD` | 邮箱授权码（注意：不是登录密码） | 空 |
| `SMTP_SERVER` | SMTP 服务器地址，如 `smtp.qq.com` | 空 |
| `SMTP_PORT` | SMTP 端口号 | `465` |
| `FLASK_ENV` | 设为 `production` 开启生产模式（强制 HTTPS 等） | 空 |
| `FLASK_DEBUG` | 设为 `True` 开启调试模式（仅开发时使用） | `False` |

> 💡 以上列出了主要的配置项。**详细的环境变量说明和示例请参考仓库中的 [`.env.example`](https://github.com/gbmomo/gemini-image-webapp/blob/main/.env.example) 文件**，或查阅 **[README 文档](https://github.com/gbmomo/gemini-image-webapp#readme)** 获取最新信息。

#### 关于 API 代理

如果你无法直接访问 Google API，可以通过 `GEMINI_API_BASE_URL` 设置代理：

```env
GEMINI_API_BASE_URL=http://你的代理地址:端口
GEMINI_API_KEY=你的API密钥
```

> ⚠️ **重要**：本项目使用 **Gemini 官方 API 协议**（`/v1beta/models` 端点格式），**不兼容 OpenAI API 格式**。使用第三方代理前请确保其兼容 Gemini 协议。

### 5. 启动

```bash
python app.py
```

打开浏览器访问 `http://127.0.0.1:5000`，用 `admin` + 你设置的密码登录，就能开始生成图片了。

---

## 生产环境部署

如果要把网站部署到公网，推荐使用 **1Panel 面板**，操作最简单：

1. 上传项目代码到服务器
2. 在 1Panel 创建 Python 运行环境
3. 启动命令填：`pip install -r requirements.txt && gunicorn -w 6 -b 0.0.0.0:5000 --timeout 300 app:app`
4. 配置环境变量（参考上面的环境变量表格）
5. 创建反向代理网站 + SSL 证书

当然也支持 Docker 部署、宝塔面板、手动 Gunicorn + Nginx 等方式。更多部署细节请参考 **[GitHub 仓库 README](https://github.com/gbmomo/gemini-image-webapp#-生产环境部署)**。

---

## 国际化支持

项目内置中英文双语支持，自动检测浏览器语言偏好。你也可以在 `static/js/i18n.js` 中手动设置默认语言：

```javascript
const DEFAULT_LANG = 'zh';  // 改成 'en' 即默认英文
```

---

## 适合谁用？

- 🎨 **个人玩家** — 想要一个私有 AI 绘图工具
- 💼 **小团队** — 内部使用的 AI 图片生成服务
- 📚 **学习者** — Flask + AI API 开发的绝佳实战项目
- 🔧 **创业者** — 打算做 AI 图片相关服务的起步方案

---

## 写在最后

这个项目的核心理念是 **"拿来就能用"** ——不需要你懂机器学习，不需要你有 GPU 服务器，只要有一个 Gemini API Key，就能拥有一个完整的 AI 图片生成平台。

👉 **GitHub 仓库**：[github.com/gbmomo/gemini-image-webapp](https://github.com/gbmomo/gemini-image-webapp) — ⭐ Star 支持一下！

如果你有兴趣，欢迎去 [GitHub 仓库](https://github.com/gbmomo/gemini-image-webapp) 查看源码、阅读完整文档、提出 Issue，或者直接访问 [在线演示](https://nano.gitsay.com/) 体验一下效果。

> 📄 本项目采用 [CC BY-NC-SA 4.0](https://github.com/gbmomo/gemini-image-webapp/blob/main/LICENSE) 许可证开源，禁止商用。如需商用授权请联系作者。

---

*这篇文章帮到你了吗？欢迎在评论区留言！*
