import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

old_slide = """        <!-- Slide: The Power of Words -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">THE POWER OF WORDS</div>
            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 40px; color: var(--text-dark); max-width: 1200px; margin-left: auto; margin-right: auto; line-height: 1.4; font-family: 'Playfair Display', serif; text-transform: uppercase;">WHAT IS THE MOST INFLUENTIAL THING IN THE WORLD?</h1>
            
            <div style="max-width: 1000px; margin: 0 auto; text-align: left;">
                <p style="font-size: 1.8rem; color: #555; margin-bottom: 20px; font-family: 'Montserrat', sans-serif; font-weight: 500;">
                    <span style="color: var(--text-accent); font-weight: bold;">✕</span> It is not politicians. <br>
                    <span style="color: var(--text-accent); font-weight: bold;">✕</span> It is not social media.
                </p>
                
                <p style="font-size: 2rem; color: #333; margin-bottom: 40px; line-height: 1.6; font-family: 'Playfair Display', serif;">
                    Every major breakthrough, innovation, and freedom movement happened because someone published their thoughts in a book—and someone else read it and took action.
                </p>
                
                <div style="background: var(--text-dark); color: white; padding: 20px 40px; border-radius: 12px; text-align: center; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
                    <p style="font-size: 2.5rem; font-family: 'Cinzel', serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                        A book holds the immense power to change the world.
                    </p>
                </div>
            </div>
        </div>"""

new_slide = """        <!-- Slide: The Power of Words -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95); padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 15px; color: var(--text-accent);">THE POWER OF WORDS</div>
            <h1 class="title-huge" style="font-size: 2.8rem; margin-bottom: 20px; color: var(--text-dark); max-width: 1200px; margin-left: auto; margin-right: auto; line-height: 1.3; font-family: 'Playfair Display', serif; text-transform: uppercase;">WHAT IS THE MOST INFLUENTIAL THING IN THE WORLD?</h1>
            
            <div style="max-width: 1000px; margin: 0 auto; text-align: left;">
                <p style="font-size: 1.6rem; color: #555; margin-bottom: 15px; font-family: 'Montserrat', sans-serif; font-weight: 500;">
                    <span style="color: var(--text-accent); font-weight: bold;">✕</span> It is not politicians. <br>
                    <span style="color: var(--text-accent); font-weight: bold;">✕</span> It is not social media.
                </p>
                
                <p style="font-size: 1.8rem; color: #333; margin-bottom: 25px; line-height: 1.5; font-family: 'Playfair Display', serif;">
                    Every major breakthrough, innovation, and freedom movement happened because someone published their thoughts in a book—and someone else read it and took action.
                </p>
                
                <div style="background: var(--text-dark); color: white; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
                    <p style="font-size: 2rem; font-family: 'Cinzel', serif; margin: 0; font-weight: bold; letter-spacing: 2px; color: #fff;">
                        A book holds the immense power to change the world.
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
