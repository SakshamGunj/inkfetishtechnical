import re

with open("public/honey-hurt-presentation/index.html", "r") as f:
    content = f.read()

# 1. Match the two hook slides (Slide 10 and Slide 11)
hooks_pattern = re.compile(r'(<!-- Slide 10: Stay Till The End.*?)</section>\s*(<!-- Slide 11: Stay Till The End.*?)</section>\s*', re.DOTALL)
hooks_match = hooks_pattern.search(content)

if not hooks_match:
    print("Could not find hooks.")
    exit(1)

hooks_html = hooks_match.group(0)

# Remove hooks from current position
content_no_hooks = content[:hooks_match.start()] + content[hooks_match.end():]

# 2. Match Slide 9 to find where to insert
slide9_pattern = re.compile(r'(<!-- Slide 9: The Certificate.*?)</section>', re.DOTALL)
slide9_match = slide9_pattern.search(content_no_hooks)

if slide9_match:
    final_content = content_no_hooks[:slide9_match.end()] + "\n\n        " + hooks_html + content_no_hooks[slide9_match.end():]
    with open("public/honey-hurt-presentation/index.html", "w") as f:
        f.write(final_content)
    print("Success: Moved hooks after Slide 9.")
else:
    print("Error finding Slide 9.")

