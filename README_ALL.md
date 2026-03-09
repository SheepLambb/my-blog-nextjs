国内访问地址: www.lab107.asia
国外访问地址: https://sheeplamb.vercel.app/

---

# 关于我
> Date: 2024-03-20
> Tags: 简历, 简介

## 个人简介

你好！我是 **Sheeplamb**，一名热爱技术的全栈开发者。我专注于构建高性能、高交互的 Web 应用，并对人工智能（AI）和三维可视化（3D Visualization）有着浓厚的兴趣。

## 核心技能

- **前端**: React, Next.js, TypeScript, Tailwind CSS, Three.js / React Three Fiber
- **后端**: Node.js, Python (FastAPI), PostgreSQL, Prisma
- **AI/LLM**: LangChain, OpenAI API, RAG (Retrieval-Augmented Generation)
- **DevOps**: Docker, Vercel, GitHub Actions

## 工作经历

### 高级前端工程师 | Tech Corp (2021 - 至今)
- 负责公司核心 SaaS 平台的前端架构设计与重构，将首屏加载速度提升 40%。
- 主导开发了基于 WebGL 的 3D 数据可视化大屏，支持百万级数据点的实时渲染。
- 建立了内部组件库和 CI/CD 流程，提升团队开发效率 30%。

### 全栈开发者 | Startup Inc (2019 - 2021)
- 独立负责 MVP 产品的全栈开发（React + Node.js）。
- 实现了即时通讯系统和支付网关集成。

## 教育背景

- **计算机科学与技术 (学士)** | XX 大学 | 2015 - 2019

## 联系方式

- **Email**: sheeplamb@example.com
- **GitHub**: [github.com/sheeplamb](https://github.com/sheeplamb)
- **Blog**: [lab107.asia](https://lab107.asia)

---

# 项目：智能 AI Agent 协作框架
> Date: 2024-02-15
> Tags: 人工智能, 多智能体, Python

这是一个探索性的开源项目，旨在构建一个能够自动规划、执行和反思的智能体系统。

## 项目背景

随着大语言模型（LLM）的发展，单一的 Chatbot 已经无法满足复杂的任务需求。我们需要一个系统，能够像人类团队一样，通过不同角色的智能体协作来解决问题。

## 核心功能

1.  **任务拆解**: 主控 Agent 将用户输入的复杂目标拆解为子任务。
2.  **角色扮演**: 系统内置了“研究员”、“程序员”、“测试员”等不同角色的 Prompt。
3.  **记忆系统**: 使用向量数据库存储长期记忆，确保任务上下文不丢失。
4.  **工具调用**: 智能体可以调用外部工具与执行器。

## 技术栈

- **语言**: Python
- **框架**: LangChain, LangGraph
- **模型**: OpenAI GPT-4, Anthropic Claude 3
- **数据库**: ChromaDB

## 成果展示

![System Architecture](https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=system%20architecture%20diagram%20of%20AI%20agents%2C%20holographic%20interface%2C%20blue%20schematic%2C%20sci-fi%20style&image_size=landscape_16_9)

*系统架构示意图*

---

# 项目：沉浸式 3D 数据可视化平台
> Date: 2023-11-10
> Tags: 三维可视化, WebGL, React

为某网络安全公司开发的实时威胁监控大屏，通过 3D 地球展示全球范围内的网络攻击和防御事件。

## 核心亮点

- **高性能渲染**: 使用 InstancedMesh 技术，在浏览器端流畅渲染超过 10 万个动态粒子。
- **后期处理**: 集成了 Bloom（泛光）、景深等电影级特效。
- **交互设计**: 支持地球的缩放、旋转以及点击具体的攻击源查看详情。

## 技术难点与解决方案

### 1. 性能优化
在低端显卡上，大量的透明粒子会导致严重的过度绘制问题。我们通过减少粒子面数、使用自定义着色器替代默认材质，并将非关键粒子在远处进行视锥体剔除，成功将帧率稳定在 60fps。

### 2. 坐标转换
将经纬度坐标转换为三维空间坐标，并处理地球曲率带来的连线弯曲问题。

## 技术栈

- React
- React Three Fiber
- Drei
- GLSL 着色器

![Visualization Demo](https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=close%20up%20of%20digital%20particles%20flow%2C%20abstract%20data%20stream%2C%20neon%20colors%2C%20depth%20of%20field&image_size=landscape_16_9)

---

# 学习笔记：深入理解 React 服务端组件
> Date: 2024-01-05
> Tags: React, Next.js, 学习

React Server Components 是 React 团队推出的革命性特性，它允许我们在服务器端渲染组件，而无需将相应的 JavaScript 发送到客户端。

## 什么是 RSC

传统的 SSR (Server-Side Rendering) 只是在服务器上生成 HTML，但为了让页面可交互，浏览器仍然需要下载并执行所有的组件 JS 代码（Hydration）。

而 RSC 允许部分组件**仅**在服务器上运行。这意味着：
1.  **零客户端包体**: 服务器组件的依赖包（如 markdown 解析库、数据库客户端）不会被打包到客户端中。
2.  **直接访问后端资源**: 可以直接在组件里写 SQL 查询数据库。

## RSC 与 SSR 对比

| 特性 | SSR | RSC |
| :--- | :--- | :--- |
| **渲染位置** | 服务器 -> HTML | 服务器 -> 特殊 JSON 格式 |
| **客户端 JS** | 需要下载所有组件代码 | **不需要**下载 Server Components 代码 |
| **状态保持** | 页面刷新时重置 | 可以在不丢失 Client Component 状态的情况下重新获取 Server Component |

## 个人思考

RSC 极大地简化了数据获取的逻辑。以前我们需要 `useEffect` + `fetch` 或者 `getServerSideProps`，现在只需要是一个 `async` 组件即可。

```tsx
// 以前
export default function Page({ data }) { ... }
export async function getServerSideProps() { ... }

// 现在 (RSC)
export default async function Page() {
  const data = await db.query('SELECT * FROM posts');
  return <List data={data} />;
}
```

这让 React 的开发体验更接近于 PHP 或 Rails，但同时保留了现代前端的交互能力。

---

# 学习笔记：深度学习基础与 Transformer 架构
> Date: 2023-12-20
> Tags: 人工智能, 深度学习, Transformer

最近为了更好地理解 LLM，我重新系统地学习了深度学习的基础知识，重点复现了 Transformer 的结构。

## 核心概念：自注意力

自注意力机制是 Transformer 的灵魂。它的核心公式如下：

$$
\text{Attention}(Q, K, V) = \text{softmax}(\frac{QK^T}{\sqrt{d_k}})V
$$

### 通俗理解

想象你在读一个句子。当你读到某个词（Query）时，你会不自觉地回看句子中的其他词（Keys），并根据它们与当前词的相关性，来聚合这些词的信息（Values），从而更好地理解当前词的含义。

## 多头注意力

多头注意力机制允许模型在不同的“子空间”里学习关注点。比如一个 Head 关注语法结构，另一个 Head 关注语义指代。

## 实践心得

在使用 PyTorch 实现 Transformer 时，最容易出错的地方是掩码的处理。
- **填充掩码**: 忽略输入序列中的填充部分。
- **前瞻掩码**: 在解码器中，防止当前位置看到未来的信息。

## 推荐资源

1.  [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) - Jay Alammar 的神作，图解非常清晰。
2.  Andrej Karpathy 的 [NanoGPT](https://github.com/karpathy/nanoGPT) - 从零手写 GPT，非常适合代码级学习。
