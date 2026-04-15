import { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: "Author Dashboard | Inkfetish Publication",
  description: "Secure command center for managing your author portfolio, books, and literary archives.",
  robots: "noindex, nofollow",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
