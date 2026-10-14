import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://inkfetish.in"),
  title: "Deserted Hearts (Digital PDF Edition) — Daniya Khan",
  description: "“to those who adorn their cemetery of grief with flowers of poetry.” Download the official Digital PDF E-Book Edition by Daniya Khan (@altruistic_writer). Instant access on phone, tablet & Kindle.",
  keywords: [
    "Deserted Hearts PDF",
    "Daniya Khan PDF",
    "Daniya Khan E-Book",
    "altruistic_writer PDF",
    "Inkfetish Publication",
    "Deserted Hearts Digital Edition",
    "Poetry E-Book Download",
  ],
  authors: [{ name: "Daniya Khan", url: "https://instagram.com/altruistic_writer" }],
  publisher: "Inkfetish Publication",
  openGraph: {
    title: "Deserted Hearts (Digital PDF Edition) — Daniya Khan",
    description: "“to those who adorn their cemetery of grief with flowers of poetry.” Instant high-resolution PDF E-Book download by Daniya Khan (@altruistic_writer).",
    url: "https://inkfetish.in/daniya-khan/pdf",
    siteName: "Inkfetish Publication",
    images: [
      {
        url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1785697666/ChatGPT_Image_Aug_3_2026_12_36_44_AM_1_lvnslj.png",
        width: 1200,
        height: 630,
        alt: "Deserted Hearts PDF Edition by Daniya Khan",
      },
    ],
    locale: "en_IN",
    type: "book",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deserted Hearts (Digital PDF Edition) — Daniya Khan",
    description: "“to those who adorn their cemetery of grief with flowers of poetry.” Instant high-resolution PDF E-Book download by Daniya Khan.",
    creator: "@inkfetishin",
    images: [
      "https://res.cloudinary.com/dde8ekuuu/image/upload/v1785697666/ChatGPT_Image_Aug_3_2026_12_36_44_AM_1_lvnslj.png",
    ],
  },
};

export default function DaniyaKhanPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
