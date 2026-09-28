import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

images = [
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM-compressed_f54p62.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.50_PM_1_-compressed_bla9w8.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100331/WhatsApp_Image_2026-04-13_at_9.06.49_PM-compressed_krdg8g.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.50_PM_2_-compressed_nrkzf4.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.49_PM_1_-compressed_ylopb7.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM_1_-compressed_zolkao.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_9.06.48_PM-compressed_ftx5ea.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100330/WhatsApp_Image_2026-04-13_at_8.12.24_PM-compressed_skr10b.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1776100329/WhatsApp_Image_2026-04-13_at_8.19.16_PM-compressed_pii87q.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933371/WhatsApp_Image_2026-03-29_at_12.40.13_PM-compressed_wjaeil.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933368/WhatsApp_Image_2026-03-29_at_12.35.16_PM_2_-compressed_d12sxy.webp",
    "https://res.cloudinary.com/dde8ekuuu/image/upload/v1775933367/WhatsApp_Image_2026-03-28_at_8.00.34_PM-compressed_yfhhz2.webp"
]

def generate_row(direction, speed_class, img_list):
    img_html = ""
    for _ in range(4): # 48 images total, 24 is one half. 24 * 220px = 5280px > 1920px. Perfect.
        for img in img_list:
            img_html += f'<img src="{img}" class="gallery-img">\\n                    '
    
    return f'<div class="marquee-row {speed_class}">\\n                    {img_html}\\n                </div>'

row1 = generate_row('left', 'scroll-left', images)
row2 = generate_row('right', 'scroll-right-fast', images[::-1])
row3 = generate_row('left', 'scroll-left-fast', images[4:] + images[:4])

replacement = f"""
            <!-- Sliding Gallery 3 Rows -->
            <style>
                @keyframes scrollLeft {{ 0% {{ transform: translateX(0); }} 100% {{ transform: translateX(-50%); }} }}
                @keyframes scrollRight {{ 0% {{ transform: translateX(-50%); }} 100% {{ transform: translateX(0); }} }}
                .marquee-container {{ width: 1920px; overflow: hidden; position: relative; margin-top: 25px; left: 50%; transform: translateX(-50%); }}
                .marquee-row {{ display: flex; gap: 15px; width: max-content; margin-bottom: 15px; }}
                .scroll-left {{ animation: scrollLeft 45s linear infinite; }}
                .scroll-right-fast {{ animation: scrollRight 55s linear infinite; }}
                .scroll-left-fast {{ animation: scrollLeft 40s linear infinite; }}
                .gallery-img {{ height: 140px; width: 220px; object-fit: cover; border-radius: 8px; border: 2px solid var(--border-color); box-shadow: 0 4px 10px rgba(0,0,0,0.1); }}
            </style>
            <div class="marquee-container">
                {row1}
                {row2}
                {row3}
            </div>
        </div>
"""

start_marker = "<!-- Sliding Gallery 3 Rows -->"
end_marker = "<!-- Slide 11: Benefits -->"

if start_marker in html and end_marker in html:
    part1 = html[:html.find(start_marker)]
    part2 = html[html.find(end_marker):]
    new_html = part1 + replacement + "\\n        " + part2
    with open("iwl_presentation.html", "w") as f:
        f.write(new_html)
    print("Success")
else:
    print("Markers not found.")
