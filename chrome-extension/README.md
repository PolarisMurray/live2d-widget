# Live2D Widget Chrome Extension

这是一个将 Live2D Widget 改造为 Chrome 扩展的版本，可以在任何网页上添加 Live2D 看板娘。

## 功能特性

- ✅ 在任何网页上自动加载 Live2D 看板娘
- ✅ 支持 Cubism 2 和 Cubism 5 模型
- ✅ 可配置的选项（启用/禁用、日志级别、拖拽等）
- ✅ 支持单页应用（SPA）的页面导航
- ✅ 通过扩展 popup 界面进行设置

## 安装步骤

### 1. 构建项目

首先，确保你已经构建了主项目：

```bash
npm install
npm run build
```

### 2. 复制资源文件

运行以下命令将必要的资源文件复制到扩展目录：

```bash
npm run build:extension
```

或者手动运行：

```bash
node chrome-extension/copy-assets.js
```

### 3. 创建图标文件

在 `chrome-extension/assets/` 目录下创建以下图标文件：
- `icon16.png` (16x16 像素)
- `icon48.png` (48x48 像素)
- `icon128.png` (128x128 像素)

你可以使用任何图像编辑工具创建这些图标，或者使用在线工具如 [Favicon Generator](https://favicon.io/)。

### 4. 在 Chrome 中加载扩展

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 启用"开发者模式"（右上角开关）
4. 点击"加载已解压的扩展程序"
5. 选择 `chrome-extension` 目录
6. 扩展安装完成！

## 使用方法

### 基本使用

安装扩展后，访问任何网页，Live2D 看板娘会自动出现在页面左下角。

### 配置选项

点击浏览器工具栏中的扩展图标，可以打开设置面板：

- **Enable Live2D Widget**: 启用/禁用看板娘
- **Log Level**: 设置日志级别（error, warn, info, trace）
- **Enable Drag**: 允许拖拽看板娘
- **CDN Path**: 设置模型 CDN 路径

### 模型配置

扩展默认使用以下 CDN 路径加载模型：
- `https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/`

你可以在 popup 设置中修改 CDN 路径，或者使用自己的模型服务器。

## 项目结构

```
chrome-extension/
├── manifest.json          # Chrome 扩展配置文件
├── content.js             # 内容脚本（注入到网页中）
├── popup.html             # 扩展 popup 界面
├── popup.js               # Popup 脚本
├── copy-assets.js         # 资源复制脚本
├── dist/                  # 构建后的资源文件
│   ├── waifu.css
│   ├── waifu-tips.js
│   ├── waifu-tips.json
│   ├── live2d.min.js
│   └── chunk/
└── assets/                # 扩展图标
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 开发说明

### 修改代码后重新构建

1. 修改源代码后运行：
   ```bash
   npm run build:extension
   ```

2. 在 Chrome 扩展管理页面点击"重新加载"按钮

### 调试

- 打开 Chrome DevTools，在 Console 中可以看到 Live2D Widget 的日志
- 检查 `chrome://extensions/` 中的错误信息
- 查看 Content Script 的执行情况

## 注意事项

1. **CORS 问题**: 某些网站可能有严格的内容安全策略（CSP），可能会阻止扩展注入脚本。这种情况下，扩展可能无法正常工作。

2. **性能**: Live2D 渲染需要一定的计算资源，在低性能设备上可能会影响页面性能。

3. **模型资源**: 扩展不包含任何 Live2D 模型，需要从 CDN 或你自己的服务器加载模型。

4. **权限**: 扩展需要 `<all_urls>` 权限才能在所有网页上运行。如果你只想在特定网站上运行，可以修改 `manifest.json` 中的 `host_permissions`。

## 故障排除

### 看板娘不显示

1. 检查扩展是否已启用
2. 打开 popup 检查设置中的 "Enable Live2D Widget" 是否勾选
3. 查看浏览器控制台是否有错误信息
4. 检查网络连接，确保可以访问 CDN

### 模型加载失败

1. 检查 CDN 路径是否正确
2. 确认模型服务器可访问
3. 查看控制台日志了解详细错误

## 许可证

本项目遵循原项目的 GPL-3.0 许可证。

## 相关链接

- [原项目仓库](https://github.com/stevenjoezhang/live2d-widget)
- [Live2D 官方网站](https://www.live2d.com/)

