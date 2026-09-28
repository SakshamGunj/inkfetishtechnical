import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

old_slide = """        <!-- Slide: The Ultimate Goal -->
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

new_slides = """        <!-- Slide: Your Influence -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: #2e7d32;">THE ULTIMATE GOAL</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 40px; color: var(--text-dark); text-transform: uppercase;">HOW MANY OF YOU WANT TO MAKE AN IMPACT?</h1>
            
            <div style="max-width: 1000px; margin: 0 auto; background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 50px; border-radius: 20px; box-shadow: 0 15px 30px rgba(90, 50, 30, 0.1);">
                <p style="font-size: 2.4rem; color: #333; margin-bottom: 25px; line-height: 1.5; font-family: 'Playfair Display', serif;">
                    Every writer here has the power to change the world. <br>
                    You have the power to influence people for centuries.
                </p>
                
                <p style="font-size: 2.2rem; font-family: 'Playfair Display', serif; color: var(--text-dark); margin-bottom: 35px; font-style: italic;">
                    But you cannot do it alone.
                </p>
                
                <div style="display: inline-block; background: rgba(46, 125, 50, 0.1); border: 2px solid #2e7d32; padding: 20px 40px; border-radius: 15px;">
                    <p style="font-size: 2rem; font-family: 'Montserrat', sans-serif; color: #2e7d32; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        You need someone who will help you make a change in society by publishing your solo book.
                    </p>
                </div>
            </div>
        </div>

        <!-- Slide: The Modern Problem -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">THE MODERN PROBLEM</div>
            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 50px; color: var(--text-dark); max-width: 1200px; margin-left: auto; margin-right: auto; line-height: 1.4; font-family: 'Playfair Display', serif;">WHY IS IT SO HARD FOR WRITERS TO MAKE A CHANGE?</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 30px; font-weight: 500; line-height: 1.6;">
                    Traditionally, writers work with publishing companies to get their books designed, edited, and ready for the world.
                </p>
                
                <div style="background: rgba(139, 58, 50, 0.1); border-left: 5px solid var(--text-accent); padding: 30px; text-align: left; border-radius: 0 15px 15px 0;">
                    <p style="font-size: 2.4rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin: 0; font-weight: bold;">
                        But today, the industry has turned your passion into a pure business.
                    </p>
                </div>
            </div>
        </div>

        <!-- Slide: The Two Extremes -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">THE REALITY OF PUBLISHING TODAY</div>
            <h1 class="title-huge" style="font-size: 3.8rem; margin-bottom: 50px; color: var(--text-dark); max-width: 1200px; margin-left: auto; margin-right: auto; font-family: 'Playfair Display', serif;">THE PUBLISHING TRAP</h1>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1200px; margin: 0 auto; text-align: left;">
                
                <!-- Box 1 -->
                <div style="background: white; border: 2px solid var(--border-color); padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(90, 50, 30, 0.05);">
                    <div style="font-size: 3.5rem; margin-bottom: 20px;">💰</div>
                    <h2 style="font-size: 2.2rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin-bottom: 15px; font-weight: bold;">Overpriced Packages</h2>
                    <p style="font-size: 1.6rem; color: #555; line-height: 1.6; font-family: 'Montserrat', sans-serif;">
                        Costs upwards of ₹40,000+. Most writers simply cannot afford it, and those who can rarely see the true value returned.
                    </p>
                </div>

                <!-- Box 2 -->
                <div style="background: white; border: 2px solid var(--border-color); padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(90, 50, 30, 0.05);">
                    <div style="font-size: 3.5rem; margin-bottom: 20px;">📉</div>
                    <h2 style="font-size: 2.2rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin-bottom: 15px; font-weight: bold;">Cheap Collaborations</h2>
                    <p style="font-size: 1.6rem; color: #555; line-height: 1.6; font-family: 'Montserrat', sans-serif;">
                        Scam offers for ₹2,000-₹3,000 where they just want mass author volume. Cheap quality, no real benefits, and zero individual recognition.
                    </p>
                </div>

            </div>
        </div>

        <!-- Slide: The Forgotten Purpose -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: #2e7d32;">THE FORGOTTEN PURPOSE</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 40px; color: var(--text-dark); max-width: 1200px; margin-left: auto; margin-right: auto; font-family: 'Playfair Display', serif;">THEY FORGOT WHY WE WRITE.</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 2.4rem; color: #444; margin-bottom: 40px; font-weight: 500; line-height: 1.6;">
                    Every book is written to make a change. To influence people.
                </p>
                
                <div style="background: var(--text-dark); color: white; padding: 25px 40px; border-radius: 12px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
                    <p style="font-size: 2.5rem; font-family: 'Cinzel', serif; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        We are here to enable YOU to make that change.
                    </p>
                </div>

                <p style="font-size: 2rem; font-family: 'Montserrat', sans-serif; color: var(--text-accent); font-weight: bold; letter-spacing: 1px;">
                    We will help you publish your own solo book—whether it is poetry, a novel, short stories, or anything else.
                </p>
            </div>
        </div>"""

if old_slide in html:
    html = html.replace(old_slide, new_slides)
    with open("iwl_presentation.html", "w") as f:
        f.write(html)
    print("Success")
else:
    print("Failed to find old slide")
