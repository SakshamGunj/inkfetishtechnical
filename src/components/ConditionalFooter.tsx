"use client";

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export function ConditionalFooter() {
  const pathname = usePathname() || '';
  
  // Hide the global footer on all Syaahi funnel pages
  if (pathname.startsWith('/anthology/syaahi')) {
    return null;
  }
  
  return <Footer />;
}
