'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Search, Package, TrendingUp, Users, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MOCK_STATS = {
  totalRevenue: 35280,
  totalOrders: 142,
  signedEditions: 89,
  standardEditions: 53,
};

const MOCK_ORDERS = [
  { id: 'dkbook_170123_4a9z1', date: '2026-07-22', name: 'Ayesha Khan', email: 'ayesha.k@example.com', bundle: 'signed', status: 'PAID', amount: 289 },
  { id: 'dkbook_170124_7c2b3', date: '2026-07-22', name: 'Rohan Sharma', email: 'rohan.s@example.com', bundle: 'standard', status: 'PAID', amount: 229 },
  { id: 'dkbook_170125_1p8x4', date: '2026-07-21', name: 'Sara Ali', email: 'sara.ali@example.com', bundle: 'signed', status: 'PAID', amount: 289 },
  { id: 'dkbook_170126_9m3v2', date: '2026-07-21', name: 'Kabir Das', email: 'kabir.d@example.com', bundle: 'signed', status: 'PAID', amount: 289 },
  { id: 'dkbook_170127_4k6n7', date: '2026-07-20', name: 'Priya Patel', email: 'priya.p@example.com', bundle: 'standard', status: 'PAID', amount: 229 },
  { id: 'dkbook_170128_2b5m8', date: '2026-07-20', name: 'Omar Farooq', email: 'omar.f@example.com', bundle: 'signed', status: 'PAID', amount: 289 },
  { id: 'dkbook_170129_8t1c4', date: '2026-07-19', name: 'Neha Gupta', email: 'neha.g@example.com', bundle: 'standard', status: 'PAID', amount: 229 },
];

export default function DaniyaAdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'DANIYADASHBOOK') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const filteredOrders = MOCK_ORDERS.filter(o => 
    o.name.toLowerCase().includes(search.toLowerCase()) || 
    o.email.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-5 selection:bg-[#E8D5C0] selection:text-[#1A1A1A]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="card-neo p-8 text-center bg-white">
            <div className="w-16 h-16 bg-[#F5F0E8] border-2 border-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-[#1A1A1A]" />
            </div>
            <h1 className="font-display italic text-3xl mb-2 text-[#1A1A1A]">Author Dashboard</h1>
            <p className="font-ui text-sm tracking-widest uppercase text-[#888] mb-8">Deserted Hearts Pre-orders</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access code"
                  className="w-full px-4 py-3 bg-[#FDFBF7] border-2 border-[#1A1A1A] rounded-xl font-ui focus:outline-none focus:ring-2 focus:ring-[#E8D5C0] text-center uppercase tracking-widest text-sm"
                />
              </div>
              {error && <p className="text-red-500 text-sm font-ui">{error}</p>}
              <button type="submit" className="pill-btn-pink w-full py-3 text-sm">
                Unlock Dashboard →
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-[#E8D5C0] selection:text-[#1A1A1A]">
      {/* Navbar */}
      <header className="border-b-2 border-[#1A1A1A] bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌵</span>
            <div>
              <h1 className="font-display italic text-xl leading-none text-[#1A1A1A]">Deserted Hearts</h1>
              <p className="font-ui text-[10px] tracking-widest uppercase text-[#888]">Live Dashboard</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="font-ui text-xs font-bold tracking-widest uppercase text-[#888] hover:text-[#1A1A1A] transition-colors"
          >
            Lock
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-neo p-6 bg-[#F7E56B]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/50 rounded-lg border-2 border-[#1A1A1A]"><TrendingUp className="w-5 h-5" /></div>
              <p className="font-ui text-xs font-bold tracking-widest uppercase text-[#1A1A1A]">Total Revenue</p>
            </div>
            <p className="font-display italic text-4xl font-bold text-[#1A1A1A]">₹{MOCK_STATS.totalRevenue.toLocaleString()}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-neo p-6 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#F5F0E8] rounded-lg border-2 border-[#1A1A1A]"><Users className="w-5 h-5" /></div>
              <p className="font-ui text-xs font-bold tracking-widest uppercase text-[#555]">Total Pre-orders</p>
            </div>
            <p className="font-display italic text-4xl font-bold text-[#1A1A1A]">{MOCK_STATS.totalOrders}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-neo p-6 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#F2A7B0] rounded-lg border-2 border-[#1A1A1A]"><BookOpen className="w-5 h-5" /></div>
              <p className="font-ui text-xs font-bold tracking-widest uppercase text-[#555]">Signed Editions</p>
            </div>
            <p className="font-display italic text-4xl font-bold text-[#1A1A1A]">{MOCK_STATS.signedEditions}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-neo p-6 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#A8DADC] rounded-lg border-2 border-[#1A1A1A]"><Package className="w-5 h-5" /></div>
              <p className="font-ui text-xs font-bold tracking-widest uppercase text-[#555]">Standard Editions</p>
            </div>
            <p className="font-display italic text-4xl font-bold text-[#1A1A1A]">{MOCK_STATS.standardEditions}</p>
          </motion.div>
        </div>

        {/* Orders Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-neo bg-white overflow-hidden">
          <div className="p-6 border-b-2 border-[#1A1A1A] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F5F0E8]">
            <h2 className="font-display italic text-2xl text-[#1A1A1A]">Recent Pre-orders</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
              <input 
                type="text" 
                placeholder="Search orders..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 border-2 border-[#1A1A1A] rounded-xl font-ui text-sm focus:outline-none focus:ring-2 focus:ring-[#F7E56B] w-full md:w-64"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#1A1A1A] bg-white font-ui text-xs uppercase tracking-widest text-[#888]">
                  <th className="p-4 whitespace-nowrap">Order ID / Date</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Bundle</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#1A1A1A]/10 font-ui text-sm text-[#1A1A1A]">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="p-4">
                      <p className="font-mono text-xs">{order.id}</p>
                      <p className="text-[#888] text-xs mt-1">{order.date}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold">{order.name}</p>
                      <p className="text-[#888] text-xs">{order.email}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-bold tracking-widest uppercase rounded-md border-2 border-[#1A1A1A] ${
                        order.bundle === 'signed' ? 'bg-[#F2A7B0]' : 'bg-[#A8DADC]'
                      }`}>
                        {order.bundle}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-semibold">
                      ₹{order.amount}
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#888] italic font-display">
                      No orders found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
