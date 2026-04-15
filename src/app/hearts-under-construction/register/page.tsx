import { Metadata } from 'next';
import HeartsUnderConstructionRegister from '@/components/landing/HeartsUnderConstructionRegister';

export const metadata: Metadata = {
  title: 'Pre-Order Hearts Under Construction | Inkfetish',
  description: 'Secure your copy of Hearts Under Construction. Join 500+ readers on their healing journey. Limited first edition copies available.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegisterPage() {
  return <HeartsUnderConstructionRegister />;
}
