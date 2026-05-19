"use client";

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname() || '';
  
  // Hide the global footer on focused anthology funnel pages
  if (pathname.startsWith('/anthology/syaahi') || pathname.startsWith('/anthology/honey-and-hurt')) {
    return null;
  }
  
  return <Footer />;
}
