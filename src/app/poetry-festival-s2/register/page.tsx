import type { Metadata } from 'next';
import PoetryFestivalRegisterClient from './RegisterClient';

export const metadata: Metadata = {
  title: 'Register — Poetry Festival Season 2 | Inkfetish',
  description: 'Secure your seat in Poetry Festival Season 2. Get published in a real printed anthology, win cash prizes and national recognition. Only 250 spots available.',
};

export default function PoetryFestivalRegisterPage() {
  return <PoetryFestivalRegisterClient />;
}
