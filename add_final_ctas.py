import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

new_slides = """
        <!-- Slide: QR Code CTA -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">SECURE YOUR SPOT</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 40px; color: var(--text-dark);">CONFIRM YOUR SEAT FOR JUST ₹500</h1>
            
            <div style="display: flex; gap: 40px; max-width: 1100px; margin: 0 auto; align-items: center;">
                <!-- Left: Text -->
                <div style="flex: 1; text-align: left; background: rgba(255,255,255,0.9); border: 2px solid var(--border-color); padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(90, 50, 30, 0.05);">
                    <p style="font-size: 2rem; color: #333; margin-bottom: 20px; font-weight: bold; font-family: 'Playfair Display', serif;">
                        Only 25 Writers in October.
                    </p>
                    <ul style="font-size: 1.8rem; color: #444; line-height: 1.6; font-family: 'Montserrat', sans-serif; text-align: left; margin: 0 0 30px 20px; padding: 0;">
                        <li style="margin-bottom: 10px;">Whether your book is just started, half-complete, or fully finished—we will help you build it.</li>
                        <li style="margin-bottom: 10px;">Scan and pay the token amount of <strong>₹500</strong> to lock your seat right now.</li>
                        <li>The remaining amount can be easily paid in <strong>flexible EMI installments</strong>. You do NOT have to pay it all at once!</li>
                    </ul>
                    
                    <div style="background: rgba(46, 125, 50, 0.1); border-left: 4px solid #2e7d32; padding: 15px 20px;">
                        <p style="font-size: 1.6rem; color: #2e7d32; margin: 0; font-weight: bold;">
                            ✅ Tomorrow, our team will personally call you to move the process ahead!
                        </p>
                    </div>
                </div>

                <!-- Right: QR Code -->
                <div style="flex: 0 0 400px; text-align: center;">
                    <img src="public/images/qr_code.jpg" alt="Payment QR Code" style="width: 100%; border-radius: 15px; border: 4px solid var(--border-color); box-shadow: 0 15px 40px rgba(0,0,0,0.15); margin-bottom: 15px;">
                    <p style="font-size: 2rem; font-family: 'Cinzel', serif; color: var(--text-accent); font-weight: bold; margin: 0; letter-spacing: 1px;">SCAN TO PAY ₹500</p>
                </div>
            </div>
        </div>

        <!-- Slide: Consultation Call -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">STILL HAVE QUESTIONS?</div>
            <h1 class="title-huge" style="font-size: 4rem; margin-bottom: 30px; color: var(--text-dark); text-transform: uppercase;">BOOK A FREE 1:1 CONSULTATION</h1>
            
            <p style="font-size: 2rem; color: #444; margin-bottom: 40px; font-family: 'Playfair Display', serif; font-style: italic;">
                If you need more details about the author project, let's talk!
            </p>
            
            <div style="max-width: 900px; margin: 0 auto; background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 50px; border-radius: 20px; box-shadow: 0 15px 30px rgba(90, 50, 30, 0.1);">
                <p style="font-size: 2.2rem; color: #333; margin-bottom: 30px; font-family: 'Montserrat', sans-serif; font-weight: 500; line-height: 1.6;">
                    Speak directly with our expert team to clear all your doubts and understand exactly how we will help you publish your solo book.
                </p>
                
                <div style="background: rgba(205, 168, 115, 0.15); border: 2px solid var(--border-color); padding: 20px 40px; border-radius: 50px; display: inline-block; margin-bottom: 30px;">
                    <p style="font-size: 2.4rem; font-family: 'Cinzel', serif; color: var(--text-dark); margin: 0; font-weight: bold; letter-spacing: 1px;">
                        📞 BOOK YOUR FREE CALL NOW
                    </p>
                </div>
                
                <p style="font-size: 1.8rem; color: #8b3a32; margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                    Hurry! We are strictly onboarding only 25 writers!
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
