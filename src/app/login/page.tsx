import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: "Author Login | Inkfetish Publication",
  description: "Secure access to the Inkfetish Author Portfolio Center. Manage your literary legacy.",
  robots: "noindex, nofollow", // Keep login pages out of search but allow internal navigation
};

export default function LoginPage() {
  return <LoginClient />;
}
