'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll depth tracking hook
 * 
 * Tracks user scroll depth at 25%, 50%, 75%, and 100% milestones.
 * Fires analytics events to Google Analytics and Vercel Analytics.
 * Each milestone fires exactly once per page load.
 * 
 * **Validates: Requirements 7.1-7.6, 11.6**
 * 
 * @param pagePath - The page path for analytics tracking (e.g., '/anthologies')
 */
export function useScrollTracking(pagePath: string) {
  const trackedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      // Calculate scroll percentage
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (window.scrollY / scrollHeight) * 100;

      // Check each milestone
      for (const milestone of milestones) {
        // If we've reached this milestone and haven't tracked it yet
        if (scrollPercentage >= milestone && !trackedMilestones.current.has(milestone)) {
          // Mark as tracked
          trackedMilestones.current.add(milestone);

          // Fire Google Analytics event (if available)
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'scroll_depth', {
              percentage: milestone,
              page_path: pagePath
            });
          }

          // Fire Vercel Analytics event (if available)
          if (typeof window !== 'undefined' && (window as any).va) {
            (window as any).va('track', 'Scroll Depth', {
              percentage: milestone,
              page_path: pagePath
            });
          }

          // Console log for development
          if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] Scroll depth: ${milestone}% on ${pagePath}`);
          }
        }
      }
    };

    // Attach scroll listener with passive flag for performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pagePath]);
}

/**
 * Utility function to manually track a scroll event
 * Useful for testing or custom scroll tracking scenarios
 * 
 * @param percentage - The scroll percentage to track
 * @param pagePath - The page path for analytics
 */
export function trackScrollEvent(percentage: number, pagePath: string) {
  // Fire Google Analytics event (if available)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'scroll_depth', {
      percentage,
      page_path: pagePath
    });
  }

  // Fire Vercel Analytics event (if available)
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', 'Scroll Depth', {
      percentage,
      page_path: pagePath
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] Manual scroll track: ${percentage}% on ${pagePath}`);
  }
}
