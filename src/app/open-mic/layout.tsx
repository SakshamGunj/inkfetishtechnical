import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weekly Open Mic by Inkfetish',
  description: 'Inviting Poets & Writers Across India for a fun night of poetry and storytelling. Strictly 50 slots! Live on Zoom. Secure your spot now!',
  openGraph: {
    title: 'Weekly Open Mic by Inkfetish',
    description: 'Inviting Poets & Writers Across India for a fun night of poetry and storytelling. Strictly 50 slots! Live on Zoom. Secure your spot now!',
    images: [
      {
        url: '/open-mic-bg.png',
        width: 1200,
        height: 630,
        alt: 'Weekly Open Mic by Inkfetish',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weekly Open Mic by Inkfetish',
    description: 'Inviting Poets & Writers Across India for a fun night of poetry and storytelling. Strictly 50 slots! Live on Zoom. Secure your spot now!',
    images: ['/open-mic-bg.png'],
  },
};

export default function OpenMicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
