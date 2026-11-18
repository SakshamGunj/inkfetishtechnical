import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://inkfetish.in"),
  title: "Deserted Hearts (Digital PDF Edition) — Daniya Khan | Worldwide Access",
  description: "“to those who adorn their cemetery of grief with flowers of poetry.” Get the official Digital PDF E-Book Edition by Daniya Khan (@altruistic_writer). Available for readers in India & Worldwide on phone, tablet & Kindle. Published by Inkfetish Publication.",
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
  alternates: {
    canonical: "https://inkfetish.in/daniya-khan/pdf",
  },
  openGraph: {
    title: "Deserted Hearts (Digital PDF Edition) — Daniya Khan (@altruistic_writer)",
    description: "“to those who adorn their cemetery of grief with flowers of poetry.” Official Digital PDF E-Book Edition by Daniya Khan. Available for readers in India & Worldwide. Published by Inkfetish Publication.",
    url: "https://inkfetish.in/daniya-khan/pdf",
    siteName: "Inkfetish Publication",
    images: [
      {
        url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1785697666/ChatGPT_Image_Aug_3_2026_12_36_44_AM_1_lvnslj.png",
        width: 1200,
        height: 630,
        alt: "Deserted Hearts (Digital PDF Edition) by Daniya Khan — Official Publication by Inkfetish",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deserted Hearts (Digital PDF Edition) — Daniya Khan | Worldwide Access",
    description: "“to those who adorn their cemetery of grief with flowers of poetry.” Get the official Digital PDF E-Book Edition by Daniya Khan (@altruistic_writer). Available in India & Worldwide.",
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
