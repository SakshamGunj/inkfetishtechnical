import type { Metadata } from 'next';
import { Suspense } from 'react';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
  title: "Official Registration Portal | People's Choice Award 2026 | Inkfetish Publication",
  description: "Register your nomination for the People's Choice Award 2026. Decided by 200,000+ readers. Free solo book publication, awards, and national recognition.",
  openGraph: {
    title: "Official Registration Portal | People's Choice Award 2026",
    description: "Register your nomination for the People's Choice Award 2026 by Inkfetish Publication.",
    url: "https://www.inkfetish.in/people-choice-award/register",
    images: [
      {
        url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png",
        width: 1080,
        height: 1080,
        alt: "Registration Portal - People's Choice Award",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Registration Portal | People's Choice Award 2026",
    description: "Register your nomination for the People's Choice Award 2026 by Inkfetish Publication.",
    images: ["https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png"],
  }
};

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070605] text-[#f3e5ab] flex items-center justify-center font-serif text-lg">
        Loading registration portal...
      </div>
    }>
      <RegisterClient />
    </Suspense>
  );
}
