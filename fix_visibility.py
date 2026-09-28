import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

# 1. Slide 15: The Book
html = html.replace(
    '<div class="slide" style="justify-content: flex-start; padding-top: 50px;">\n            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px;">WHAT HAPPENS NEXT?</div>\n            <h1 class="title-huge" style="font-size: 3rem; margin-bottom: 40px; color: var(--text-dark);">YOUR WRITING GOES INTO A BOOK</h1>',
    '<div class="slide" style="justify-content: flex-start; padding-top: 20px;">\n            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px;">WHAT HAPPENS NEXT?</div>\n            <h1 class="title-huge" style="font-size: 2.8rem; margin-bottom: 20px; color: var(--text-dark);">YOUR WRITING GOES INTO A BOOK</h1>'
)
html = html.replace(
    '<h2 style="font-size: 2.8rem; font-family: \'Cinzel\', serif; color: var(--text-accent); margin-bottom: 30px; font-weight: bold;">SYAAHI — VOLUME 2</h2>',
    '<h2 style="font-size: 2.4rem; font-family: \'Cinzel\', serif; color: var(--text-accent); margin-bottom: 15px; font-weight: bold;">SYAAHI — VOLUME 2</h2>'
)
html = html.replace(
    '<div style="background: rgba(255,255,255,0.7); border-left: 4px solid var(--text-accent); padding: 15px 20px; margin-bottom: 30px; border-radius: 0 10px 10px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">',
    '<div style="background: rgba(255,255,255,0.7); border-left: 4px solid var(--text-accent); padding: 15px 20px; margin-bottom: 15px; border-radius: 0 10px 10px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">'
)
html = html.replace(
    '<div style="background: var(--text-dark); color: white; padding: 15px 25px; border-radius: 8px; display: inline-block; margin-bottom: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">',
    '<div style="background: var(--text-dark); color: white; padding: 15px 25px; border-radius: 8px; display: inline-block; margin-bottom: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">'
)

# 2. Slide: The Solution (Promise to you)
html = html.replace(
    '<div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 20px; color: #2e7d32;">OUR PROMISE TO YOU</div>\n            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 30px; color: var(--text-dark);">WE ARE HERE TO ENABLE YOU.</h1>',
    '<div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px; color: #2e7d32;">OUR PROMISE TO YOU</div>\n            <h1 class="title-huge" style="font-size: 2.8rem; margin-bottom: 15px; color: var(--text-dark);">WE ARE HERE TO ENABLE YOU.</h1>'
)
html = html.replace(
    '<p style="font-size: 2rem; color: #444; margin-bottom: 30px; line-height: 1.6; font-family: \'Playfair Display\', serif;">',
    '<p style="font-size: 1.8rem; color: #444; margin-bottom: 15px; line-height: 1.4; font-family: \'Playfair Display\', serif;">'
)
html = html.replace(
    '<p style="font-size: 1.8rem; font-weight: bold; font-family: \'Playfair Display\', serif; color: var(--text-accent); margin-bottom: 30px; letter-spacing: 2px;">',
    '<p style="font-size: 1.6rem; font-weight: bold; font-family: \'Playfair Display\', serif; color: var(--text-accent); margin-bottom: 15px; letter-spacing: 2px;">'
)

# 3. Slide: The Forgotten Purpose (Lost Purpose)
html = html.replace(
    '<div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">THE LOST PURPOSE</div>\n            <h1 class="title-huge" style="font-size: 3.2rem; margin-bottom: 30px; color: var(--text-dark); text-transform: uppercase;">THEY HAVE FORGOTTEN WHY BOOKS ARE WRITTEN.</h1>',
    '<div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px; color: var(--text-accent);">THE LOST PURPOSE</div>\n            <h1 class="title-huge" style="font-size: 2.6rem; margin-bottom: 15px; color: var(--text-dark); text-transform: uppercase;">THEY HAVE FORGOTTEN WHY BOOKS ARE WRITTEN.</h1>'
)
html = html.replace(
    '<p style="font-size: 1.8rem; color: #444; margin-bottom: 10px; line-height: 1.6; font-style: italic;">',
    '<p style="font-size: 1.6rem; color: #444; margin-bottom: 10px; line-height: 1.4; font-style: italic;">'
)
html = html.replace(
    '<p style="font-size: 1.8rem; color: #444; margin-bottom: 30px; line-height: 1.6; font-style: italic;">',
    '<p style="font-size: 1.6rem; color: #444; margin-bottom: 15px; line-height: 1.4; font-style: italic;">'
)

# 4. Slide: Exclusive Invitation (Movement for change)
html = html.replace(
    '<div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">A MOVEMENT FOR CHANGE</div>\n            <h1 class="title-huge" style="font-size: 3.2rem; margin-bottom: 30px; color: var(--text-dark);">WE ARE LOOKING FOR 25 AUTHORS.</h1>',
    '<div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px; color: var(--text-accent);">A MOVEMENT FOR CHANGE</div>\n            <h1 class="title-huge" style="font-size: 2.8rem; margin-bottom: 15px; color: var(--text-dark);">WE ARE LOOKING FOR 25 AUTHORS.</h1>'
)
html = html.replace(
    '<p style="font-size: 2rem; color: #444; margin-bottom: 20px; line-height: 1.6; font-family: \'Playfair Display\', serif;">',
    '<p style="font-size: 1.8rem; color: #444; margin-bottom: 10px; line-height: 1.4; font-family: \'Playfair Display\', serif;">'
)
html = html.replace(
    '<p style="font-size: 2.2rem; color: var(--text-dark); margin-bottom: 30px; font-weight: bold; font-family: \'Cinzel\', serif;">',
    '<p style="font-size: 2rem; color: var(--text-dark); margin-bottom: 15px; font-weight: bold; font-family: \'Cinzel\', serif;">'
)

# 5. Slide: Final Reveal (Grand Winners Intro)
html = html.replace(
    '<div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: #2e7d32;">THE FINAL REVEAL</div>\n            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 30px; color: var(--text-dark); text-transform: uppercase;">THE GRAND WINNERS</h1>',
    '<div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 10px; color: #2e7d32;">THE FINAL REVEAL</div>\n            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 15px; color: var(--text-dark); text-transform: uppercase;">THE GRAND WINNERS</h1>'
)
html = html.replace(
    '<p style="font-size: 2.2rem; color: #444; margin-bottom: 40px; font-family: \'Playfair Display\', serif; font-style: italic;">',
    '<p style="font-size: 2rem; color: #444; margin-bottom: 20px; font-family: \'Playfair Display\', serif; font-style: italic;">'
)

with open("iwl_presentation.html", "w") as f:
    f.write(html)
print("Finished updates.")
