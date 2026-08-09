---
title: '2026 最新版：从零部署 Gemini Nano Banana AI 图片生成网站'
h1: 从零部署 Gemini Nano Banana AI 图片生成网站
description: >-
  基于 Flask 和 Gemini 图像模型的开源自托管图片生成平台，支持文生图、参考图生图、多轮迭代、用户与点数系统、卡密充值、管理后台和宝塔面板生产部署。
date: '2026-08-09'
---

![Gemini Nano Banana AI 图片生成网站](/img/posts/gemini-image-webapp/cover.jpeg)

想搭建一个属于自己的 AI 图片生成网站，又不想从用户注册、点数扣费、会话管理和后台配置开始重复造轮子？

**[Gemini Image Webapp](https://github.com/gbmomo/gemini-image-webapp)** 是一个基于 Flask 和 Gemini 图像模型的开源自托管项目。它不仅能文生图、参考图生图和多轮修改图片，还包含用户系统、点数计费、卡密充值、管理后台、数据清理和生产环境安全配置。

> 🔗 **GitHub 仓库**：[github.com/gbmomo/gemini-image-webapp](https://github.com/gbmomo/gemini-image-webapp)
>
> 🌐 **在线演示**：[https://nano.gitsay.com/](https://nano.gitsay.com/)

> 本文已于 2026 年 8 月按项目当前 `main` 分支重新整理。项目仍在更新，部署前建议再查看仓库中的[中文 README](https://github.com/gbmomo/gemini-image-webapp#readme)。

---

## 项目能做什么？

### AI 生图与多轮迭代

| 功能 | 当前实现 |
|---|---|
| **文生图** | 输入提示词直接生成图片 |
| **参考图生图** | 选择、拖拽或粘贴参考图，再结合提示词修改 |
| **多轮对话** | 在同一会话中保留上下文，继续调整上一轮图片 |
| **多参考图** | 根据模型能力，单次最多支持 14 张参考图 |
| **多分辨率** | 支持 512、1K、2K、4K，实际选项由模型决定 |
| **多种比例** | 支持常见横屏、竖屏和方形比例，部分模型还有超宽/超长比例 |

例如，先生成“樱花树下奔跑的柯基犬”，再继续要求“把背景换成星空”“改成电影海报构图”，系统会把当前会话历史交给模型继续迭代。

### 当前模型能力

模型、分辨率、比例和参考图数量都会在后端校验，不只是前端把选项隐藏起来。

| 模型 ID | 界面名称 | 分辨率 | 最大参考图数 |
|---|---|---:|---:|
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | 1K | 14 |
| `gemini-3.1-flash-image` | Nano Banana 2 | 512、1K、2K、4K | 14 |
| `gemini-3-pro-image` | Nano Banana Pro | 1K、2K、4K | 14 |
| `gemini-2.5-flash-image` | Nano Banana | 1K | 3 |

通用比例包括 `1:1`、`2:3`、`3:2`、`3:4`、`4:3`、`4:5`、`5:4`、`9:16`、`16:9` 和 `21:9`。Nano Banana 2 还支持 `1:4`、`1:8`、`4:1`、`8:1`。

参考图支持 PNG、JPEG、GIF、WEBP 和 ICO。默认限制为：单张不超过 10 MiB、单次请求合计不超过 35 MiB、单张不超过 4000 万像素。

---

## 效果展示

### 登录与注册

![登录界面](/img/posts/gemini-image-webapp/login.png)

![注册页面](/img/posts/gemini-image-webapp/register.png)

项目支持邮箱验证码注册、用户名密码登录和退出登录。新用户默认赠送 4 点，可在代码中按自己的需求调整。

### 网站首页

![网站首页](/img/posts/gemini-image-webapp/homepage.png)

首页就是工作台：左侧管理多个会话，中间显示对话与生成结果，下方选择模型、分辨率、比例并添加参考图。首轮成功后，会话会根据提示词自动命名，并锁定本会话的模型参数。

### AI 图片生成效果

![AI 图片生成效果](/img/posts/gemini-image-webapp/generation.png)

生成图可以预览和下载；如果模型调用失败、只返回文本、返回空内容或图片保存失败，系统会退回本次预留点数。

### 管理员后台

![管理员后台](/img/posts/gemini-image-webapp/admin.png)

管理员后台可以管理用户、角色、点数、会话和消息，批量生成卡密，清理历史数据，配置 API/SMTP，设置默认模型，并按“模型 + 分辨率”调整价格。

---

## 用户、点数与卡密系统

### 用户系统

- 用户名唯一，长度为 3～64 个字符。
- 邮箱唯一，验证码为 6 位数字、10 分钟有效且只能使用一次。
- 用户密码保存为带盐哈希，不会明文写入数据库。
- 每个用户只能通过应用路由访问自己的生成图、参考图和缩略图；管理员可以查看全部数据。

### 点数计费

未在后台自定义价格时，默认点数如下：

| 分辨率 | 默认点数 |
|---|---:|
| 512 | 1 |
| 1K | 1 |
| 2K | 2 |
| 4K | 4 |

普通用户生成前会原子预留点数，成功保存图片和会话后才正式扣除。管理员生成不扣点。后台可以为每个模型支持的分辨率单独设价，价格设为 `0` 时普通用户也可免费生成。

### 卡密充值

管理员每批可以生成 1～100 张卡密。完整卡密只在生成响应中显示一次，数据库保存验证哈希、查找值和安全前缀，之后后台只显示前缀和使用记录。

---

## 安全与隐私边界

旧版文章曾把“本地存储”和“全部加密”混为一谈，这里按当前代码说明真实边界：

- 所有非安全 HTTP 方法都进行 CSRF 校验，并对登录、验证码、注册和生成接口限流。
- Session Cookie 使用 `HttpOnly`、`SameSite=Lax`，生产环境启用 `Secure`。
- 用户密码和验证码使用带盐哈希；卡密不保存可直接兑换的明文。
- 在后台保存的 API Key 和 SMTP 密码使用独立的 `CREDENTIAL_ENCRYPTION_KEY` 进行 Fernet 加密。
- 会话 JSON、邮箱地址、生成图、参考图和缩略图仍是服务器磁盘上的明文数据，需要依靠系统文件权限、磁盘加密和备份策略保护。
- 生成时，提示词、会话上下文和参考图会发送给你配置的 Gemini 或兼容 API Provider；注册时，邮箱地址和验证码会发送给 SMTP 服务。
- 自定义 API 端点会校验 URL。生产环境中的远程端点必须使用 HTTPS，且更换 Provider 或端点时必须重新输入 API Key，避免把旧密钥静默发送到新服务。

因此，“自托管”表示应用数据库和文件由你控制，并不表示生成内容从不离开服务器。部署者仍需要向用户说明所使用的 AI 与邮件服务如何处理数据。

---

## 技术栈

| 层级 | 技术 |
|---|---|
| **后端** | Python 3.10+、Flask 3.x |
| **数据库** | SQLite、WAL、外键与忙等待 |
| **前端** | 原生 HTML、CSS、JavaScript，中英文切换 |
| **AI SDK** | Google Gen AI SDK，支持官方和兼容 Gemini 协议的自定义端点 |
| **生产部署** | Gunicorn + Nginx，或宝塔 Python 项目 |

项目没有提供 Dockerfile，也不依赖 WebSocket。生产环境使用普通 HTTP 反向代理即可。

---

## 本地快速开始

### 1. 克隆项目并创建虚拟环境

```bash
git clone https://github.com/gbmomo/gemini-image-webapp.git
cd gemini-image-webapp

python -m venv .venv
```

激活虚拟环境并安装依赖：

```bash
# Windows PowerShell
.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate

python -m pip install -r requirements.txt
```

### 2. 生成两个不同的密钥

```bash
# Flask Session 和 CSRF 签名密钥
python -c "import secrets; print(secrets.token_hex(32))"

# 后台 API/SMTP 数据库凭据加密密钥
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

这两个密钥用途不同，不能复用。

### 3. 配置 `.env`

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

最少填写以下三项：

```ini
SECRET_KEY=第一个命令生成的随机值
ADMIN_PASSWORD=你的管理员密码
CREDENTIAL_ENCRYPTION_KEY=第二个命令生成的Fernet密钥
```

`ADMIN_PASSWORD` 没有默认值，缺失时程序会拒绝启动。生产环境要求至少 12 个字符，并包含小写字母、大写字母、数字、符号四类中的至少三类。

### 4. 启动并配置 API

```bash
python app.py
```

访问 `http://127.0.0.1:5000`，使用账号 `admin` 和 `ADMIN_PASSWORD` 登录。推荐在管理后台填写 Gemini API Key、自定义端点和 SMTP 设置；API Key 与 SMTP 密码会加密后保存到 SQLite。

也可以只使用环境变量：

```ini
GEMINI_API_KEY=你的API_Key
# GEMINI_API_BASE_URL=https://兼容Gemini协议的自定义端点

# 邮箱验证码功能（可选）
EMAIL_SENDER=发件邮箱
EMAIL_PASSWORD=SMTP密码或授权码
SMTP_SERVER=SMTP服务器
SMTP_PORT=465
```

后台保存的 API 配置整体优先于 `GEMINI_*` 环境变量；SMTP 则逐字段使用“数据库非空值优先，否则回退环境变量”。后台只会显示敏感字段已经配置，不会把 API Key 或 SMTP 密码明文回显到页面。

---

## 关键环境变量

| 变量 | 默认值 | 作用 |
|---|---|---|
| `SECRET_KEY` | 无 | Flask Session 和 CSRF 签名，必须设置 |
| `ADMIN_PASSWORD` | 无 | `admin` 密码，必须设置 |
| `CREDENTIAL_ENCRYPTION_KEY` | 无 | 加密后台 API/SMTP 凭据，使用后台配置时必须长期保留 |
| `GEMINI_API_KEY` | 空 | 环境变量方式的 Gemini API Key |
| `GEMINI_API_BASE_URL` | 空 | 兼容 Gemini 协议的自定义端点 |
| `DEFAULT_MODEL` | `gemini-3.1-flash-image` | 新会话默认模型 |
| `FLASK_ENV` | `development` | 生产环境设为 `production` |
| `FLASK_DEBUG` | `False` | 生产环境保持关闭 |
| `TRUST_PROXY_COUNT` | `0` | 可信反向代理层数，单层 Nginx 通常设为 `1` |
| `RATELIMIT_STORAGE_URI` | `memory://` | 多 worker 时改为共享 Redis |
| `DATABASE_FILE` | `data/users.db` | SQLite 数据库位置 |
| `MAX_REQUEST_BYTES` | `52428800` | HTTP 请求体上限，默认 50 MiB |

完整列表见项目的 [`.env.example`](https://github.com/gbmomo/gemini-image-webapp/blob/main/.env.example) 和 [README 环境变量章节](https://github.com/gbmomo/gemini-image-webapp#环境变量)。

---

## 宝塔面板生产部署

推荐结构是：

```text
浏览器 HTTPS → Nginx → 127.0.0.1:5000 → Gunicorn → Flask
```

不要使用 `python app.py` 对公网提供生产服务，也不要在安全组或宝塔防火墙开放 5000 端口。

### 1. 准备服务器、代码和备份

在宝塔安装 Nginx 和 Python 项目管理功能，准备一个已经解析到服务器的域名。升级已有实例前，至少备份：

- `data/users.db`
- `data/sessions/`
- `static/images/`
- `static/thumbnails/`
- 与数据库配套的原 `CREDENTIAL_ENCRYPTION_KEY`

已有数据库的 `CREDENTIAL_ENCRYPTION_KEY` 不能随意重新生成，否则后台保存的 API/SMTP 凭据将无法解密。

### 2. 安装 Python 并创建虚拟环境

进入宝塔「网站」→「Python 项目」→「Python 环境管理」→「版本管理」，安装 Python 3.10 或更高版本。

![安装 Python 版本](/img/posts/gemini-image-webapp/python版本安装界面.png)

随后创建独立虚拟环境，避免不同项目互相影响。

![创建虚拟环境](/img/posts/gemini-image-webapp/创建虚拟环境界面.png)

### 3. 上传或拉取项目

```bash
cd /www/wwwroot
git clone https://github.com/gbmomo/gemini-image-webapp.git
cd gemini-image-webapp
```

不要上传本地 `.env`、开发数据库或测试数据到公共仓库，也不要为了省事对项目执行 `chmod -R 777`。

### 4. 添加 Python 项目

![添加 Python 项目](/img/posts/gemini-image-webapp/宝塔面板添加python项目.png)

| 配置项 | 推荐填写 |
|---|---|
| **项目名称** | `gemini-image-webapp` |
| **Python 环境** | 上一步创建的虚拟环境 |
| **启动方式** | 命令行启动或 Gunicorn |
| **项目路径** | `/www/wwwroot/gemini-image-webapp` |
| **启动命令** | `gunicorn -w 1 --threads 8 -b 127.0.0.1:5000 --timeout 360 app:app` |
| **环境变量** | 选择「指定变量」 |
| **启动用户** | `www` |
| **安装依赖** | `/www/wwwroot/gemini-image-webapp/requirements.txt` |

截图中的项目名称和路径只是示例。启动命令要重点确认 `-w 1 --threads 8`、`127.0.0.1:5000` 和 `--timeout 360`。

如果宝塔没有自动安装依赖，在已激活项目虚拟环境的终端执行：

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pip check
```

生产服务器不要直接使用 `--upgrade-strategy eager` 批量升级所有间接依赖；先备份并在测试环境验证，再按 `requirements.txt` 安装。

### 5. 配置生产环境变量

![环境变量配置](/img/posts/gemini-image-webapp/环境变量配置界面.png)

在「环境变量」中选择「指定变量」，至少配置：

```ini
SECRET_KEY=随机生成的Session签名密钥
ADMIN_PASSWORD=至少12位且包含至少三类字符
CREDENTIAL_ENCRYPTION_KEY=独立生成的Fernet密钥
FLASK_ENV=production
FLASK_DEBUG=False
TRUST_PROXY_COUNT=1
```

上图中的真实密钥已经打码。不要把包含 API Key、邮箱授权码、管理员密码、Session 密钥、Fernet 密钥或 SSL 私钥的截图发到聊天、Issue 或公开仓库。

部分宝塔版本保存 Fernet 密钥后会去掉末尾的 `=`。当前应用兼容严格校验后的 43 字符无填充形式，但密钥主体不能改变。

### 6. 启动并检查本机服务

点击「启动」或「重启」，确认状态为“运行中”，并查看项目日志。

![项目运行状态](/img/posts/gemini-image-webapp/项目运行状态.png)

服务器终端检查：

```bash
curl -I http://127.0.0.1:5000/
```

返回 `200`、`302` 或 `405` 都表示 Gunicorn 已经响应；`Connection refused` 通常表示项目没有启动或监听端口不一致。

### 7. 绑定域名并开启外网映射

在「域名管理」添加已解析到服务器的域名。

![域名绑定](/img/posts/gemini-image-webapp/域名绑定界面.png)

在「外网映射」中开启反向代理，代理路由为 `/`，代理端口为 `5000`。

![外网映射配置](/img/posts/gemini-image-webapp/外网映射配置.png)

确认代理目标是 `http://127.0.0.1:5000`，而不是把 Gunicorn 直接暴露到公网。

### 8. 配置 SSL 和 HTTPS 跳转

在 SSL 页面申请 Let's Encrypt、宝塔免费证书或部署自己的证书。

![申请 SSL 证书](/img/posts/gemini-image-webapp/SSL证书申请.png)

HTTP 必须能够 301 跳转到 HTTPS。这个跳转可以由 CDN、宝塔“强制 HTTPS”开关或手动 Nginx 配置完成，确保至少一层生效即可，不必重复添加多套规则。可使用下面的命令验证：

```bash
curl -I http://你的域名
```

应看到 `301 Moved Permanently` 和 `Location: https://你的域名/`。

### 9. 核对 Nginx 反向代理

宝塔生成的证书路径、`/.well-known/`、访问日志和错误日志要保留。`location /` 的关键配置如下：

```nginx
client_max_body_size 50m;

location / {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_connect_timeout 60s;
    proxy_send_timeout 360s;
    proxy_read_timeout 360s;
}
```

本项目不需要 WebSocket，不要保留没有用途的 `Upgrade` / `Connection "upgrade"`。登录、API、管理后台和用户图片也不应启用 Nginx 代理缓存。保存前执行 `nginx -t`，确认无误后再重载 Nginx。

### 10. 最终验证

1. 使用 HTTPS 打开域名，确认没有重定向循环且证书正常。
2. 使用 `admin` 登录管理后台。
3. 保存 API 设置并生成一张测试图片。
4. 如果配置了 SMTP，注册测试账号并检查验证码邮件。
5. 重启 Python 项目，确认数据库中的 API/SMTP 设置仍可读取。

---

## 单 worker、线程和 Redis 怎么选？

推荐命令是：

```bash
gunicorn -w 1 --threads 8 -b 127.0.0.1:5000 --timeout 360 app:app
```

- `-w 1`：一个应用进程，默认内存限流可以正常使用，不需要 Redis。
- `--threads 8`：一个进程可以同时等待多个网络请求，不代表只能供一个用户访问。
- `--timeout 360`：为 AI 生图请求保留足够时间。

只有确实需要多个 worker、多台服务器或多个容器时，才必须给所有进程配置共享限流存储：

```ini
RATELIMIT_STORAGE_URI=redis://127.0.0.1:6379/0
```

Redis 只监听本机或可信内网，绝不能向公网开放 6379 端口。worker 增多也会增加内存、SQLite 写入和上游 API 压力，并不是越多越快。

如果前面还有 CDN，`TRUST_PROXY_COUNT` 必须按真实且可信的代理链重新评估，不能看到“CDN + Nginx”就盲目填写某个数字。还要确保边缘代理会覆盖用户伪造的转发请求头。

---

## 从旧版本升级

1. 先备份数据库、会话、图片和缩略图。
2. 保留当前数据库对应的 `CREDENTIAL_ENCRYPTION_KEY`。
3. 拉取新代码，在项目虚拟环境执行 `python -m pip install -r requirements.txt`。
4. 执行 `python -m pip check`，确认显示 `No broken requirements found.`。
5. 重启项目并检查启动日志。

首次使用支持凭据加密的新版本启动时，应用会加密当前 API Key/SMTP 密码、删除历史配置副本并重写 SQLite 页面。升级前仍建议轮换曾经以明文保存过的第三方凭据，并检查旧备份的访问权限。

---

## 常见问题

### 项目启动失败

先查看宝塔项目日志。常见原因包括依赖缺失、三项必填密钥没有配置、管理员密码强度不足、端口 5000 被占用，或 `CREDENTIAL_ENCRYPTION_KEY` 与已有数据库不匹配。

### 域名访问显示 502

确认 Python 项目处于运行中、Gunicorn 监听 `127.0.0.1:5000`，并检查 Nginx 的 `proxy_pass` 端口一致。

### 上传图片返回 413

确认 Nginx 的 `client_max_body_size` 不小于应用的 `MAX_REQUEST_BYTES`。

### 生成经常超时

确认 Gunicorn `--timeout`、Nginx `proxy_send_timeout` 和 `proxy_read_timeout` 都至少为 360 秒，同时检查上游 API 是否可以访问。

### 数据库凭据无法解密

不要继续生成新密钥覆盖。应找回与该数据库配套的原 `CREDENTIAL_ENCRYPTION_KEY`；密钥和数据库必须成套备份。

### 宝塔里的 HTTPS 开关没有自动点亮

宝塔开关只记录“是否由面板生成跳转规则”，不会反向解析你手写的 Nginx 或 CDN 配置。只要 `curl -I http://你的域名` 确认已经 301 到 HTTPS，就不必为了界面显示而重复开启。

---

## 适合谁使用？

- 想搭建个人 AI 图片工具的开发者和创作者。
- 需要在内部测试 Gemini 图片能力的非商业团队。
- 学习 Flask、SQLite、AI API、权限和计费系统的开发者。
- 希望在现有代码基础上继续二次开发的人。

项目采用 [CC BY-NC-SA 4.0](https://github.com/gbmomo/gemini-image-webapp/blob/main/LICENSE) 许可证：使用时必须署名和提供原项目链接，未经单独授权不得商用，修改后的作品需要以相同许可证发布。商业使用前请联系作者取得授权。

---

## 写在最后

Gemini Image Webapp 的价值不仅是“调用一次生图 API”，而是把模型能力、用户、会话、点数、卡密、后台和生产部署组合成了一套可继续扩展的网站系统。

👉 **项目源码与最新文档**：[github.com/gbmomo/gemini-image-webapp](https://github.com/gbmomo/gemini-image-webapp)

👉 **在线演示**：[nano.gitsay.com](https://nano.gitsay.com/)

如果文章和 README 出现差异，请以 GitHub 仓库当前代码和 README 为准。欢迎 Star、提交 Issue 或参与改进。

---

*这篇文章帮到你了吗？欢迎在评论区留言。*
