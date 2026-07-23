import AdminClient from './AdminClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Submissions | Honey & Hurt',
  description: 'View and download submissions for Honey & Hurt Anthology.',
};

export default function AdminSubmissionsPage() {
  return <AdminClient />;
}
