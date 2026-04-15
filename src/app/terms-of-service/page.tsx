'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Terms of Service</h1>
          <p className="text-xl text-ink-600 mb-12 font-sans font-light italic">
            Effective Date: April 10, 2026
          </p>

          <div className="space-y-12 font-sans font-light text-ink-800 leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-4 tracking-tight">1. Terms of Use</h2>
              <p>
                By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-4 tracking-tight">2. Submission Rights</h2>
              <p>
                When you submit literary work (manuscripts, poetry, fiction) through the Inkfetish Submission Engine:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>You acknowledge that the work is your original creation.</li>
                <li>You maintain ownership of your intellectual property.</li>
                <li>You grant Inkfetish Publication a limited, non-exclusive license to review and, if accepted, publish the work in the specific anthology or collection for which it was submitted.</li>
                <li>Rights for digital and physical distribution will be detailed in the specific "Author Agreement" provided upon acceptance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-4 tracking-tight">3. Community Standards</h2>
              <p>
                The Inkfetish community thrives on professional excellence. We reserve the right to disqualify submissions or revoke access to community tools if a user engages in plagiarism, harassment, or behavior that undermines the Inkfetish brand's integrity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-4 tracking-tight">4. Disclaimer</h2>
              <p>
                The materials on Inkfetish Publication's website are provided "as is". Inkfetish Publication makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-4 tracking-tight">5. Governing Law</h2>
              <p>
                Any claim relating to Inkfetish Publication's website shall be governed by the laws of India without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
