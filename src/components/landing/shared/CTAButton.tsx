'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  text: string;
  action: 'pre-order' | 'buy-now' | 'waitlist';
  link: string;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'large';
  className?: string;
  showArrow?: boolean;
}

/**
 * CTAButton Component
 * 
 * Conversion-optimized call-to-action button with:
 * - Link validation with fallback
 * - Framer Motion hover/tap animations
 * - Minimum 44px height for mobile accessibility
 * - Primary and secondary variants
 */
export function CTAButton({
  text,
  action,
  link,
  variant = 'primary',
  size = 'default',
  className,
  showArrow = true
}: CTAButtonProps) {
  // Validate link - fallback to '#' if invalid
  const validateLink = (url: string): string => {
    if (!url || url.trim() === '') {
      console.error('Invalid CTA link provided');
      return '#';
    }
    return url;
  };

  const validatedLink = validateLink(link);

  const baseStyles = cn(
    // Base styles
    'inline-flex items-center justify-center gap-3',
    'font-sans uppercase tracking-[0.2em]',
    'transition-all duration-300',
    'rounded-none',
    // Accessibility - minimum touch target
    'min-h-[44px]',
    // Size variants
    size === 'default' && 'px-8 py-3 text-xs md:text-sm',
    size === 'large' && 'px-10 py-4 text-sm md:text-base',
    // Variant styles
    variant === 'primary' && 'bg-ink-900 text-[#FDFBF7] border border-ink-900 hover:bg-[#c5a059] hover:text-ink-900 hover:border-[#c5a059]',
    variant === 'secondary' && 'bg-transparent text-ink-900 border border-ink-900/30 hover:bg-ink-900/5 hover:border-ink-900',
    // Custom className
    className
  );

  return (
    <Link href={validatedLink} className="inline-block">
      <motion.button
        className={baseStyles}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 10px 40px rgba(15, 15, 15, 0.15)'
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ 
          type: 'spring',
          stiffness: 400,
          damping: 17
        }}
        aria-label={text || `${action} anthology`}
      >
        <span>{text}</span>
        {showArrow && (
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
}
