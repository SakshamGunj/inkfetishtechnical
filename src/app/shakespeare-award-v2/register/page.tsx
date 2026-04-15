import { Metadata } from 'next';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
  title: 'Secure Checkout | Shakespeare Poetry Award Vol. 2',
  description: 'Complete your registration to claim your seat in the Shakespeare Poetry Award Volume 2.',
  openGraph: {
    title: 'Secure Checkout | Shakespeare Poetry Award Vol. 2',
    description: 'Claim your seat and become a formally published poet in the Shakespeare Anthology.',
  }
};

export default function RegisterPage() {
  return <RegisterClient />;
}
