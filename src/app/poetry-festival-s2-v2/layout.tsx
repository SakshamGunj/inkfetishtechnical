'use client';

import { usePathname } from 'next/navigation';

export default function FestivalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Only show the minimal branded footer on sub-pages (register, submit, read)
  // On the landing page (/poetry-festival-s2), we rely on the global footer
  const normalizedPath = pathname?.replace(/\/$/, '') || '';
  const isSubPage = normalizedPath !== '/poetry-festival-s2-v2';

  return (
    <>
      {children}
      {isSubPage && (
        <div className="relative z-[50] bg-[#050505] border-t border-white/5 py-12 px-6 flex items-center justify-center select-none">
          <p className="text-white/20 text-[9px] uppercase tracking-[0.35em] font-bold">
            Poetry Festival Season 2 &nbsp;•&nbsp; Presented by Inkfetish Publication
          </p>
        </div>
      )}
    </>
  );
}
