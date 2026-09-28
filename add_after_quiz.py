html_to_insert = """
        <!-- Slide: The Next Chapter -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">THE NEXT CHAPTER</div>
            <h1 class="title-huge" style="font-size: 3.8rem; margin-bottom: 50px; color: var(--text-dark); max-width: 1200px; margin-left: auto; margin-right: auto; line-height: 1.4; font-family: 'Playfair Display', serif;">NOW, LET'S TALK ABOUT YOUR WRITING.</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 10px; font-weight: 500;">Before we play our next game,</p>
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 50px; font-weight: 500;">we want to talk about something important.</p>

                <p style="font-size: 2.5rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin-bottom: 10px; font-weight: bold; letter-spacing: 1px;">Something that could change</p>
                <p style="font-size: 2.5rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin-bottom: 0; font-weight: bold; letter-spacing: 1px;">what happens to your writing next.</p>
            </div>
        </div>

        <!-- Slide: The Benefit We Promised -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: #2e7d32;">THE BENEFIT WE PROMISED</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 50px; color: var(--text-dark); text-transform: uppercase;">THE ₹30,000+ BENEFIT</h1>
            
            <div style="max-width: 1000px; margin: 0 auto; background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 50px; border-radius: 20px; box-shadow: 0 15px 30px rgba(90, 50, 30, 0.1);">
                <p style="font-size: 2rem; color: #333; margin-bottom: 30px; line-height: 1.6; font-family: 'Playfair Display', serif;">
                    Earlier, we told you that every participant in <br>
                    <strong style="color: var(--text-accent); font-family: 'Cinzel', serif;">Indian Writers League — Volume 2</strong> <br>
                    would unlock a special publishing benefit.
                </p>
                
                <div style="display: inline-block; background: rgba(205, 168, 115, 0.15); border: 2px solid var(--border-color); padding: 15px 40px; border-radius: 50px; margin-bottom: 40px;">
                    <p style="font-size: 2.2rem; font-family: 'Cinzel', serif; color: var(--text-dark); margin: 0; font-weight: bold; letter-spacing: 2px;">
                        Now, we're finally revealing it.
                    </p>
                </div>
                
                <p style="font-size: 1.8rem; color: #555; margin: 0; font-style: italic; font-weight: 500;">
                    This is for writers who want to take their work beyond the competition.
                </p>
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
