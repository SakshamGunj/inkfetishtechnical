import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

old_slide = """        <!-- Slide: Winners Intro -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: #2e7d32;">THE FINAL REVEAL</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 40px; color: var(--text-dark); text-transform: uppercase;">THE GRAND WINNERS</h1>
            
            <div style="background: var(--text-dark); color: white; padding: 25px 50px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 2.5rem; font-family: 'Montserrat', sans-serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                    INDIAN WRITERS LEAGUE — VOLUME 2
                </p>
            </div>
        </div>"""

new_slide = """        <!-- Slide: Winners Intro -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95); padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 20px; color: #2e7d32;">THE FINAL REVEAL</div>
            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 30px; color: var(--text-dark); text-transform: uppercase;">THE GRAND WINNERS</h1>
            
            <div style="display: inline-block; border-bottom: 4px solid var(--text-accent); padding-bottom: 10px;">
                <p style="font-size: 2.8rem; font-family: 'Cinzel', serif; color: var(--text-dark); margin: 0; font-weight: bold; letter-spacing: 3px;">
                    INDIAN WRITERS LEAGUE <span style="color: var(--text-accent);">|</span> VOLUME 2
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
