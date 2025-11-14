# 快速安装指南

## 步骤 1: 构建项目

```bash
# 安装依赖（如果还没有）
npm install

# 构建主项目和扩展
npm run build:extension
```

## 步骤 2: 创建图标（可选但推荐）

在 `chrome-extension/assets/` 目录下创建三个图标文件：
- `icon16.png` (16x16)
- `icon48.png` (48x48)
- `icon128.png` (128x128)

如果没有图标，扩展仍然可以工作，只是会显示默认图标。

快速创建占位符图标（需要 ImageMagick）：
```bash
cd chrome-extension/assets
convert -size 16x16 xc:#cd3e45 icon16.png
convert -size 48x48 xc:#cd3e45 icon48.png
convert -size 128x128 xc:#cd3e45 icon128.png
```

## 步骤 3: 在 Chrome 中加载扩展

1. 打开 Chrome 浏览器
2. 在地址栏输入 `chrome://extensions/` 并回车
3. 在右上角启用"开发者模式"开关
4. 点击"加载已解压的扩展程序"按钮
5. 选择项目根目录下的 `chrome-extension` 文件夹
6. 扩展安装完成！

## 步骤 4: 使用扩展

1. 访问任何网页（如 `https://www.google.com`）
2. Live2D 看板娘应该会自动出现在页面左下角
3. 点击浏览器工具栏中的扩展图标可以打开设置面板

## 故障排除

### 扩展无法加载

- 确保 `chrome-extension/dist/` 目录下有必要的文件：
  - `waifu.css`
  - `waifu-tips.js`
  - `waifu-tips.json`
  - `live2d.min.js`

### 看板娘不显示

1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签页是否有错误
3. 检查扩展 popup 中的"Enable Live2D Widget"是否已勾选
4. 确认网络连接正常，可以访问 CDN

### 需要重新加载扩展

修改代码后：
1. 运行 `npm run build:extension`
2. 在 `chrome://extensions/` 页面点击扩展的"重新加载"按钮
3. 刷新目标网页

## 下一步

查看 [README.md](./README.md) 了解更多配置选项和高级用法。

