import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

old_slide = """        <!-- Slide: The Forgotten Purpose -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">THE LOST PURPOSE</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 50px; color: var(--text-dark); text-transform: uppercase;">THEY FORGOT WHY BOOKS ARE WRITTEN.</h1>
            
            <div style="background: var(--text-dark); color: white; padding: 30px 60px; border-radius: 15px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 3rem; font-family: 'Cinzel', serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                    Every book is written to make a change.
                </p>
            </div>
        </div>"""

new_slide = """        <!-- Slide: The Forgotten Purpose -->
        <div class="slide" style="justify-content: center; text-align: center; padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">THE LOST PURPOSE</div>
            <h1 class="title-huge" style="font-size: 3rem; margin-bottom: 30px; color: var(--text-dark); text-transform: uppercase;">THEY FORGOT WHY BOOKS ARE WRITTEN.</h1>
            
            <div style="max-width: 900px; margin: 0 auto; border-top: 2px solid var(--border-color); border-bottom: 2px solid var(--border-color); padding: 30px 0;">
                <p style="font-size: 2.5rem; font-family: 'Playfair Display', serif; color: var(--text-dark); margin: 0; font-style: italic; line-height: 1.4;">
                    "Every book is written to make a change."
                </p>
            </div>
        </div>"""

if old_slide in html:
    html = html.replace(old_slide, new_slide)
    with open("iwl_presentation.html", "w") as f:
        f.write(html)
    print("Success")
else:
    print("Failed to find old slide")
