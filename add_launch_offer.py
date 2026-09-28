import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

new_slides = """
        <!-- Slide: The Big Announcement -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: #2e7d32;">OFFICIALLY LAUNCHING TODAY</div>
            <h1 class="title-huge" style="font-size: 5rem; margin-bottom: 30px; color: var(--text-dark); text-transform: uppercase;">THE INDIAN AUTHOR MOVEMENT</h1>
            
            <div style="max-width: 1000px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #333; margin-bottom: 30px; font-weight: bold; font-family: 'Montserrat', sans-serif;">
                    Partnering with just <span style="color: var(--text-accent); font-size: 2.6rem;">25 authors</span> this October.
                </p>
                
                <div style="background: rgba(205, 168, 115, 0.15); border: 2px solid var(--border-color); padding: 40px; border-radius: 20px; box-shadow: 0 15px 30px rgba(90, 50, 30, 0.1);">
                    <p style="font-size: 2.2rem; font-family: 'Playfair Display', serif; color: var(--text-dark); margin: 0; line-height: 1.6;">
                        Our mission is to enable you to publish your solo book, make a genuine change in society, and create a legacy in India that will be remembered for generations.
                    </p>
                </div>
            </div>
        </div>

        <!-- Slide: Benefits Part 1 -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">THE COMPLETE PUBLISHING PACKAGE</div>
            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 40px; color: var(--text-dark);">EVERYTHING YOU NEED TO SUCCEED</h1>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 1200px; margin: 0 auto; text-align: left;">
                <div style="background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                    <h3 style="font-size: 2rem; color: var(--text-accent); margin-bottom: 10px;">📖 Premium Book Publishing</h3>
                    <p style="font-size: 1.6rem; color: #444; margin: 0; line-height: 1.5;">We will beautifully publish your solo book—whether it's poetry, a novel, or a story collection.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                    <h3 style="font-size: 2rem; color: var(--text-accent); margin-bottom: 10px;">🎨 Masterpiece Cover Design</h3>
                    <p style="font-size: 1.6rem; color: #444; margin: 0; line-height: 1.5;">High-quality, stunning cover designs crafted to be loved and admired for decades.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                    <h3 style="font-size: 2rem; color: var(--text-accent); margin-bottom: 10px;">🌐 Your Own Author Website</h3>
                    <p style="font-size: 1.6rem; color: #444; margin: 0; line-height: 1.5;">A professional website where people can visit you and your work. <em>(Let me show you an example!)</em></p>
                </div>
                
                <div style="background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                    <h3 style="font-size: 2rem; color: var(--text-accent); margin-bottom: 10px;">✨ Custom Promotional Graphics</h3>
                    <p style="font-size: 1.6rem; color: #444; margin: 0; line-height: 1.5;">Professional posters and content designed specifically for you to promote your book on social media.</p>
                </div>
            </div>
        </div>

        <!-- Slide: Benefits Part 2 -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">BUILT FOR YOUR SUCCESS</div>
            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 40px; color: var(--text-dark);">YOU DESERVE THE REWARDS OF YOUR INFLUENCE</h1>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 1200px; margin: 0 auto; text-align: left;">
                <div style="background: rgba(46, 125, 50, 0.05); border: 2px solid #2e7d32; padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(46,125,50,0.1);">
                    <h3 style="font-size: 2rem; color: #2e7d32; margin-bottom: 10px;">💰 100% Royalty on Sales</h3>
                    <p style="font-size: 1.6rem; color: #444; margin: 0; line-height: 1.5;">Once you influence people, you deserve <strong>ALL</strong> the profit from your book sales.</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.9); border: 2px solid var(--border-color); padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                    <h3 style="font-size: 2rem; color: var(--text-accent); margin-bottom: 10px;">📊 Live Sales Dashboard</h3>
                    <p style="font-size: 1.6rem; color: #444; margin: 0; line-height: 1.5;">Track your impact and sales in real-time. <em>(Let me show you a live dashboard of our author!)</em></p>
                </div>
                
                <div style="background: rgba(255,255,255,0.9); border: 2px solid var(--border-color); padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                    <h3 style="font-size: 2rem; color: var(--text-accent); margin-bottom: 10px;">⚡ 15-Day Profit Settlements</h3>
                    <p style="font-size: 1.6rem; color: #444; margin: 0; line-height: 1.5;">We settle your profits every 15 days—faster than the salary most corporate employees receive!</p>
                </div>
                
                <div style="background: rgba(255,255,255,0.9); border: 2px solid var(--border-color); padding: 30px; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                    <h3 style="font-size: 2rem; color: var(--text-accent); margin-bottom: 10px;">♾️ Lifetime Publication Support</h3>
                    <p style="font-size: 1.6rem; color: #444; margin: 0; line-height: 1.5;">Endless benefits and dedicated support for your entire journey as a published author.</p>
                </div>
            </div>
        </div>

        <!-- Slide: The Exclusive Invitation -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">A MOVEMENT FOR CHANGE</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 40px; color: var(--text-dark);">WE ARE LOOKING FOR 25 AUTHORS.</h1>
            
            <div style="max-width: 900px; margin: 0 auto;">
                <p style="font-size: 2.2rem; color: #444; margin-bottom: 30px; line-height: 1.6; font-family: 'Playfair Display', serif;">
                    Our main goal today is to help you bring a change through your words and your book.
                </p>
                
                <p style="font-size: 2.4rem; color: var(--text-dark); margin-bottom: 40px; font-weight: bold; font-family: 'Cinzel', serif;">
                    We only want to work with 25 authors this October who genuinely want to build a legacy.
                </p>
                
                <div style="background: var(--text-dark); color: white; padding: 25px 40px; border-radius: 12px; display: inline-block; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                    <p style="font-size: 2rem; font-family: 'Montserrat', sans-serif; margin: 0; font-weight: bold; letter-spacing: 1px;">
                        If you don't want to make an impact, then this is not for you.
                    </p>
                </div>
            </div>
        </div>

        <!-- Slide: The Special Offer -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: #2e7d32;">YOUR INVESTMENT</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 30px; color: var(--text-dark); text-transform: uppercase;">EVERY GREAT JOURNEY HAS A VALUE</h1>
            
            <p style="font-size: 1.8rem; color: #555; margin-bottom: 40px; font-style: italic; font-weight: 500;">
                Not too expensive. Not a cheap gimmick. A premium experience at a genuine price.
            </p>
            
            <div style="max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 40px; border-radius: 20px; box-shadow: 0 15px 30px rgba(90, 50, 30, 0.1);">
                
                <p style="font-size: 2.2rem; color: #888; text-decoration: line-through; margin-bottom: 10px; font-family: 'Montserrat', sans-serif; font-weight: 600;">
                    Regular Package Cost: ₹12,000
                </p>
                
                <div style="background: rgba(46, 125, 50, 0.1); border: 2px solid #2e7d32; padding: 20px 40px; border-radius: 15px; display: inline-block; margin-bottom: 30px;">
                    <p style="font-size: 3.5rem; font-family: 'Cinzel', serif; color: #2e7d32; margin: 0; font-weight: bold;">
                        TODAY ONLY: ₹8,000
                    </p>
                </div>
                
                <p style="font-size: 2.2rem; color: var(--text-dark); margin-bottom: 15px; font-weight: bold; font-family: 'Playfair Display', serif;">
                    Flexible Payment Options Available!
                </p>
                
                <p style="font-size: 1.8rem; color: #444; margin: 0; line-height: 1.6;">
                    You don't have to pay in full today. <br>
                    <strong>Pay in easy EMI installments:</strong> Every 15 days, or over 1.5 to 2 months.
                </p>
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
