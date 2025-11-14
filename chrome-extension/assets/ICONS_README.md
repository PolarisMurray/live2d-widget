# 图标文件说明

请在此目录下创建以下图标文件：

- `icon16.png` - 16x16 像素
- `icon48.png` - 48x48 像素  
- `icon128.png` - 128x128 像素

## 快速创建图标的方法

### 方法 1: 使用在线工具

1. 访问 [Favicon Generator](https://favicon.io/favicon-generator/)
2. 输入文字 "L2D" 或上传一个简单的图片
3. 下载生成的图标
4. 重命名并放置到本目录

### 方法 2: 使用 ImageMagick

如果你安装了 ImageMagick，可以运行：

```bash
# 创建一个简单的红色方块作为占位符
convert -size 16x16 xc:#cd3e45 icon16.png
convert -size 48x48 xc:#cd3e45 icon48.png
convert -size 128x128 xc:#cd3e45 icon128.png
```

### 方法 3: 使用 Python (PIL/Pillow)

```python
from PIL import Image, ImageDraw, ImageFont

sizes = [16, 48, 128]
color = (205, 62, 69)  # #cd3e45

for size in sizes:
    img = Image.new('RGB', (size, size), color)
    draw = ImageDraw.Draw(img)
    # 可以添加文字或图案
    img.save(f'icon{size}.png')
```

### 方法 4: 使用任何图像编辑软件

使用 Photoshop、GIMP、或任何图像编辑软件创建相应尺寸的图标即可。

## 临时解决方案

如果暂时没有图标，你可以：
1. 从原项目的 logo 或截图创建
2. 使用简单的纯色方块作为占位符
3. 扩展仍然可以工作，只是工具栏图标会显示默认图标

