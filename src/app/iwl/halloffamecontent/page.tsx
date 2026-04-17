import { Metadata } from 'next';
import HallOfFameClient from './HallOfFameClient';

export const metadata: Metadata = {
  title: "Hall of Fame | IWL Submissions | Inkfetish",
  description: "Explore the celebrated writers and poets of the Indian Writers League Hall of Fame.",
};

export default function HallOfFamePage() {
  return <HallOfFameClient />;
}
