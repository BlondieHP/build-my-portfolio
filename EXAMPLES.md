# 完整学习案例：从零到作品集

以下是使用 `build-my-portfolio` skill 完成一次完整学习旅程的例子。

## 用户背景
- 小王，前端工程师（React 2 年）
- 想学 Rust，但收藏了很多资料都没坚持下来
- 每周能投入 6-8 小时
- 目标：用 Rust 写一个实用的 CLI 工具

---

## Phase 1: 定向 (DIRECT)

### 对话片段
```
AI：你最近对什么技术感到好奇？
小王：Rust。我已经收藏了十几本 Rust 书和教程，但一本都没看完。

AI：学会 Rust 之后你最想用它做什么？
小王：我想写一个 CLI 工具，自动把我项目的 changelog 从 git commit 生成出来。

AI：你现在对系统编程了解多少？
小王：基本上零基础。但我熟悉 TypeScript 的类型系统。

AI：你每周能投入多少时间？
小王：工作日晚 1 小时 + 周末 3-4 小时，一周大概 6-8 小时。

AI：基于这些信息，我建议的方向是：
  1. Rust CLI 开发（推荐）—— 匹配你的 changelog 工具目标
  2. Rust + WebAssembly —— 跟前端结合但学习曲线陡
  3. Rust 嵌入式 —— 偏离你日常太远，可能难以坚持
```

### 产出：MISSION.md
```markdown
# 学习使命

## 我想学什么
用 Rust 写命令行工具

## 为什么想学
自动从 git commit 生成 changelog，替代团队目前手动维护的方式

## 成功标准
- [ ] 能独立写出一个带参数解析的 Rust CLI 工具
- [ ] 理解 Rust 所有权和借用，能解释给同事听
- [ ] 完成 changelog-generator 项目，推到 GitHub

## 约束条件
- 时间：每周 6-8 小时，预计 4 周
- 前置知识：TypeScript 熟悉，系统编程零基础
- 工具：VS Code + rust-analyzer

## 启动日期
2026-07-01
```

---

## Phase 2: 收敛 (CONVERGE)

### AI 搜索并筛选
AI 搜索了 18 个候选资源，最终筛选出 6 个核心资源：

### 产出：RESOURCES.md（节选）
```markdown
# 学习资源清单

## 核心资源

### 1. Rust 官方入门书（The Book）
- **类型**：官方文档
- **为什么选它**：Rust 官方出品，覆盖所有核心概念，交互式可运行
- **覆盖范围**：所有权、结构体、枚举、错误处理、泛型
- **预计时间**：15 小时
- **难度**：入门
- **关键章节**：第 4 章（所有权）、第 6 章（枚举）、第 10 章（泛型）

### 2. Rustlings
- **类型**：交互式练习
- **为什么选它**：100+ 小练习，边学边改代码，刚好匹配"动手学"的需求
- **关键章节**：配合 The Book 逐章做

### 3. Command-Line Rust (O'Reilly)
- **类型**：书籍
- **为什么选它**：唯一一本专注 Rust CLI 的书，每个章节产出一个实用工具
- **预计时间**：10 小时
- **关键章节**：第 2 章（echo）、第 3 章（cat）、第 11 章（release）

## 不推荐但常见的资源
- 《Rust 程序设计》(中文译版)：翻译质量一般，不如直接看官方英文版
- Rust By Example：和 Rustlings 功能重叠，Rustlings 互动性更好
- Too Many Lists：太深入，不适合入门阶段
```

---

## Phase 3: 路线图 (ROADMAP)

### 产出：ROADMAP.md（节选）
```markdown
## 里程碑 1：Rust 基础语法 — 预计 8 小时
- 学习材料：The Book 第 1-8 章 + Rustlings 对应练习
- Mini-project：猜数字游戏（命令行版）
- 验收：能写出基本 Rust 程序，理解变量、函数、控制流

## 里程碑 2：所有权与结构体 — 预计 10 小时
- 学习材料：The Book 第 4-6 章、第 10 章
- Mini-project：简单的 CSV 解析器
- 验收：能解释所有权规则，知道何时用 &、&mut、Clone

## 里程碑 3：CLI 实战 — 预计 12 小时
- 学习材料：Command-Line Rust 第 2-5 章
- Mini-project：echo 和 cat 的 Rust 实现
- 验收：掌握 clap 参数解析，错误处理 with anyhow

## 里程碑 4：结业项目 — 预计 10 小时
- 终极项目：changelog-generator
- 验收：独立完成，推到 GitHub，README 清晰
```

---

## Phase 4: 项目规约 (SPEC)

### 产出：projects/changelog-generator/SPEC.md
```markdown
# 项目规约：changelog-generator

## 一句话描述
从 git 提交历史自动生成 changelog 的 CLI 工具，支持自定义模板和分类规则。

## 学习映射
| 知识点 | 项目中体现在哪里 |
|--------|-----------------|
| 所有权/借用 | 解析 git log 输出时的字符串处理 |
| 结构体/枚举 | 定义 Commit、Changelog 等数据结构 |
| 错误处理 | 使用 anyhow 处理 git 命令失败等错误 |
| CLI 参数 | 用 clap 定义 --since、--output、--template |
| 文件 I/O | 读取 .git 目录，写入 changelog 文件 |
| 测试 | 单元测试解析逻辑 |

## 功能需求
### 核心功能
1. `clog generate --since v1.0.0` 生成 changelog
2. 自动按 feat/fix/chore 分类
3. 输出 Markdown 格式
4. 支持自定义输出文件路径

### 扩展功能
1. 自定义模板（Handlebars）
2. 自动检测上一个 tag
3. GitHub release 集成

## 验收标准
- [ ] `cargo install --path .` 后 `clog --help` 正常
- [ ] `clog generate --since v0.1.0` 生成正确的 Markdown changelog
- [ ] 项目有 README，包含安装和使用说明
- [ ] 核心逻辑有单元测试
```

---

## Phase 5: 构建 (BUILD)

### 对话片段
```
AI：第一步我们先初始化项目。运行：
   cargo new changelog-generator
   然后在 Cargo.toml 里添加 clap 和 anyhow。
   你知道 Cargo.toml 的 [dependencies] 怎么写吗？

小王：知道，类似 package.json。

AI：对。不过 Cargo 有个方便的命令：
   cargo add clap --features derive
   你试试？

[小王操作...]

AI：好。现在我们先定义数据结构。
   一个 git commit 包含哪些信息？
   你设计一下 Commit 结构体，想想用哪些字段。

小王：hash、作者、日期、消息...这样？

AI：不错。Rust 里你打算用什么类型表示？
   提示：hash 可以用 String，日期呢？

小王：String？或者有什么日期类型？

AI：你可以查一下。标准库有 std::time，但这里用 chrono 库更合适。
   你觉得应该我们用 chrono 还是先用 String 简单处理？
   提示：YAGNI 原则。
```

### 构建过程
- Step 1: 项目初始化 + 数据结构（小王自己写，AI 审查）
- Step 2: 解析 git log（AI 给算法思路，小王实现）
- Step 3: 分类逻辑（AI 解释 match 和 enum）
- Step 4: Markdown 输出（小王独立写，AI 只审查）
- Step 5: CLI 参数 + 集成（AI 引导 clap 用法）

每步一次 `git commit`，形成清晰的提交历史。

---

## Phase 6: 反思 (REFLECT)

### 产出：JOURNAL.md（追加）
```markdown
## 2026-07-28 — changelog-generator

### 完成的项目
- changelog-generator：https://github.com/xiaowang/changelog-generator

### 核心收获
1. Rust 所有权系统：写解析器时真正理解了为什么 String 和 &str 是不同的
2. 枚举的强大：用 enum 表示 CommitType，比 TS 的 union type 更安全
3. CLI 设计思维：好的 CLI 工具应该做一件事并做好

### 仍然困惑的
- 生命周期标注还是有点蒙，复杂场景下不确定怎么标
- async Rust 完全没碰

### 时间投入
- 总计约 40 小时，4 周完成

### 下一步想法
- 把 changelog-generator 发布到 crates.io
- 下一个方向：学 Rust Web 后端（axum）
```

### 产出：PORTFOLIO.md（更新）
```markdown
# 我的学习作品集

## 统计
- 总项目数：1
- 涉及技术栈：Rust
- 学习时长：累计 40 小时

## 项目列表

### changelog-generator ⭐
- **仓库**：https://github.com/xiaowang/changelog-generator
- **完成日期**：2026-07-28
- **一句话描述**：用 Rust 写了一个从 git 历史自动生成 Markdown changelog 的 CLI 工具
- **学会的技能**：Rust 基础语法, 所有权模型, 枚举/结构体设计, clap 参数解析, anyhow 错误处理
- **技术栈**：Rust, clap, anyhow, chrono, regex
- **亮点**：
  - 支持 feat/fix/chore 自动分类
  - 核心解析逻辑有 85% 测试覆盖率
```
```

---

## 总结

这个案例展示了完整的六阶段流程：
1. **定向**把"想学 Rust"收敛到"用 Rust 写 changelog 工具"
2. **收敛**把 18 个资源筛成 6 个核心
3. **路线图**把 4 周学习分解为 4 个可执行的里程碑
4. **项目规约**把里程碑 4 映射为具体的 changelog-generator
5. **构建**在 AI 引导下完成项目（苏格拉底式提问，而非给答案）
6. **反思**记录收获，更新作品集

关键是：小王不再有 18 个未读完的资源，而是有了 1 个完成的 GitHub 项目。
