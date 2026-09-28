import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

new_slide = """
        <!-- Slide: Thank You & Certificates -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">THE END OF VOLUME 2</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 40px; color: var(--text-dark);">THANK YOU FOR JOINING US!</h1>
            
            <div style="max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 50px; border-radius: 20px; box-shadow: 0 15px 30px rgba(90, 50, 30, 0.1);">
                <p style="font-size: 2.2rem; color: var(--text-dark); margin-bottom: 30px; font-weight: bold; font-family: 'Playfair Display', serif;">
                    Regarding your Certificates and Appreciation Letters:
                </p>
                
                <div style="display: inline-block; background: rgba(46, 125, 50, 0.1); border-left: 4px solid #2e7d32; padding: 20px 40px; margin-bottom: 40px;">
                    <p style="font-size: 1.8rem; font-family: 'Montserrat', sans-serif; color: #2e7d32; margin: 0; font-weight: bold; line-height: 1.5;">
                        We will share all the details and announcements in the official WhatsApp group tomorrow!
                    </p>
                </div>
                
                <p style="font-size: 2.5rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin: 0; font-weight: bold; letter-spacing: 2px;">
                    Enjoy, and thank you for being here!
                </p>
            </div>
        </div>
"""

parts = html.split('    </div>\n\n    <div class="slide-counter">')
if len(parts) == 2:
    new_html = parts[0] + new_slide + '    </div>\n\n    <div class="slide-counter">' + parts[1]
    with open("iwl_presentation.html", "w") as f:
        f.write(new_html)
    print("Success")
else:
    print("Failed to find insertion point.")
