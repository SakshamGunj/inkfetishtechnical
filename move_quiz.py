import re

with open("public/honey-hurt-presentation/index.html", "r") as f:
    content = f.read()

# 1. Match Quiz Section (from Slide 10 to just before Slide 19)
quiz_pattern = re.compile(r'(<!-- Slide 10: Stay Till The End.*?)</section>\s*(?=<!-- Slide 19: The Reality of Publishing)', re.DOTALL)
quiz_match = quiz_pattern.search(content)

# 2. Match Schedule Call Section (Slide 28)
schedule_pattern = re.compile(r'(<!-- Slide 28: Schedule Call.*?)</section>', re.DOTALL)
schedule_match = schedule_pattern.search(content)

if quiz_match and schedule_match:
    quiz_html = quiz_match.group(0) + "\n\n"
    
    # Remove quiz html from its original place
    content_no_quiz = content[:quiz_match.start()] + content[quiz_match.end():]
    
    # Now we need to find the schedule call section again in the new content
    schedule_match2 = schedule_pattern.search(content_no_quiz)
    
    if schedule_match2:
        final_content = content_no_quiz[:schedule_match2.end()] + "\n\n" + quiz_html + content_no_quiz[schedule_match2.end():]
        with open("public/honey-hurt-presentation/index.html", "w") as f:
            f.write(final_content)
        print("Success: Quiz moved to the end!")
    else:
        print("Error finding schedule section after removal.")
else:
    print(f"Error: quiz_match={bool(quiz_match)}, schedule_match={bool(schedule_match)}")

