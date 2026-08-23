import { Metadata } from 'next';
import Season2Client from './Season2Client';

export const metadata: Metadata = {
  title: "Indian Writers League | Season 2: The Evolution",
  description: "Join India's most prestigious writing contest. The Evolution brings bigger prizes, premium publishing opportunities, and nationwide recognition.",
  openGraph: {
    title: "Indian Writers League | Season 2: The Evolution",
    description: "Join India's most prestigious writing contest. Over 2 Lakh+ writers competing for glory.",
    type: "website",
  }
};

export default function IndianWritersLeagueSeason2() {
  return (
    <main>
      <Season2Client />
    </main>
  );
}
