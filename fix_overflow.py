import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

# Find the .slides-wrapper css
old_wrapper_css = """        .slides-wrapper {
            position: relative;
            width: 85%;
            height: 80%;
            z-index: 5;
        }"""

new_wrapper_css = """        .slides-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            transform: scale(0.85); /* Scales down the massive 1920x1080 canvas to give it perfect padding */
            z-index: 5;
        }"""

if old_wrapper_css in html:
    html = html.replace(old_wrapper_css, new_wrapper_css)
    with open("iwl_presentation.html", "w") as f:
        f.write(html)
    print("Success wrapper")
else:
    print("Failed to find wrapper css")

