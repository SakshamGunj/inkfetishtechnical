import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

new_slides = """
        <!-- Slide: Open Mic -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">YOUR VOICE MATTERS</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 30px; color: var(--text-dark); text-transform: uppercase;">LET'S DO AN OPEN MIC!</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 40px; line-height: 1.6; font-family: 'Playfair Display', serif;">
                    We want to hear your stories, your poetry, and your thoughts.
                </p>
                
                <div style="background: rgba(205, 168, 115, 0.15); border: 2px solid var(--border-color); padding: 30px 40px; border-radius: 20px; display: inline-block; box-shadow: 0 10px 30px rgba(90, 50, 30, 0.1);">
                    <p style="font-size: 2.5rem; font-family: 'Cinzel', serif; color: var(--text-dark); margin: 0; font-weight: bold; letter-spacing: 1px;">
                        ✋ Raise your hand in the Zoom meeting to participate!
                    </p>
                </div>
            </div>
        </div>

        <!-- Slide: Winners Intro -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: #2e7d32;">THE FINAL REVEAL</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 30px; color: var(--text-dark); text-transform: uppercase;">THE GRAND WINNERS</h1>
            
            <p style="font-size: 2.2rem; color: #444; margin-bottom: 40px; font-family: 'Playfair Display', serif; font-style: italic;">
                It is time to announce the top 3 champions across all categories.
            </p>
            
            <div style="background: var(--text-dark); color: white; padding: 20px 50px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <p style="font-size: 2.2rem; font-family: 'Montserrat', sans-serif; margin: 0; font-weight: bold; letter-spacing: 2px;">
                    INDIAN WRITERS LEAGUE — VOLUME 2
                </p>
            </div>
        </div>

        <!-- Slide: Poetry Winners -->
        <div class="slide" style="justify-content: flex-start; padding-top: 60px;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">CATEGORY: POETRY</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 50px; color: var(--text-dark);">POETRY WINNERS</h1>
            
            <div style="max-width: 1100px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; gap: 20px;">
                <!-- Gold -->
                <div style="background: rgba(255, 215, 0, 0.15); border: 2px solid #ffd700; padding: 25px 30px; border-radius: 15px; display: flex; align-items: center; box-shadow: 0 5px 15px rgba(255, 215, 0, 0.1);">
                    <div style="font-size: 4rem; margin-right: 30px;">🥇</div>
                    <div style="text-align: left; flex: 1;">
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-dark); font-weight: bold;">Ramsha Malik</h2>
                        <p style="margin: 5px 0 0 0; font-size: 1.8rem; color: #555; font-family: 'Montserrat', sans-serif;"><em>"Kaun Hoon Main"</em></p>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: var(--text-dark); color: white; padding: 8px 15px; border-radius: 8px; font-size: 1.4rem; font-family: 'Montserrat', sans-serif; font-weight: bold;">Hindi | 9.8/10</span>
                    </div>
                </div>
                
                <!-- Silver -->
                <div style="background: rgba(192, 192, 192, 0.15); border: 2px solid #c0c0c0; padding: 25px 30px; border-radius: 15px; display: flex; align-items: center;">
                    <div style="font-size: 4rem; margin-right: 30px;">🥈</div>
                    <div style="text-align: left; flex: 1;">
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-dark); font-weight: bold;">Dr Bhavya Dube</h2>
                        <p style="margin: 5px 0 0 0; font-size: 1.8rem; color: #555; font-family: 'Montserrat', sans-serif;"><em>"The Mountains' Reply"</em></p>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: var(--text-dark); color: white; padding: 8px 15px; border-radius: 8px; font-size: 1.4rem; font-family: 'Montserrat', sans-serif; font-weight: bold;">English | 9.5/10</span>
                    </div>
                </div>
                
                <!-- Bronze -->
                <div style="background: rgba(205, 127, 50, 0.15); border: 2px solid #cd7f32; padding: 25px 30px; border-radius: 15px; display: flex; align-items: center;">
                    <div style="font-size: 4rem; margin-right: 30px;">🥉</div>
                    <div style="text-align: left; flex: 1;">
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-dark); font-weight: bold;">Sarah Wassim</h2>
                        <p style="margin: 5px 0 0 0; font-size: 1.8rem; color: #555; font-family: 'Montserrat', sans-serif;"><em>"The Seven Faces Of Mine"</em></p>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: var(--text-dark); color: white; padding: 8px 15px; border-radius: 8px; font-size: 1.4rem; font-family: 'Montserrat', sans-serif; font-weight: bold;">English | 9.0/10</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide: Short Story Winners -->
        <div class="slide" style="justify-content: flex-start; padding-top: 60px;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">CATEGORY: SHORT STORY</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 50px; color: var(--text-dark);">SHORT STORY WINNERS</h1>
            
            <div style="max-width: 1100px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; gap: 20px;">
                <!-- Gold -->
                <div style="background: rgba(255, 215, 0, 0.15); border: 2px solid #ffd700; padding: 25px 30px; border-radius: 15px; display: flex; align-items: center; box-shadow: 0 5px 15px rgba(255, 215, 0, 0.1);">
                    <div style="font-size: 4rem; margin-right: 30px;">🥇</div>
                    <div style="text-align: left; flex: 1;">
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-dark); font-weight: bold;">Niveditha Sridharan (Srinika)</h2>
                        <p style="margin: 5px 0 0 0; font-size: 1.8rem; color: #555; font-family: 'Montserrat', sans-serif;"><em>"The Elephant Was Never Tied"</em></p>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: var(--text-dark); color: white; padding: 8px 15px; border-radius: 8px; font-size: 1.4rem; font-family: 'Montserrat', sans-serif; font-weight: bold;">English | 8.5/10</span>
                    </div>
                </div>
                
                <!-- Silver -->
                <div style="background: rgba(192, 192, 192, 0.15); border: 2px solid #c0c0c0; padding: 25px 30px; border-radius: 15px; display: flex; align-items: center;">
                    <div style="font-size: 4rem; margin-right: 30px;">🥈</div>
                    <div style="text-align: left; flex: 1;">
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-dark); font-weight: bold;">Rishita Kaur</h2>
                        <p style="margin: 5px 0 0 0; font-size: 1.8rem; color: #555; font-family: 'Montserrat', sans-serif;"><em>"M.I.R.A"</em></p>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: var(--text-dark); color: white; padding: 8px 15px; border-radius: 8px; font-size: 1.4rem; font-family: 'Montserrat', sans-serif; font-weight: bold;">English | 8.5/10</span>
                    </div>
                </div>
                
                <!-- Bronze -->
                <div style="background: rgba(205, 127, 50, 0.15); border: 2px solid #cd7f32; padding: 25px 30px; border-radius: 15px; display: flex; align-items: center;">
                    <div style="font-size: 4rem; margin-right: 30px;">🥉</div>
                    <div style="text-align: left; flex: 1;">
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-dark); font-weight: bold;">Sebastian Pk</h2>
                        <p style="margin: 5px 0 0 0; font-size: 1.8rem; color: #555; font-family: 'Montserrat', sans-serif;"><em>"Krishna Amavasya"</em></p>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: var(--text-dark); color: white; padding: 8px 15px; border-radius: 8px; font-size: 1.4rem; font-family: 'Montserrat', sans-serif; font-weight: bold;">Hindi | 8.0/10</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide: Novel Winners -->
        <div class="slide" style="justify-content: flex-start; padding-top: 60px;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">CATEGORY: NOVEL</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 50px; color: var(--text-dark);">NOVEL WINNERS</h1>
            
            <div style="max-width: 1100px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; gap: 20px;">
                <!-- Gold -->
                <div style="background: rgba(255, 215, 0, 0.15); border: 2px solid #ffd700; padding: 25px 30px; border-radius: 15px; display: flex; align-items: center; box-shadow: 0 5px 15px rgba(255, 215, 0, 0.1);">
                    <div style="font-size: 4rem; margin-right: 30px;">🥇</div>
                    <div style="text-align: left; flex: 1;">
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-dark); font-weight: bold;">Arsh Kalsekar</h2>
                        <p style="margin: 5px 0 0 0; font-size: 1.8rem; color: #555; font-family: 'Montserrat', sans-serif;"><em>"Warmth"</em></p>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: var(--text-dark); color: white; padding: 8px 15px; border-radius: 8px; font-size: 1.4rem; font-family: 'Montserrat', sans-serif; font-weight: bold;">English | 9.5/10</span>
                    </div>
                </div>
                
                <!-- Silver -->
                <div style="background: rgba(192, 192, 192, 0.15); border: 2px solid #c0c0c0; padding: 25px 30px; border-radius: 15px; display: flex; align-items: center;">
                    <div style="font-size: 4rem; margin-right: 30px;">🥈</div>
                    <div style="text-align: left; flex: 1;">
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-dark); font-weight: bold;">Kakali Roy</h2>
                        <p style="margin: 5px 0 0 0; font-size: 1.8rem; color: #555; font-family: 'Montserrat', sans-serif;"><em>"একটি চরিত্র (A Character)"</em></p>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: var(--text-dark); color: white; padding: 8px 15px; border-radius: 8px; font-size: 1.4rem; font-family: 'Montserrat', sans-serif; font-weight: bold;">Bengali | 8.2/10</span>
                    </div>
                </div>
                
                <!-- Bronze (Under Verification) -->
                <div style="background: rgba(205, 127, 50, 0.05); border: 2px dashed #cd7f32; padding: 25px 30px; border-radius: 15px; display: flex; align-items: center;">
                    <div style="font-size: 4rem; margin-right: 30px; opacity: 0.5;">🥉</div>
                    <div style="text-align: left; flex: 1;">
                        <h2 style="margin: 0; font-size: 2.2rem; color: #666; font-weight: bold; font-family: 'Cinzel', serif;">Under Verification</h2>
                        <p style="margin: 5px 0 0 0; font-size: 1.6rem; color: #888; font-family: 'Montserrat', sans-serif;"><em>We have sent the third position for verification. To be announced soon!</em></p>
                    </div>
                </div>
            </div>
        </div>
"""

parts = html.split('    </div>\n\n    <div class="slide-counter">')
if len(parts) == 2:
    new_html = parts[0] + new_slides + '    </div>\n\n    <div class="slide-counter">' + parts[1]
    with open("iwl_presentation.html", "w") as f:
        f.write(new_html)
    print("Success")
else:
    print("Failed to find insertion point.")
