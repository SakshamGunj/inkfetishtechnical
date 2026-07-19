import re

with open("public/honey-hurt-presentation/index.html", "r") as f:
    content = f.read()

quiz_over_slide = """<!-- Slide 43: Quiz Over -->
        <section class="slide theme-intro" style="background: var(--obsidian); display: flex; align-items: center; justify-content: center; text-align: center;">
            <div class="content" style="max-width: 900px; padding: 4rem 2rem;">
                
                <h2 style="font-family: var(--font-heading); font-size: clamp(3rem, 5vw, 6rem); color: var(--gold-main); font-weight: 900; line-height: 1.1; margin-bottom: 1.5rem; text-transform: uppercase;">
                    That's a Wrap!
                </h2>
                
                <p style="font-family: var(--font-sans); font-size: clamp(1.2rem, 1.8vw, 1.5rem); color: white; font-weight: 600; line-height: 1.6; margin-bottom: 2rem;">
                    The Quiz is Officially Over. How did you do?
                </p>

                <div style="width: 100px; height: 3px; background: var(--gold-main); margin: 0 auto; border-radius: 5px;"></div>

            </div>
        </section>

        """

launch_updates_slide = """<!-- Slide 45: Launch Updates -->
        <section class="slide theme-celebration" style="background: var(--obsidian); display: flex; align-items: center; justify-content: center; text-align: center;">
            <div class="content" style="max-width: 1000px; padding: 4rem 2rem;">
                
                <span style="font-family: var(--font-sans); text-transform: uppercase; font-weight: 800; letter-spacing: 3px; font-size: 0.9rem; color: var(--gold-main); margin-bottom: 1rem; display: inline-block;">What's Next?</span>
                
                <h2 style="font-family: var(--font-heading); font-size: clamp(2.5rem, 4vw, 4.5rem); color: white; font-weight: 900; line-height: 1.2; margin-bottom: 2rem;">
                    The Launch is Finally Here!
                </h2>
                
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(216,138,6,0.2); border-radius: 20px; padding: 3rem; text-align: left; margin: 0 auto;">
                    <ul style="list-style: none; padding: 0; margin: 0; color: #cbd5e1; font-family: var(--font-sans); font-size: clamp(1.1rem, 1.5vw, 1.25rem); line-height: 1.8;">
                        <li style="margin-bottom: 1.5rem; display: flex; align-items: flex-start;">
                            <span style="color: var(--gold-main); font-size: 1.5rem; margin-right: 15px; margin-top: -2px;">✓</span> 
                            <span><strong>Delivery Updates</strong> and all tracking information will be shared with you soon.</span>
                        </li>
                        <li style="display: flex; align-items: flex-start;">
                            <span style="color: var(--gold-main); font-size: 1.5rem; margin-right: 15px; margin-top: -2px;">✓</span> 
                            <span><strong>Promotion Materials</strong> (posters and graphics for Honey & Hurt) will be shared shortly so you can post them on your stories and social media!</span>
                        </li>
                    </ul>
                </div>

            </div>
        </section>

    """

# Insert quiz over slide before Certificate Issuing
content = content.replace("<!-- Slide 43: Certificate Issuing -->", quiz_over_slide + "<!-- Slide 44: Certificate Issuing -->")

# Insert launch updates slide right before </main>
content = content.replace("</main>", launch_updates_slide + "</main>")

with open("public/honey-hurt-presentation/index.html", "w") as f:
    f.write(content)

print("Added both slides successfully.")
