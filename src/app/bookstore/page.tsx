import { Metadata } from 'next';
import BookstoreClient from './BookstoreClient';

export const metadata: Metadata = {
  title: "Bookstore Dashboard | All Inkfetish Imprints",
  description: "Browse the official collection of books produced by Inkfetish Publication. From cinematic fantasy to world-class anthologies.",
  openGraph: {
    title: "Inkfetish Bookstore | Elite Digital Shelf",
    description: "Featured imprints, bestselling authors, and the stories that define our generation.",
    url: "https://www.inkfetish.in/bookstore",
  },
};

export default function BookstorePage() {
  return <BookstoreClient />;
}
