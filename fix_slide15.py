import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

# Using regex to find the entire Slide 15 block, replacing it completely
pattern = re.compile(r'<!-- Slide 15: What Happens Next / The Book -->.*?<!-- Slide 16: Congratulations & Check PDF -->', re.DOTALL)

new_slide = """<!-- Slide 15: What Happens Next / The Book -->
        <div class="slide" style="justify-content: center; text-align: center; padding: 20px;">
            <div class="subtitle" style="font-size: 1.2rem; letter-spacing: 5px; margin-bottom: 10px;">WHAT HAPPENS NEXT?</div>
            <h1 class="title-huge" style="font-size: 2.8rem; margin-bottom: 20px; color: var(--text-dark);">YOUR WRITING GOES INTO A BOOK</h1>

            <div style="display: flex; gap: 40px; max-width: 1100px; margin: 0 auto; align-items: center; justify-content: center;">
                
                <!-- Left: Text -->
                <div style="flex: 1; text-align: left;">
                    <p style="font-size: 1.4rem; color: #444; margin-bottom: 10px; line-height: 1.4;">
                        Just like Volume 1, the Top 150 Writers of Volume 2 will have their writing published in our official collection:
                    </p>
                    <h2 style="font-size: 2.2rem; font-family: 'Cinzel', serif; color: var(--text-accent); margin-bottom: 10px; font-weight: bold;">SYAAHI — VOLUME 2</h2>
                    
                    <div style="background: rgba(255,255,255,0.7); border-left: 4px solid var(--text-accent); padding: 10px 15px; margin-bottom: 10px; border-radius: 0 10px 10px 0; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
                        <p style="font-size: 1.2rem; color: #555; margin: 0 0 5px 0; font-style: italic;">In Volume 1, Syaahi brought together the work of 200 selected writers.</p>
                        <p style="font-size: 1.3rem; font-weight: bold; color: #2e7d32; margin: 0; font-family: 'Montserrat', sans-serif;">🔥 185+ COPIES SOLD IN 24 HOURS</p>
                    </div>
                    
                    <p style="font-size: 1.4rem; color: #444; margin-bottom: 15px; line-height: 1.4;">
                        Now, we are continuing that journey with 150 new writers from Volume 2.
                    </p>
                    
                    <div style="background: var(--text-dark); color: white; padding: 12px 20px; border-radius: 8px; display: inline-block; margin-bottom: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                        <p style="font-size: 1.1rem; font-weight: bold; font-family: 'Montserrat', sans-serif; margin: 0; letter-spacing: 1px;">PUBLISHED WITH NO ADDITIONAL PUBLICATION CHARGE</p>
                    </div>

                    <p style="font-size: 1.8rem; font-weight: bold; font-family: 'Cinzel', serif; color: var(--text-accent); margin: 0;">Your name. Your writing. Your book.</p>
                </div>

                <!-- Right: Book Image -->
                <div style="flex: 0 0 350px; display: flex; justify-content: center; align-items: center;">
                    <img src="https://res.cloudinary.com/dde8ekuuu/image/upload/v1790489719/WhatsApp_Image_2026-05-06_at_10.47.39_PM_mxpvml.jpg" alt="Syaahi Book" style="width: 100%; max-width: 300px; max-height: 400px; object-fit: contain; border-radius: 15px; box-shadow: 0 20px 40px rgba(90,50,30,0.2); border: 2px solid var(--border-color); transform: rotate(3deg); transition: transform 0.4s ease;" onmouseover="this.style.transform='rotate(0deg) scale(1.05)'" onmouseout="this.style.transform='rotate(3deg) scale(1)'">
                </div>

            </div>
        </div>

        <!-- Slide 16: Congratulations & Check PDF -->"""

html = pattern.sub(new_slide, html)

with open("iwl_presentation.html", "w") as f:
    f.write(html)
print("Done")
