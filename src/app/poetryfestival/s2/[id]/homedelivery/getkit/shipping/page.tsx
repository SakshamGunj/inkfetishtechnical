import { getCertificateData, CertificateData } from '@/lib/certificate';
import { notFound } from 'next/navigation';
import ShippingClient from './ShippingClient';
import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Secure Shipping Checkout | Inkfetish Publications",
};

export default async function HomeDeliveryShippingPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  try {
    const certificate = await getCertificateData(id);
    
    if (!certificate) {
      return notFound();
    }

    return <ShippingClient id={id} initialData={certificate} />;
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return notFound();
  }
}
