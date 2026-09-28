import re
with open("iwl_presentation.html", "r") as f:
    html = f.read()

pattern = re.compile(r'<div class="presentation-container">\s*<div class="slide-border">\s*<div class="slide-border-inner"></div>\s*</div>\s*<div class="corner corner-tl"></div>\s*<div class="corner corner-tr"></div>\s*<div class="corner corner-bl"></div>\s*<div class="corner corner-br"></div>', re.MULTILINE)

if pattern.search(html):
    html = pattern.sub('<div class="presentation-container">', html)
    with open("iwl_presentation.html", "w") as f:
        f.write(html)
    print("Fixed")
else:
    print("Not found")
