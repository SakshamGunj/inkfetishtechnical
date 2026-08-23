"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Book, CheckCircle, IndianRupee, TrendingUp, AlertCircle, History, ShieldCheck, Database, Link as LinkIcon, Info } from "lucide-react";

type Author = { id: string; name: string; phone: string; email: string };
type Expense = { name: string; amount: number };
type BookType = { 
  id: string; 
  title: string; 
  price: number; 
  custom_expenses: Expense[];
  royalty_percentage: number; 
  format: string 
};
type SaleReport = {
  id: string;
  book_id: string;
  period_start: string;
  period_end: string;
  units_sold: number;
  revenue_generated: number;
  royalty_earned: number;
  status: string;
  created_at: string;
};
type AuditLog = {
  id: string;
  book_id: string | null;
  action_type: string;
  description: string;
  created_at: string;
};

const EXPENSE_COLORS = ["bg-neutral-300", "bg-neutral-400", "bg-neutral-500", "bg-neutral-600", "bg-stone-400", "bg-stone-500"];

export default function AuthorDashboard() {
  const params = useParams();
  const authorId = params.id as string;

  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<BookType[]>([]);
  const [sales, setSales] = useState<SaleReport[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 1. Fetch Author Profile from Supabase
        const { data: authorData, error: authorError } = await supabase
          .from('author_profiles')
          .select('*')
          .eq('id', authorId)
          .single();

        if (authorData) {
          setAuthor({
            id: authorData.id,
            name: authorData.name || "Author",
            email: authorData.email || "",
            phone: authorData.phone || "",
          });
        }

        // 2. Fetch Books from Supabase
        const { data: booksData } = await supabase
          .from('author_books')
          .select('*')
          .eq('author_id', authorId);
          
        const booksList: BookType[] = (booksData || []).map((b: any) => ({
          id: b.id,
          title: b.title || "Untitled Book",
          price: Number(b.price) || 0,
          custom_expenses: Array.isArray(b.custom_expenses) ? b.custom_expenses : (typeof b.custom_expenses === 'string' ? JSON.parse(b.custom_expenses) : []),
          royalty_percentage: Number(b.royalty_percentage) || 0,
          format: b.format || "Paperback",
        }));
        setBooks(booksList);

        // 3. Fetch Sales Reports from Supabase
        const { data: salesData } = await supabase
          .from('author_sales_reports')
          .select('*')
          .eq('author_id', authorId)
          .order('period_end', { ascending: false });

        const salesList: SaleReport[] = (salesData || []).map((s: any) => ({
          id: s.id,
          book_id: s.book_id || "",
          period_start: s.period_start || "",
          period_end: s.period_end || "",
          units_sold: Number(s.units_sold) || 0,
          revenue_generated: Number(s.revenue_generated) || 0,
          royalty_earned: Number(s.royalty_earned) || 0,
          status: s.status || "pending",
          created_at: s.created_at || new Date().toISOString(),
        }));
        setSales(salesList);

        // 4. Fetch Audit Logs from Supabase
        const { data: logsData } = await supabase
          .from('author_audit_logs')
          .select('*')
          .eq('author_id', authorId)
          .order('created_at', { ascending: false });

        const logsList: AuditLog[] = (logsData || []).map((l: any) => ({
          id: l.id,
          book_id: l.book_id || null,
          action_type: l.action_type || "log",
          description: l.description || "",
          created_at: l.created_at || new Date().toISOString(),
        }));
        setLogs(logsList);

      } catch (error) {
        console.error("Dashboard Supabase error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [authorId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-ink-900 font-sans text-sm">Loading your dashboard...</div>;
  }

  if (!author) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] text-red-600 font-sans text-sm">Profile not found or link is invalid.</div>;
  }

  // Calculate Stats
  const totalBooksSold = sales.reduce((acc, curr) => acc + curr.units_sold, 0);
  const totalRoyalties = sales.reduce((acc, curr) => acc + curr.royalty_earned, 0);
  const pendingRoyalties = sales.filter(s => s.status === 'pending').reduce((acc, curr) => acc + curr.royalty_earned, 0);
  const paidRoyalties = sales.filter(s => s.status === 'paid').reduce((acc, curr) => acc + curr.royalty_earned, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-sans selection:bg-ink-900 selection:text-[#FDFBF7] overflow-x-hidden w-full">
      
      {/* Maintenance Banner */}
      <div className="bg-amber-100 border-b border-amber-200 text-amber-800 text-[10px] md:text-xs py-2 px-4 flex items-center justify-center text-center font-medium w-full">
        <Info className="w-3.5 h-3.5 mr-1.5 inline-block shrink-0" />
        <span className="truncate whitespace-normal">System Maintenance Notice: The dashboard undergoes scheduled synchronization between 12:30 AM and 1:00 AM IST daily.</span>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12 w-full overflow-hidden">
        
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between items-start gap-4 md:gap-6 border-b border-ink-900/10 pb-6 md:pb-8 w-full"
        >
          <div className="w-full">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-xs md:text-sm uppercase tracking-widest text-gold-main font-semibold">Author Dashboard</h1>
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" /> Verified
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-ink-900 leading-tight break-words hyphens-auto w-full">Welcome, {author.name}</h2>
            <p className="text-ink-900/70 mt-2 text-sm md:text-lg break-words w-full">Track your book sales and royalty earnings in real-time.</p>
            
            {/* Trust Signals Row */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4 md:mt-5 w-full">
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-ink-900/60 bg-ink-900/5 px-2 md:px-2.5 py-1 md:py-1.5 rounded-md border border-ink-900/10">
                <Database className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-600 shrink-0" />
                <span>Data sourced directly from Amazon & website</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-ink-900/60 bg-ink-900/5 px-2 md:px-2.5 py-1 md:py-1.5 rounded-md border border-ink-900/10">
                <LinkIcon className="w-3 h-3 md:w-3.5 md:h-3.5 text-ink-900 shrink-0" />
                <span>Officially Linked Account</span>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full"
        >
          <motion.div variants={itemVariants} className="min-w-0">
            <Card className="bg-white border-ink-900/10 hover:shadow-md hover:border-ink-900/20 transition-all duration-300 h-full w-full">
              <CardContent className="p-4 md:p-6 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[10px] md:text-sm font-medium text-ink-900/60 uppercase tracking-wide truncate">Total Books</p>
                  <div className="p-2 md:p-3 bg-ink-900/5 rounded-full shrink-0 ml-1">
                    <Book className="w-4 h-4 md:w-5 md:h-5 text-ink-900" />
                  </div>
                </div>
                <p className="text-xl md:text-3xl font-bold text-ink-900 truncate">{totalBooksSold}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="min-w-0">
            <Card className="bg-white border-ink-900/10 hover:shadow-md hover:border-ink-900/20 transition-all duration-300 h-full w-full">
              <CardContent className="p-4 md:p-6 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[10px] md:text-sm font-medium text-ink-900/60 uppercase tracking-wide truncate">Total Royalties</p>
                  <div className="p-2 md:p-3 bg-blue-50 rounded-full shrink-0 ml-1">
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-xl md:text-3xl font-bold text-ink-900 truncate">₹{totalRoyalties.toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="min-w-0">
            <Card className="bg-white border-ink-900/10 hover:shadow-md hover:border-ink-900/20 transition-all duration-300 h-full w-full">
              <CardContent className="p-4 md:p-6 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[10px] md:text-sm font-medium text-ink-900/60 uppercase tracking-wide truncate">Paid Out</p>
                  <div className="p-2 md:p-3 bg-green-50 rounded-full shrink-0 ml-1">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-xl md:text-3xl font-bold text-ink-900 truncate">₹{paidRoyalties.toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="min-w-0">
            <Card className="bg-white border-ink-900/10 hover:shadow-md hover:border-ink-900/20 transition-all duration-300 relative overflow-hidden h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-main/5 to-transparent pointer-events-none" />
              <CardContent className="p-4 md:p-6 relative flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[10px] md:text-sm font-medium text-ink-900/60 uppercase tracking-wide truncate">Pending</p>
                  <div className="p-2 md:p-3 bg-gold-main/10 rounded-full shrink-0 ml-1">
                    <IndianRupee className="w-4 h-4 md:w-5 md:h-5 text-gold-main" />
                  </div>
                </div>
                <p className="text-xl md:text-3xl font-bold text-gold-main truncate">₹{pendingRoyalties.toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 w-full">
          
          {/* Books List Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 space-y-4 md:space-y-6 min-w-0 w-full"
          >
            <h3 className="text-lg md:text-xl font-serif font-semibold flex items-center gap-2 border-b border-ink-900/10 pb-3 md:pb-4 text-ink-900 break-words">
              <Book className="w-4 h-4 md:w-5 md:h-5 text-ink-900/50 shrink-0" /> Your Books & Costs
            </h3>
            {books.length === 0 ? (
              <div className="text-ink-900/50 flex flex-col items-center justify-center p-6 md:p-8 bg-white/50 rounded-xl border border-ink-900/10 border-dashed w-full text-center">
                <AlertCircle className="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-50 shrink-0" />
                <p className="text-sm">No books published yet.</p>
              </div>
            ) : (
              <div className="space-y-4 w-full">
                {books.map(book => {
                  const totalCost = book.custom_expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
                  const netProfit = book.price - totalCost;
                  const authorEarning = netProfit * (book.royalty_percentage / 100);
                  const profitPct = (netProfit / book.price) * 100;

                  return (
                    <div key={book.id} className="p-4 md:p-5 rounded-xl bg-white border border-ink-900/10 hover:shadow-md hover:border-ink-900/20 transition-all duration-300 w-full">
                      <div className="flex justify-between items-start mb-2 gap-2 w-full">
                        <h4 className="font-semibold text-base md:text-lg leading-tight font-serif break-words min-w-0">{book.title}</h4>
                        <span className="bg-ink-900/5 px-2 py-0.5 rounded-md text-[10px] md:text-xs text-ink-900 font-medium whitespace-nowrap shrink-0">{book.format}</span>
                      </div>
                      
                      <div className="text-xs md:text-sm text-ink-900/80 mb-4 bg-ink-900/5 p-3 rounded-lg mt-3 w-full overflow-hidden">
                        <div className="flex justify-between mb-2">
                          <span className="truncate mr-2">Retail Price (MRP):</span>
                          <span className="font-semibold shrink-0">₹{book.price}</span>
                        </div>
                        
                        {book.custom_expenses.map((expense, idx) => (
                          <div key={idx} className="flex justify-between text-ink-900/60 mb-1 w-full overflow-hidden">
                            <div className="flex items-center gap-1.5 md:gap-2 min-w-0 mr-2">
                              <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0 ${EXPENSE_COLORS[idx % EXPENSE_COLORS.length]}`} />
                              <span className="truncate">{expense.name}:</span>
                            </div>
                            <span className="shrink-0">- ₹{expense.amount}</span>
                          </div>
                        ))}

                        <div className="flex justify-between mt-2 pt-2 border-t border-ink-900/10 text-green-700 font-medium w-full">
                          <div className="flex items-center gap-1.5 md:gap-2 min-w-0 mr-2">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 shrink-0" />
                            <span className="truncate">Net Profit:</span>
                          </div>
                          <span className="shrink-0">₹{netProfit}</span>
                        </div>
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="w-full h-1.5 md:h-2 rounded-full overflow-hidden flex bg-ink-900/10 mb-2">
                        {book.custom_expenses.map((expense, idx) => {
                          const pct = (expense.amount / book.price) * 100;
                          return <div key={idx} style={{ width: `${pct}%` }} className={EXPENSE_COLORS[idx % EXPENSE_COLORS.length]} title={expense.name} />;
                        })}
                        <div style={{ width: `${profitPct}%` }} className="bg-green-500" title="Net Profit" />
                      </div>

                      <div className="mt-3 md:mt-4 pt-3 border-t border-ink-900/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-xs md:text-sm w-full">
                        <span className="font-medium text-ink-900/70 truncate">Your Royalty Rate: <span className="text-gold-main">{book.royalty_percentage}%</span></span>
                        <span className="font-bold text-ink-900 shrink-0">₹{authorEarning.toFixed(2)}/book</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Detailed Sales Table & Audit Log */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 space-y-6 md:space-y-8 min-w-0 w-full overflow-hidden"
          >
            {/* Sales Table */}
            <div className="w-full">
              <h3 className="text-lg md:text-xl font-serif font-semibold flex items-center gap-2 border-b border-ink-900/10 pb-3 md:pb-4 text-ink-900 mb-4 md:mb-6 break-words">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-ink-900/50 shrink-0" /> Transaction History
              </h3>
              
              {sales.length === 0 ? (
                <div className="text-ink-900/50 flex flex-col items-center justify-center p-8 md:p-12 bg-white/50 rounded-xl border border-ink-900/10 border-dashed w-full text-center">
                  <TrendingUp className="w-8 h-8 md:w-10 md:h-10 mb-3 opacity-20 shrink-0" />
                  <p className="text-sm">No sales reports generated yet.</p>
                </div>
              ) : (
                <div className="bg-white border border-ink-900/10 rounded-xl shadow-sm w-full">
                  <div className="overflow-x-auto w-full pb-2">
                    <Table className="min-w-[450px] w-full">
                      <TableHeader>
                        <TableRow className="border-ink-900/10 bg-ink-900/5 hover:bg-ink-900/5">
                          <TableHead className="text-ink-900/70 font-semibold text-[10px] md:text-xs">Sale Period</TableHead>
                          <TableHead className="text-ink-900/70 font-semibold text-[10px] md:text-xs">Book</TableHead>
                          <TableHead className="text-right text-ink-900/70 font-semibold text-[10px] md:text-xs">Units</TableHead>
                          <TableHead className="text-right text-ink-900/70 font-semibold text-[10px] md:text-xs">Royalty</TableHead>
                          <TableHead className="text-right text-ink-900/70 font-semibold text-[10px] md:text-xs">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sales.map(sale => {
                          const bookName = books.find(b => b.id === sale.book_id)?.title || "Unknown Book";
                          const isSingle = sale.period_start === sale.period_end;
                          const startDate = new Date(sale.period_start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                          const endDate = new Date(sale.period_end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                          const displayPeriod = isSingle ? startDate : `${startDate} - ${endDate}`;

                          return (
                            <TableRow key={sale.id} className="border-ink-900/10 hover:bg-ink-900/5 transition-colors">
                              <TableCell className="font-semibold text-ink-900 whitespace-nowrap text-[10px] md:text-xs">{displayPeriod}</TableCell>
                              <TableCell className="text-ink-900/80 max-w-[120px] md:max-w-[200px] truncate text-[11px] md:text-sm">{bookName}</TableCell>
                              <TableCell className="text-right text-ink-900/80 text-[11px] md:text-sm">{sale.units_sold}</TableCell>
                              <TableCell className="text-right font-semibold text-ink-900 text-[11px] md:text-sm">₹{sale.royalty_earned.toLocaleString(undefined, { minimumFractionDigits: 0 })}</TableCell>
                              <TableCell className="text-right">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap ${
                                  sale.status === 'paid' 
                                    ? 'bg-green-100 text-green-700 border border-green-200' 
                                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                                }`}>
                                  {sale.status === 'paid' ? 'Paid' : 'Pending'}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>

            {/* Audit Log / Transparency History */}
            <div className="w-full">
              <h3 className="text-lg md:text-xl font-serif font-semibold flex items-center gap-2 border-b border-ink-900/10 pb-3 md:pb-4 text-ink-900 mb-4 md:mb-6 mt-8 md:mt-12 break-words">
                <History className="w-4 h-4 md:w-5 md:h-5 text-ink-900/50 shrink-0" /> Transparency & Activity Log
              </h3>
              
              <div className="bg-white border border-ink-900/10 rounded-xl p-4 md:p-6 shadow-sm w-full">
                {logs.length === 0 ? (
                  <p className="text-ink-900/50 text-xs md:text-sm italic">No activity recorded yet.</p>
                ) : (
                  <div className="space-y-3 md:space-y-4 w-full">
                    {logs.map(log => {
                      const isSystemLog = log.action_type === 'sale_logged' || log.action_type === 'book_created';
                      return (
                        <div key={log.id} className="flex gap-3 md:gap-4 items-start p-2 md:p-3 hover:bg-ink-900/5 rounded-lg transition-colors w-full overflow-hidden">
                          <div className="pt-1 shrink-0">
                            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-1 md:mt-1.5 ${isSystemLog ? 'bg-green-500' : 'bg-gold-main'}`} />
                          </div>
                          <div className="min-w-0 w-full">
                            <p className="text-xs md:text-sm text-ink-900 leading-relaxed font-sans break-words">{log.description}</p>
                            <p className="text-[10px] md:text-xs text-ink-900/50 mt-0.5 md:mt-1 font-sans">
                              {new Date(log.created_at).toLocaleString('en-IN', { 
                                day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
