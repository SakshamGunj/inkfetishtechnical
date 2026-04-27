'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const LoveAtMinusOneSubmission = dynamic(() => import('@/legacy-pages/LoveAtMinusOneSubmission'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background text-primary">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  )
});

export default function SubmissionPage() {
  return <LoveAtMinusOneSubmission />;
}
