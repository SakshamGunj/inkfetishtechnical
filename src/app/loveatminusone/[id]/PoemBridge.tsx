'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the legacy component with SSR disabled
const LoveAtMinusOnePoem = dynamic(() => import('@/legacy-pages/LoveAtMinusOnePoem'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  )
});

export default function PoemBridge({ id }: { id: string }) {
  return <LoveAtMinusOnePoem id={id} />;
}
