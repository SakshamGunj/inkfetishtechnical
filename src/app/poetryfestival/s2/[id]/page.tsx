import { getCertificateData } from "@/lib/certificate";
import CertificateVerificationClient from "./CertificateVerificationClient";
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
      title: "Unverified Certificate | Inkfetish Publications",
      description: "Verify the authenticity of literary certificates issued by Inkfetish Publications.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `Certificate Verified - ${certificate.name} | Inkfetish Publications`,
    description: `Official verification portal for Inkfetish Publications. Verify certificate ID ${id} issued to ${certificate.name} for Poetry Festival Season 2.`,
    robots: "index, follow",
  };
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const certificate = await getCertificateData(id);

  return <CertificateVerificationClient id={id} initialData={certificate} />;
}
