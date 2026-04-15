import React from 'react';
import { BookOpen, Mic, PenTool, Users, Music, Check } from 'lucide-react';
import { ValueStackItem as ValueStackItemType } from '@/lib/types/landing-page';

interface ValueStackItemProps extends ValueStackItemType {}

/**
 * ValueStackItem Component
 * 
 * Displays individual items in the value stack with:
 * - Title and description
 * - Value amount (formatted as currency)
 * - Optional icon
 */
export function ValueStackItem({
  title,
  description,
  value,
  icon
}: ValueStackItemProps) {
  // Icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    book: <BookOpen className="w-6 h-6" strokeWidth={1.5} />,
    mic: <Mic className="w-6 h-6" strokeWidth={1.5} />,
    pen: <PenTool className="w-6 h-6" strokeWidth={1.5} />,
    users: <Users className="w-6 h-6" strokeWidth={1.5} />,
    music: <Music className="w-6 h-6" strokeWidth={1.5} />,
    check: <Check className="w-6 h-6" strokeWidth={1.5} />
  };

  const iconElement = icon ? iconMap[icon] : <Check className="w-6 h-6" strokeWidth={1.5} />;

  return (
    <div className="flex items-start gap-4 py-4 border-b border-ink-900/10 last:border-b-0">
      {/* Icon */}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
        {iconElement}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="font-serif text-lg font-bold text-ink-900 mb-1">
          {title}
        </h4>
        <p className="font-sans text-sm text-ink-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Value */}
      <div className="flex-shrink-0 text-right">
        <p className="font-sans text-lg font-bold text-ink-900">
          ₹{value}
        </p>
        <p className="font-sans text-xs text-ink-500">Value</p>
      </div>
    </div>
  );
}
