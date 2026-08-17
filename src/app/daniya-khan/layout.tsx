import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://inkfetish.in"),
  title: "Deserted Hearts — Daniya Khan | Official Pre-Order",
  description: "“to those who adorn their cemetery of grief with flowers of poetry.” Pre-order the official signed first edition paperback by Daniya Khan (@altruistic_writer). Published by Inkfetish Publication. Includes exclusive bonuses & ₹30,000 lucky draw entry.",
  keywords: [
    "Deserted Hearts",
    "Daniya Khan",
    "Daniya Khan Book",
    "altruistic_writer",
    "Inkfetish Publication",
    "Deserted Hearts Pre-order",
    "Signed Poetry Book",
    "Mystery Box",
  ],
  authors: [{ name: "Daniya Khan", url: "https://instagram.com/altruistic_writer" }],
  publisher: "Inkfetish Publication",
  openGraph: {
    title: "Deserted Hearts — Daniya Khan (@altruistic_writer)",
    description: "“to those who adorn their cemetery of grief with flowers of poetry.” Pre-order the official signed first edition paperback by Daniya Khan. Officially published by Inkfetish Publication.",
    url: "https://inkfetish.in/daniya-khan",
    siteName: "Inkfetish Publication",
    images: [
      {
        url: "https://res.cloudinary.com/dde8ekuuu/image/upload/v1785697666/ChatGPT_Image_Aug_3_2026_12_36_44_AM_1_lvnslj.png",
        width: 1200,
        height: 630,
        alt: "Deserted Hearts by Daniya Khan — Official Publication by Inkfetish",
      },
    ],
    locale: "en_IN",
    type: "book",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deserted Hearts — Daniya Khan | Official Pre-Order",
    description: "“to those who adorn their cemetery of grief with flowers of poetry.” Pre-order the official signed first edition paperback by Daniya Khan (@altruistic_writer).",
    creator: "@inkfetishin",
    images: [
      "https://res.cloudinary.com/dde8ekuuu/image/upload/v1785697666/ChatGPT_Image_Aug_3_2026_12_36_44_AM_1_lvnslj.png",
    ],
  },
};

export default function DaniyaKhanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
