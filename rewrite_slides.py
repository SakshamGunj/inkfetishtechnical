import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

# Fix Slide 15 (Split into two slides)
slide_15_old = re.compile(r'<!-- Slide 15: What Happens Next / The Book -->.*?<!-- Slide 16: Congratulations & Check PDF -->', re.DOTALL)
slide_15_new = """<!-- Slide 15A: What Happens Next -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">WHAT HAPPENS NEXT?</div>
            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 30px; color: var(--text-dark);">YOUR WRITING GOES INTO A BOOK</h1>
            <p style="font-size: 2.2rem; color: #444; margin-bottom: 40px; line-height: 1.6; font-family: 'Playfair Display', serif;">
                Just like Volume 1, the Top 150 Writers of Volume 2 will have their writing published in our official collection.
            </p>
            <h2 style="font-size: 3.5rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin-bottom: 30px; font-weight: bold;">SYAAHI — VOLUME 2</h2>
        </div>

        <!-- Slide 15B: The Book -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <p style="font-size: 2.2rem; color: #444; margin-bottom: 40px; line-height: 1.6; font-family: 'Playfair Display', serif;">
                Now, we are continuing the journey with 150 new writers.
            </p>
            <div style="background: var(--text-dark); color: white; padding: 25px 40px; border-radius: 12px; display: inline-block; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 2rem; font-weight: bold; font-family: 'Montserrat', sans-serif; margin: 0; letter-spacing: 1px;">NO ADDITIONAL PUBLICATION CHARGE</p>
            </div>
            <p style="font-size: 2.8rem; font-weight: bold; font-family: 'Cinzel', serif; color: var(--text-accent); margin: 0;">Your name. Your writing. Your book.</p>
        </div>

        <!-- Slide 16: Congratulations & Check PDF -->"""
html = slide_15_old.sub(slide_15_new, html)


# Fix Slide 59 (Our Promise)
slide_59_old = re.compile(r'<!-- Slide: The Solution -->.*?<!-- Slide: The Big Announcement -->', re.DOTALL)
slide_59_new = """<!-- Slide 59: The Solution -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: #2e7d32;">OUR PROMISE TO YOU</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 40px; color: var(--text-dark);">WE ARE HERE TO ENABLE YOU.</h1>
            <div style="background: rgba(46, 125, 50, 0.1); border: 2px solid #2e7d32; padding: 30px 50px; border-radius: 50px; display: inline-block;">
                <p style="font-size: 2.5rem; font-family: 'Cinzel', serif; color: #2e7d32; margin: 0; font-weight: bold; letter-spacing: 1px;">
                    We are here to enable YOU to make a change.
                </p>
            </div>
        </div>

        <!-- Slide: The Big Announcement -->"""
html = slide_59_old.sub(slide_59_new, html)

# Fix Slide 63 (Lost Purpose)
slide_63_old = re.compile(r'<!-- Slide: The Forgotten Purpose -->.*?<!-- Slide 59: The Solution -->', re.DOTALL)
slide_63_new = """<!-- Slide: The Forgotten Purpose -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">THE LOST PURPOSE</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 50px; color: var(--text-dark); text-transform: uppercase;">THEY FORGOT WHY BOOKS ARE WRITTEN.</h1>
            
            <div style="background: var(--text-dark); color: white; padding: 30px 60px; border-radius: 15px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 3rem; font-family: 'Cinzel', serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                    Every book is written to make a change.
                </p>
            </div>
        </div>

        <!-- Slide 59: The Solution -->"""
html = slide_63_old.sub(slide_63_new, html)

# Fix Slide 68 (Exclusive Invitation)
slide_68_old = re.compile(r'<!-- Slide: The Exclusive Invitation -->.*?<!-- Slide: The Special Offer -->', re.DOTALL)
slide_68_new = """<!-- Slide: The Exclusive Invitation -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">A MOVEMENT FOR CHANGE</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 40px; color: var(--text-dark);">WE ARE LOOKING FOR 25 AUTHORS.</h1>
            
            <div style="background: var(--text-dark); color: white; padding: 25px 50px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 2.2rem; font-family: 'Montserrat', sans-serif; margin: 0; font-weight: bold; letter-spacing: 1px;">
                    If you don't want to make an impact, then this is not for you.
                </p>
            </div>
        </div>

        <!-- Slide: The Special Offer -->"""
html = slide_68_old.sub(slide_68_new, html)

# Fix Slide 73 (Final Reveal)
slide_73_old = re.compile(r'<!-- Slide: Winners Intro -->.*?<!-- Slide: Poetry Winners -->', re.DOTALL)
slide_73_new = """<!-- Slide: Winners Intro -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: #2e7d32;">THE FINAL REVEAL</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 40px; color: var(--text-dark); text-transform: uppercase;">THE GRAND WINNERS</h1>
            
            <div style="background: var(--text-dark); color: white; padding: 25px 50px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 2.5rem; font-family: 'Montserrat', sans-serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                    INDIAN WRITERS LEAGUE — VOLUME 2
                </p>
            </div>
        </div>

        <!-- Slide: Poetry Winners -->"""
html = slide_73_old.sub(slide_73_new, html)


with open("iwl_presentation.html", "w") as f:
    f.write(html)
print("Rewritten successfully.")
