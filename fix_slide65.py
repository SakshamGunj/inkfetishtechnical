import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

old_slide = """        <!-- Slide: The Exclusive Invitation -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">A MOVEMENT FOR CHANGE</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 40px; color: var(--text-dark);">WE ARE LOOKING FOR 25 AUTHORS.</h1>
            
            <div style="background: var(--text-dark); color: white; padding: 25px 50px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 2.2rem; font-family: 'Montserrat', sans-serif; margin: 0; font-weight: bold; letter-spacing: 1px;">
                    If you don't want to make an impact, then this is not for you.
                </p>
            </div>
        </div>"""

new_slide = """        <!-- Slide: The Exclusive Invitation -->
        <div class="slide" style="justify-content: center; text-align: center; padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">A MOVEMENT FOR CHANGE</div>
            <h1 class="title-huge" style="font-size: 3rem; margin-bottom: 40px; color: var(--text-dark);">WE ARE LOOKING FOR 25 AUTHORS.</h1>
            
            <div style="border: 3px solid #8b3a32; background: rgba(139, 58, 50, 0.05); padding: 20px 40px; border-radius: 15px; display: inline-block;">
                <p style="font-size: 2.2rem; font-family: 'Montserrat', sans-serif; color: #8b3a32; margin: 0; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
                    If you don't want to make an impact, then this is not for you.
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
