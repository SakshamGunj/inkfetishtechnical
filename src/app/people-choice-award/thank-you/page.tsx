import { Metadata } from 'next';
import { Suspense } from 'react';
import ThankYouClient from './ThankYouClient';

export const metadata: Metadata = {
  title: "Nomination Confirmed | People's Choice Award 2026 | Inkfetish Publication",
  description: "Congratulations! Your nomination for the People's Choice Award 2026 is confirmed. Download your custom participant poster now.",
  openGraph: {
    title: "Nomination Confirmed | People's Choice Award 2026",
    description: "Proud Participant of People's Choice Award 2026 by Inkfetish Publication.",
    images: ["https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomination Confirmed | People's Choice Award 2026",
    description: "Proud Participant of People's Choice Award 2026 by Inkfetish Publication.",
    images: ["https://res.cloudinary.com/dde8ekuuu/image/upload/v1788291912/ChatGPT_Image_Sep_2_2026_01_13_09_AM_1_vb4vp2.png"],
  }
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070605] text-[#f3e5ab] flex items-center justify-center font-serif text-lg">
        Loading confirmation...
      </div>
    }>
      <ThankYouClient />
    </Suspense>
  );
}
