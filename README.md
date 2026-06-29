# Build My Portfolio

> AI 辅助的项目式学习系统 — 在资源过载时代，从"收藏"到"学会"。

## 理念

不是资源不够多，而是资源太多了。收藏不等于学会，知识必须变成可展示的项目才算内化。

这个 Claude Code Skill 通过六阶段流程把"学什么 → 怎么学 → 做出什么 → 怎么证明"整条链路串起来：

1. **定向** — 与 AI 讨论，敲定学习方向
2. **收敛** — 从海量资源中筛选 5-10 个核心
3. **路线图** — 编排有序学习路径，划分里程碑
4. **项目规约** — 将知识映射为具体 demo 项目
5. **构建** — 边学边做，苏格拉底式引导
6. **反思** — 内化知识，更新作品集

## 安装

复制到 Claude Code 的 skills 目录：

```bash
cp -r build-my-portfolio ~/.claude/skills/
```

或放在项目的 `.agents/skills/` 下。

## 使用

在 Claude Code 中说：

- "我想学 Rust" → 触发完整六阶段流程
- "继续学习" → 从上次中断处继续
- "推荐学 Python 的资源" → 只做资源收敛
- "看看我的作品集" → 展示学习成果

## 项目结构

```
build-my-portfolio/
├── SKILL.md              # 主入口 + 阶段路由
├── EXAMPLES.md           # 完整学习案例
├── phases/               # 6 个阶段指令
│   ├── DIRECT.md         # 定向
│   ├── CONVERGE.md       # 收敛
│   ├── ROADMAP.md        # 路线图
│   ├── SPEC.md           # 项目规约
│   ├── BUILD.md          # 构建
│   └── REFLECT.md        # 反思
├── formats/              # 工件格式规范
│   ├── MISSION-FORMAT.md
│   ├── RESOURCES-FORMAT.md
│   ├── ROADMAP-FORMAT.md
│   ├── SPEC-FORMAT.md
│   └── PORTFOLIO-FORMAT.md
└── scripts/
    └── scaffold-project.js  # 项目脚手架
```

## 许可

MIT
