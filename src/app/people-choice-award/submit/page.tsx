import type { Metadata } from 'next';
import { Suspense } from 'react';
import SubmitClient from './SubmitClient';

export const metadata: Metadata = {
  title: "Submit Your Entry | People's Choice Award 2026 | Inkfetish Publication",
  description: "Submit your poem, short story, or novel excerpt for the People's Choice Award 2026 by Inkfetish Publication. Official submission portal.",
};

export default function SubmitPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070605] text-[#f3e5ab] flex items-center justify-center font-serif text-lg">
        Loading submission portal...
      </div>
    }>
      <SubmitClient />
    </Suspense>
  );
}
