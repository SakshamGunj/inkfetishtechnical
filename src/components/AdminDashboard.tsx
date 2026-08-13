'use client';

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, PenTool, Users, BookOpen } from "lucide-react";
import InkculttAdmin from "@/components/InkculttAdmin";
import AuthorApprovalsAdmin from "@/components/AuthorApprovalsAdmin";

interface Registration {
  id: string;
  name: string;
  instagram: string;
  whatsapp: string;
  tier: string;
  status: string;
  paymentStatus: string;
  registrationDate: Timestamp | null;
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('admin_authenticated') === 'true';
    }
    return false;
  });
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ADMINPORTALINKFETISH12') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
    } else {
      alert('Incorrect admin password');
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const registrationsRef = collection(db, "competition_registrations");
      const q = query(registrationsRef, orderBy("registrationDate", "desc"));
      const querySnapshot = await getDocs(q);
      
      const registrationsList: Registration[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const registration: Registration = {
          id: doc.id,
          name: data.name || '',
          instagram: data.instagram || '',
          whatsapp: data.whatsapp || '',
          tier: data.tier || 'Silver',
          status: data.status || 'registered',
          paymentStatus: data.paymentStatus || 'pending',
          registrationDate: data.registrationDate
        };
        
        registrationsList.push(registration);
      });

      setRegistrations(registrationsList);
      setTotalCount(registrationsList.length);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
    setLoading(false);
  };

  const formatDate = (timestamp: Timestamp | null) => {
    if (!timestamp) return 'N/A';
    try {
      return timestamp.toDate().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center p-6 font-mono text-black">
        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0_0_#000] max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black uppercase tracking-tight bg-black text-[#39FF14] px-4 py-2 inline-block">
              🏛️ ADMIN PORTAL
            </h1>
            <p className="text-xs font-bold text-gray-500 uppercase">RESTRICTED ACCESS ONLY</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-gray-700 mb-1">Enter Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border-2 border-black p-3 font-bold text-sm outline-none focus:bg-[#39FF14]/10"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-black py-3 text-sm uppercase border-2 border-black hover:bg-[#39FF14] hover:text-black transition-colors shadow-[4px_4px_0_0_#000]"
            >
              UNLOCK DASHBOARD →
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">🏛️ Admin Dashboard</h1>
        <div className="flex gap-3">
          <a 
            href="/judgefetish" 
            target="_blank"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg flex items-center gap-2"
          >
            ⚖️ Poetry Judging Portal
          </a>
          <Button 
            onClick={fetchRegistrations} 
            disabled={loading}
            variant="outline"
            className="border-blue-400/50 text-gray-300 hover:text-white hover:bg-blue-600/20"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="approvals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/10 backdrop-blur-md">
          <TabsTrigger value="approvals" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white">
            <BookOpen className="h-4 w-4" />
            Author Site Approvals
          </TabsTrigger>
          <TabsTrigger value="competition" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white">
            <Users className="h-4 w-4" />
            Competition Management
          </TabsTrigger>
          <TabsTrigger value="inkcultt" className="flex items-center gap-2 text-gray-300 data-[state=active]:text-white">
            <PenTool className="h-4 w-4" />
            Inkcultt Poetry Portal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="approvals" className="space-y-6">
          <AuthorApprovalsAdmin />
        </TabsContent>

        <TabsContent value="competition" className="space-y-6">
          <Card className="mb-6 bg-white/10 backdrop-blur-md border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white">📈 Total Registrations: {totalCount}</CardTitle>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white">📋 All Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-300">Loading registrations...</p>
                </div>
              ) : registrations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-300">No registrations found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/30">
                        <th className="text-left p-3 font-semibold text-gray-200">👤 Name</th>
                        <th className="text-left p-3 font-semibold text-gray-200">📱 Instagram</th>
                        <th className="text-left p-3 font-semibold text-gray-200">💬 WhatsApp</th>
                        <th className="text-left p-3 font-semibold text-gray-200">🏆 Tier</th>
                        <th className="text-left p-3 font-semibold text-gray-200">💳 Payment</th>
                        <th className="text-left p-3 font-semibold text-gray-200">📅 Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((registration) => (
                        <tr key={registration.id} className="border-b border-blue-500/20 hover:bg-white/5">
                          <td className="p-3 font-medium text-white">{registration.name}</td>
                          <td className="p-3 text-blue-400">@{registration.instagram}</td>
                          <td className="p-3 font-mono text-sm text-gray-300">{registration.whatsapp}</td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              registration.tier === 'Gold' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {registration.tier === 'Gold' ? '🥇' : '🥈'} {registration.tier}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              registration.paymentStatus === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {registration.paymentStatus === 'paid' ? '✅' : '⏳'} {registration.paymentStatus}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-300">
                            {formatDate(registration.registrationDate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inkcultt" className="space-y-6">
          <InkculttAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard; 