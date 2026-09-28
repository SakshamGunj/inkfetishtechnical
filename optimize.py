with open("iwl_presentation.html", "r") as f:
    html = f.read()

# Replace CSS
css_old = """        .presentation-container {
            width: 100vw;
            height: 100vh;
            max-width: 1920px;
            max-height: 1080px;
            position: relative;
            background-color: var(--bg-color);
            background-image: 
                linear-gradient(45deg, rgba(205, 168, 115, 0.05) 25%, transparent 25%, transparent 75%, rgba(205, 168, 115, 0.05) 75%, rgba(205, 168, 115, 0.05)), 
                linear-gradient(45deg, rgba(205, 168, 115, 0.05) 25%, transparent 25%, transparent 75%, rgba(205, 168, 115, 0.05) 75%, rgba(205, 168, 115, 0.05));
            background-size: 60px 60px;
            background-position: 0 0, 30px 30px;
            box-shadow: inset 0 0 100px rgba(90, 50, 30, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
        }"""

css_new = """        .presentation-container {
            width: 1920px;
            height: 1080px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            transform-origin: center center;
            background-color: var(--bg-color);
            background-image: 
                linear-gradient(45deg, rgba(205, 168, 115, 0.05) 25%, transparent 25%, transparent 75%, rgba(205, 168, 115, 0.05) 75%, rgba(205, 168, 115, 0.05)), 
                linear-gradient(45deg, rgba(205, 168, 115, 0.05) 25%, transparent 25%, transparent 75%, rgba(205, 168, 115, 0.05) 75%, rgba(205, 168, 115, 0.05));
            background-size: 60px 60px;
            background-position: 0 0, 30px 30px;
            box-shadow: inset 0 0 100px rgba(90, 50, 30, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }"""

html = html.replace(css_old, css_new)

js_new = """
        // Responsive Scaling
        function resizePresentation() {
            const container = document.querySelector('.presentation-container');
            const scaleX = window.innerWidth / 1920;
            const scaleY = window.innerHeight / 1080;
            const scale = Math.min(scaleX, scaleY);
            container.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
        window.addEventListener('resize', resizePresentation);
        resizePresentation();
    });
</script>"""

html = html.replace("    });\n</script>", js_new)

with open("iwl_presentation.html", "w") as f:
    f.write(html)
