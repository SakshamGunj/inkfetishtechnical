import re

with open("public/honey-hurt-presentation/index.html", "r") as f:
    lines = f.readlines()

slide_count = 0
for i, line in enumerate(lines):
    if "<section class=\"slide" in line:
        slide_count += 1
        # Try to find a comment or h2 right before/after
        # Look at the previous line for a comment
        comment = ""
        if "<!--" in lines[i-1]:
            comment = lines[i-1].strip()
        print(f"Slide {slide_count}: {comment}")
