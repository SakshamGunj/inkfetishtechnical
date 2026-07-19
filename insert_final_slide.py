import re

with open("public/honey-hurt-presentation/index.html", "r") as f:
    content = f.read()

# Match from Slide 4: The Struggle to just before </main>
pattern = re.compile(r'<!-- Slide 4: The Struggle \(Hurt\).*?(?=</main>)', re.DOTALL)
match = pattern.search(content)

new_slide = """<!-- Slide 43: Certificate Issuing -->
        <section class="slide theme-celebration" style="background: var(--obsidian); display: flex; align-items: center; justify-content: center; text-align: center;">
            <div class="content" style="max-width: 900px; padding: 4rem 2rem;">
                
                <div style="width: 80px; height: 80px; background: rgba(216,138,6,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; border: 2px solid rgba(216,138,6,0.3);">
                    <svg style="width: 40px; height: 40px; color: var(--gold-main);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 15l-2 5l9-5l-2-5l-5 5z"></path>
                        <circle cx="12" cy="8" r="7"></circle>
                    </svg>
                </div>

                <span style="font-family: var(--font-sans); text-transform: uppercase; font-weight: 800; letter-spacing: 3px; font-size: 0.9rem; color: var(--gold-main); margin-bottom: 1rem; display: inline-block;">Final Step</span>
                
                <h2 style="font-family: var(--font-heading); font-size: clamp(2.5rem, 4vw, 4.5rem); color: white; font-weight: 900; line-height: 1.2; margin-bottom: 2rem;">
                    Certificate Issuing
                </h2>
                
                <p style="font-family: var(--font-sans); font-size: clamp(1.1rem, 1.5vw, 1.3rem); color: #cbd5e1; font-weight: 500; line-height: 1.6; margin-bottom: 3rem; max-width: 700px; margin-left: auto; margin-right: auto;">
                    We have successfully shared the link in the <strong style="color: var(--gold-light);">WhatsApp Group</strong>. <br>Please check the group to claim and download your digitally verified certificates!
                </p>

            </div>
        </section>
        
    """

if match:
    new_content = content[:match.start()] + new_slide + content[match.end():]
    with open("public/honey-hurt-presentation/index.html", "w") as f:
        f.write(new_content)
    print("Success: Removed old stray slides and inserted Certificate slide.")
else:
    print("Error: Could not find stray slides block.")

