'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Package, AlertCircle } from 'lucide-react';
import { ScarcityConfig } from '@/lib/types/landing-page';

interface ScarcityTriggerProps extends ScarcityConfig {}

/**
 * ScarcityTrigger Component
 * 
 * Displays time-sensitive or inventory-limited offers with:
 * - Countdown timer (real-time updates)
 * - Inventory display
 * - Contrasting gold color for attention
 * - Graceful handling of expired countdowns
 */
export function ScarcityTrigger({
  type,
  endDate,
  remainingQuantity,
  message
}: ScarcityTriggerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (type === 'countdown' || type === 'both') {
      if (!endDate) return;

      const calculateTimeLeft = () => {
        const end = new Date(endDate).getTime();
        const now = new Date().getTime();
        const difference = end - now;

        if (difference <= 0) {
          setIsExpired(true);
          return '';
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (days > 0) {
          return `${days}d ${hours}h ${minutes}m`;
        }
        return `${hours}h ${minutes}m ${seconds}s`;
      };

      // Initial calculation
      setTimeLeft(calculateTimeLeft());

      // Update every second
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [type, endDate]);

  // Don't render if countdown is expired
  if (isExpired) return null;

  // Don't render if inventory type but no quantity
  if (type === 'inventory' && !remainingQuantity) return null;

  return (
    <div className="bg-[#c5a059] text-ink-900 px-6 py-4 rounded-lg flex items-center justify-center gap-3 shadow-lg">
      {/* Icon */}
      <div className="flex-shrink-0">
        {type === 'countdown' && <Clock className="w-5 h-5" strokeWidth={2} />}
        {type === 'inventory' && <Package className="w-5 h-5" strokeWidth={2} />}
        {type === 'both' && <AlertCircle className="w-5 h-5" strokeWidth={2} />}
      </div>

      {/* Message and Details */}
      <div className="flex-1 text-center">
        <p className="font-sans font-bold text-sm md:text-base uppercase tracking-wide">
          {message}
        </p>
        
        {/* Countdown Display */}
        {(type === 'countdown' || type === 'both') && timeLeft && (
          <p className="font-mono text-lg md:text-xl font-bold mt-1">
            {timeLeft}
          </p>
        )}

        {/* Inventory Display */}
        {(type === 'inventory' || type === 'both') && remainingQuantity !== undefined && (
          <p className="font-sans text-sm md:text-base font-semibold mt-1">
            Only {remainingQuantity} left!
          </p>
        )}
      </div>
    </div>
  );
}
