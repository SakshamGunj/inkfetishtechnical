import re

with open("iwl_presentation.html", "r") as f:
    html = f.read()

# 1. Add Download Button
btn_html = """
    <button id="download-btn" onclick="window.print()" style="position: fixed; top: 20px; right: 20px; z-index: 1000; background: var(--text-accent); color: white; border: 2px solid var(--border-color); padding: 10px 20px; font-family: 'Cinzel', serif; font-weight: bold; font-size: 1.2rem; cursor: pointer; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); transition: all 0.3s ease;">
        ⬇ Download PDF
    </button>
"""
if '<button id="download-btn"' not in html:
    html = html.replace("<body>", "<body>" + btn_html)

# 2. Add @media print CSS
print_css = """
        @media print {
            @page { size: 1920px 1080px; margin: 0; }
            body, html { width: 1920px !important; height: 1080px !important; overflow: visible !important; background: white !important; }
            .presentation-container {
                width: 1920px !important;
                height: 1080px !important;
                transform: none !important;
                position: static !important;
                overflow: visible !important;
                background: none !important;
                box-shadow: none !important;
            }
            .controls, .slide-counter, #download-btn { display: none !important; }
            .slides-wrapper {
                width: 100% !important; height: auto !important; position: static !important;
            }
            .slide {
                opacity: 1 !important;
                position: relative !important;
                page-break-after: always !important;
                break-after: page !important;
                display: flex !important;
                width: 1920px !important;
                height: 1080px !important;
                overflow: hidden !important;
                background-color: var(--bg-color) !important;
                background-image: 
                    linear-gradient(45deg, rgba(205, 168, 115, 0.05) 25%, transparent 25%, transparent 75%, rgba(205, 168, 115, 0.05) 75%, rgba(205, 168, 115, 0.05)), 
                    linear-gradient(45deg, rgba(205, 168, 115, 0.05) 25%, transparent 25%, transparent 75%, rgba(205, 168, 115, 0.05) 75%, rgba(205, 168, 115, 0.05)) !important;
                background-size: 60px 60px !important;
                background-position: 0 0, 30px 30px !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
        }
"""
if '@media print' not in html:
    html = html.replace("</style>", print_css + "</style>")

# 3. Remove global borders
borders_to_remove = """        <!-- Decorative Borders -->
        <div class="slide-border"></div>
        <div class="slide-border-inner"></div>
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>"""
html = html.replace(borders_to_remove, "")

# Some old version of it might be slightly different. Let's use regex to remove them:
html = re.sub(r'<!-- Decorative Borders -->\s*<div class="slide-border"></div>\s*<div class="slide-border-inner"></div>\s*<div class="corner corner-tl"></div>\s*<div class="corner corner-tr"></div>\s*<div class="corner corner-bl"></div>\s*<div class="corner corner-br"></div>', '', html, flags=re.MULTILINE)

# 4. Inject them via JS inside DOMContentLoaded
js_injection = """
        const borderHTML = `
        <div class="slide-border"></div>
        <div class="slide-border-inner"></div>
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>`;
        slides.forEach(slide => {
            slide.insertAdjacentHTML('beforeend', borderHTML);
        });
"""
if 'borderHTML' not in html:
    html = html.replace("const nextBtn = document.getElementById('next-btn');", "const nextBtn = document.getElementById('next-btn');\n" + js_injection)


with open("iwl_presentation.html", "w") as f:
    f.write(html)
    print("Success")
