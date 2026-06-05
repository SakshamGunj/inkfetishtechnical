import { getCertificateData } from "@/lib/certificate";
import HomeDeliveryClient from "./HomeDeliveryClient";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const certificate = await getCertificateData(id);

  if (!certificate) {
    return {
      title: "Physical Kit Delivery | Inkfetish Publications",
      description: "Claim physical printed certificate, medal, and letter delivery.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `Physical Kit Delivery - ${certificate.name} | Inkfetish Publications`,
    description: `Official home delivery portal for Inkfetish Poetry Festival Season 2. Claim physical laminated certificate, medal, and letter.`,
    robots: "noindex, nofollow",
  };
}

export default async function HomeDeliveryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificate = await getCertificateData(id);

  return <HomeDeliveryClient id={id} initialData={certificate} />;
}
