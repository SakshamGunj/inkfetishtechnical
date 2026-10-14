import type { Metadata } from 'next';
import { Suspense } from 'react';
import SubmitClient from './SubmitClient';

export const metadata: Metadata = {
  title: "Submit Your Entry | People's Choice Award 2026 | Inkfetish Publication",
  description: "Submit your poem, short story, or novel excerpt for the People's Choice Award 2026 by Inkfetish Publication. Official submission portal.",
  openGraph: {
    title: "Submit Your Entry | People's Choice Award 2026",
    description: "Submit your poem, short story, or novel excerpt for the People's Choice Award 2026 by Inkfetish Publication.",
    images: ["https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Submit Your Entry | People's Choice Award 2026",
    description: "Submit your poem, short story, or novel excerpt for the People's Choice Award 2026 by Inkfetish Publication.",
    images: ["https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png"],
  }
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
