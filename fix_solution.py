import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

old_slide = """        <!-- Slide: The Solution -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: #2e7d32;">OUR PROMISE TO YOU</div>
            <h1 class="title-huge" style="font-size: 4.8rem; margin-bottom: 40px; color: var(--text-dark);">WE ARE HERE TO ENABLE YOU.</h1>
            
            <div style="max-width: 1000px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 40px; line-height: 1.6; font-family: 'Playfair Display', serif;">
                    We are here to help you publish your own solo book and create the impact you were meant to make.
                </p>
                
                <p style="font-size: 1.8rem; font-weight: bold; font-family: 'Playfair Display', serif; color: var(--text-accent); margin-bottom: 40px; letter-spacing: 2px;">
                    POETRY <span style="color: var(--border-color); margin: 0 20px;">|</span> NOVEL <span style="color: var(--border-color); margin: 0 20px;">|</span> SHORT STORY <span style="color: var(--border-color); margin: 0 20px;">|</span> LETTER BOOK
                </p>

                <div style="background: rgba(46, 125, 50, 0.1); border: 2px solid #2e7d32; padding: 25px 40px; border-radius: 50px; display: inline-block;">
                    <p style="font-size: 2.2rem; font-family: 'Cinzel', serif; color: #2e7d32; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        Let your writing reach the heights it deserves.
                    </p>
                </div>
            </div>
        </div>"""

new_slide = """        <!-- Slide: The Solution -->
        <div class="slide" style="justify-content: center; text-align: center; padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 20px; color: #2e7d32;">OUR PROMISE TO YOU</div>
            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 30px; color: var(--text-dark);">WE ARE HERE TO ENABLE YOU.</h1>
            
            <div style="max-width: 1000px; margin: 0 auto;">
                <p style="font-size: 2rem; color: #444; margin-bottom: 30px; line-height: 1.6; font-family: 'Playfair Display', serif;">
                    We are here to enable YOU to make that change.<br>
                    Publish your own solo book and create the impact you were meant to make.
                </p>
                
                <p style="font-size: 1.8rem; font-weight: bold; font-family: 'Playfair Display', serif; color: var(--text-accent); margin-bottom: 30px; letter-spacing: 2px;">
                    POETRY <span style="color: var(--border-color); margin: 0 15px;">|</span> NOVEL <span style="color: var(--border-color); margin: 0 15px;">|</span> SHORT STORY <span style="color: var(--border-color); margin: 0 15px;">|</span> LETTER BOOK
                </p>

                <div style="background: rgba(46, 125, 50, 0.1); border: 2px solid #2e7d32; padding: 20px 40px; border-radius: 50px; display: inline-block;">
                    <p style="font-size: 2rem; font-family: 'Cinzel', serif; color: #2e7d32; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        Let your writing reach the heights it deserves.
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
