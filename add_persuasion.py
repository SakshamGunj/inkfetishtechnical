html_to_insert = """
        <!-- Slide: A Quick Question -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">A QUICK QUESTION</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 50px; color: var(--text-dark); max-width: 1200px; margin-left: auto; margin-right: auto; line-height: 1.4; font-family: 'Playfair Display', serif;">HOW MANY OF YOU HAVE PUBLISHED A BOOK?</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 25px; font-weight: 500;">We know some of you here are already published authors.</p>
                
                <div style="background: rgba(205, 168, 115, 0.15); border: 2px solid var(--border-color); padding: 25px 40px; border-radius: 15px; display: inline-block; box-shadow: 0 10px 20px rgba(90, 50, 30, 0.05);">
                    <p style="font-size: 2.4rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin: 0; font-weight: bold; letter-spacing: 1px;">
                        And many of you are dreaming of publishing your very first solo book.
                    </p>
                </div>
            </div>
        </div>

        <!-- Slide: The Power of Words -->
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
        </div>

        <!-- Slide: Your Potential -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">YOUR POTENTIAL AS A WRITER</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 50px; color: var(--text-dark); max-width: 1200px; margin-left: auto; margin-right: auto; line-height: 1.4; font-family: 'Playfair Display', serif;">HAVE YOU REALISED YOUR TRUE POTENTIAL?</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 30px; font-weight: 500; font-style: italic;">
                    Are you satisfied just writing your poetry and stories in a hidden notebook?
                </p>
                
                <p style="font-size: 2.6rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin-bottom: 15px; font-weight: bold;">
                    Don't you want to influence people?
                </p>
                <p style="font-size: 2.6rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin-bottom: 0; font-weight: bold;">
                    Don't you want your words to leave a mark?
                </p>
            </div>
        </div>

        <!-- Slide: The Ultimate Goal -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: #2e7d32;">THE ULTIMATE GOAL</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 40px; color: var(--text-dark); text-transform: uppercase;">HOW MANY OF YOU WANT TO MAKE AN IMPACT?</h1>
            
            <div style="max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 50px; border-radius: 20px; box-shadow: 0 15px 30px rgba(90, 50, 30, 0.1);">
                <p style="font-size: 2.8rem; font-family: 'Cinzel', serif; color: var(--text-dark); margin-bottom: 30px; font-weight: bold;">
                    Publish a book. Change the world.
                </p>
                
                <div style="display: inline-block; background: rgba(46, 125, 50, 0.1); border: 2px solid #2e7d32; padding: 20px 40px; border-radius: 50px;">
                    <p style="font-size: 2rem; font-family: 'Montserrat', sans-serif; color: #2e7d32; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        Let your writing reach the heights it deserves.
                    </p>
                </div>
            </div>
        </div>
"""

with open("iwl_presentation.html", "r") as f:
    content = f.read()

parts = content.split('    </div>\n\n    <div class="slide-counter">')
if len(parts) == 2:
    new_content = parts[0] + html_to_insert + '    </div>\n\n    <div class="slide-counter">' + parts[1]
    with open("iwl_presentation.html", "w") as f:
        f.write(new_content)
    print("Success")
else:
    print("Failed to find insertion point.")
