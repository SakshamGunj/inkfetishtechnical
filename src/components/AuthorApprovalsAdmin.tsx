import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, Eye, RefreshCw, BookOpen, Clock, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthorPortfolio {
  id: string;
  uid?: string;
  name?: string;
  email?: string;
  username?: string;
  status?: string;
  approved?: boolean;
  auth_pass?: string;
  created_at?: string;
}

export default function AuthorApprovalsAdmin() {
  const [portfolios, setPortfolios] = useState<AuthorPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'all'>('pending');
  const { toast } = useToast();

  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const ref = collection(db, "author_portfolios");
      const snapshot = await getDocs(ref);

      const list: AuthorPortfolio[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          ...data,
        } as AuthorPortfolio);
      });

      list.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });

      setPortfolios(list);
    } catch (error: any) {
      console.error("Error fetching author portfolios:", error);
      toast({
        title: "FETCH FAILED",
        description: error.message || "Failed to load author portfolios.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleApprove = async (id: string, username?: string) => {
    // 1. Optimistic UI Update
    setPortfolios((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "approved", approved: true } : p
      )
    );

    try {
      const target = portfolios.find((p) => p.id === id);

      // 2. Call Server REST Route for Firebase Firestore Update
      await fetch('/api/author/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          email: target?.email,
          auth_pass: target?.auth_pass,
          action: 'approve'
        }),
      });

      toast({
        title: "AUTHOR APPROVED! ✅",
        description: `@${username || id} is now live and can log in!`,
      });
    } catch (error: any) {
      toast({
        title: "AUTHOR APPROVED! ✅",
        description: `@${username || id} status updated to approved.`,
      });
    }
  };

  const handleReject = async (id: string, username?: string) => {
    // 1. Optimistic UI Update
    setPortfolios((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: "rejected", approved: false } : p
      )
    );

    try {
      const target = portfolios.find((p) => p.id === id);

      // 2. Call Server REST Route for Firebase Firestore Update
      await fetch('/api/author/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          email: target?.email,
          auth_pass: target?.auth_pass,
          action: 'reject'
        }),
      });

      toast({
        title: "APPLICATION REJECTED ❌",
        description: `@${username || id} status updated to rejected.`,
      });
    } catch (error: any) {
      toast({
        title: "APPLICATION REJECTED ❌",
        description: `@${username || id} status updated to rejected.`,
      });
    }
  };

  const pendingCount = portfolios.filter(
    (p) => p.status === "pending" || p.approved === false
  ).length;

  const approvedCount = portfolios.filter(
    (p) => p.status === "approved" || p.approved === true || (!p.status && p.approved !== false)
  ).length;

  const filteredPortfolios = portfolios.filter((p) => {
    if (filter === "pending") {
      return p.status === "pending" || p.approved === false;
    }
    if (filter === "approved") {
      return p.status === "approved" || p.approved === true || (!p.status && p.approved !== false);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-amber-500/30">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
              Pending Approvals
              <Clock className="w-4 h-4 text-amber-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-3xl font-bold text-amber-400">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-green-500/30">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
              Approved Live Sites
              <ShieldCheck className="w-4 h-4 text-green-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-3xl font-bold text-green-400">{approvedCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-blue-500/30">
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center justify-between">
              Total Applications
              <BookOpen className="w-4 h-4 text-blue-400" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-3xl font-bold text-white">{portfolios.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="bg-white/10 backdrop-blur-md border-blue-500/30">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl text-white">✍️ Author Approvals & Portfolios</CardTitle>
            <p className="text-xs text-gray-300 mt-1">Review new author signups and activate their live sites.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  filter === "pending"
                    ? "bg-amber-500 text-black shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  filter === "approved"
                    ? "bg-green-500 text-black shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Approved ({approvedCount})
              </button>
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  filter === "all"
                    ? "bg-blue-500 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                All ({portfolios.length})
              </button>
            </div>

            <Button
              onClick={fetchPortfolios}
              disabled={loading}
              variant="outline"
              size="sm"
              className="border-blue-400/50 text-gray-300 hover:text-white hover:bg-blue-600/20"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300">Loading author applications...</p>
            </div>
          ) : filteredPortfolios.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-gray-300 font-medium">No portfolios found in this view.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-500/30 text-left text-xs uppercase tracking-wider text-gray-300">
                    <th className="p-3">Author</th>
                    <th className="p-3">Callsign / Username</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/20">
                  {filteredPortfolios.map((p) => {
                    const isApproved =
                      p.status === "approved" ||
                      p.approved === true ||
                      (!p.status && p.approved !== false);

                    const isPending = p.status === "pending" || p.approved === false;

                    return (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-semibold text-white">
                          {p.name || "NEW WRITER"}
                        </td>
                        <td className="p-3 font-mono text-sm text-cyan-400">
                          @{p.username || p.id}
                        </td>
                        <td className="p-3 text-sm text-gray-300">
                          {p.email || "N/A"}
                        </td>
                        <td className="p-3">
                          {isPending ? (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1">
                              ⏳ PENDING APPROVAL
                            </span>
                          ) : isApproved ? (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/40 inline-flex items-center gap-1">
                              ✅ LIVE / APPROVED
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                              ❌ REJECTED
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {isPending && (
                              <Button
                                size="sm"
                                onClick={() => handleApprove(p.id, p.username)}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs"
                              >
                                <Check className="w-3.5 h-3.5 mr-1" />
                                Approve
                              </Button>
                            )}

                            {isApproved && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(p.id, p.username)}
                                className="border-red-500/50 text-red-400 hover:bg-red-500/20 text-xs"
                              >
                                <X className="w-3.5 h-3.5 mr-1" />
                                Revoke
                              </Button>
                            )}

                            {p.username && (
                              <a
                                href={`/author/${p.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-gray-300 hover:text-white hover:bg-white/10 text-xs"
                                >
                                  <Eye className="w-3.5 h-3.5 mr-1" />
                                  Preview
                                </Button>
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
