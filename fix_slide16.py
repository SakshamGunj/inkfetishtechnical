import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

old_slide = """        <!-- Slide 15B: The Book -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <p style="font-size: 2.2rem; color: #444; margin-bottom: 40px; line-height: 1.6; font-family: 'Playfair Display', serif;">
                Now, we are continuing the journey with 150 new writers.
            </p>
            <div style="background: var(--text-dark); color: white; padding: 25px 40px; border-radius: 12px; display: inline-block; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 2rem; font-weight: bold; font-family: 'Montserrat', sans-serif; margin: 0; letter-spacing: 1px;">NO ADDITIONAL PUBLICATION CHARGE</p>
            </div>
            <p style="font-size: 2.8rem; font-weight: bold; font-family: 'Cinzel', serif; color: var(--text-accent); margin: 0;">Your name. Your writing. Your book.</p>
        </div>"""

new_slide = """        <!-- Slide 15B: The Book -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: #2e7d32;">THE BEST PART</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 20px; color: #2e7d32; text-transform: uppercase;">
                PUBLISHED FOR FREE
            </h1>
            <p style="font-size: 2.5rem; font-family: 'Montserrat', sans-serif; font-weight: bold; color: var(--text-dark); margin-bottom: 50px; letter-spacing: 2px;">
                (NO ADDITIONAL PUBLICATION CHARGE)
            </p>
            
            <div style="display: inline-block; border-top: 2px solid var(--border-color); border-bottom: 2px solid var(--border-color); padding: 20px 60px;">
                <p style="font-size: 3rem; font-weight: bold; font-family: 'Cinzel', serif; color: var(--text-accent); margin: 0;">
                    Your name. Your writing. Your book.
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
