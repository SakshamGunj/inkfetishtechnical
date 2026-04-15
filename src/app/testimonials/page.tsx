import { Metadata } from 'next';
import TestimonialsClient from './TestimonialsClient';

export const metadata: Metadata = {
  title: "Testimonials | Voices of the Inkfetish Community",
  description: "Real success stories from published authors and contest winners. Discover how Inkfetish transformed their creative journeys.",
  openGraph: {
    title: "Testimonials | Author Success Stories | Inkfetish",
    description: "Read the dispatch from our global community of writers and poets.",
    url: "https://www.inkfetish.in/testimonials",
  },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
