import React from 'react';

const LaunchChapterCoverPackaging = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-lg md:text-xl leading-relaxed text-parchment/90">
            {/* Title */}
            <div className="text-center mb-16">
                <span className="text-gold text-sm font-sans uppercase tracking-widest block mb-4">Chapter 3</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">COVER & PACKAGING THAT SELLS</h2>
                <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
            </div>

            <p className="mb-6">
                Your cover is not art. It is a sales tool. Treat it like one.
            </p>
            <p className="mb-6">
                I have seen brilliant books with terrible covers sell hundreds of copies. I have seen mediocre books with strategic covers sell thousands. The cover is not the whole game, but it is the first gate. If readers do not click, nothing else you wrote matters.
            </p>
            <p className="mb-6">
                Most authors approach cover design backwards. They think about what they personally like, or what feels artistically interesting, or what their friends will think is pretty. None of that matters. The only question that matters is: Will this cover make my ideal reader stop scrolling and click?
            </p>

            <div className="my-16">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Your Cover is a Billboard, Not a Gallery Piece</h3>
                <p className="mb-6">
                    Here is the harsh reality. Ninety percent of readers see your cover at thumbnail size, roughly three hundred pixels tall on a phone screen. At that size, intricate details disappear. Subtle colors blend together. Small text becomes unreadable.
                </p>
                <p className="mb-6">
                    Your cover has a hierarchy, and at thumbnail size, only three elements matter. First, does the overall image signal the correct genre at a glance? Second, can you read the title clearly? Third, is there enough contrast and visual interest to stand out among twenty other thumbnails?
                </p>
                <p className="mb-8">
                    Author name matters much less than you think unless you are already a household name. If you are Chetan Bhagat or Stephen King, put your name in huge letters. If you are publishing your debut, your title and genre signal matter more.
                </p>
            </div>

            {/* Visual 1: Thumbnail Test */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 flex justify-center bg-ink-black py-8">
                    <img
                        src="/images/launch/thumbnail_test.png"
                        alt="The Thumbnail Test: Readability on a mobile screen in a crowded list"
                        className="max-w-md w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 3.1: If your cover doesn't "pop" at 300 pixels, it's invisible.
                </figcaption>
            </figure>

            <p className="mb-6">
                Let me give you the thumbnail test. Take your cover design and shrink it down to the size it will appear on a phone. Better yet, actually view it on your phone in an Amazon search result. Can you still read the title? Does it immediately communicate genre? Does it look professional or amateurish?
            </p>
            <p className="mb-6">
                Now compare it to the top twenty books in your category. Does yours belong on the same shelf, or does it stick out for the wrong reasons? You want it to fit the visual language of your genre while having enough unique elements to catch the eye.
            </p>

            <div className="my-16">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Genre-Driven Design Patterns</h3>
                <p className="mb-8">
                    Every genre has visual shorthand. These patterns exist because they work. Readers have been trained over thousands of books to associate certain design elements with certain reading experiences. You can innovate within these patterns, but ignore them at your own risk.
                </p>
            </div>

            {/* Visual 2: Genre-Driven Design Patterns Trio */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                    <img
                        src="/images/launch/genre_patterns_trio.png"
                        alt="Visual Design Language by Genre: Romance, Thriller, Self-Help"
                        className="w-full h-auto"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 3.2: Each genre has a dialect. Romance speaks in soft tones; Thriller speaks in shadows and bold type.
                </figcaption>
            </figure>

            <p className="mb-6">
                Romance covers use soft color palettes, usually pastels or warm tones. The imagery often features couples in close proximity, showing faces or partial faces. If the faces are not shown, body language conveys intimacy. Typography tends toward script fonts or elegant serifs. The overall feel is emotional and inviting. Dark romance breaks this pattern with darker colors and sharper typography, signaling a different kind of story.
            </p>
            <p className="mb-6">
                Thriller covers favor high contrast, bold sans-serif fonts, and dark color schemes. Black, navy, deep red, and gray dominate. Rather than faces, you see symbolic objects: a house, a door, a window, a knife. The typography is often oversized and commanding. The design creates unease rather than comfort. Everything is sharp edges and shadows.
            </p>
            <p className="mb-6">
                Self-help and productivity covers go minimalist. Clean typography, often just the title in a striking font. One strong visual metaphor: an arrow pointing up, a ladder, a mountain, a light bulb. Colors tend to be aspirational: blues, greens, white space, occasional bright accent colors. The design communicates clarity and transformation.
            </p>
            <p className="mb-6">
                Literary fiction covers allow more artistic freedom but still follow patterns. They often use illustrated elements, unexpected color combinations, and typography that feels crafted. The overall aesthetic says "this is for thoughtful readers who appreciate nuance." But even here, the title must remain readable at thumbnail size.
            </p>
            <p className="mb-6">
                Your job is to build a swipe file. This is not optional. Go to Amazon right now and save thirty covers from bestselling books in your exact genre. Not books you personally like. Books that are selling. These are your design constraints.
            </p>
            <p className="mb-6">
                When you give these to your designer, you are not saying "copy these." You are saying "my book needs to fit on a virtual shelf next to these books, while having enough personality to stand out."
            </p>

            <div className="my-16">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Working with Designers</h3>
                <p className="mb-6">
                    Whether you are hiring a professional designer, using Fiverr, or creating the cover yourself with Canva, you need to provide clear direction. Designers are not mind readers. The more specific your input, the better your output.
                </p>
                <p className="mb-6">
                    Here is exactly what to provide. First, your reader avatar. Show them who you wrote the book for. Second, your genre and three to five comparable bestselling covers. Third, mood words that capture the emotional tone: dark, hopeful, intense, whimsical, elegant, raw. Fourth, your title, subtitle, and tagline so they understand the hierarchy.
                </p>
                <p className="mb-6">
                    What you should request: two to three design variations, not ten. Too many options creates decision paralysis. You also need files in multiple formats: print cover, ebook cover, square format for social media graphics.
                </p>
                <p className="mb-6">
                    If you are using Fiverr or a budget designer, expect to pay ₹5,000 to ₹15,000 for a professional cover. Yes, you can do it cheaper. But your cover is not the place to cut corners. This is your storefront. Invest accordingly.
                </p>
                <p className="mb-6">
                    If you are using AI tools or Canva, start with bestseller references and customize from there. Change the colors, adjust the typography, swap in different imagery. Never use stock templates exactly as they appear. Ten other authors have used that same template, and readers notice.
                </p>
                <div className="bg-red-950/20 p-6 rounded-lg border-l-4 border-red-500/50 mb-12">
                    <p className="font-bold text-red-300 mb-2 font-sans uppercase tracking-widest text-sm">Non-Negotiable Rule</p>
                    <p className="italic text-red-100/90">
                        Your cover must look professional. Amateur covers signal amateur content. Readers judge instantly. They assume poor production value means poor writing. Fair or not, that is reality. If your designer delivers something that looks DIY, push back or hire someone else.
                    </p>
                </div>
            </div>

            <div className="my-16">
                <h3 className="text-2xl font-bold text-gold mb-6 font-sans border-b border-white/10 pb-4">Back Cover and Metadata: The Details That Convert</h3>
                <p className="mb-6">
                    Your cover gets the click. Your back cover and Amazon description close the sale. These elements work together.
                </p>
                <p className="mb-8">
                    The back cover follows a specific structure. Start with a hook, two to three lines that create immediate intrigue or emotion. This is not a summary. This is a teaser. Think movie trailer, not book report.
                </p>
            </div>

            {/* Visual 3: Back Cover Anatomy */}
            <figure className="my-16">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                        src="/images/launch/back_cover_anatomy.png"
                        alt="Anatomy of a High-Converting Back Cover: Hook, Blurb, Bio, Social Proof"
                        className="w-full h-auto"
                    />
                </div>
                <figcaption className="text-center text-sm text-parchment/60 mt-4 font-sans italic">
                    Figure 3.3: The structural blueprint for closing the sale after the cover gets the click.
                </figcaption>
            </figure>

            <p className="mb-6">
                Example for romance: "She swore she'd never forgive him. Then he walked back into her life with an impossible request." That creates questions. Why does she need to forgive him? What is the request? What will happen?
            </p>
            <p className="mb-6">
                Example for thriller: "The police say her husband's death was an accident. She knows they're wrong. And she knows who's coming for her next." Instant tension. The reader wants to know what she knows.
            </p>
            <p className="mb-6">
                After the hook, you need a blurb of one hundred twenty to one hundred fifty words. This expands on the hook and establishes the core conflict or promise. For fiction, focus on emotion and stakes, not plot details. For non-fiction, focus on the transformation and the pain point you are solving.
            </p>
            <p className="mb-6">
                Keep paragraphs short, two to three lines each. Use white space. The back cover is scanned, not read carefully.
            </p>
            <p className="mb-6">
                Next comes your author bio, forty to sixty words max. Lead with credibility. "Rahul Sharma is a software engineer turned thriller writer based in Mumbai. His short fiction has appeared in three anthologies. He writes about technology, crime, and the dark side of ambition." See how that establishes authority without being pompous?
            </p>
            <p className="mb-6">
                Finally, if you have advance reviews or endorsements, include one or two of the strongest ones. Keep them short. "A gripping debut that kept me up all night" is better than three paragraphs of praise.
            </p>
            <p className="mb-6">
                Now let's talk Amazon metadata, the hidden text that determines whether readers ever see your book.
            </p>
            <p className="mb-6">
                You need to choose two categories. Amazon allows you to list your book in multiple categories, but you can only select two directly. Choose one broad category and one narrow category. The broad category gives you exposure. The narrow category gives you a realistic chance at ranking high.
            </p>
            <p className="mb-6">
                Example: If you wrote a contemporary romance, your broad category might be "Fiction &gt; Romance &gt; Contemporary." Your narrow category might be "Fiction &gt; Romance &gt; Workplace Romance" or "Fiction &gt; Romance &gt; New Adult &amp; College." The narrower category has fewer books competing, which means you can hit top ten or top twenty with solid launch momentum.
            </p>
            <p className="mb-6">
                Your seven keywords matter more than most authors realize. These are the terms readers type into Amazon search. You want a mix of broad and specific terms.
            </p>
            <p className="mb-6">
                Bad keywords: "best book," "good read," "must read." These are too generic and too competitive.
            </p>
            <p className="mb-6">
                Good keywords for romance: "second chance romance," "enemies to lovers India," "workplace romance Mumbai," "slow burn romance," "forced proximity," "Indian contemporary romance," "banter romance."
            </p>
            <p className="mb-6">
                See the difference? These are terms people actually search for. Use Amazon's autocomplete feature. Start typing your genre and see what suggestions populate. Those are real searches happening every day.
            </p>

            <div className="my-16 p-8 bg-green-900/20 border-l-4 border-green-500 rounded-r-xl">
                <h3 className="text-xl font-bold text-green-400 mb-4 font-sans uppercase tracking-widest">Quick Win</h3>
                <p className="text-green-100/90 italic">
                    Spend fifteen minutes on Amazon right now. Search for books similar to yours. Look at their categories and description keywords. Take notes. You are not copying; you are learning the language of your market.
                </p>
            </div>
        </div>
    );
};

export default LaunchChapterCoverPackaging;
