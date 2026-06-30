---
name: build-my-portfolio
description: >
  AI 辅助的项目式学习系统。将模糊的学习意向转化为可展示的作品集——通过六阶段流程：定向讨论 → 资源收敛筛选 → 学习路线编排 → 项目规约设计 → 边学边做构建 → 反思记录。核心理念是"收藏不等于学会"：在资源过载时代帮助用户收敛到最小必要路径，通过做实际项目内化知识，形成 GitHub 风格的作品集。Use when user wants to learn something new, start a learning journey, build a project portfolio, figure out what to learn next, turn knowledge into projects, or mentions 学习/项目/作品集/学习路线/资源推荐/方法论/魔改/fork/开源/learn/project/portfolio.
argument-hint: "[学习方向] — 例如：想学 Rust 写 CLI 工具 / 继续上次的学习 / 看看我的作品集"
disable-model-invocation: false
---

# Build My Portfolio — AI 辅助项目式学习系统

## 理念

> 不是资源不够多，而是资源太多了。收藏不等于学会，知识必须变成可展示的项目才算内化。

这个 skill 通过六个阶段把"学什么 → 怎么学 → 做出什么 → 怎么证明"整条链路串起来，帮助用户在 AI 时代从海量资源中收敛到最小必要路径，通过项目式学习将知识转化为实际能力，最终形成可展示的作品集。

## 工作目录

所有学习状态保存在 `.project-learning/`：

```
.project-learning/
├── MISSION.md          # 学习使命：为什么学、成功标准
├── RESOURCES.md        # 收敛后的核心资源（5-10 个）
├── ROADMAP.md          # 有序学习路线图（3-5 个里程碑）
├── NOTES.md            # 实时笔记：AI 自动捕获的关键收获
├── JOURNAL.md          # 学习日志：每次 session 的收获
├── PORTFOLIO.md        # 作品集索引
└── projects/
    └── <slug>/         # 具体项目
        ├── SPEC.md     # 项目规约
        └── ...         # 项目代码
```

格式规范见 `formats/` 目录。

## 阶段路由

根据用户意图和当前状态，自动路由到对应阶段：

### 新学习旅程
用户说"我想学 X"、"帮我设计一个学习路线"、"我想做一个 Y 项目"
→ 从 [Phase 1: 定向](phases/DIRECT.md) 开始

### 继续已有学习
用户说"继续学习"、"继续上次的"、提到已有方向
→ 检查 `.project-learning/` 状态，定位当前阶段继续

### 只需资源推荐
用户说"推荐学 X 的资源"、"学 X 看什么资料好"
→ 先确认 MISSION.md（没有则先 DIRECT），再跳到 [Phase 2: 收敛](phases/CONVERGE.md)

### 只需项目设计
用户说"帮我设计一个练习项目"、"我想做一个 demo 练习 X"
→ 先确认前置阶段状态，跳到 [Phase 4: 项目规约](phases/SPEC.md)（含建造/魔改模式选择）

### 魔改模式
用户说"我想魔改一个项目"、"找一个开源项目来学"、"fork 一个项目改着玩"
→ 跳到 [Phase 5B: 魔改](phases/REMIX.md)（如果 SPEC 已存在）或先进入 SPEC 选择模式

### 继续构建
用户说"继续写代码"、"继续做项目"、"开始 BUILD"
→ 直接进入 [Phase 5: 构建](phases/BUILD.md)

### 查看成果
用户说"看看我的作品集"、"我学了什么"、"总结一下"
→ 读取 `PORTFOLIO.md` 和 `JOURNAL.md`，美观展示

### 查看笔记
用户说"看看我的笔记"、"复习一下"、"之前学了什么"
→ 读取 `NOTES.md`，按时间倒序展示最近的笔记条目

## 快速开始

### 从零开始
```
用户：我想学 Rust，帮我设计一个学习计划
AI：  → Phase 1 DIRECT → Phase 2 CONVERGE → Phase 3 ROADMAP
     → Phase 4 SPEC → Phase 5 BUILD → Phase 6 REFLECT
```

### 继续上次
```
用户：继续学习
AI：  → 检查 .project-learning/ 状态 → 定位到上次未完成的阶段 → 继续
```

### 只看资源
```
用户：学 Rust 看哪些资料就够了？
AI：  → 确认/创建 MISSION → Phase 2 CONVERGE（只做资源筛选）
```

## ⚠️ 全局规则（所有阶段必须遵守）

1. **搜索必须用 agent-reach**：任何互联网搜索（资源调研、领域探索、社区讨论、GitHub 代码搜索）必须使用 `agent-reach` skill，**禁止**直接调用 WebSearch。agent-reach 覆盖 15 个平台（Exa 搜索引擎 + B站 + V2EX + Reddit + GitHub + Twitter + 小红书 + YouTube 等），单一搜索引擎无法替代。触发 agent-reach 后按路由表选择合适的平台组合——不要只搜 Exa 就完事。
2. **不依赖训练数据**：AI 的参数知识可能过时，必须实际搜索获取最新信息。
3. **动手前先查 NOTES.md**：进入任何阶段（尤其是 BUILD/REMIX）前，读取 `.project-learning/NOTES.md`。如果用户正在学习一个已有笔记记录的领域（如"骑砍 mod"、"Git"），先读取相关笔记——里面有已验证的方法、操作码、之前踩过的坑，避免重复犯错。

## 核心原则

1. **收敛优先**：资源严格控制在 5-10 个，强迫筛选；用户觉得太多就继续砍
2. **项目驱动**：每个里程碑产出可运行的代码，而非笔记
3. **AI 引导而非替代**：BUILD 阶段 AI 解释原理、提供骨架、审查反馈，但不替写
4. **可展示**：项目推 GitHub，形成真实 commit 历史
5. **可中断可恢复**：状态全持久化，随时可暂停和继续
6. **用户主导**：AI 给出建议，用户做决定

## Phase 引用

- [Phase 1: 定向 DIRECT](phases/DIRECT.md) — 从模糊意向到清晰方向，产出 MISSION.md
- [Phase 2: 收敛 CONVERGE](phases/CONVERGE.md) — 从海量资源筛选 5-10 个核心，产出 RESOURCES.md
- [Phase 3: 路线图 ROADMAP](phases/ROADMAP.md) — 编排有序学习路径，产出 ROADMAP.md
- [Phase 4: 项目规约 SPEC](phases/SPEC.md) — 知识映射为具体项目，产出 SPEC.md
- [Phase 5: 构建 BUILD](phases/BUILD.md) — 边学边做，苏格拉底式引导（建造模式）
- [Phase 5: 构建 BUILD](phases/BUILD.md) — 边学边做，苏格拉底式引导（建造模式）
- [Phase 5B: 魔改 REMIX](phases/REMIX.md) — 读真实代码 + 动手改（魔改模式）
- [跨阶段: 测验 QUIZ](phases/QUIZ.md) — 里程碑边界自动触发，验证学习效果
- [Phase 6: 反思 REFLECT](phases/REFLECT.md) — 内化知识，更新作品集

## 共享规范

- [输出风格指南](_shared/output-style-guide.md) — 统一的图标、确认词、输出密度规范

## Format 引用

- [MISSION-FORMAT.md](formats/MISSION-FORMAT.md)
- [RESOURCES-FORMAT.md](formats/RESOURCES-FORMAT.md)
- [ROADMAP-FORMAT.md](formats/ROADMAP-FORMAT.md)
- [SPEC-FORMAT.md](formats/SPEC-FORMAT.md)
- [NOTES-FORMAT.md](formats/NOTES-FORMAT.md) — 实时笔记自动捕获规范
- [PORTFOLIO-FORMAT.md](formats/PORTFOLIO-FORMAT.md)

## Scripts

- [scaffold-project.js](scripts/scaffold-project.js) — 根据 SPEC.md 生成项目骨架
