import type { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard — Poetry Festival Season 2 | Inkfetish',
  description: 'Admin dashboard for viewing and printing Poetry Festival Season 2 submissions.',
};

export default function PoetryAdminPage() {
  return <AdminClient />;
}
