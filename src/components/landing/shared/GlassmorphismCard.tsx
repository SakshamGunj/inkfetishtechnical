import React from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: number;
  border?: boolean;
}

/**
 * GlassmorphismCard Component
 * 
 * Reusable card with backdrop blur and transparency effects.
 * Part of the Inkfetish design system.
 */
export function GlassmorphismCard({
  children,
  className,
  blur = 'md',
  opacity = 0.7,
  border = true
}: GlassmorphismCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  return (
    <div
      className={cn(
        // Base glassmorphism styles
        'rounded-lg',
        blurClasses[blur],
        border && 'border border-ink-900/10',
        'shadow-[0_8px_32px_rgba(15,15,15,0.04)]',
        // Custom className
        className
      )}
      style={{
        background: `rgba(253, 251, 247, ${opacity})`
      }}
    >
      {children}
    </div>
  );
}
