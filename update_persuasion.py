import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

# Replace the "Ultimate Goal" slide text
old_goal_slide = """        <!-- Slide: The Ultimate Goal -->
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
        </div>"""

new_goal_slide = """        <!-- Slide: The Ultimate Goal -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: #2e7d32;">THE ULTIMATE GOAL</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 40px; color: var(--text-dark); text-transform: uppercase;">HOW MANY OF YOU WANT TO MAKE AN IMPACT?</h1>
            
            <div style="max-width: 1000px; margin: 0 auto; background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 50px; border-radius: 20px; box-shadow: 0 15px 30px rgba(90, 50, 30, 0.1);">
                <p style="font-size: 2.6rem; font-family: 'Cinzel', serif; color: var(--text-dark); margin-bottom: 30px; font-weight: bold; line-height: 1.5;">
                    Every writer who joined us today possesses the power to change the world.
                </p>
                
                <div style="display: inline-block; background: rgba(46, 125, 50, 0.1); border: 2px solid #2e7d32; padding: 20px 40px; border-radius: 50px;">
                    <p style="font-size: 2.2rem; font-family: 'Montserrat', sans-serif; color: #2e7d32; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        You have the power to influence people for centuries.
                    </p>
                </div>
            </div>
        </div>"""

html = html.replace(old_goal_slide, new_goal_slide)

new_slides = """
        <!-- Slide: The Roadblock -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">THE JOURNEY AHEAD</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 50px; color: var(--text-dark); font-family: 'Playfair Display', serif;">BUT YOU CANNOT DO IT ALONE.</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 25px; line-height: 1.6;">
                    You need someone who truly understands your vision.
                </p>
                <div style="background: rgba(205, 168, 115, 0.15); border: 2px solid var(--border-color); padding: 30px 40px; border-radius: 15px; box-shadow: 0 10px 20px rgba(90, 50, 30, 0.05);">
                    <p style="font-size: 2.4rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin: 0; font-weight: bold; line-height: 1.5;">
                        You need a team that will help you make a genuine change in society through your very own solo book.
                    </p>
                </div>
            </div>
        </div>

        <!-- Slide: The Harsh Reality -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">THE HARSH REALITY</div>
            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 40px; color: var(--text-dark); max-width: 1200px; margin-left: auto; margin-right: auto; line-height: 1.4; font-family: 'Playfair Display', serif; text-transform: uppercase;">WHY DO SO MANY WRITERS FAIL TO MAKE A CHANGE?</h1>
            
            <div style="max-width: 1000px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 40px; line-height: 1.6; font-family: 'Playfair Display', serif;">
                    Publishing companies were meant to help writers prepare, design, and share their best work with the world.
                </p>
                
                <div style="background: var(--text-accent); color: white; padding: 25px 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(139, 58, 50, 0.2); transform: scale(1.05);">
                    <p style="font-size: 2.6rem; font-family: 'Cinzel', serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                        But today, publishing has become purely a business.
                    </p>
                </div>
            </div>
        </div>

        <!-- Slide: The Two Extremes -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">THE PROBLEM WITH PUBLISHING TODAY</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 40px; color: var(--text-dark);">THE TWO EXTREMES</h1>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1200px; margin: 0 auto; text-align: left;">
                <!-- Expensive -->
                <div style="background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(90, 50, 30, 0.05);">
                    <h2 style="font-size: 2.2rem; color: var(--text-accent); margin-bottom: 20px; font-weight: bold;">1. THE OVERPRICED MODEL</h2>
                    <p style="font-size: 1.8rem; color: #444; margin-bottom: 15px; line-height: 1.5;">
                        <strong style="color: var(--text-dark);">High Costs:</strong> Many companies charge ₹40,000 or more.
                    </p>
                    <p style="font-size: 1.8rem; color: #444; margin: 0; line-height: 1.5;">
                        <strong style="color: var(--text-dark);">Low Value:</strong> Writers pay the heavy price, but they do not receive the true value, support, or marketing their book deserves.
                    </p>
                </div>
                
                <!-- Cheap -->
                <div style="background: rgba(255,255,255,0.8); border: 2px solid #8b3a32; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(139, 58, 50, 0.05);">
                    <h2 style="font-size: 2.2rem; color: #8b3a32; margin-bottom: 20px; font-weight: bold;">2. THE CHEAP GIMMICKS</h2>
                    <p style="font-size: 1.8rem; color: #444; margin-bottom: 15px; line-height: 1.5;">
                        <strong style="color: var(--text-dark);">Mass Factories:</strong> Cheap offers under ₹2,000 to ₹3,000 designed to just print bulk names.
                    </p>
                    <p style="font-size: 1.8rem; color: #444; margin: 0; line-height: 1.5;">
                        <strong style="color: var(--text-dark);">Zero Benefits:</strong> Poor quality, no real author benefits, and absolutely zero impact on society.
                    </p>
                </div>
            </div>
        </div>

        <!-- Slide: The Forgotten Purpose -->
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
        </div>

        <!-- Slide: The Solution -->
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
        </div>
"""

# Insert new slides right before the final `</div>` of `.slides-wrapper`
parts = html.split('    </div>\n\n    <div class="slide-counter">')
if len(parts) == 2:
    new_html = parts[0] + new_slides + '    </div>\n\n    <div class="slide-counter">' + parts[1]
    with open("iwl_presentation.html", "w") as f:
        f.write(new_html)
    print("Success")
else:
    print("Failed to find insertion point.")
