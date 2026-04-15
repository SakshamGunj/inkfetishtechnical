import React, { useState, useEffect, useRef } from 'react';
import LoveAnthologyModal from '../components/LoveAnthologyModal';

const LaunchChapterMarketThinking = () => {
    const [showModal, setShowModal] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const triggerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTriggered) {
                    setShowModal(true);
                    setHasTriggered(true);
                }
            },
            { threshold: 0.5 }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            if (triggerRef.current) observer.unobserve(triggerRef.current);
        };
    }, [hasTriggered]);
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title */}
            <div className="text-center mb-16">
                <span className="text-gold text-sm font-sans uppercase tracking-widest block mb-4">Chapter 1</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">MARKET-FIRST THINKING: READERS BEFORE WRITING</h2>
                <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
            </div>

            <p className="mb-6">
                Most authors ask "Who will read my book?" after they finish writing. That is six months too late.
            </p>
            <p className="mb-6">
                Here is the truth that nobody wants to hear. Your book is not for everyone. It cannot be. Amazon's algorithm needs to categorize you. Bookstore buyers need to know which shelf you belong on. Ad platforms need demographic targets. Readers need to recognize what kind of story or solution you are offering.
            </p>
            <p className="mb-8">
                The more specific you get about your ideal reader, the easier everything else becomes. Your cover designer knows what style to use. Your Amazon keywords become obvious. Your social media content writes itself. You are not guessing anymore. You are building for someone real.
            </p>

            <div className="my-16">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Define Your Ideal Reader (ONE Person, Not Everyone)</h3>
                <p className="mb-6">
                    Right now, stop thinking about broad demographics. Stop thinking about "women aged twenty-five to forty-five who like romance." That is marketing-speak that helps nobody.
                </p>
                <p className="mb-6">
                    Instead, you are going to create one specific human being. Give them a name. A job. A city. A salary. Reading habits. Frustrations. Dreams. The clearer this person becomes in your mind, the better your marketing will perform.
                </p>
                <p className="mb-8">
                    Here is exactly how to build your reader avatar.
                </p>
            </div>

            {/* Visual 1: Persona Card */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-gold/20 flex justify-center bg-gradient-to-br from-ink-900 via-ink-black to-ink-900 p-8">
                    <img
                        src="/images/launch/persona_riya.png"
                        alt="Reader Avatar Persona Card: Riya"
                        className="max-w-sm w-full h-auto rounded-lg shadow-gold/10 shadow-lg"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 1.1: Visualizing "Riya" turns a demographic statistic into a recognizable human being you can write for.
                </figcaption>
            </figure>

            <p className="mb-6">
                Start with basic demographics but go deeper than surface level. Name your reader. Let's say her name is Riya. She is twenty-six years old, works in digital marketing at a startup in Bangalore. She earns ₹8 lakh per year. She is single, lives with two roommates, commutes forty minutes each way to work.
            </p>
            <p className="mb-6">
                Now add her reading identity. Riya buys two to three books per month, almost always on Amazon India during their sales. She prefers Kindle because her apartment is small and she is always traveling between her parents' place in Pune and Bangalore. She follows about thirty bookstagram accounts and discovers most of her reads through Instagram or BookTok recommendations.
            </p>
            <p className="mb-6">
                Get specific about genre preferences. Riya loves contemporary romance, especially books with strong female leads, workplace settings, and banter-heavy dialogue. Her favorite authors include Colleen Hoover, Emily Henry, and she is starting to discover Indian romance authors like Nikita Singh. She liked Chetan Bhagat's early books but has outgrown them. She will read dark romance occasionally but prefers books that make her feel hopeful.
            </p>
            <p className="mb-6">
                Understand her media consumption. Riya spends about two hours daily on Instagram, mostly during her commute and before bed. She watches Netflix but complains about never having time to finish shows. She listens to podcasts during her morning routine. She is on LinkedIn for work but rarely posts. She deleted Twitter years ago because it was too negative.
            </p>
            <p className="mb-8">
                Finally, understand her pain points and desires related to your book's promise. If you are writing romance, Riya is exhausted from work and dating apps. She wants escapism. She wants to feel something. She wants characters who feel real but live lives slightly more exciting than hers. She wants endings that make her believe in love even when her own life feels complicated.
            </p>
            <p className="mb-6">
                Now you have Riya. She is not a demographic segment. She is a person you can visualize. When you write your book description, you are writing to Riya. When you design your cover, you are asking "Would Riya pick this up?" When you post on Instagram, you are creating content Riya would actually stop scrolling for.
            </p>

            <div className="bg-ink-900/50 p-6 rounded-lg border-l-4 border-gold mb-12">
                <p className="font-bold text-gold mb-2 font-sans uppercase tracking-widest text-sm">Action Step</p>
                <p className="italic text-parchment/90">
                    Write your reader avatar in one hundred words. Print it out. Pin it above your desk. Reference it every single time you make a marketing decision. If you cannot picture your avatar caring about something, do not do it.
                </p>
            </div>

            <div className="my-16">
                <h3 ref={triggerRef} className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">The Genre Reality Check</h3>
                <p className="mb-6">
                    Your book belongs to a genre whether you like it or not. You might think your book is unique and defies categorization. Readers and algorithms disagree. They need a box to put you in.
                </p>
                <p className="mb-6">
                    This is not limiting. This is liberating. Genre comes with built-in reader expectations, which means you can meet those expectations brilliantly or subvert them intentionally. But you cannot ignore them.
                </p>
            </div>

            <LoveAnthologyModal isOpen={showModal} onClose={() => setShowModal(false)} />

            {/* Visual 2: Genre Patterns */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                        src="/images/launch/genre_patterns.png"
                        alt="Visual analysis of genre conventions: Romance vs Thriller"
                        className="w-full h-auto"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 1.2: Genre is a visual language. Your cover must speak the correct dialect to be understood instantly.
                </figcaption>
            </figure>

            <p className="mb-6">
                Here is your homework. Go to Amazon India right now. Search for your genre. Look at the top twenty bestsellers in your category. Not the books you wish were popular. The books that are actually selling today.
            </p>
            <p className="mb-6">
                Study these books like you are preparing for an exam. What do the covers look like? Are they illustrated or photographic? What colors dominate? Are the titles short or long? How are the author names displayed? What is the average price? How many pages are these books typically? How many reviews do they have, and what do those reviews say?
            </p>
            <p className="mb-6">
                Now click into individual books. Read the descriptions. Notice the language patterns. Count how many paragraphs. Look at the keywords and categories listed. Check if they are standalone or part of a series.
            </p>
            <p className="mb-8">
                You are not copying anyone. You are learning the visual and verbal language of your genre. Romance readers expect certain signals. Thriller readers expect different signals. Self-help readers expect something else entirely. When you speak the wrong language, readers scroll past even if your book is brilliant.
            </p>
            <p className="mb-6">
                Let me give you real examples. If you are writing contemporary romance for the Indian market, look at what is actually selling. You will notice most covers feature close-up photographs of couples, often in urban settings or with subtle Indian elements. Titles tend to be emotional and direct. Prices hover between ₹99 for ebooks during promotions and ₹249 at regular price. Page counts are usually two hundred to three hundred pages. The descriptions focus on emotions and chemistry, not plot complexity.
            </p>
            <p className="mb-6">
                Now if you are writing psychological thrillers, the pattern shifts completely. Covers are darker, often featuring bold typography and symbolic imagery rather than faces. Titles create unease or questions. Prices are slightly higher, ₹149 to ₹349. Descriptions emphasize twists, unreliable narrators, and suspense.
            </p>
            <p className="mb-6">
                Your decision is simple. Do you want to fit within these patterns or deliberately break them? Both can work, but you need to be intentional.
            </p>
            <p className="mb-6">
                If you fit the pattern, you benefit from reader expectation. Someone browsing for romance sees your cover and instantly knows what they are getting. The cognitive load is low. The purchase decision is fast.
            </p>
            <p className="mb-6">
                If you break the pattern, you need to be exceptional at communicating why your difference matters. Your description must work harder. Your title must intrigue. Your marketing must educate readers about why they should take a chance on something unexpected.
            </p>
            <p className="mb-6">
                Most debut authors should fit the pattern. Once you have an audience and credibility, then you can experiment.
            </p>
            <p className="mb-6">
                Here are your three decision points right now. What is your primary genre? Choose one. Not "it's kind of a romance but also has mystery elements and deals with family issues." That is every book. What shelf does it belong on?
            </p>
            <p className="mb-6">
                What are your one or two sub-genres? Romance is too broad. Contemporary romance, workplace romance, second-chance romance. Those are specific. Thriller is too broad. Psychological thriller, domestic thriller, crime thriller. Get specific.
            </p>
            <p className="mb-12">
                Do you fit reader expectations or deliberately challenge them? If your romance has an unhappy ending, you are breaking a core genre convention. Readers will feel betrayed unless you signal this upfront. If your self-help book is structured like a memoir, you are breaking convention. Make sure it is for a good reason.
            </p>

            <div className="bg-red-950/20 p-6 rounded-lg border-l-4 border-red-500/50 mb-12">
                <p className="font-bold text-red-300 mb-2 font-sans uppercase tracking-widest text-sm">Common Mistake</p>
                <p className="italic text-red-100/90">
                    Trying to appeal to everyone by being vague about genre. "This book is for anyone who loves a good story." That is meaningless. Genre specificity is not limiting. It is targeting, and targeting is how you win.
                </p>
            </div>

            <div className="my-16">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Competitive Positioning</h3>
                <p className="mb-6">
                    You are not writing in a vacuum. Your book will sit on virtual shelves next to hundreds of other books. How do you stand out?
                </p>
                <p className="mb-6">
                    The answer is not "my book is better." That is subjective and unhelpful. The answer is "my book is different in this specific way that matters to this specific reader."
                </p>
                <p className="mb-6">
                    Here is a simple exercise that forces clarity. Draw two axes on a piece of paper. The horizontal axis goes from Light to Dark in tone. The vertical axis goes from Realistic to Escapist in setting and stakes.
                </p>
                <p className="mb-8">
                    Now plot five competing books in your genre on this grid. Where do they fall? Are they clustered in one quadrant, or spread across the map? Where are the white spaces?
                </p>
            </div>

            {/* Visual 3: Positioning Matrix */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-blue-500/20">
                    <img
                        src="/images/launch/positioning_matrix.png"
                        alt="Competitive Positioning Matrix: Light/Dark vs Realistic/Escapist"
                        className="w-full h-auto"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 1.3: Finding the 'White Space' allows you to position your book where there is demand but less competition.
                </figcaption>
            </figure>

            <p className="mb-6">
                Finally, plot your own book. Do you fit near the competition, or are you occupying empty territory? Neither is wrong, but the strategy shifts.
            </p>
            <p className="mb-6">
                If you are positioned near successful competition, your marketing message becomes "If you loved Book X, you will love mine because I deliver similar satisfaction with these fresh twists." You are borrowing their audience.
            </p>
            <p className="mb-6">
                If you are positioned in white space, your message becomes "Finally, a book that combines Element A with Element B, something you have never seen before." You are creating a new micro-niche.
            </p>
            <p className="mb-6">
                Let me give you a positioning statement formula that works every time. Fill in these blanks: "For readers who loved [Book X] and [Book Y], but want more of [Thing 1] and less of [Thing 2]."
            </p>
            <div className="bg-ink-900/50 p-6 rounded-lg border border-white/10 mb-8 space-y-4">
                <p className="text-sm"><strong className="text-gold">Example for romance:</strong> "For readers who loved The Love Hypothesis and A Bollywood Affair, but want more workplace tension and less family drama."</p>
                <p className="text-sm"><strong className="text-gold">Example for thriller:</strong> "For readers who loved The Silent Patient and Gone Girl, but want more Indian settings and less graphic violence."</p>
                <p className="text-sm"><strong className="text-gold">Example for self-help:</strong> "For readers who loved Atomic Habits and Deep Work, but want more practical advice for the Indian work culture and less academic theory."</p>
            </div>
            <p className="mb-6">
                This statement does four things at once. It signals comparable quality by association. It borrows audience from established authors. It highlights your unique angle. It filters out readers who want something different.
            </p>
            <p className="mb-6">
                Your positioning statement becomes your north star. Use it in your book description. Reference it when you pitch to book bloggers. Mention it in podcast interviews. Repeat it until it becomes how people naturally describe your book to others.
            </p>

            <div className="my-16 p-8 bg-green-900/20 border-l-4 border-green-500 rounded-r-xl">
                <h3 className="text-xl font-bold text-green-400 mb-4 font-sans uppercase tracking-widest">Quick Win</h3>
                <p className="text-green-100/90 italic">
                    Write three positioning statements using different comparable books. Test them with ten people in your target audience. Ask them which one makes them most likely to check out your book. The winner becomes your official positioning.
                </p>
            </div>
        </div>
    );
};

export default LaunchChapterMarketThinking;
