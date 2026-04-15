import React from 'react';
import Link from 'next/link';
import { GlassmorphismCard } from './GlassmorphismCard';
import { Author } from '@/lib/types/landing-page';
import { ExternalLink } from 'lucide-react';

interface AuthorCardProps extends Author {}

/**
 * AuthorCard Component
 * 
 * Displays contributing author information with:
 * - Author photo
 * - Name and bio
 * - Optional profile link
 */
export function AuthorCard({
  name,
  photo,
  bio,
  profileLink
}: AuthorCardProps) {
  const CardContent = (
    <GlassmorphismCard className="p-6 h-full flex flex-col items-center text-center group hover:shadow-lg transition-shadow duration-300">
      {/* Author Photo */}
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-ink-900/10 group-hover:border-[#c5a059]/30 transition-colors">
        <img
          src={photo}
          alt={`${name} - Contributing Author`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = '/images/placeholder-author.jpg';
          }}
        />
      </div>

      {/* Author Name */}
      <h3 className="font-serif text-xl font-bold text-ink-900 mb-2">
        {name}
      </h3>

      {/* Author Bio */}
      <p className="font-sans text-sm text-ink-600 leading-relaxed flex-grow">
        {bio}
      </p>

      {/* Profile Link Indicator */}
      {profileLink && (
        <div className="mt-4 flex items-center gap-2 text-[#c5a059] text-xs font-sans uppercase tracking-wider">
          <span>View Profile</span>
          <ExternalLink className="w-3 h-3" strokeWidth={2} />
        </div>
      )}
    </GlassmorphismCard>
  );

  // Wrap in Link if profileLink exists
  if (profileLink) {
    return (
      <Link href={profileLink} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
