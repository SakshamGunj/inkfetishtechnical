"use client";

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import PeopleChoiceFooter from './PeopleChoiceFooter';

export function ConditionalFooter() {
  const pathname = usePathname() || '';
  
  if (pathname.startsWith('/people-choice-award')) {
    return <PeopleChoiceFooter />;
  }

  // Hide the global footer on focused anthology funnel pages and poetry festival subpages
  if (
    pathname.startsWith('/anthology/syaahi') || 
    pathname.startsWith('/anthology/honey-and-hurt') ||
    pathname.startsWith('/anthology/the-margins') ||
    pathname.startsWith('/poetryfestival/s2') ||
    pathname.startsWith('/open-mic') ||
    pathname.startsWith('/shakespeare-award-v2') ||
    pathname.startsWith('/bharat-writes') ||
    pathname.startsWith('/daniya-khan') ||
    pathname.startsWith('/indian-writers-league-season-2') ||
    pathname.startsWith('/indianwritersleague/certificates') ||
    pathname.startsWith('/indian-writers-league/certificates') ||
    pathname.startsWith('/september-writing-contest') ||
    pathname.startsWith('/september-contest') ||
    pathname.startsWith('/autumn-poetry-hunt')
  ) {
    return null;
  }
  
  return <Footer />;
}
