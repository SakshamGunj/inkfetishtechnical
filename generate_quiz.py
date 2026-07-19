import re

questions = [
    {
        "num": 1,
        "category": "Point of View",
        "question": "Which point of view uses the pronouns 'I', 'me', and 'my'?",
        "options": ["First Person", "Second Person", "Third Person Limited", "Third Person Omniscient"],
        "correct": "A"
    },
    {
        "num": 2,
        "category": "Literary Device",
        "question": "What literary device is used when an object or action represents a deeper meaning?",
        "options": ["Symbolism", "Hyperbole", "Irony", "Alliteration"],
        "correct": "A"
    },
    {
        "num": 3,
        "category": "Show, Don't Tell",
        "question": "Which sentence best follows the 'Show, Don't Tell' principle?",
        "options": ["She was nervous.", "Her hands trembled as she folded the letter.", "She felt emotions.", "She was scared and nervous."],
        "correct": "B"
    },
    {
        "num": 4,
        "category": "Character Development",
        "question": "What is the term for the transformation a character undergoes during a story?",
        "options": ["Character Arc", "Plot Twist", "Prologue", "Theme"],
        "correct": "A"
    },
    {
        "num": 5,
        "category": "Publishing",
        "question": "Before a manuscript is sent for printing, which stage usually comes last?",
        "options": ["Proofreading", "Brainstorming", "Drafting", "Outlining"],
        "correct": "A"
    },
    {
        "num": 6,
        "category": "Publishing",
        "question": "Which professional is primarily responsible for correcting grammar, punctuation, and consistency in a manuscript?",
        "options": ["Copy Editor", "Illustrator", "Literary Agent", "Book Reviewer"],
        "correct": "A"
    },
    {
        "num": 7,
        "category": "Poetry",
        "question": "What is a stanza in poetry?",
        "options": ["A group of lines forming a unit", "The title of the poem", "The final line", "A rhyme scheme"],
        "correct": "A"
    },
    {
        "num": 8,
        "category": "Writing",
        "question": "Which of the following is NOT usually considered a stage of the writing process?",
        "options": ["Revising", "Editing", "Publishing", "Laminating"],
        "correct": "D"
    },
    {
        "num": 9,
        "category": "Publishing",
        "question": "What is the primary purpose of a book's blurb?",
        "options": ["To summarize the book and attract readers", "To list references", "To thank the publisher", "To display the ISBN"],
        "correct": "A"
    },
    {
        "num": 10,
        "category": "Creative Writing",
        "question": "Which element is considered the central message or underlying idea of a story?",
        "options": ["Theme", "Setting", "Dialogue", "Genre"],
        "correct": "A"
    }
]

def generate_slide(q, is_answer):
    letters = ['A', 'B', 'C', 'D']
    correct_idx = letters.index(q['correct'])
    
    html = f"""
        <!-- Q{q['num']}: {'Answer' if is_answer else 'Question'} -->
        <section class="slide theme-quiz-{'a' if is_answer else 'q'}" style="background: var(--ivory);">
            <div class="content" style="max-width: 900px; padding: 4rem 2rem; width: 100%; text-align: center;">
                <p style="font-family: var(--font-sans); text-transform: uppercase; font-weight: 800; letter-spacing: 3px; font-size: 0.9rem; color: var(--gold-main); margin-bottom: 1rem;">{'Answer' if is_answer else 'Question'} {q['num']} • {q['category']}</p>
                <h3 style="font-family: var(--font-heading); font-size: clamp(2rem, 3.5vw, 3rem); color: var(--obsidian); font-weight: 800; margin-bottom: 3rem; line-height: 1.2;">
                    {q['question']}
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; text-align: left;">"""

    for i in range(4):
        is_this_correct = (i == correct_idx)
        letter = letters[i]
        opt_text = q['options'][i]
        
        if is_answer and is_this_correct:
            div_style = "background: #22c55e; border: 2px solid #16a34a; border-radius: 12px; padding: 1.5rem; font-family: var(--font-sans); font-size: clamp(1rem, 1.5vw, 1.2rem); font-weight: 800; color: white; box-shadow: 0 15px 30px rgba(34,197,94,0.3); transform: scale(1.05); z-index: 2;"
            span_style = "color: rgba(255,255,255,0.7); font-weight: 800; margin-right: 10px;"
        else:
            div_style = f"background: white; border: 2px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 1.5rem; font-family: var(--font-sans); font-size: clamp(1rem, 1.5vw, 1.2rem); font-weight: 600; color: var(--slate); box-shadow: 0 10px 20px rgba(0,0,0,0.05); {'opacity: 0.4;' if is_answer else ''}"
            span_style = "color: var(--gold-main); font-weight: 800; margin-right: 10px;"
            
        html += f"""
                    <div style="{div_style}">
                        <span style="{span_style}">{letter}.</span> {opt_text}
                    </div>"""
                    
    html += """
                </div>
            </div>
        </section>"""
    return html

full_html = ""
for q in questions:
    full_html += generate_slide(q, False)
    full_html += generate_slide(q, True)

# Read the file and replace the 8 placeholder lines
with open('public/honey-hurt-presentation/index.html', 'r') as f:
    content = f.read()

# The placeholder starts with '<!-- Slides 11-18: Reserved Blank Slides for Quiz -->'
# and ends right before '<!-- Slide 19: The Reality of Publishing -->' (or whatever is next)
# Actually, I can just use a regex to replace that specific block.
pattern = re.compile(r'<!-- Slides 11-18: Reserved Blank Slides for Quiz -->.*?(?=<!-- Slide \d+: The Reality|<!-- Slide 19: The Reality)', re.DOTALL)
match = pattern.search(content)

if match:
    new_content = content[:match.start()] + full_html + "\n\n        " + content[match.end():]
    with open('public/honey-hurt-presentation/index.html', 'w') as f:
        f.write(new_content)
    print("Success: Replaced quiz slides.")
else:
    print("Error: Could not find the quiz placeholder block.")
    # let's try a fallback
    pattern = re.compile(r'<!-- Slides 11-18: Reserved Blank Slides for Quiz -->.*?(?=</body)', re.DOTALL)
    # wait, the next slide might be "The Reality" (Slide 19) or "Slide 4" or something else depending on previous edits.
