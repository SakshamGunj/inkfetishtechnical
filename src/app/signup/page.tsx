import { Metadata } from 'next';
import SignupClient from './SignupClient';

export const metadata: Metadata = {
  title: "Author Signup | Inkfetish Publication",
  description: "Provision your Authorverse Profile Database. Join the elite community of Inkfetish authors.",
  robots: "noindex, nofollow",
};

export default function SignupPage() {
  return <SignupClient />;
}
