'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AnthologyLandingPageData } from '@/lib/types/landing-page';

interface FAQSectionProps {
  data: AnthologyLandingPageData['faq'];
}

/**
 * FAQSection Component
 * 
 * Displays frequently asked questions with:
 * - Radix UI Accordion for accessibility
 * - 6-8 FAQ items with expandable answers
 * - Covers common objections and questions
 * - Clean, readable layout
 */
export function FAQSection({ data }: FAQSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      ref={ref}
      className="py-16 md:py-24 bg-white border-y border-ink-900/10"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#c5a059]/10 flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-[#c5a059]" strokeWidth={1.5} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-ink-900 mb-6 leading-tight">
            Questions? We've Got Answers
          </h2>
          <p className="text-lg md:text-xl font-sans text-ink-600">
            Everything you need to know before you order
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {data.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              >
                <AccordionItem 
                  value={item.id}
                  className="border border-ink-900/10 rounded-lg px-6 bg-[#FDFBF7]/50 backdrop-blur-sm"
                >
                  <AccordionTrigger className="text-left font-serif text-lg md:text-xl font-semibold text-ink-900 hover:text-[#c5a059] transition-colors py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base font-sans text-ink-700 leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-base font-sans text-ink-600">
            Still have questions?{' '}
            <a 
              href="mailto:support@inkfetish.com" 
              className="text-[#c5a059] hover:underline font-semibold"
            >
              Email us
            </a>
            {' '}and we'll respond within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
