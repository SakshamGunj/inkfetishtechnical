import { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'Secure Checkout | Bharat Pride Kit',
  description: 'Complete your order for the physical Bharat Pride Certificate and Premium Medal.',
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
