'use client';

import React from 'react';
import AdminDashboard from '@/components/AdminDashboard';
import Navbar from '@/components/Navbar';

export default function AuthorAdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[#39FF14] selection:text-black pt-20">
      <Navbar />
      <AdminDashboard />
    </div>
  );
}
