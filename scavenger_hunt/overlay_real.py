#!/usr/bin/env python3
"""Overlay QR codes on the real AI-generated Bigfoot images."""
from PIL import Image, ImageDraw
import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import CircleModuleDrawer, RoundedModuleDrawer
import os

SQUATCH_DIR = "/sessions/fervent-trusting-rubin/mnt/squatchwalk"
URL_BASE = "https://yoursite.com/hunt.html"

def make_qr(stop_id):
    url = f"{URL_BASE}?stop={stop_id}"
    qr = qrcode.QRCode(version=5, error_correction=qrcode.constants.ERROR_CORRECT_H,
                        box_size=12, border=2)
    qr.add_data(url)
    qr.make(fit=True)
    return qr

def protect_finders(result, qr, qr_gray):
    """Ensure finder patterns are crisp black-on-white."""
    result_pixels = result.load()
    qr_pixels = qr_gray.load()
    qr_size = result.size[0]
    box = qr.box_size
    border = qr.border
    finder_size = 7 * box
    border_px = border * box

    finder_positions = [
        (border_px, border_px),
        (qr_size - border_px - finder_size, border_px),
        (border_px, qr_size - border_px - finder_size),
    ]

    pad = box * 2
    for fx, fy in finder_positions:
        for py in range(max(0, fy - pad), min(qr_size, fy + finder_size + pad)):
            for px in range(max(0, fx - pad), min(qr_size, fx + finder_size + pad)):
                qr_val = qr_pixels[px, py]
                if qr_val < 128:
                    result_pixels[px, py] = (0, 0, 0, 255)
                else:
                    result_pixels[px, py] = (255, 255, 255, 255)
    return result


def create_art_qr(bg_path, stop_id, output_path):
    """Method 2 style: colored circle dots over full background art."""
    qr = make_qr(stop_id)

    # Generate QR as circle dots
    qr_img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=CircleModuleDrawer(),
    ).convert("RGBA")
    qr_size = qr_img.size[0]

    # Load and resize background
    bg = Image.open(bg_path).convert("RGBA").resize((qr_size, qr_size), Image.LANCZOS)

    # Make QR dots semi-transparent and tinted by the background
    qr_pixels = qr_img.load()
    bg_pixels = bg.load()

    for y in range(qr_size):
        for x in range(qr_size):
            r, g, b, a = qr_pixels[x, y]
            if r < 128 and g < 128 and b < 128:
                # QR dot -> dark tinted version of bg color
                br, bg_g, bb, _ = bg_pixels[x, y]
                # Darken significantly but keep color hint
                qr_pixels[x, y] = (
                    max(0, int(br * 0.18)),
                    max(0, int(bg_g * 0.18)),
                    max(0, int(bb * 0.18)),
                    210  # Semi-transparent
                )
            else:
                # White -> fully transparent (show bg)
                qr_pixels[x, y] = (255, 255, 255, 0)

    # Composite
    result = Image.alpha_composite(bg, qr_img)

    # Protect finder patterns
    qr_bw = qr.make_image(fill_color="black", back_color="white").convert("L")
    qr_bw = qr_bw.resize((qr_size, qr_size), Image.NEAREST)
    result = protect_finders(result, qr, qr_bw)

    result.convert("RGB").save(output_path, quality=95)
    print(f"Created: {output_path} ({qr_size}x{qr_size})")


# Process the two uploaded images
images = [
    ("01-farmacy.png", 1, "01-farmacy-QR.png"),
    ("02-book-brush.png", 2, "02-book-brush-QR.png"),
]

for src, stop_id, out in images:
    src_path = os.path.join(SQUATCH_DIR, src)
    out_path = os.path.join(SQUATCH_DIR, out)
    if os.path.exists(src_path):
        create_art_qr(src_path, stop_id, out_path)
    else:
        print(f"NOT FOUND: {src_path}")

print("\nDone!")
