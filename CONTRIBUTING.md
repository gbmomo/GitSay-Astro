# 贡献指南

感谢你抽出时间为本项目做贡献！每一项改进都能帮助社区更好地使用这个项目。

## 开始之前

- 使用最新的 **Node.js 18 LTS**（或更新版本）和 npm 9+。
- Fork 或克隆仓库，然后安装依赖：
  ```bash
  git clone https://github.com/gbmomo/GitSay-Astro.git
  cd GitSay-Astro
  npm install
  ```
- 当你添加或重命名内容集合时，运行 `npx astro sync` 以保持生成的类型同步。
- 默认分支是 `main`。从 `main` 创建功能分支，并尽可能保持 Pull Request 的范围精简。

## 项目脚本

| 命令 | 作用 |
| ------- | ------------- |
| `npm run dev` | 启动 Astro 开发服务器，并在监视模式下重新构建客户端脚本包（`public/js/main.js`）。 |
| `npm run build` | 生成静态构建（`dist/`）并格式化输出包。在提交 PR 前请先运行此命令。 |
| `npm run preview` | 本地服务上次的生产构建。 |
| `npm run client:build` | 使用 `scripts/build-client.mjs` 一次性构建客户端脚本（适用于 CI）。 |
| `npm run client:watch` | 在文件更改时重新构建客户端包。dev 脚本会自动调用此命令。 |
| `npm run format:dist` | 重新应用构建后的格式化程序（HTML/CSS/JS 美化 + CSSO 压缩）。 |

## 报告问题

- 在开新 Issue 之前，请先搜索[现有 Issue](https://github.com/gbmomo/GitSay-Astro/issues)。
- 包含简洁的标题、复现步骤、预期行为与实际行为，以及环境详情。
- 当截图或日志能帮助说明问题时，请附上。

## 提出增强建议

- 开一个 Issue 描述使用场景、你想做的更改以及你考虑过的替代方案。
- 如果你已经有实现方案，请提前说明，以便维护者帮助确定工作范围。

## Pull Request 清单

1. Fork 仓库并创建分支（`feature/…`、`fix/…` 等）。
2. 在有价值的地方进行更改并添加测试。（Astro 内容通常通过 `npm run build` 来验证行为。）
3. 本地运行 `npm run build` 并确保没有警告或错误。
4. 当行为或设置发生变化时更新文档——特别是 `README.md`、`PRODUCTION_CHECKLIST.md` 或配置注释。
5. 遵循描述性的传统提交信息（例如：`feat: 添加新功能`、`fix: 修复某个问题`）。
6. 向 `main` 提交 Pull Request，填写模板并关联相关 Issue。对于 UI 更改，请附上截图/GIF。
7. 准备好接受审查反馈；我们重视相互尊重的迭代协作。

## 代码风格与架构

- 将配置集中在 `src/config/` 中——避免在组件中硬编码字符串。
- 使用现有的工具模块（`@lib/content`、`@utils/url` 等）而不是重复逻辑。
- 扩展配置时优先使用 TypeScript 定义的接口（参见 `src/config/types.ts`）。
- 对于客户端脚本，从 `src/scripts/modules/*` 导出初始化函数，并在 `src/scripts/main.ts` 中注册，以确保热重载行为一致。
- 添加第三方资源时，优先通过打包器本地托管，而不是新增 CDN 调用。
- 将组件级的内联脚本/样式限制在它们控制的行为范围内；共享逻辑应放在 `src/scripts` 或 `src/utils` 下的模块中。

## 文档

当你添加或更改功能时，请更新：

- `README.md` 提供面向公众的说明。
- `PRODUCTION_CHECKLIST.md` 让使用者知道需要自定义什么。
- `CONTRIBUTING.md` 和 `CODE_OF_CONDUCT.md` 如果协作规范发生变化。

## 行为准则

参与本项目需遵守[行为准则](CODE_OF_CONDUCT.md)。请将不可接受的行为报告至 S@gitsay.com。

## 获取帮助

如果有任何不清楚的地方，请开启讨论或 Issue。我们很乐意澄清期望或一起解决问题。

感谢你投入时间让码言-GitSay变得更好！
