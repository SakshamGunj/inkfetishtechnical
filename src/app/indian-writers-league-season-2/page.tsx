import { Metadata } from 'next';
import Season2Client from './Season2Client';

export const metadata: Metadata = {
  title: "Indian Writers League | Season 2: The Evolution",
  description: "Join India's most prestigious writing contest. The Evolution brings bigger prizes, premium publishing opportunities, and nationwide recognition.",
  openGraph: {
    title: "Indian Writers League | Season 2: The Evolution",
    description: "Join India's most prestigious writing contest. The Evolution brings bigger prizes, premium publishing opportunities, and nationwide recognition. Over 2 Lakh+ writers competing for glory.",
    type: "website",
    url: "https://inkfetish.in/indian-writers-league-season-2",
    images: [
      {
        url: "https://inkfetish.in/images/iwl-season-2-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Indian Writers League Season 2: The Evolution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Writers League | Season 2: The Evolution",
    description: "Join India's most prestigious writing contest. The Evolution brings bigger prizes, premium publishing opportunities, and nationwide recognition.",
    images: ["https://inkfetish.in/images/iwl-season-2-preview.jpg"],
  }
};

export default function IndianWritersLeagueSeason2() {
  return (
    <main>
      <Season2Client />
    </main>
  );
}
