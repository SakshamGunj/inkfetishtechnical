import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Your Copy | The Margins',
  description: 'Complete your purchase for The Margins - The Official Collection of Top 200 Hall of Fame Poets.',
};

export default function BuyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#111] min-h-screen">
      {children}
    </div>
  );
}
