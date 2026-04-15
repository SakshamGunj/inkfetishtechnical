import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Contact Us | Inkfetish Publication",
  description: "Get in touch with our editorial desk. Whether you're looking to publish, collaborate, or simply say hello, we're here to listen.",
  openGraph: {
    title: "Contact Us | Inkfetish Publication",
    description: "Connect with the Inkfetish editorial team.",
    url: "https://www.inkfetish.in/contact",
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
