import React from 'react';
import BharatWritesCertificateClient from './BharatWritesCertificateClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certificate Redemption | Bharat Writes | Inkfetish Publication',
  description: 'Download your Bharat Writes National Independence Poetry Contest certificate.',
};

export default function BharatWritesCertificatePage() {
  return <BharatWritesCertificateClient />;
}
