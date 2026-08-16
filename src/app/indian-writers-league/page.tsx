'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// The legacy page uses window/localStorage heavily, so we dynamically import it
// with SSR disabled to prevent hydration errors during migration.
const IndianWritersLeague = dynamic(
  () => import('../../legacy-pages/IndianWritersLeague'),
  { ssr: false }
);

export default function IndianWritersLeaguePage() {
  return <IndianWritersLeague />;
}
