import React from 'react';

const LaunchChapterTitleHook = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title */}
            <div className="text-center mb-16">
                <span className="text-gold text-sm font-sans uppercase tracking-widest block mb-4">Chapter 2</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">TITLE, SUBTITLE & HOOK</h2>
                <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
            </div>

            <p className="mb-6">
                Your title is a micro-billboard on a three-hundred-pixel Amazon thumbnail. Make it work.
            </p>
            <p className="mb-6">
                Most authors choose titles based on what sounds pretty or meaningful to them. That is sentimental, not strategic. Your title has exactly one job: make someone curious enough to click. That is it. Everything else is secondary.
            </p>
            <p className="mb-6">
                Think about how readers actually discover books. They are scrolling through Amazon search results or browsing a category page. Your cover is tiny. Your title is even tinier. You have less than two seconds to stop the scroll.
            </p>

            {/* Visual 1: Micro-Billboard Concept */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 flex justify-center bg-ink-black py-8">
                    <img
                        src="/images/launch/title_billboard.png"
                        alt="Mobile search results highlighting readability of a strong title"
                        className="max-w-md w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 2.1: In the crowded marketplace of a mobile screen, your title must be legible and gripping instantly.
                </figcaption>
            </figure>

            <p className="mb-6">
                The best titles are easy to say, easy to remember, and emotionally signal what kind of experience the book delivers. They work in conversation. Imagine someone recommending your book to a friend. Can they remember the title after hearing it once? Can they spell it?
            </p>

            <div className="my-16">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Title Frameworks That Consistently Work</h3>
                <p className="mb-6">
                    Let me give you proven structures. You do not need to reinvent the wheel. Successful patterns exist because they work with human psychology.
                </p>
            </div>

            {/* Visual 2: Title Frameworks Infographic */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                    <img
                        src="/images/launch/title_frameworks.png"
                        alt="Infographic of Four Title Frameworks: Noun of Emotion, High-Concept, Adj-Noun, Promise Formula"
                        className="w-full h-auto"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 2.2: Proven psychological frameworks for titles that stick.
                </figcaption>
            </figure>

            <p className="mb-6">
                The Noun of Emotion: Single powerful words that evoke feeling. Think Verity by Colleen Hoover, Educated by Tara Westover, Shame by Salman Rushdie. These titles promise emotional weight. They work especially well for literary fiction and memoir. The risk is they can feel generic if the noun is too common. Avoid titles like "Hope" or "Journey" unless your author brand is already strong.
            </p>
            <p className="mb-6">
                The High-Concept Phrase: Titles that immediately create a question or intriguing scenario. The Silent Patient. The Midnight Library. The Seven Husbands of Evelyn Hugo. These work because they make you ask "Wait, what?" The phrase itself contains mystery or surprise. For Indian authors, this works beautifully if you can create something that feels fresh: The Bangalore Detectives Club, The Library of Lost Dreams.
            </p>
            <p className="mb-6">
                The Adjective-Noun Combo: Simple but effective. The Invisible Life of Addie LaRue. The Lost Bookshop. The Alchemist. The adjective makes a common noun interesting. This structure feels literary and accessible at the same time. Works across most genres.
            </p>
            <p className="mb-6">
                The Promise Formula: Common in non-fiction but works for some fiction too. Atomic Habits. Launch Like a Bestseller. The Subtle Art of Not Giving a F*ck. These titles tell you exactly what outcome the book promises. No mystery, just clear value. If your book solves a problem, this structure converts extremely well.
            </p>
            <p className="mb-6">
                Here is what does NOT work. Clever wordplay that only makes sense if you read the whole book. References to things only insiders understand. Titles so long they get truncated in search results. Titles that are spelled unconventionally or use symbols instead of letters.
            </p>
            <p className="mb-6">
                Your title needs to work in three contexts. First, on a tiny thumbnail in a crowded search result. Second, in conversation when someone recommends it. Third, in a social media post where it competes with a thousand other things screaming for attention.
            </p>

            <div className="bg-ink-900/50 p-6 rounded-lg border-l-4 border-gold mb-12">
                <p className="font-bold text-gold mb-2 font-sans uppercase tracking-widest text-sm">Action Step</p>
                <p className="italic text-parchment/90">
                    Write ten title variations for your book. Mix different structures. Say each one out loud. Which ones flow easily? Which ones feel memorable? Now create a poll on Instagram Stories or in a writing group. Do not explain anything. Just show the titles. Which gets the most votes? That is your data.
                </p>
            </div>

            <div className="my-16">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">The Subtitle Strategy for Non-Fiction and Taglines for Fiction</h3>
                <p className="mb-6">
                    If you are writing non-fiction, your subtitle is more important than your title. I will repeat that. Your subtitle does the actual selling. Your title creates intrigue, your subtitle closes the deal.
                </p>
                <p className="mb-6">
                    The formula is simple. State the transformation or outcome your reader will experience, name who it is for, and address the main objection or fear they have about achieving that outcome.
                </p>
            </div>

            {/* Visual 3: Subtitle vs Tagline */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                        src="/images/launch/subtitle_tagline.png"
                        alt="Comparison of Non-Fiction Subtitle Strategy vs Fiction Tagline Strategy"
                        className="w-full h-auto"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 2.3: Non-fiction sells the outcome. Fiction sells the emotion.
                </figcaption>
            </figure>

            <p className="mb-6">
                Let me show you what this looks like in practice. Take this ebook you are reading right now. The title is "Launch Like a Bestseller." That creates aspiration. The subtitle is "The Modern Book Marketing Playbook for Self-Published Authors." That tells you exactly what you get, who it is for, and signals it is practical and current, not outdated theory.
            </p>
            <p className="mb-6">
                More examples: "The Productivity System for Creative Professionals Who Hate Rigid Schedules." This works because creative people often resist traditional productivity advice. You just addressed their exact objection in the subtitle.
            </p>
            <p className="mb-6">
                "How to Build Wealth in Your 30s Without Sacrificing Your Lifestyle." The objection is "I do not want to live like a monk and deprive myself." Addressed.
            </p>
            <p className="mb-6">
                "The Complete Guide to Indian Stock Market Investing for Absolute Beginners." The objection is "This seems too complicated for me." Addressed by saying "absolute beginners."
            </p>
            <p className="mb-6">
                Your subtitle should be between eight and fifteen words. Shorter feels incomplete. Longer gets cut off in mobile displays.
            </p>
            <p className="mb-6">
                For fiction, you do not have a subtitle. You have a tagline. This is a single sentence that creates emotional intrigue or establishes the core tension of your story.
            </p>
            <p className="mb-6">
                Romance tagline example: "They broke each other's hearts. Now they must save each other's lives." This works because it establishes history, creates stakes, and hints at forced proximity.
            </p>
            <p className="mb-6">
                Thriller tagline example: "Everyone in this town is lying. She's going to find out why." This works because it creates paranoia and promises investigation.
            </p>
            <p className="mb-6">
                Fantasy tagline example: "She was supposed to kill him. Instead, she freed him." This creates immediate questions and hints at moral complexity.
            </p>
            <p className="mb-6">
                Your tagline lives in your Amazon description, on your back cover, and in every social media post. It is the one sentence someone reads right after seeing your cover. Make it count.
            </p>

            <div className="bg-red-950/20 p-6 rounded-lg border-l-4 border-red-500/50 mb-12">
                <p className="font-bold text-red-300 mb-2 font-sans uppercase tracking-widest text-sm">Common Mistake</p>
                <p className="italic text-red-100/90">
                    Making your subtitle or tagline too clever instead of too clear. Your goal is not to impress other writers with your wordplay. Your goal is to make a busy reader understand in three seconds what they are getting and why they should care.
                </p>
            </div>
        </div>
    );
};

export default LaunchChapterTitleHook;
