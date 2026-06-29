#!/usr/bin/env node
/**
 * scaffold-project.js — 根据 SPEC.md 生成项目骨架
 *
 * 用法：
 *   node scaffold-project.js <project-slug> [--tech <stack>]
 *
 * 示例：
 *   node scaffold-project.js my-rust-cli --tech rust
 *   node scaffold-project.js my-react-app --tech react-ts
 *   node scaffold-project.js my-python-api --tech python
 *
 * 支持的技术栈：
 *   rust, react-ts, python, node-ts, go, vanilla-ts
 *
 * 生成的目录结构根据技术栈不同而变化，详见各模板。
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const slug = args[0];
const techIndex = args.indexOf("--tech");
const tech = techIndex !== -1 ? args[techIndex + 1] : null;

if (!slug) {
  console.error("Usage: node scaffold-project.js <project-slug> [--tech <stack>]");
  console.error("Example: node scaffold-project.js my-rust-cli --tech rust");
  process.exit(1);
}

// Project root is the current working directory
const learningDir = path.join(process.cwd(), ".project-learning", "projects", slug);

if (fs.existsSync(learningDir)) {
  console.error(`Project directory already exists: ${learningDir}`);
  console.error("Remove it first or use a different slug.");
  process.exit(1);
}

// ---- Templates ----

function scaffoldRust() {
  const dirs = ["src", "tests"];
  dirs.forEach((d) => fs.mkdirSync(path.join(learningDir, d), { recursive: true }));

  fs.writeFileSync(
    path.join(learningDir, "Cargo.toml"),
    `[package]
name = "${slug}"
version = "0.1.0"
edition = "2021"
description = "A learning project — see SPEC.md for details"

[dependencies]
clap = { version = "4", features = ["derive"] }
anyhow = "1"
`
  );

  fs.writeFileSync(
    path.join(learningDir, "src", "main.rs"),
    `fn main() {
    println!("Hello from ${slug}!");
    // TODO: Implement your project here.
    // See SPEC.md for requirements.
}
`
  );

  fs.writeFileSync(
    path.join(learningDir, ".gitignore"),
    `target/
**/*.rs.bk
`
  );
}

function scaffoldReactTs() {
  const dirs = ["src", "src/components", "public"];
  dirs.forEach((d) => fs.mkdirSync(path.join(learningDir, d), { recursive: true }));

  fs.writeFileSync(
    path.join(learningDir, "package.json"),
    JSON.stringify(
      {
        name: slug,
        version: "0.1.0",
        private: true,
        description: "A learning project — see SPEC.md for details",
        scripts: {
          dev: "vite",
          build: "tsc && vite build",
          preview: "vite preview",
        },
        dependencies: {
          react: "^19.0.0",
          "react-dom": "^19.0.0",
        },
        devDependencies: {
          "@types/react": "^19.0.0",
          "@types/react-dom": "^19.0.0",
          "@vitejs/plugin-react": "^4.0.0",
          typescript: "^5.0.0",
          vite: "^6.0.0",
        },
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(learningDir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2020",
          module: "ESNext",
          moduleResolution: "bundler",
          jsx: "react-jsx",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          outDir: "dist",
        },
        include: ["src"],
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(learningDir, "vite.config.ts"),
    `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`
  );

  fs.writeFileSync(
    path.join(learningDir, "index.html"),
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${slug}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  fs.writeFileSync(
    path.join(learningDir, "src", "main.tsx"),
    `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`
  );

  fs.writeFileSync(
    path.join(learningDir, "src", "App.tsx"),
    `export default function App() {
  return <h1>Hello from ${slug}!</h1>;
}
`
  );

  fs.writeFileSync(
    path.join(learningDir, "src", "vite-env.d.ts"),
    `/// <reference types="vite/client" />
`
  );
}

function scaffoldPython() {
  const dirs = ["src", "tests"];
  dirs.forEach((d) => fs.mkdirSync(path.join(learningDir, d), { recursive: true }));

  fs.writeFileSync(
    path.join(learningDir, "pyproject.toml"),
    `[project]
name = "${slug}"
version = "0.1.0"
description = "A learning project — see SPEC.md for details"
requires-python = ">=3.10"

[build-system]
requires = ["setuptools"]
build-backend = "setuptools.build_meta"
`
  );

  fs.writeFileSync(
    path.join(learningDir, "src", "__init__.py"),
    `# ${slug} — see SPEC.md for requirements
`
  );

  fs.writeFileSync(
    path.join(learningDir, "src", "main.py"),
    `def main():
    print("Hello from ${slug}!")
    # TODO: Implement your project here.
    # See SPEC.md for requirements.

if __name__ == "__main__":
    main()
`
  );

  fs.writeFileSync(
    path.join(learningDir, "tests", "__init__.py"),
    ""
  );

  fs.writeFileSync(
    path.join(learningDir, ".gitignore"),
    `__pycache__/
*.pyc
.venv/
venv/
dist/
`
  );
}

function scaffoldNodeTs() {
  const dirs = ["src"];
  dirs.forEach((d) => fs.mkdirSync(path.join(learningDir, d), { recursive: true }));

  fs.writeFileSync(
    path.join(learningDir, "package.json"),
    JSON.stringify(
      {
        name: slug,
        version: "0.1.0",
        private: true,
        description: "A learning project — see SPEC.md for details",
        type: "module",
        scripts: {
          dev: "tsx src/index.ts",
          build: "tsc",
          start: "node dist/index.js",
        },
        devDependencies: {
          typescript: "^5.0.0",
          tsx: "^4.0.0",
          "@types/node": "^22.0.0",
        },
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(learningDir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "NodeNext",
          moduleResolution: "NodeNext",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          outDir: "dist",
          rootDir: "src",
        },
        include: ["src"],
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(learningDir, "src", "index.ts"),
    `console.log("Hello from ${slug}!");
// TODO: Implement your project here.
// See SPEC.md for requirements.
`
  );

  fs.writeFileSync(
    path.join(learningDir, ".gitignore"),
    `node_modules/
dist/
`
  );
}

function scaffoldGo() {
  const dirs = ["cmd", "internal"];
  dirs.forEach((d) => fs.mkdirSync(path.join(learningDir, d), { recursive: true }));

  const modulePath = `github.com/user/${slug}`;
  fs.writeFileSync(
    path.join(learningDir, "go.mod"),
    `module ${modulePath}

go 1.23
`
  );

  fs.writeFileSync(
    path.join(learningDir, "cmd", "main.go"),
    `package main

import "fmt"

func main() {
	fmt.Println("Hello from ${slug}!")
	// TODO: Implement your project here.
	// See SPEC.md for requirements.
}
`
  );

  fs.writeFileSync(
    path.join(learningDir, "internal", ".gitkeep"),
    ""
  );

  fs.writeFileSync(
    path.join(learningDir, ".gitignore"),
    `# Binaries
/${slug}
/${slug}.exe
*.exe

# Test binary
*.test

# Output of go coverage
*.out
`
  );
}

function scaffoldVanillaTs() {
  const dirs = ["src"];
  dirs.forEach((d) => fs.mkdirSync(path.join(learningDir, d), { recursive: true }));

  fs.writeFileSync(
    path.join(learningDir, "package.json"),
    JSON.stringify(
      {
        name: slug,
        version: "0.1.0",
        private: true,
        description: "A learning project — see SPEC.md for details",
        scripts: {
          dev: "tsx src/index.ts",
          build: "tsc",
        },
        devDependencies: {
          typescript: "^5.0.0",
          tsx: "^4.0.0",
        },
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(learningDir, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "bundler",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          outDir: "dist",
          rootDir: "src",
        },
        include: ["src"],
      },
      null,
      2
    )
  );

  fs.writeFileSync(
    path.join(learningDir, "src", "index.ts"),
    `console.log("Hello from ${slug}!");
// TODO: Implement your project here.
// See SPEC.md for requirements.
`
  );

  fs.writeFileSync(
    path.join(learningDir, ".gitignore"),
    `node_modules/
dist/
`
  );
}

// ---- Main ----

const templates = {
  rust: scaffoldRust,
  "react-ts": scaffoldReactTs,
  python: scaffoldPython,
  "node-ts": scaffoldNodeTs,
  go: scaffoldGo,
  "vanilla-ts": scaffoldVanillaTs,
};

if (!tech || !templates[tech]) {
  console.error("Unsupported or missing --tech flag.");
  console.error("Supported tech stacks: " + Object.keys(templates).join(", "));
  process.exit(1);
}

fs.mkdirSync(learningDir, { recursive: true });
templates[tech]();

// Copy SPEC.md template if it doesn't exist yet
const specPath = path.join(learningDir, "SPEC.md");
if (!fs.existsSync(specPath)) {
  fs.writeFileSync(specPath, `# 项目规约：${slug}

## 一句话描述
<!-- TODO -->

## 学习映射
| 知识点 | 项目中体现在哪里 |
|--------|-----------------|
|  |  |

## 技术栈
- 语言：${tech}

## 功能需求
### 核心功能
1.

## 验收标准
- [ ] 项目可以独立运行
- [ ] README.md 说明项目是什么、怎么跑
- [ ] 核心功能全部实现
`);
}

// README
fs.writeFileSync(
  path.join(learningDir, "README.md"),
  `# ${slug}

> 学习项目 — 详见 [SPEC.md](./SPEC.md)

## 快速开始

\`\`\`bash
# TODO
\`\`\`

## 项目结构

\`\`\`
${slug}/
├── README.md
├── SPEC.md
...
\`\`\`
`
);

console.log(`✅ Project scaffolded: ${learningDir}`);
console.log(`   Tech stack: ${tech}`);
console.log(`   Next: review SPEC.md, then start BUILD phase`);
