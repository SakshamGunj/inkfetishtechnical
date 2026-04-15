import { Metadata } from 'next';
import HeartsUnderConstructionLanding from '@/components/landing/HeartsUnderConstructionLanding';

/**
 * Hearts Under Construction Landing Page
 * Primary route: /hearts-under-construction
 * 
 * High-converting sales page for the Hearts Under Construction anthology.
 * Features conversion-focused design following Alex Hormozi and Russell Brunson principles.
 */

export const metadata: Metadata = {
  title: 'Hearts Under Construction - Poetry Anthology | Inkfetish',
  description: '40+ poets share their journey from heartbreak to healing. Real stories of rebuilding after loss. Pre-order your copy today and get instant digital bonuses.',
  keywords: [
    'poetry anthology',
    'heartbreak poetry',
    'healing poems',
    'emotional recovery',
    'love and loss',
    'Inkfetish',
    'contemporary poetry',
    'self-help poetry',
    'Indian poetry',
    'healing journey'
  ],
  authors: [{ name: 'Inkfetish Publication' }],
  openGraph: {
    title: 'Hearts Under Construction - Poetry Anthology',
    description: '40+ poets share their journey from heartbreak to healing. Find your story in theirs.',
    images: [
      {
        url: '/images/hearts-under-construction-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Hearts Under Construction anthology book cover'
      }
    ],
    type: 'website',
    siteName: 'Inkfetish Publication',
    locale: 'en_IN'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hearts Under Construction - Poetry Anthology',
    description: '40+ poets share their journey from heartbreak to healing.',
    images: ['/images/hearts-under-construction-og.jpg'],
    creator: '@inkfetish'
  },
  alternates: {
    canonical: 'https://inkfetish.com/hearts-under-construction'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HeartsUnderConstructionPage() {
  return (
    <>
      {/* Structured Data for Book Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Book',
            name: 'Hearts Under Construction',
            author: {
              '@type': 'Organization',
              name: 'Inkfetish Publication',
              url: 'https://inkfetish.com'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Inkfetish Publication',
              logo: {
                '@type': 'ImageObject',
                url: 'https://inkfetish.com/images/inkfetish_logo.png'
              }
            },
            description: '40+ poets and storytellers share their journey from heartbreak to healing. A collection of raw, honest poetry about reconstruction and hope.',
            bookFormat: 'https://schema.org/Paperback',
            inLanguage: 'en',
            numberOfPages: 200,
            genre: ['Poetry', 'Self-Help', 'Anthology'],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '500',
              bestRating: '5',
              worstRating: '1'
            },
            offers: {
              '@type': 'Offer',
              price: '499',
              priceCurrency: 'INR',
              availability: 'https://schema.org/PreOrder',
              url: 'https://inkfetish.com/hearts-under-construction',
              priceValidUntil: '2026-12-31',
              seller: {
                '@type': 'Organization',
                name: 'Inkfetish Publication'
              }
            },
            review: [
              {
                '@type': 'Review',
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: '5'
                },
                author: {
                  '@type': 'Person',
                  name: 'Priya M.'
                },
                reviewBody: 'I cried reading the first poem. By the last page, I was smiling. This book saved me during my darkest time.'
              }
            ]
          })
        }}
      />
      
      <HeartsUnderConstructionLanding />
    </>
  );
}
