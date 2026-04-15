import { AnthologyLandingPageData } from '@/lib/types/landing-page';

/**
 * Hearts Under Construction Landing Page Data
 * 
 * Conversion-focused copy following Alex Hormozi and Russell Brunson principles:
 * - Simple language (5th-grade reading level)
 * - Benefit-driven, not feature-driven
 * - Emotional storytelling
 * - Clear value proposition
 * - Multiple CTAs throughout
 */
export const heartsUnderConstructionData: AnthologyLandingPageData = {
  // SEO Metadata
  seo: {
    title: 'Hearts Under Construction - Poetry Anthology | Inkfetish',
    description: '40+ poets share their journey from heartbreak to healing. Real stories of rebuilding after loss. Pre-order your copy today.',
    ogImage: '/images/hearts-under-construction-og.jpg',
    keywords: [
      'poetry anthology',
      'heartbreak poetry',
      'healing poems',
      'emotional recovery',
      'love and loss',
      'Inkfetish',
      'contemporary poetry',
      'self-help poetry'
    ]
  },

  // Hero Section
  hero: {
    headline: 'Get Published in Hearts Under Construction',
    subheadline: 'Share your healing journey. Become a published co-author. Reach 200,000+ readers. 100% FREE to submit.',
    bookCover: {
      url: '/images/hearts-under-construction-cover.jpg',
      alt: 'Hearts Under Construction anthology book cover featuring a heart made of construction materials'
    },
    cta: {
      text: 'Submit Your Poem FREE →',
      action: 'pre-order',
      link: '/hearts-under-construction/register'
    }
  },

  // Problem/Agitation Section
  problemAgitation: {
    heading: 'You Have a Story Worth Sharing',
    paragraphs: [
      'You\'ve been through heartbreak. You\'ve felt the pain. You\'ve started rebuilding.',
      'Your words could help someone else who\'s exactly where you were.',
      'But you think: "I\'m not a real writer. Who would want to read my story?"',
      'Here\'s the truth: The most powerful stories come from real people, not professional poets.'
    ],
    emotionalTriggers: [
      'Your story matters',
      'You don\'t need to be a "professional"',
      'Real experiences resonate more than perfect poetry',
      'Someone needs to hear your voice'
    ]
  },

  // Solution Section
  solution: {
    heading: 'Here\'s What You Get as a Co-Author',
    benefits: [
      'Get PUBLISHED in a real anthology with ISBN and distribution',
      'Receive 3 FREE author copies (worth ₹1,497) shipped to your door',
      'Your name in print forever - "Published Co-Author" status',
      'Reach 200,000+ readers through Inkfetish\'s massive community',
      'Get your own author profile page on our website',
      'We promote YOU on social media to our 200k+ followers'
    ],
    cta: {
      text: 'Submit Your Poem FREE →',
      action: 'pre-order',
      link: '/hearts-under-construction/register'
    }
  },

  // Social Proof
  socialProof: {
    testimonials: [
      {
        id: 'test-1',
        quote: 'I never thought I\'d be a published author. Inkfetish made it happen. Now I have 3 copies of MY book with MY name on it!',
        authorName: 'Priya M.',
        rating: 5,
        verified: true
      },
      {
        id: 'test-2',
        quote: 'From writing in my diary to being published alongside 41 other poets. This changed my life.',
        authorName: 'Rahul K.',
        rating: 5,
        verified: true
      },
      {
        id: 'test-3',
        quote: 'The submission process was so easy. Within 2 days, I got accepted. Now I\'m a PUBLISHED POET!',
        authorName: 'Ananya S.',
        rating: 5,
        verified: true
      },
      {
        id: 'test-4',
        quote: 'They promoted my work to 200,000 people. I gained 500+ Instagram followers from this one anthology.',
        authorName: 'Vikram D.',
        rating: 5,
        verified: true
      }
    ],
    authorCount: 42,
    communitySize: '200,000+',
    trustSignals: [
      '100% FREE to submit - no hidden fees',
      'Published by Inkfetish - 40+ anthologies',
      'Real ISBN and distribution',
      'Response within 48 hours'
    ]
  },

  // Content Preview
  contentPreview: {
    excerpts: [
      {
        id: 'excerpt-1',
        title: 'Demolition Day',
        content: 'They say home is where the heart is,\nbut what happens when your heart\nbecomes a construction site?\n\nI am learning to love\nthe sound of hammers,\nthe dust of old foundations,\nthe blueprint of something new.\n\nThis is not destruction.\nThis is renovation.',
        authorName: 'Meera Patel'
      },
      {
        id: 'excerpt-2',
        title: 'Blueprints',
        content: 'I thought love was the architecture,\nbut I was wrong.\n\nLove is the architect.\nYou are the blueprint.\nAnd I am learning\nto build myself\nfrom scratch.',
        authorName: 'Arjun Mehta'
      },
      {
        id: 'excerpt-3',
        title: 'Under Construction',
        content: 'Forgive the mess.\nI am rebuilding.\n\nForgive the noise.\nI am healing.\n\nForgive the dust.\nI am becoming.',
        authorName: 'Kavya Sharma'
      }
    ]
  },

  // Author Showcase
  authors: [
    {
      id: 'author-1',
      name: 'Meera Patel',
      photo: '/images/placeholder-author.jpg',
      bio: 'Poet and architect who writes about rebuilding after loss. Featured in 5 anthologies.'
    },
    {
      id: 'author-2',
      name: 'Arjun Mehta',
      photo: '/images/placeholder-author.jpg',
      bio: 'Storyteller exploring themes of love, loss, and reconstruction through verse.'
    },
    {
      id: 'author-3',
      name: 'Kavya Sharma',
      photo: '/images/placeholder-author.jpg',
      bio: 'Writer and therapist combining psychology with poetry for emotional healing.'
    },
    {
      id: 'author-4',
      name: 'Rohan Desai',
      photo: '/images/placeholder-author.jpg',
      bio: 'Contemporary poet known for raw, honest explorations of heartbreak and hope.'
    },
    {
      id: 'author-5',
      name: 'Aisha Khan',
      photo: '/images/placeholder-author.jpg',
      bio: 'Award-winning poet whose work focuses on resilience and self-discovery.'
    },
    {
      id: 'author-6',
      name: 'Vikram Singh',
      photo: '/images/placeholder-author.jpg',
      bio: 'Spoken word artist and writer exploring masculinity, vulnerability, and healing.'
    }
  ],

  // Value Stack
  valueStack: {
    items: [
      {
        id: 'item-1',
        title: 'Published Co-Author Status',
        description: 'Your name in a real book with ISBN. Forever.',
        value: 0,
        icon: 'book'
      },
      {
        id: 'item-2',
        title: '3 FREE Author Copies',
        description: 'Physical books shipped to you. Show your family, friends, everyone.',
        value: 1497,
        icon: 'book'
      },
      {
        id: 'item-3',
        title: 'Reach 200,000+ Readers',
        description: 'Your work promoted to Inkfetish\'s massive community.',
        value: 999,
        icon: 'users'
      },
      {
        id: 'item-4',
        title: 'Author Profile Page',
        description: 'Your own page on Inkfetish.com with your bio and work.',
        value: 499,
        icon: 'pen'
      },
      {
        id: 'item-5',
        title: 'Social Media Promotion',
        description: 'We feature YOU on Instagram to 200k+ followers.',
        value: 999,
        icon: 'music'
      }
    ],
    totalValue: 3994,
    actualPrice: 0,
    savings: 3994,
    cta: {
      text: 'Submit Your Poem FREE →',
      action: 'pre-order',
      link: '/hearts-under-construction/register'
    }
  },

  // Scarcity (optional - can be enabled for limited offers)
  scarcity: {
    type: 'inventory',
    remainingQuantity: 8,
    message: 'Only 8 co-author spots left! 34 poets already accepted. Don\'t miss your chance.'
  },

  // Guarantee
  guarantee: {
    heading: 'Zero Risk. 100% FREE Submission',
    description: 'Submit your poem today. If we accept it, you get published. If we don\'t, you lose nothing. There are NO fees, NO costs, NO catches. Just submit and see what happens.',
    terms: [
      '100% FREE to submit - no payment required',
      'Response within 48 hours',
      'If accepted: 3 FREE author copies',
      'No hidden fees or costs ever'
    ],
    badges: [
      'FREE Submission',
      'Fast Response',
      'Trusted by 200k+ Writers'
    ]
  },

  // FAQ
  faq: [
    {
      id: 'faq-1',
      question: 'Do I have to pay anything to submit?',
      answer: 'NO. Submission is 100% FREE. If your poem is accepted, you get published for FREE and receive 3 FREE author copies. There are zero costs, zero fees, zero catches.'
    },
    {
      id: 'faq-2',
      question: 'I\'m not a "real" writer. Can I still submit?',
      answer: 'YES! We want real stories from real people. You don\'t need a degree, awards, or previous publications. If you\'ve experienced heartbreak and healing, your story matters.'
    },
    {
      id: 'faq-3',
      question: 'How long does the review process take?',
      answer: 'We review all submissions within 48 hours. You\'ll get an email letting you know if your poem was accepted. Fast, simple, no waiting weeks.'
    },
    {
      id: 'faq-4',
      question: 'What if my poem gets rejected?',
      answer: 'You lose nothing. It\'s FREE to submit. If we don\'t accept it this time, you can submit to our next anthology. No fees, no penalties, no problem.'
    },
    {
      id: 'faq-5',
      question: 'What do I get if I\'m accepted?',
      answer: 'You become a PUBLISHED CO-AUTHOR. You get: (1) Your name in a real book with ISBN, (2) 3 FREE physical copies shipped to you, (3) Author profile on our website, (4) Promotion to 200,000+ readers, (5) Social media features.'
    },
    {
      id: 'faq-6',
      question: 'How many poems can I submit?',
      answer: 'Submit ONE poem for Hearts Under Construction. Keep it under 500 words. Theme: heartbreak, healing, and reconstruction. Make it real, raw, and honest.'
    },
    {
      id: 'faq-7',
      question: 'When will the book be published?',
      answer: 'The anthology will be published 4-6 weeks after we close submissions. You\'ll receive your 3 FREE author copies by mail. Digital promotion starts immediately.'
    },
    {
      id: 'faq-8',
      question: 'Can I buy extra copies for family/friends?',
      answer: 'Yes! Once published, you can order additional copies at author discount pricing. But you get 3 copies FREE automatically when you\'re accepted.'
    }
  ],

  // Final CTA
  finalCTA: {
    heading: 'Your Story Deserves to Be Heard',
    subheading: 'Join 34 poets who are already published. Only 8 spots left. Submit your poem FREE today and become a published co-author.',
    cta: {
      text: 'Submit Your Poem FREE →',
      action: 'pre-order',
      link: '/hearts-under-construction/register'
    },
    trustSignals: [
      '🆓 100% FREE Submission',
      '⚡ Response in 48 Hours',
      '📚 3 FREE Author Copies',
      '👥 Reach 200,000+ Readers'
    ]
  }
};
