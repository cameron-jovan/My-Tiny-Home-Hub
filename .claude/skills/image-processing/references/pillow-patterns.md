# Pillow Image Processing Patterns

Reference patterns for common web image operations. Claude should adapt these to the user's
specific needs rather than running them as-is.

## RGBA-to-JPG Compositing

JPG does not support transparency. When converting RGBA images to JPG, composite onto a white background first:

```python
from PIL import Image

img = Image.open(input_path)
if output_path.lower().endswith((".jpg", ".jpeg")) and img.mode == "RGBA":
    bg = Image.new("RGB", img.size, (255, 255, 255))
    bg.paste(img, mask=img.split()[3])  # Use alpha channel as mask
    img = bg
```

This also applies inside the save function — always check before saving as JPG.

## Save with Format-Specific Quality

Different formats need different save parameters:

```python
def save_image(img, output_path, quality=None):
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    kwargs = {}
    ext = output_path.lower().rsplit(".", 1)[-1]

    if ext == "webp":
        kwargs = {"quality": quality or 85, "method": 6}
    elif ext in ("jpg", "jpeg"):
        kwargs = {"quality": quality or 90, "optimize": True}
        # Handle RGBA → RGB conversion
        if img.mode == "RGBA":
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[3])
            img = bg
    elif ext == "png":
        kwargs = {"optimize": True}

    img.save(output_path, **kwargs)
```

## Resize with Aspect Ratio

When only width or height is given, calculate the other from aspect ratio:

```python
def resize_image(img, width=None, height=None):
    if width and height:
        return img.resize((width, height), Image.LANCZOS)
    elif width:
        ratio = width / img.width
        return img.resize((width, int(img.height * ratio)), Image.LANCZOS)
    elif height:
        ratio = height / img.height
        return img.resize((int(img.width * ratio), height), Image.LANCZOS)
    return img
```

## Trim Whitespace (Auto-Crop)

Remove surrounding whitespace from logos and icons:

```python
img = Image.open(input_path)
if img.mode != "RGBA":
    img = img.convert("RGBA")
bbox = img.getbbox()  # Returns bounding box of non-zero pixels
if bbox:
    img = img.crop(bbox)
```

## OG Card Generation (1200x630)

Composite text on a background image or solid colour:

```python
from PIL import Image, ImageDraw, ImageFont

width, height = 1200, 630

# Background: image or solid colour
if background_path:
    img = Image.open(background_path).resize((width, height), Image.LANCZOS)
else:
    img = Image.new("RGB", (width, height), bg_color or "#1a1a2e")

# Semi-transparent overlay for text readability
overlay = Image.new("RGBA", (width, height), (0, 0, 0, 128))
img = img.convert("RGBA")
img = Image.alpha_composite(img, overlay)

draw = ImageDraw.Draw(img)
font_title = get_font(48)
font_sub = get_font(24)

# Centre title
if title:
    bbox = draw.textbbox((0, 0), title, font=font_title)
    tw = bbox[2] - bbox[0]
    draw.text(((width - tw) // 2, height // 2 - 60), title, fill="white", font=font_title)

img = img.convert("RGB")
```

## Cross-Platform Font Discovery

System font paths differ by OS. Try multiple paths, fall back to Pillow's default:

```python
def get_font(size):
    font_paths = [
        # macOS
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNSText.ttf",
        # Linux
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        # Windows
        "C:/Windows/Fonts/arial.ttf",
    ]
    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()
```

**Tip**: On Linux, `fc-list` shows available fonts. Claude can discover fonts dynamically rather than hardcoding paths.

## Environment Alternatives

If Pillow is not available:

| Alternative | Platform | Install | Best for |
|-------------|----------|---------|----------|
| `sips` | macOS (built-in) | None | Resize, convert (no trim/OG) |
| `sharp` | Node.js | `npm install sharp` | Full feature set, high performance |
| `ffmpeg` | Cross-platform | `brew install ffmpeg` | Resize, convert |

```bash
# macOS sips examples
sips --resampleWidth 1920 input.jpg --out resized.jpg
sips --setProperty format webp input.jpg --out output.webp
```
