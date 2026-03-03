#!/usr/bin/env python3
"""Overlay the AI image as a large center emblem on the QR code, not full-bleed."""
from PIL import Image, ImageDraw
import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import CircleModuleDrawer
from qrcode.image.styles.colormasks import RadialGradiantColorMask
import os

SQUATCH_DIR = "/sessions/fervent-trusting-rubin/mnt/squatchwalk"
URL = "https://yoursite.com/hunt.html?stop=1"

def create_center_emblem_qr(bg_path, output_path, emblem_pct=0.42):
    """
    Create a QR code with the AI image as a centered circular emblem.
    emblem_pct = how much of the QR width the emblem takes up (0.35-0.45 is the sweet spot).
    """
    # Generate colored QR code
    qr = qrcode.QRCode(version=5, error_correction=qrcode.constants.ERROR_CORRECT_H,
                        box_size=12, border=2)
    qr.add_data(URL)
    qr.make(fit=True)

    # Create QR with sage green circle dots (matching Nature Nurture Farmacy)
    qr_img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=CircleModuleDrawer(),
        color_mask=RadialGradiantColorMask(
            center_color=(120, 90, 70),   # Warm brown center
            edge_color=(76, 125, 60),     # Green edges
            back_color=(245, 240, 232),   # Cream background
        ),
    ).convert("RGBA")
    qr_size = qr_img.size[0]

    # Load the AI image
    emblem = Image.open(bg_path).convert("RGBA")

    # Calculate emblem size
    emblem_size = int(qr_size * emblem_pct)

    # Resize emblem
    emblem = emblem.resize((emblem_size, emblem_size), Image.LANCZOS)

    # Create circular mask for the emblem
    mask = Image.new("L", (emblem_size, emblem_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse([0, 0, emblem_size-1, emblem_size-1], fill=255)

    # Add a white circle background (slightly larger) for clean border
    border_width = 6
    bg_circle_size = emblem_size + border_width * 2

    # Position: center of QR
    cx = (qr_size - bg_circle_size) // 2
    cy = (qr_size - bg_circle_size) // 2

    # Draw white border circle onto QR
    qr_draw = ImageDraw.Draw(qr_img)
    qr_draw.ellipse([cx, cy, cx + bg_circle_size, cy + bg_circle_size],
                     fill=(255, 255, 255, 255))

    # Optional: draw a thin colored ring around the emblem
    ring_color = (100, 75, 55, 255)  # Brown ring
    qr_draw.ellipse([cx, cy, cx + bg_circle_size, cy + bg_circle_size],
                     outline=ring_color, width=3)

    # Paste the circular emblem
    emblem_x = cx + border_width
    emblem_y = cy + border_width

    # Apply circular mask to emblem
    emblem_circular = Image.new("RGBA", (emblem_size, emblem_size), (0, 0, 0, 0))
    emblem_circular.paste(emblem, (0, 0), mask)

    qr_img.paste(emblem_circular, (emblem_x, emblem_y), emblem_circular)

    # Save
    qr_img.convert("RGB").save(output_path, quality=95)
    print(f"Created: {output_path} ({qr_size}x{qr_size})")


# Generate
src = os.path.join(SQUATCH_DIR, "01-farmacy.png")
out = os.path.join(SQUATCH_DIR, "01-farmacy-QR-center.png")
create_center_emblem_qr(src, out)

print("Done!")
