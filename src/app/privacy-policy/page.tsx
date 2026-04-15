'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7]">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-ink-600 mb-12 font-sans font-light italic">
            Last updated: April 10, 2026
          </p>

          <div className="space-y-12 font-sans font-light text-ink-800 leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-4 tracking-tight">1. Introduction</h2>
              <p>
                At Inkfetish Publication ("we," "us," or "our"), we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website (the "Website") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
              </p>
            </section>

             <section>
              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-4 tracking-tight">2. Information We Collect</h2>
              <p>We collect several types of information from and about users of our Website, including:</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li><strong>Personal identification information:</strong> Name, email address, postal address (for physical book distributions), and phone number.</li>
                <li><strong>Work-related information:</strong> Manuscripts, poetry, short stories, and other literary submissions included in our anthologies.</li>
                <li><strong>Usage Details:</strong> IP addresses, browser info, and interaction patterns with our submissions engine.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-4 tracking-tight">3. How We Use Your Information</h2>
              <p>We use information that we collect about you or that you provide to us:</p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>To present our Website and its contents to you.</li>
                <li>To manage and process your anthology submissions.</li>
                <li>To communicate with you regarding your publication status.</li>
                <li>To ship physical copies of books to co-authors.</li>
                <li>To provide you with information, products, or services that you request from us.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-4 tracking-tight">4. Intellectual Property</h2>
              <p>
                As a publication house, we treat your literary work with the highest confidentiality during the review process. Rights for publication are granted based on individual anthology agreements. We do not claim ownership of your work unless explicitly stated in a specific publishing contract.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-ink-900 mb-4 tracking-tight">5. Contact Information</h2>
              <p>
                To ask questions or comment about this privacy policy and our privacy practices, contact us at: <br/>
                <span className="font-bold text-black mt-2 inline-block">hello@inkfetish.in</span>
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
