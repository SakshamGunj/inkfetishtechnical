import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

old_slide = """        <!-- Slide: The Forgotten Purpose -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">THE LOST PURPOSE</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 50px; color: var(--text-dark); text-transform: uppercase;">THEY HAVE FORGOTTEN WHY BOOKS ARE WRITTEN.</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 15px; line-height: 1.6; font-style: italic;">
                    Every book is written to inspire.
                </p>
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 40px; line-height: 1.6; font-style: italic;">
                    Every book is written to leave a legacy.
                </p>
                
                <div style="background: var(--text-dark); color: white; padding: 25px 50px; border-radius: 15px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                    <p style="font-size: 2.8rem; font-family: 'Cinzel', serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                        Every book is written to make a change.
                    </p>
                </div>
            </div>
        </div>"""

new_slide = """        <!-- Slide: The Forgotten Purpose -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95); padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">THE LOST PURPOSE</div>
            <h1 class="title-huge" style="font-size: 3.2rem; margin-bottom: 30px; color: var(--text-dark); text-transform: uppercase;">THEY HAVE FORGOTTEN WHY BOOKS ARE WRITTEN.</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 1.8rem; color: #444; margin-bottom: 10px; line-height: 1.6; font-style: italic;">
                    Every book is written to inspire.
                </p>
                <p style="font-size: 1.8rem; color: #444; margin-bottom: 30px; line-height: 1.6; font-style: italic;">
                    Every book is written to leave a legacy.
                </p>
                
                <div style="background: var(--text-dark); color: white; padding: 20px 40px; border-radius: 15px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                    <p style="font-size: 2.2rem; font-family: 'Cinzel', serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                        Every book is written to make a change.
                    </p>
                </div>
            </div>
        </div>"""

if old_slide in html:
    html = html.replace(old_slide, new_slide)
    with open("iwl_presentation.html", "w") as f:
        f.write(html)
    print("Success")
else:
    print("Failed to find old slide")
