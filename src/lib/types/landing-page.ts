// TypeScript interfaces for anthology landing page data models

export interface CTAConfig {
  text: string;
  action: 'pre-order' | 'buy-now' | 'waitlist';
  link: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorPhoto?: string;
  rating?: number;
  verified: boolean;
}

export interface ContentExcerpt {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorId?: string;
}

export interface Author {
  id: string;
  name: string;
  photo: string;
  bio: string;
  profileLink?: string;
}

export interface ValueStackItem {
  id: string;
  title: string;
  description: string;
  value: number;
  icon?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ScarcityConfig {
  type: 'countdown' | 'inventory' | 'both';
  endDate?: string;
  remainingQuantity?: number;
  message: string;
}

export interface AnthologyLandingPageData {
  // Meta Information
  seo: {
    title: string;
    description: string;
    ogImage: string;
    keywords: string[];
  };

  // Hero Section
  hero: {
    headline: string;
    subheadline: string;
    bookCover: {
      url: string;
      alt: string;
    };
    cta: CTAConfig;
  };

  // Problem/Agitation Section
  problemAgitation: {
    heading: string;
    paragraphs: string[];
    emotionalTriggers: string[];
  };

  // Solution Section
  solution: {
    heading: string;
    benefits: string[];
    cta: CTAConfig;
  };

  // Social Proof
  socialProof: {
    testimonials: Testimonial[];
    authorCount: number;
    communitySize: string;
    trustSignals: string[];
  };

  // Content Preview
  contentPreview: {
    excerpts: ContentExcerpt[];
  };

  // Author Showcase
  authors: Author[];

  // Value Stack
  valueStack: {
    items: ValueStackItem[];
    totalValue: number;
    actualPrice: number;
    savings: number;
    cta: CTAConfig;
  };

  // Scarcity
  scarcity?: ScarcityConfig;

  // Guarantee
  guarantee: {
    heading: string;
    description: string;
    terms: string[];
    badges: string[];
  };

  // FAQ
  faq: FAQItem[];

  // Final CTA
  finalCTA: {
    heading: string;
    subheading: string;
    cta: CTAConfig;
    trustSignals: string[];
  };
}
