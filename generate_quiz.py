import re

questions = [
    {"q": "Which Indian poet wrote Gitanjali?", "opts": {"A": "Sarojini Naidu", "B": "Rabindranath Tagore", "C": "Munshi Premchand", "D": "Harivansh Rai Bachchan"}, "ans": "B"},
    {"q": "How many lines does a traditional sonnet usually have?", "opts": {"A": "10", "B": "12", "C": "14", "D": "16"}, "ans": "C"},
    {"q": "Who wrote Godaan?", "opts": {"A": "Munshi Premchand", "B": "R. K. Narayan", "C": "Ruskin Bond", "D": "Vikram Seth"}, "ans": "A"},
    {"q": "Haiku is a traditional form of poetry from which country?", "opts": {"A": "India", "B": "China", "C": "Japan", "D": "Korea"}, "ans": "C"},
    {"q": "Which of these is a type of poem that tells a story?", "opts": {"A": "Ballad", "B": "Haiku", "C": "Sonnet", "D": "Limerick"}, "ans": "A"},
    {"q": "Who wrote the famous epic Ramayana?", "opts": {"A": "Vyasa", "B": "Valmiki", "C": "Kalidasa", "D": "Tulsidas"}, "ans": "B"},
    {"q": "Which Indian language has the famous ancient Sangam literary tradition?", "opts": {"A": "Bengali", "B": "Tamil", "C": "Hindi", "D": "Marathi"}, "ans": "B"},
    {"q": "What do we call a story that is written mainly to teach a moral lesson?", "opts": {"A": "Fable", "B": "Biography", "C": "Memoir", "D": "Thriller"}, "ans": "A"},
    {"q": "Who wrote Madhushala?", "opts": {"A": "Harivansh Rai Bachchan", "B": "Ramdhari Singh Dinkar", "C": "Premchand", "D": "Gulzar"}, "ans": "A"},
    {"q": "Which famous English playwright wrote Romeo and Juliet?", "opts": {"A": "Charles Dickens", "B": "William Shakespeare", "C": "George Orwell", "D": "Oscar Wilde"}, "ans": "B"},
    {"q": "What is an autobiography?", "opts": {"A": "A story about another person's life", "B": "A fictional story", "C": "A person's story written about their own life", "D": "A collection of poems"}, "ans": "C"},
    {"q": "Which of these is NOT usually considered a genre of fiction?", "opts": {"A": "Mystery", "B": "Fantasy", "C": "Biography", "D": "Science Fiction"}, "ans": "C"},
    {"q": "What is a metaphor?", "opts": {"A": "A direct comparison using \"like\" or \"as\"", "B": "A comparison made without using \"like\" or \"as\"", "C": "Repetition of the same word", "D": "A question with no answer"}, "ans": "B"},
    {"q": "Who wrote The Jungle Book?", "opts": {"A": "Mark Twain", "B": "Rudyard Kipling", "C": "Ernest Hemingway", "D": "Lewis Carroll"}, "ans": "B"},
    {"q": "Which of these is traditionally associated with a 5–7–5 pattern?", "opts": {"A": "Sonnet", "B": "Haiku", "C": "Ballad", "D": "Epic"}, "ans": "B"},
    {"q": "Who was the first Indian to win the Nobel Prize in Literature?", "opts": {"A": "R. K. Narayan", "B": "Rabindranath Tagore", "C": "Sarojini Naidu", "D": "Vikram Seth"}, "ans": "B"}
]

html_to_insert = """
        <!-- Quiz Intro 1 -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">AND NOW...</div>
            <h1 class="title-huge" style="font-size: 4.5rem; margin-bottom: 40px; color: var(--text-dark);">FUN GAME TIME!</h1>
            <p style="font-size: 2.5rem; font-weight: bold; font-family: 'Playfair Display', serif; color: #444;">Let's play some games.</p>
        </div>

        <!-- Quiz Intro 2 -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 20px; color: var(--text-accent);">HOW TO PLAY</div>
            <h1 class="title-huge" style="font-size: 3.5rem; margin-bottom: 30px; color: var(--text-dark);">THE MEGA QUIZ</h1>
            
            <div style="background: rgba(255,255,255,0.8); border: 2px solid var(--border-color); padding: 40px; border-radius: 20px; box-shadow: 0 15px 30px rgba(90, 50, 30, 0.1); max-width: 800px; margin: 0 auto 40px auto;">
                <p style="font-size: 2rem; color: #333; margin-bottom: 25px; line-height: 1.6; font-family: 'Playfair Display', serif; font-weight: bold;">
                    We will start by playing a 15-question quiz!
                </p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 20px;">
                    <span style="font-size: 2.5rem;">⌨️</span>
                    <p style="font-size: 1.8rem; color: #555; margin: 0; font-weight: 500;">You just have to type your answers in the chat box.</p>
                </div>
            </div>
            
            <p style="font-size: 3rem; font-family: 'Cinzel', serif; color: var(--text-accent); font-weight: bold; letter-spacing: 2px;">Let's begin!</p>
        </div>
"""

def generate_options_html(opts, correct_ans=None):
    opts_html = '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto; text-align: left;">'
    for letter, text in opts.items():
        is_correct = correct_ans == letter
        bg = 'rgba(46, 125, 50, 0.15)' if is_correct else 'rgba(255,255,255,0.8)'
        border = '#2e7d32' if is_correct else 'var(--border-color)'
        color = '#2e7d32' if is_correct else '#444'
        weight = 'bold' if is_correct else '500'
        shadow = '0 10px 20px rgba(46,125,50,0.2)' if is_correct else '0 5px 15px rgba(0,0,0,0.05)'
        scale = 'transform: scale(1.05);' if is_correct else ''
        check = '<span style="float: right;">✅</span>' if is_correct else ''
        
        opts_html += f'''
            <div style="background: {bg}; border: 2px solid {border}; padding: 25px; border-radius: 12px; box-shadow: {shadow}; font-size: 1.6rem; font-family: 'Montserrat', sans-serif; color: {color}; font-weight: {weight}; transition: all 0.3s ease; {scale}">
                <span style="font-family: 'Cinzel', serif; font-weight: bold; margin-right: 15px;">{letter}.</span> {text} {check}
            </div>
        '''
    opts_html += '</div>'
    return opts_html

for i, q in enumerate(questions):
    title = f"QUESTION {i+1}"
    if i == 14:
        title = "🔥 FINAL QUESTION — Q15"
    if i == 15:
        title = "🎁 BONUS TIE-BREAKER"
        
    # Slide A: Question only
    html_to_insert += f'''
        <!-- {title} - Question -->
        <div class="slide" style="justify-content: center; text-align: center;">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: var(--text-accent);">{title}</div>
            <h1 style="font-size: 2.8rem; margin-bottom: 50px; color: var(--text-dark); max-width: 1000px; margin-left: auto; margin-right: auto; line-height: 1.4; font-family: 'Playfair Display', serif;">{q['q']}</h1>
            {generate_options_html(q['opts'])}
        </div>
    '''
    
    # Slide B: Question + Answer
    html_to_insert += f'''
        <!-- {title} - Answer -->
        <div class="slide" style="justify-content: center; text-align: center; background: rgba(255,255,255,0.95);">
            <div class="subtitle" style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 30px; color: #2e7d32;">{title} — ANSWER</div>
            <h1 style="font-size: 2.8rem; margin-bottom: 50px; color: var(--text-dark); max-width: 1000px; margin-left: auto; margin-right: auto; line-height: 1.4; font-family: 'Playfair Display', serif;">{q['q']}</h1>
            {generate_options_html(q['opts'], q['ans'])}
        </div>
    '''

with open("iwl_presentation.html", "r") as f:
    content = f.read()

# find the closing </div> of .slides-wrapper
parts = content.split('    </div>\n\n    <div class="slide-counter">')
if len(parts) == 2:
    new_content = parts[0] + html_to_insert + '    </div>\n\n    <div class="slide-counter">' + parts[1]
    with open("iwl_presentation.html", "w") as f:
        f.write(new_content)
    print("Success")
else:
    print("Failed to find insertion point.")
