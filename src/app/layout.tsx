import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { FloatingContact } from "@/components/FloatingContact";

export const metadata: Metadata = {
  title: "Inkfetish | The Writer's Community",
  description: "Join India's biggest community for writers. We provide tools, resources, and publishing opportunities to help you build a career with your words.",
  openGraph: {
    title: "Inkfetish | The Writer's Community",
    description: "Join India's biggest community for writers. We provide tools, resources, and publishing opportunities to help you build a career with your words.",
    url: "https://www.inkfetish.in",
    siteName: "Inkfetish",
    images: [
      {
        url: "https://www.inkfetish.in/images/link_preview_card_v2.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inkfetish | The Writer's Community",
    description: "Join India's biggest community for writers. We provide tools, resources, and publishing opportunities to help you build a career with your words.",
    images: ["https://www.inkfetish.in/images/link_preview_card_v2.jpg"],
    creator: "@inkfetish",
  },
  icons: {
    icon: "/images/inkfetish_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
          <ConditionalFooter />
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}
