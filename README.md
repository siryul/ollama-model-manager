<p align="center">
  <h2 align="center" style="font-weight: 600">ollama-model-manager</h2>

  <p >
    🌟 强大的模型管理工具，旨在简化模型切换和对话管理，提升用户体验。无论是开发者还是普通用户，都能轻松使用本工具来管理和切换不同的AI模型，享受流畅的对话体验。
    <br />
    <br />
    🚀 通过现代前端技术栈构建，确保高效、灵活的开发体验，助力快速迭代和功能扩展。无论您是想要进行简单的模型切换，还是需要复杂的对话管理，ollama-model-manager都能满足您的需求。
    <br />
    <br />
    <strong>立即开始您的模型管理之旅吧！</strong>
    <br />
    <br />
    <br />
  </p>
</p>

## ✨ 特性

- **使用 Vue 3、Pinia、Vue Router、Vite、TypeScript 开发** 🚀
  采用现代前端技术栈，确保高效、灵活的开发体验，助力快速迭代和功能扩展。

- **支持模型切换** 🔄
  轻松在不同模型之间切换，满足多样化的需求，提升用户体验。

- **文本对话** 💬
  提供流畅的文本对话功能，让用户与模型的互动更加自然和直观。

- **会话切换** 🔀
  支持多会话管理，用户可以在不同的对话中自由切换，保持上下文的连贯性。

## 🚀 逐步支持

- [ ] 🛠️ ~~模型管理：轻松添加、删除~~和更新模型
- [ ] 🤖 AI 模型集成：支持更多 AI 模型的集成
- [x] 🖼️ ~~支持图像对话：实现图像与文本的混合对话~~
- [ ] 🎨 图像生成：基于文本描述生成图像
- [ ] 📊 数据可视化：提供模型数据的可视化工具
- [ ] 🌐 多语言支持：支持更多语言的界面和文档
- [ ] 📱 移动端优化：提供更好的移动端体验

## 📦️ 继续开发

首先确保本地已经安装 [ollama](https://ollama.com/download)，然后继续以下操作

1. 克隆项目仓库

   ```sh
   git clone https://github.com/siryul/ollama-model-manager.git
   cd ollama-model-manager
   ```

2. 安装项目依赖

   ```sh
   pnpm install
   ```

3. 启动开发服务器

   ```sh
   pnpm dev
   ```

4. 启动爬虫服务器

   由于缺乏官方的在线搜索 API，项目使用爬虫技术获取在线信息。请启动爬虫服务器以启用在线搜索功能：

   ```sh
   cd ollama-model-manager/spider
   pnpm install
   pnpm dev
   ```

## 技术栈

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint & Prettier](https://eslint.org/)
- [Vitest](https://vitest.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📜 开源许可

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源。
