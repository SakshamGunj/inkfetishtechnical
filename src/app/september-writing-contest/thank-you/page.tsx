import { Metadata } from 'next';
import SeptemberThankYouClient from './SeptemberThankYouClient';

export const metadata: Metadata = {
  title: 'Entry Received! | September Writing Competition | Inkfetish',
  description: 'Your entry for the September Writing Competition has been received.',
  robots: { index: false, follow: false },
};

export default function SeptemberThankYouPage() {
  return <SeptemberThankYouClient />;
}
