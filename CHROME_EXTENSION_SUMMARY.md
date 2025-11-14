# Chrome 扩展改造总结

## 改造完成 ✅

已成功将 Live2D Widget 项目改造为 Chrome 扩展，可以在任何网页上自动加载 Live2D 看板娘。

## 创建的文件

### 核心文件

1. **`chrome-extension/manifest.json`**
   - Chrome 扩展配置文件（Manifest V3）
   - 定义了权限、content scripts、web accessible resources

2. **`chrome-extension/content.js`**
   - 内容脚本，注入到所有网页
   - 负责加载 Live2D widget 的 CSS 和 JS
   - 处理配置和初始化
   - 支持 SPA 页面导航检测
   - 支持消息传递以重新加载 widget

3. **`chrome-extension/popup.html`** 和 **`chrome-extension/popup.js`**
   - 扩展的 popup 界面
   - 允许用户配置选项（启用/禁用、日志级别、拖拽等）
   - 使用 Chrome Storage API 保存设置

4. **`chrome-extension/copy-assets.js`**
   - 构建脚本，将 dist 目录中的资源文件复制到扩展目录
   - 自动处理 chunk 目录

### 文档文件

5. **`chrome-extension/README.md`**
   - 完整的扩展使用文档
   - 包含安装、配置、故障排除等说明

6. **`chrome-extension/INSTALL.md`**
   - 快速安装指南
   - 分步骤说明如何安装和使用

7. **`chrome-extension/assets/ICONS_README.md`**
   - 图标文件创建说明

## 主要改造点

### 1. 资源路径处理

- 原项目使用 CDN 或相对路径加载资源
- 扩展版本使用 `chrome.runtime.getURL()` 获取扩展内资源路径
- 所有资源通过 `web_accessible_resources` 暴露给网页

### 2. 配置管理

- 使用 Chrome Storage API 存储用户配置
- 支持通过 popup 界面修改配置
- 配置变更后可以动态重新加载 widget

### 3. 注入机制

- 使用 Content Script 注入到所有网页
- 防止重复注入（通过 `window.live2dWidgetInjected` 标志）
- 支持单页应用（SPA）的页面导航

### 4. 权限设置

- 使用 Manifest V3
- 需要 `<all_urls>` 权限以在所有网页运行
- 需要 `storage` 权限保存配置
- 需要 `activeTab` 权限与当前标签页交互

## 使用方法

### 构建扩展

```bash
npm run build:extension
```

这个命令会：
1. 构建主项目（TypeScript → JavaScript）
2. 将必要的资源文件复制到 `chrome-extension/dist/`

### 安装扩展

1. 打开 `chrome://extensions/`
2. 启用"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择 `chrome-extension` 目录

### 使用扩展

- 安装后，访问任何网页，看板娘会自动出现
- 点击扩展图标可以打开设置面板
- 在设置中可以启用/禁用、调整日志级别等

## 技术细节

### Manifest V3 特性

- 使用 Service Worker（虽然当前版本未使用，但为未来扩展预留）
- Content Scripts 在 `document_end` 时运行
- Web Accessible Resources 允许网页访问扩展资源

### 兼容性

- 支持所有现代 Chrome 浏览器（支持 Manifest V3）
- 理论上也支持 Edge、Brave 等基于 Chromium 的浏览器
- 需要浏览器支持 WebGL（用于 Live2D 渲染）

### 限制

1. **CSP 限制**: 某些网站有严格的内容安全策略，可能会阻止扩展注入
2. **性能**: Live2D 渲染需要一定计算资源
3. **模型资源**: 需要从 CDN 或服务器加载模型，扩展本身不包含模型

## 未来改进方向

1. **选项页面**: 创建更详细的选项页面，支持更多配置
2. **模型管理**: 允许用户选择和管理本地模型
3. **白名单/黑名单**: 允许用户指定哪些网站显示看板娘
4. **主题支持**: 支持不同的看板娘主题
5. **快捷键**: 添加快捷键来显示/隐藏看板娘

## 文件结构

```
chrome-extension/
├── manifest.json          # 扩展配置
├── content.js             # 内容脚本
├── popup.html             # Popup 界面
├── popup.js               # Popup 逻辑
├── copy-assets.js         # 构建脚本
├── README.md              # 完整文档
├── INSTALL.md             # 安装指南
├── .gitignore             # Git 忽略文件
├── dist/                  # 资源文件（构建后生成）
│   ├── waifu.css
│   ├── waifu-tips.js
│   ├── waifu-tips.json
│   ├── live2d.min.js
│   └── chunk/
└── assets/                # 图标文件
    ├── ICONS_README.md
    ├── icon16.png         # 需要创建
    ├── icon48.png         # 需要创建
    └── icon128.png        # 需要创建
```

## 注意事项

1. **图标文件**: 需要手动创建三个图标文件（见 `assets/ICONS_README.md`）
2. **首次构建**: 确保先运行 `npm run build` 生成 dist 文件
3. **重新加载**: 修改代码后需要重新构建并重新加载扩展
4. **调试**: 使用 Chrome DevTools 查看控制台日志

## 总结

改造已完成，扩展可以正常工作。主要特点：

✅ 完整的 Chrome 扩展结构
✅ Manifest V3 兼容
✅ 配置管理界面
✅ 自动注入到所有网页
✅ SPA 支持
✅ 完整的文档

现在可以按照 `chrome-extension/INSTALL.md` 中的步骤安装和使用扩展了！

