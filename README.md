# Build My Portfolio

> AI 辅助的项目式学习系统 — 在资源过载时代，从"收藏"到"学会"。

不是资源不够多，而是资源太多了。收藏不等于学会，知识必须变成可展示的项目才算内化。

通过六阶段流程把"学什么 → 怎么学 → 做出什么 → 怎么证明"串起来：**定向 → 收敛 → 路线图 → 项目规约 → 构建 → 反思**。最终形成 GitHub 风格的作品集。

---

## 前置条件

- **[Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview)**（CLI 版本）
- **Node.js ≥ 18**（仅脚手架脚本需要，可选）
- **Git**（推项目到 GitHub 需要，可选）

---

## 安装

### 方式一：git clone（推荐）

```bash
# 克隆到 Claude Code 的用户 skills 目录
git clone https://github.com/BlondieHP/build-my-portfolio.git ~/.claude/skills/build-my-portfolio
```

### 方式二：用于特定项目

```bash
# 克隆到你的项目目录下
git clone https://github.com/BlondieHP/build-my-portfolio.git .agents/skills/build-my-portfolio
```

### 验证安装

在 Claude Code 中输入：

```
我想学 Python，帮我设计一个学习计划
```

如果 AI 开始问你"为什么想学""当前水平"等问题，说明 skill 已生效。

---

## 使用

### 触发词

在 Claude Code 中说以下任意一句即可触发：

| 你说 | AI 做什么 |
|------|----------|
| "我想学 Rust" | 启动完整六阶段流程 |
| "推荐学 Go 的资源" | 只做资源搜索和收敛 |
| "继续学习" | 从上次中断处继续 |
| "帮我设计一个练习项目" | 跳转到项目规约 |
| "看看我的作品集" | 展示 PORTFOLIO.md |
| "复习一下 / 看看笔记" | 展示 NOTES.md 记录的收获 |
| "我不知道学什么" | 搜索当前热门方向帮你发现兴趣 |

### 学习路径

```
从零开始：
  用户: "我想学 Rust"
  AI:  → DIRECT（定向讨论）
       → CONVERGE（全网搜索 + 筛选 5-10 个核心资源）
       → ROADMAP（3-5 个里程碑 + 每个有 mini-project）
       → SPEC（第一个项目的详细规约）
       → BUILD（边学边做，苏格拉底式引导）
       → REFLECT（回顾收获 + 更新作品集）

继续上次：
  用户: "继续学习"
  AI:  → 自动定位到上次中断的里程碑 → 继续

跳过阶段：
  用户: "推荐学 Python 数据分析的资料"
  AI:  → 快速确认方向 → 直接 CONVERGE（只搜资源）
```

### 核心原则

- **收敛优先**：资源严格控制在 5-10 个，强迫筛选
- **项目驱动**：每个里程碑产出可运行的代码，而非笔记
- **AI 引导而非替代**：BUILD 阶段 AI 解释原理、提供骨架、审查反馈，但不替写
- **自动笔记**：AI 在学习过程中主动捕获关键收获到 NOTES.md
- **可展示**：项目推 GitHub，形成真实 commit 历史
- **可中断可恢复**：状态全持久化到 `.project-learning/`，随时暂停和继续

---

## 项目结构

```
build-my-portfolio/
├── SKILL.md              # 主入口 + 阶段路由
├── EXAMPLES.md           # 完整学习案例（小王学 Rust）
├── CHANGELOG.md
├── phases/               # 6 个阶段指令
│   ├── DIRECT.md         # 定向：模糊意向 → 清晰方向
│   ├── CONVERGE.md       # 收敛：海量资源 → 5-10 个核心
│   ├── ROADMAP.md        # 路线图：资源 → 有序里程碑
│   ├── SPEC.md           # 项目规约：知识 → 具体 demo
│   ├── BUILD.md          # 构建：边学边做 + 自动笔记
│   └── REFLECT.md        # 反思：内化 + 更新作品集
├── formats/              # 学习工件格式规范
│   ├── MISSION-FORMAT.md
│   ├── RESOURCES-FORMAT.md
│   ├── ROADMAP-FORMAT.md
│   ├── SPEC-FORMAT.md
│   ├── NOTES-FORMAT.md
│   └── PORTFOLIO-FORMAT.md
└── scripts/
    └── scaffold-project.js  # 6 种技术栈项目脚手架（Rust/React/Python/Node/Go/Vanilla TS）
```

---

## 学习案例

小王，前端工程师，想学 Rust 但收藏了 18 本教程一本没看完。用 Build My Portfolio 后：

- 18 个资源 → 筛成 6 个核心
- 4 周 → 4 个里程碑 → 1 个完整的 CLI 工具
- 结果：GitHub 上有了 [changelog-generator](https://github.com/xiaowang/changelog-generator)，不再是"想学 Rust 的人"

详见 [EXAMPLES.md](./EXAMPLES.md)

---

## 灵感来源

- **[codojo（代码道场）](https://github.com/ttguy0707/codojo)** — "看懂已有项目 → 独立魔改"的学习思路启发了 REMIX 模式
- **[cc-self-train](https://github.com/zainnab-sparq/cc-self-train)** — Claude Code 项目式学习课程，启发了角色演进和逐步放手的引导策略
- **[AI Tutor](https://github.com/SamuelSchlesinger/ai-tutor)** — 自适应学习框架，启发了知识自评和学习风格适配

---

## 许可

MIT © 2026 BlondieHP
