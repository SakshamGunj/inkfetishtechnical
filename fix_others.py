import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

# 2. Slide: The Solution (Slide 59)
old = """        <!-- Slide: The Solution -->
        <div class="slide" style="justify-content: center; text-align: center; padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px; color: #2e7d32;">OUR PROMISE TO YOU</div>
            <h1 class="title-huge" style="font-size: 2.8rem; margin-bottom: 15px; color: var(--text-dark);">WE ARE HERE TO ENABLE YOU.</h1>
            
            <div style="max-width: 1000px; margin: 0 auto;">
                <p style="font-size: 1.8rem; color: #444; margin-bottom: 15px; line-height: 1.4; font-family: 'Playfair Display', serif;">
                    We are here to enable YOU to make that change.<br>
                    Publish your own solo book and create the impact you were meant to make.
                </p>
                
                <p style="font-size: 1.6rem; font-weight: bold; font-family: 'Playfair Display', serif; color: var(--text-accent); margin-bottom: 15px; letter-spacing: 2px;">
                    POETRY <span style="color: var(--border-color); margin: 0 15px;">|</span> NOVEL <span style="color: var(--border-color); margin: 0 15px;">|</span> SHORT STORY <span style="color: var(--border-color); margin: 0 15px;">|</span> LETTER BOOK
                </p>

                <div style="background: rgba(46, 125, 50, 0.1); border: 2px solid #2e7d32; padding: 20px 40px; border-radius: 50px; display: inline-block;">
                    <p style="font-size: 2rem; font-family: 'Cinzel', serif; color: #2e7d32; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        Let your writing reach the heights it deserves.
                    </p>
                </div>
            </div>
        </div>"""

new = """        <!-- Slide: The Solution -->
        <div class="slide" style="justify-content: center; text-align: center; padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px; color: #2e7d32;">OUR PROMISE TO YOU</div>
            <h1 class="title-huge" style="font-size: 2.4rem; margin-bottom: 10px; color: var(--text-dark);">WE ARE HERE TO ENABLE YOU.</h1>
            
            <div style="max-width: 1000px; margin: 0 auto;">
                <p style="font-size: 1.4rem; color: #444; margin-bottom: 10px; line-height: 1.4; font-family: 'Playfair Display', serif;">
                    We are here to enable YOU to make that change.<br>
                    Publish your own solo book and create the impact you were meant to make.
                </p>
                
                <p style="font-size: 1.4rem; font-weight: bold; font-family: 'Playfair Display', serif; color: var(--text-accent); margin-bottom: 15px; letter-spacing: 2px;">
                    POETRY <span style="color: var(--border-color); margin: 0 15px;">|</span> NOVEL <span style="color: var(--border-color); margin: 0 15px;">|</span> SHORT STORY <span style="color: var(--border-color); margin: 0 15px;">|</span> LETTER BOOK
                </p>

                <div style="background: rgba(46, 125, 50, 0.1); border: 2px solid #2e7d32; padding: 15px 30px; border-radius: 50px; display: inline-block;">
                    <p style="font-size: 1.6rem; font-family: 'Cinzel', serif; color: #2e7d32; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        Let your writing reach the heights it deserves.
                    </p>
                </div>
            </div>
        </div>"""
html = html.replace(old, new)


# 3. Slide: The Forgotten Purpose (Slide 63)
old2 = """        <!-- Slide: The Forgotten Purpose -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95); padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px; color: var(--text-accent);">THE LOST PURPOSE</div>
            <h1 class="title-huge" style="font-size: 2.6rem; margin-bottom: 15px; color: var(--text-dark); text-transform: uppercase;">THEY HAVE FORGOTTEN WHY BOOKS ARE WRITTEN.</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 1.6rem; color: #444; margin-bottom: 10px; line-height: 1.4; font-style: italic;">
                    Every book is written to inspire.
                </p>
                <p style="font-size: 1.6rem; color: #444; margin-bottom: 15px; line-height: 1.4; font-style: italic;">
                    Every book is written to leave a legacy.
                </p>
                
                <div style="background: var(--text-dark); color: white; padding: 20px 40px; border-radius: 15px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                    <p style="font-size: 2.2rem; font-family: 'Cinzel', serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                        Every book is written to make a change.
                    </p>
                </div>
            </div>
        </div>"""

new2 = """        <!-- Slide: The Forgotten Purpose -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95); padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px; color: var(--text-accent);">THE LOST PURPOSE</div>
            <h1 class="title-huge" style="font-size: 2.4rem; margin-bottom: 10px; color: var(--text-dark); text-transform: uppercase;">THEY HAVE FORGOTTEN WHY BOOKS ARE WRITTEN.</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 1.4rem; color: #444; margin-bottom: 10px; line-height: 1.4; font-style: italic;">
                    Every book is written to inspire.
                </p>
                <p style="font-size: 1.4rem; color: #444; margin-bottom: 15px; line-height: 1.4; font-style: italic;">
                    Every book is written to leave a legacy.
                </p>
                
                <div style="background: var(--text-dark); color: white; padding: 15px 30px; border-radius: 15px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                    <p style="font-size: 1.8rem; font-family: 'Cinzel', serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                        Every book is written to make a change.
                    </p>
                </div>
            </div>
        </div>"""
html = html.replace(old2, new2)


# 4. Slide: Exclusive Invitation (Slide 68)
old3 = """        <!-- Slide: The Exclusive Invitation -->
        <div class="slide" style="justify-content: center; text-align: center; padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px; color: var(--text-accent);">A MOVEMENT FOR CHANGE</div>
            <h1 class="title-huge" style="font-size: 2.8rem; margin-bottom: 15px; color: var(--text-dark);">WE ARE LOOKING FOR 25 AUTHORS.</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 1.8rem; color: #444; margin-bottom: 10px; line-height: 1.4; font-family: 'Playfair Display', serif;">
                    Our main goal today is to help you bring a change through your words and your book.
                </p>
                
                <p style="font-size: 2rem; color: var(--text-dark); margin-bottom: 15px; font-weight: bold; font-family: 'Cinzel', serif;">
                    We only want to work with 25 authors this October who genuinely want to build a legacy.
                </p>
                
                <div style="background: var(--text-dark); color: white; padding: 20px 40px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                    <p style="font-size: 1.8rem; font-family: 'Montserrat', sans-serif; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        If you don't want to make an impact, then this is not for you.
                    </p>
                </div>
            </div>
        </div>"""
new3 = """        <!-- Slide: The Exclusive Invitation -->
        <div class="slide" style="justify-content: center; text-align: center; padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px; color: var(--text-accent);">A MOVEMENT FOR CHANGE</div>
            <h1 class="title-huge" style="font-size: 2.4rem; margin-bottom: 10px; color: var(--text-dark);">WE ARE LOOKING FOR 25 AUTHORS.</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 1.4rem; color: #444; margin-bottom: 10px; line-height: 1.4; font-family: 'Playfair Display', serif;">
                    Our main goal today is to help you bring a change through your words and your book.
                </p>
                
                <p style="font-size: 1.6rem; color: var(--text-dark); margin-bottom: 15px; font-weight: bold; font-family: 'Cinzel', serif;">
                    We only want to work with 25 authors this October who genuinely want to build a legacy.
                </p>
                
                <div style="background: var(--text-dark); color: white; padding: 15px 30px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                    <p style="font-size: 1.4rem; font-family: 'Montserrat', sans-serif; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        If you don't want to make an impact, then this is not for you.
                    </p>
                </div>
            </div>
        </div>"""
html = html.replace(old3, new3)

# 5. Slide: Final Reveal (Slide 73)
old4 = """        <!-- Slide: Winners Intro -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 10px; color: #2e7d32;">THE FINAL REVEAL</div>
            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 15px; color: var(--text-dark); text-transform: uppercase;">THE GRAND WINNERS</h1>
            
            <p style="font-size: 2rem; color: #444; margin-bottom: 20px; font-family: 'Playfair Display', serif; font-style: italic;">
                It is time to announce the top 3 champions across all categories.
            </p>
            
            <div style="background: var(--text-dark); color: white; padding: 20px 50px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 2.2rem; font-family: 'Montserrat', sans-serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                    INDIAN WRITERS LEAGUE — VOLUME 2
                </p>
            </div>
        </div>"""
new4 = """        <!-- Slide: Winners Intro -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px; color: #2e7d32;">THE FINAL REVEAL</div>
            <h1 class="title-huge" style="font-size: 2.8rem; margin-bottom: 10px; color: var(--text-dark); text-transform: uppercase;">THE GRAND WINNERS</h1>
            
            <p style="font-size: 1.6rem; color: #444; margin-bottom: 20px; font-family: 'Playfair Display', serif; font-style: italic;">
                It is time to announce the top 3 champions across all categories.
            </p>
            
            <div style="background: var(--text-dark); color: white; padding: 15px 30px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 1.6rem; font-family: 'Montserrat', sans-serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                    INDIAN WRITERS LEAGUE — VOLUME 2
                </p>
            </div>
        </div>"""
html = html.replace(old4, new4)

with open("iwl_presentation.html", "w") as f:
    f.write(html)
print("Done all")
