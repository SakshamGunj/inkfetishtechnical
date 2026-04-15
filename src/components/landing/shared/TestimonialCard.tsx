import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { GlassmorphismCard } from './GlassmorphismCard';
import { Testimonial } from '@/lib/types/landing-page';

interface TestimonialCardProps extends Testimonial {}

/**
 * TestimonialCard Component
 * 
 * Displays reader testimonials with:
 * - Quote text
 * - Author name and optional photo
 * - Star rating
 * - Verified badge
 */
export function TestimonialCard({
  quote,
  authorName,
  authorPhoto,
  rating,
  verified
}: TestimonialCardProps) {
  return (
    <GlassmorphismCard className="p-6 h-full flex flex-col">
      {/* Rating Stars */}
      {rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? 'fill-[#c5a059] text-[#c5a059]'
                  : 'fill-none text-ink-900/20'
              }`}
              strokeWidth={1.5}
            />
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="text-ink-900 font-serif text-base md:text-lg leading-relaxed mb-6 flex-grow">
        "{quote}"
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center gap-3 mt-auto">
        {authorPhoto && (
          <div className="w-10 h-10 rounded-full overflow-hidden bg-ink-900/5">
            <img
              src={authorPhoto}
              alt={authorName}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-sans text-sm font-medium text-ink-900">
              {authorName}
            </p>
            {verified && (
              <CheckCircle className="w-4 h-4 text-[#c5a059]" strokeWidth={2} />
            )}
          </div>
          {verified && (
            <p className="font-sans text-xs text-ink-600">Verified Reader</p>
          )}
        </div>
      </div>
    </GlassmorphismCard>
  );
}
