"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { ArrowLeft, BookOpen, Edit, IndianRupee, Plus, Trash2, X, History } from "lucide-react";
import { motion } from "framer-motion";

type Author = { id: string; name: string; phone: string; email: string };
type Expense = { name: string; amount: number };
type Book = { 
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

export default function ManageAuthorPage() {
  const params = useParams();
  const router = useRouter();
  const authorId = params.id as string;

  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [sales, setSales] = useState<SaleReport[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaleDialogOpen, setIsSaleDialogOpen] = useState(false);
  
  const [newBook, setNewBook] = useState<{
    title: string;
    price: string;
    custom_expenses: Expense[];
    royalty_percentage: string;
    format: string;
  }>({ 
    title: "", 
    price: "", 
    custom_expenses: [],
    royalty_percentage: "", 
    format: "Paperback" 
  });

  const [editBook, setEditBook] = useState<Book | null>(null);
  const [originalEditBook, setOriginalEditBook] = useState<Book | null>(null);
  
  const [saleMode, setSaleMode] = useState<"single" | "range">("single");
  const [newSale, setNewSale] = useState({ 
    book_id: "", 
    period_start: new Date().toISOString().split('T')[0], 
    period_end: new Date().toISOString().split('T')[0],
    units_sold: "", 
    status: "pending" 
  });

  const fetchData = async () => {
    try {
      // 1. Author Profile
      const authorDocRef = doc(db, "author_portfolios", authorId);
      const authorSnap = await getDoc(authorDocRef);
      if (authorSnap.exists()) {
        const data = authorSnap.data();
        setAuthor({
          id: authorSnap.id,
          name: data.name || data.username || "Author",
          phone: data.phone || "N/A",
          email: data.email || "N/A",
        });
      } else {
        const q = query(collection(db, "author_portfolios"), where("uid", "==", authorId));
        const qSnap = await getDocs(q);
        if (!qSnap.empty) {
          const first = qSnap.docs[0];
          const data = first.data();
          setAuthor({
            id: first.id,
            name: data.name || data.username || "Author",
            phone: data.phone || "N/A",
            email: data.email || "N/A",
          });
        }
      }

      // 2. Books
      const booksQuery = query(collection(db, "author_books"), where("author_id", "==", authorId));
      const booksSnap = await getDocs(booksQuery);
      const booksList: Book[] = [];
      booksSnap.forEach((docSnap) => {
        const b = docSnap.data();
        booksList.push({
          id: docSnap.id,
          title: b.title || "Untitled Book",
          price: Number(b.price) || 0,
          custom_expenses: Array.isArray(b.custom_expenses) ? b.custom_expenses : [],
          royalty_percentage: Number(b.royalty_percentage) || 0,
          format: b.format || "Paperback",
        });
      });
      setBooks(booksList);

      // 3. Sales Reports
      const salesQuery = query(collection(db, "author_sales_reports"), where("author_id", "==", authorId));
      const salesSnap = await getDocs(salesQuery);
      const salesList: SaleReport[] = [];
      salesSnap.forEach((docSnap) => {
        const s = docSnap.data();
        salesList.push({
          id: docSnap.id,
          book_id: s.book_id || "",
          period_start: s.period_start || "",
          period_end: s.period_end || "",
          units_sold: Number(s.units_sold) || 0,
          revenue_generated: Number(s.revenue_generated) || 0,
          royalty_earned: Number(s.royalty_earned) || 0,
          status: s.status || "pending",
          created_at: s.created_at || new Date().toISOString(),
        });
      });
      salesList.sort((a, b) => new Date(b.period_end).getTime() - new Date(a.period_end).getTime());
      setSales(salesList);

      // 4. Audit Logs
      const logsQuery = query(collection(db, "author_audit_logs"), where("author_id", "==", authorId));
      const logsSnap = await getDocs(logsQuery);
      const logsList: AuditLog[] = [];
      logsSnap.forEach((docSnap) => {
        const l = docSnap.data();
        logsList.push({
          id: docSnap.id,
          book_id: l.book_id || null,
          action_type: l.action_type || "log",
          description: l.description || "",
          created_at: l.created_at || new Date().toISOString(),
        });
      });
      logsList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setLogs(logsList);

    } catch (error: any) {
      toast.error("Failed to load author data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [authorId]);

  // Expense Handlers
  const addExpenseToNewBook = () => setNewBook({...newBook, custom_expenses: [...newBook.custom_expenses, { name: "", amount: 0 }]});
  const updateExpenseInNewBook = (index: number, field: keyof Expense, value: string | number) => {
    const newExpenses = [...newBook.custom_expenses];
    newExpenses[index] = { ...newExpenses[index], [field]: value };
    setNewBook({ ...newBook, custom_expenses: newExpenses });
  };
  const removeExpenseFromNewBook = (index: number) => {
    setNewBook({ ...newBook, custom_expenses: newBook.custom_expenses.filter((_, i) => i !== index) });
  };

  const addExpenseToEditBook = () => setEditBook(prev => prev ? {...prev, custom_expenses: [...prev.custom_expenses, { name: "", amount: 0 }]} : null);
  const updateExpenseInEditBook = (index: number, field: keyof Expense, value: string | number) => {
    if (!editBook) return;
    const newExpenses = [...editBook.custom_expenses];
    newExpenses[index] = { ...newExpenses[index], [field]: value };
    setEditBook({ ...editBook, custom_expenses: newExpenses });
  };
  const removeExpenseFromEditBook = (index: number) => {
    if (!editBook) return;
    setEditBook({ ...editBook, custom_expenses: editBook.custom_expenses.filter((_, i) => i !== index) });
  };

  const logAudit = async (bookId: string | null, actionType: string, description: string) => {
    try {
      const now = new Date().toISOString();
      const docRef = await addDoc(collection(db, "author_audit_logs"), {
        author_id: authorId,
        book_id: bookId,
        action_type: actionType,
        description: description,
        created_at: now,
      });

      const newLog: AuditLog = {
        id: docRef.id,
        book_id: bookId,
        action_type: actionType,
        description: description,
        created_at: now,
      };

      setLogs(prev => [newLog, ...prev]);
    } catch (e: any) {
      console.error("Audit log failed", e);
    }
  };

  const updateSaleStatus = async (saleId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "author_sales_reports", saleId), {
        status: newStatus,
        updated_at: new Date().toISOString(),
      });
      
      setSales(sales.map(s => s.id === saleId ? { ...s, status: newStatus } : s));
      toast.success(`Payment marked as ${newStatus}`);
      
      const sale = sales.find(s => s.id === saleId);
      if (sale) {
        const book = books.find(b => b.id === sale.book_id);
        await logAudit(sale.book_id, 'payment_updated', `Marked royalty payment of ₹${sale.royalty_earned} as ${newStatus.toUpperCase()} for "${book?.title || 'Unknown Book'}".`);
      }
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const now = new Date().toISOString();
      const newBookData = {
        author_id: authorId,
        title: newBook.title,
        price: Number(newBook.price),
        custom_expenses: newBook.custom_expenses,
        royalty_percentage: Number(newBook.royalty_percentage),
        format: newBook.format,
        created_at: now,
      };

      const docRef = await addDoc(collection(db, "author_books"), newBookData);
      
      const addedBook: Book = {
        id: docRef.id,
        title: newBook.title,
        price: Number(newBook.price),
        custom_expenses: newBook.custom_expenses,
        royalty_percentage: Number(newBook.royalty_percentage),
        format: newBook.format,
      };

      toast.success("Book added successfully!");
      setBooks([addedBook, ...books]);
      setIsBookDialogOpen(false);
      
      await logAudit(docRef.id, 'book_created', `Added new book "${newBook.title}" with MRP ₹${newBook.price} and ${newBook.custom_expenses.length} expenses.`);

      setNewBook({ title: "", price: "", custom_expenses: [], royalty_percentage: "", format: "Paperback" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEditBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBook || !originalEditBook) return;
    
    try {
      await updateDoc(doc(db, "author_books", editBook.id), {
        title: editBook.title,
        price: Number(editBook.price),
        custom_expenses: editBook.custom_expenses,
        royalty_percentage: Number(editBook.royalty_percentage),
      });

      toast.success("Book updated successfully!");
      setBooks(books.map(b => b.id === editBook.id ? editBook : b));
      setIsEditDialogOpen(false);
      
      let changes = [];
      if (originalEditBook.title !== editBook.title) changes.push(`Title changed from "${originalEditBook.title}" to "${editBook.title}"`);
      if (Number(originalEditBook.price) !== Number(editBook.price)) changes.push(`MRP changed from ₹${originalEditBook.price} to ₹${editBook.price}`);
      if (Number(originalEditBook.royalty_percentage) !== Number(editBook.royalty_percentage)) changes.push(`Royalty changed from ${originalEditBook.royalty_percentage}% to ${editBook.royalty_percentage}%`);
      
      if (changes.length > 0) {
        await logAudit(editBook.id, 'book_updated', `Updated "${editBook.title}": ${changes.join(', ')}.`);
      }

      setEditBook(null);
      setOriginalEditBook(null);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAddSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSale.book_id) return toast.error("Please select a book");
    
    const start = saleMode === 'single' ? newSale.period_start : newSale.period_start;
    const end = saleMode === 'single' ? newSale.period_start : newSale.period_end;
    
    if (new Date(end) < new Date(start)) {
      return toast.error("End date cannot be before start date");
    }

    const book = books.find(b => b.id === newSale.book_id);
    if (!book) return;

    const units = Number(newSale.units_sold);
    const revenue = units * book.price;
    const totalCosts = book.custom_expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    const netProfitPerBook = book.price - totalCosts;
    const royaltyPerBook = netProfitPerBook * (book.royalty_percentage / 100);
    const totalRoyalty = royaltyPerBook * units;

    try {
      const now = new Date().toISOString();
      const docRef = await addDoc(collection(db, "author_sales_reports"), {
        author_id: authorId,
        book_id: newSale.book_id,
        period_start: start,
        period_end: end,
        units_sold: units,
        revenue_generated: revenue,
        royalty_earned: totalRoyalty,
        status: newSale.status,
        created_at: now,
      });

      const addedSale: SaleReport = {
        id: docRef.id,
        book_id: newSale.book_id,
        period_start: start,
        period_end: end,
        units_sold: units,
        revenue_generated: revenue,
        royalty_earned: totalRoyalty,
        status: newSale.status,
        created_at: now,
      };

      toast.success("Sale report logged!");
      setSales([addedSale, ...sales].sort((a, b) => new Date(b.period_end).getTime() - new Date(a.period_end).getTime()));
      setIsSaleDialogOpen(false);
      
      const periodString = start === end ? start : `${start} to ${end}`;
      await logAudit(book.id, 'sale_logged', `Logged sale of ${units} units for "${book.title}" (Period: ${periodString}). Royalty generated: ₹${totalRoyalty.toFixed(2)}.`);

      const today = new Date().toISOString().split('T')[0];
      setNewSale({ book_id: "", period_start: today, period_end: today, units_sold: "", status: "pending" });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteBook = async (id: string, title: string) => {
    if (!confirm("Delete this book? It will also delete related sales.")) return;
    try {
      await deleteDoc(doc(db, "author_books", id));
      setBooks(books.filter(b => b.id !== id));
      setSales(sales.filter(s => s.book_id !== id));
      toast.success("Book deleted");
      
      await logAudit(id, 'book_deleted', `Deleted book "${title}" and all its associated sales records.`);
    } catch (err: any) {
      toast.error("Error deleting book");
    }
  };

  if (!author) return <div className="min-h-screen bg-[#FDFBF7] p-8 flex justify-center text-ink-900 font-sans text-sm">Loading...</div>;

  const previewMRP = Number(newBook.price) || 0;
  const previewCosts = newBook.custom_expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
  const previewProfit = previewMRP - previewCosts;
  const previewRoyalty = previewProfit * ((Number(newBook.royalty_percentage) || 0) / 100);

  const editPreviewMRP = Number(editBook?.price) || 0;
  const editPreviewCosts = editBook?.custom_expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0) || 0;
  const editPreviewProfit = editPreviewMRP - editPreviewCosts;
  const editPreviewRoyalty = editPreviewProfit * ((Number(editBook?.royalty_percentage) || 0) / 100);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <Button variant="ghost" className="text-ink-900/60 hover:text-ink-900 hover:bg-ink-900/5 -ml-2 md:-ml-4 font-sans text-xs md:text-sm" onClick={() => router.push('/admin/authors')}>
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> Back to Authors
        </Button>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink-900 tracking-tight leading-tight">
            {author.name}
          </h1>
          <p className="text-ink-900/70 mt-1 md:mt-2 font-sans text-xs md:text-sm">{author.email} | {author.phone}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 font-sans">
          {/* Books Management */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-ink-900/10 rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-1.5 md:gap-2"><BookOpen className="text-gold-main w-4 h-4 md:w-5 md:h-5" /> Books & Cost Structure</h2>
              <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-ink-900 hover:bg-ink-charcoal text-white text-xs md:text-sm h-8 md:h-9"><Plus className="w-3 h-3 md:w-4 md:h-4 mr-1"/> Add Book</Button>
                </DialogTrigger>
                <DialogContent className="bg-[#FDFBF7] border-ink-900/10 text-ink-900 max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] md:w-full p-4 md:p-6">
                  <DialogHeader><DialogTitle className="font-serif text-xl md:text-2xl">Add Book & Define Costs</DialogTitle></DialogHeader>
                  <form onSubmit={handleAddBook} className="space-y-4 md:space-y-6">
                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-xs md:text-sm">Book Title</Label>
                      <Input required value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} className="bg-white border-ink-900/20 focus-visible:ring-ink-900 text-sm h-9 md:h-10" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="space-y-1 md:space-y-2">
                        <Label className="text-xs md:text-sm">Retail Price (MRP) ₹</Label>
                        <Input type="number" required value={newBook.price} onChange={e => setNewBook({...newBook, price: e.target.value})} className="bg-white border-ink-900/20 focus-visible:ring-ink-900 text-sm h-9 md:h-10" />
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <Label className="text-xs md:text-sm">Author Royalty %</Label>
                        <Input type="number" required value={newBook.royalty_percentage} onChange={e => setNewBook({...newBook, royalty_percentage: e.target.value})} className="bg-white border-ink-900/20 focus-visible:ring-ink-900 text-sm h-9 md:h-10" />
                      </div>
                    </div>

                    <div className="bg-ink-900/5 p-3 md:p-4 rounded-lg space-y-3 md:space-y-4 border border-ink-900/10">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-[10px] md:text-sm uppercase tracking-wide text-ink-900/70">Custom Expenses (per book)</h4>
                        <Button type="button" variant="outline" size="sm" onClick={addExpenseToNewBook} className="h-7 md:h-8 text-[10px] md:text-xs">
                          <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1" /> Add Expense
                        </Button>
                      </div>
                      
                      {newBook.custom_expenses.length === 0 ? (
                        <p className="text-xs md:text-sm text-ink-900/50 italic">No custom expenses added yet. (Profit = 100% of MRP)</p>
                      ) : (
                        <div className="space-y-3">
                          {newBook.custom_expenses.map((expense, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start">
                              <div className="flex-1 w-full space-y-1">
                                <Label className="text-[10px] md:text-xs">Expense Name</Label>
                                <Input required placeholder="e.g. Printing" value={expense.name} onChange={e => updateExpenseInNewBook(idx, 'name', e.target.value)} className="bg-white text-xs h-8 md:h-9" />
                              </div>
                              <div className="w-full sm:w-32 space-y-1">
                                <Label className="text-[10px] md:text-xs">Amount (₹)</Label>
                                <Input type="number" required value={expense.amount} onChange={e => updateExpenseInNewBook(idx, 'amount', Number(e.target.value))} className="bg-white text-xs h-8 md:h-9" />
                              </div>
                              <div className="sm:pt-6 self-end sm:self-auto">
                                <Button type="button" variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 h-8 w-8" onClick={() => removeExpenseFromNewBook(idx)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-200">
                      <p className="text-xs md:text-sm text-green-800 flex justify-between">
                        <span>Total Costs: <strong>₹{previewCosts.toFixed(2)}</strong></span>
                        <span>Net Profit: <strong>₹{previewProfit.toFixed(2)}</strong></span>
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-green-900 mt-2 pt-2 border-t border-green-200">
                        Author Royalty Preview: ₹{previewRoyalty.toFixed(2)} per book
                      </p>
                    </div>

                    <Button type="submit" className="w-full bg-gold-main text-white hover:bg-gold-dark h-9 md:h-10 text-sm">Add Book</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* EDIT BOOK MODAL */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="bg-[#FDFBF7] border-ink-900/10 text-ink-900 max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] md:w-full p-4 md:p-6">
                <DialogHeader><DialogTitle className="font-serif text-xl md:text-2xl">Edit Book Details</DialogTitle></DialogHeader>
                {editBook && (
                  <form onSubmit={handleEditBook} className="space-y-4 md:space-y-6">
                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-xs md:text-sm">Book Title</Label>
                      <Input required value={editBook.title} onChange={e => setEditBook({...editBook, title: e.target.value})} className="bg-white border-ink-900/20 focus-visible:ring-ink-900 text-sm h-9 md:h-10" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="space-y-1 md:space-y-2">
                        <Label className="text-xs md:text-sm">Retail Price (MRP) ₹</Label>
                        <Input type="number" required value={editBook.price} onChange={e => setEditBook({...editBook, price: Number(e.target.value)})} className="bg-white border-ink-900/20 focus-visible:ring-ink-900 text-sm h-9 md:h-10" />
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <Label className="text-xs md:text-sm">Author Royalty %</Label>
                        <Input type="number" required value={editBook.royalty_percentage} onChange={e => setEditBook({...editBook, royalty_percentage: Number(e.target.value)})} className="bg-white border-ink-900/20 focus-visible:ring-ink-900 text-sm h-9 md:h-10" />
                      </div>
                    </div>

                    <div className="bg-ink-900/5 p-3 md:p-4 rounded-lg space-y-3 md:space-y-4 border border-ink-900/10">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-[10px] md:text-sm uppercase tracking-wide text-ink-900/70">Custom Expenses (per book)</h4>
                        <Button type="button" variant="outline" size="sm" onClick={addExpenseToEditBook} className="h-7 md:h-8 text-[10px] md:text-xs">
                          <Plus className="w-3 h-3 md:w-4 md:h-4 mr-1" /> Add Expense
                        </Button>
                      </div>
                      
                      {editBook.custom_expenses.length === 0 ? (
                        <p className="text-xs md:text-sm text-ink-900/50 italic">No custom expenses added yet. (Profit = 100% of MRP)</p>
                      ) : (
                        <div className="space-y-3">
                          {editBook.custom_expenses.map((expense, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start">
                              <div className="flex-1 w-full space-y-1">
                                <Label className="text-[10px] md:text-xs">Expense Name</Label>
                                <Input required placeholder="e.g. Printing" value={expense.name} onChange={e => updateExpenseInEditBook(idx, 'name', e.target.value)} className="bg-white text-xs h-8 md:h-9" />
                              </div>
                              <div className="w-full sm:w-32 space-y-1">
                                <Label className="text-[10px] md:text-xs">Amount (₹)</Label>
                                <Input type="number" required value={expense.amount} onChange={e => updateExpenseInEditBook(idx, 'amount', Number(e.target.value))} className="bg-white text-xs h-8 md:h-9" />
                              </div>
                              <div className="sm:pt-6 self-end sm:self-auto">
                                <Button type="button" variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 h-8 w-8" onClick={() => removeExpenseFromEditBook(idx)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-200">
                      <p className="text-xs md:text-sm text-green-800 flex justify-between">
                        <span>Total Costs: <strong>₹{editPreviewCosts.toFixed(2)}</strong></span>
                        <span>Net Profit: <strong>₹{editPreviewProfit.toFixed(2)}</strong></span>
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-green-900 mt-2 pt-2 border-t border-green-200">
                        Author Royalty Preview: ₹{editPreviewRoyalty.toFixed(2)} per book
                      </p>
                    </div>

                    <Button type="submit" className="w-full bg-gold-main text-white hover:bg-gold-dark h-9 md:h-10 text-sm">Update Book</Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>

            {books.length === 0 ? (
              <p className="text-ink-900/50 text-xs md:text-sm">No books added yet.</p>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {books.map(book => {
                  const totalCosts = book.custom_expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
                  const netProfit = book.price - totalCosts;
                  const authorCut = netProfit * (book.royalty_percentage / 100);

                  return (
                    <div key={book.id} className="bg-white border border-ink-900/10 p-4 md:p-5 rounded-lg hover:border-ink-900/20 transition-colors">
                      <div className="flex justify-between items-start mb-2 md:mb-3 gap-2">
                        <h3 className="font-semibold text-base md:text-lg text-ink-900 font-serif break-words leading-tight">{book.title}</h3>
                        <div className="flex gap-1 -mr-2 shrink-0">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-500 hover:bg-blue-50 hover:text-blue-600 h-7 w-7 md:h-8 md:w-8 p-0"
                            onClick={() => {
                              // Deep copy to original so we can diff later
                              setOriginalEditBook(JSON.parse(JSON.stringify(book)));
                              setEditBook(JSON.parse(JSON.stringify(book))); 
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:bg-red-50 hover:text-red-600 h-7 w-7 md:h-8 md:w-8 p-0" 
                            onClick={() => deleteBook(book.id, book.title)}
                          >
                            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 md:gap-2 text-[11px] md:text-sm text-ink-900/70 mb-2 md:mb-3 bg-ink-900/5 p-2.5 md:p-3 rounded">
                        <div>MRP: <span className="font-medium text-ink-900">₹{book.price}</span></div>
                        <div>Total Costs: <span className="font-medium text-ink-900">₹{totalCosts}</span></div>
                        <div>Net Profit: <span className="font-medium text-green-700">₹{netProfit}</span></div>
                        <div>Royalty %: <span className="font-medium text-gold-main">{book.royalty_percentage}%</span></div>
                      </div>
                      {book.custom_expenses.length > 0 && (
                        <div className="mb-2 md:mb-3 text-[10px] md:text-xs text-ink-900/60 border-t border-ink-900/10 pt-2">
                          <span className="font-medium">Expenses: </span> 
                          {book.custom_expenses.map(e => `${e.name} (₹${e.amount})`).join(', ')}
                        </div>
                      )}
                      <div className="text-xs md:text-sm font-medium text-ink-900 bg-gold-main/10 text-gold-dark p-1.5 md:p-2 rounded text-center">
                        Author earns ₹{authorCut.toFixed(2)} per book
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Sales Management */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-ink-900/10 rounded-xl p-4 md:p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-1.5 md:gap-2"><IndianRupee className="text-green-600 w-4 h-4 md:w-5 md:h-5" /> Log Sales</h2>
              <Dialog open={isSaleDialogOpen} onOpenChange={setIsSaleDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm h-8 md:h-9"><Plus className="w-3 h-3 md:w-4 md:h-4 mr-1"/> Log Sale</Button>
                </DialogTrigger>
                <DialogContent className="bg-[#FDFBF7] border-ink-900/10 text-ink-900 w-[95vw] md:w-full p-4 md:p-6">
                  <DialogHeader><DialogTitle className="font-serif text-xl md:text-2xl">Log Sales & Royalties</DialogTitle></DialogHeader>
                  <form onSubmit={handleAddSale} className="space-y-4 md:space-y-5">
                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-xs md:text-sm">Select Book</Label>
                      <Select required onValueChange={v => setNewSale({...newSale, book_id: v})}>
                        <SelectTrigger className="bg-white border-ink-900/20 focus:ring-ink-900 text-sm h-9 md:h-10"><SelectValue placeholder="Choose a book" /></SelectTrigger>
                        <SelectContent className="bg-white border-ink-900/10 text-ink-900">
                          {books.map(b => <SelectItem key={b.id} value={b.id} className="text-sm">{b.title}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 md:space-y-3 bg-ink-900/5 p-3 md:p-4 rounded-lg border border-ink-900/10">
                      <Label className="font-semibold text-ink-900 text-xs md:text-sm">Tracking Period</Label>
                      <RadioGroup value={saleMode} onValueChange={(v: "single" | "range") => setSaleMode(v)} className="flex flex-wrap gap-3 md:gap-4 mb-2">
                        <div className="flex items-center space-x-1.5 md:space-x-2">
                          <RadioGroupItem value="single" id="single" className="border-ink-900 text-ink-900 w-3 h-3 md:w-4 md:h-4" />
                          <Label htmlFor="single" className="cursor-pointer text-xs md:text-sm">Single Date</Label>
                        </div>
                        <div className="flex items-center space-x-1.5 md:space-x-2">
                          <RadioGroupItem value="range" id="range" className="border-ink-900 text-ink-900 w-3 h-3 md:w-4 md:h-4" />
                          <Label htmlFor="range" className="cursor-pointer text-xs md:text-sm">Date Range</Label>
                        </div>
                      </RadioGroup>

                      {saleMode === 'single' ? (
                        <div className="space-y-1 md:space-y-2 pt-1 md:pt-2">
                          <Label className="text-[10px] md:text-xs text-ink-900/70">Sale Date</Label>
                          <Input type="date" required value={newSale.period_start} onChange={e => setNewSale({...newSale, period_start: e.target.value, period_end: e.target.value})} className="bg-white border-ink-900/20 focus-visible:ring-ink-900 text-xs md:text-sm h-8 md:h-9" />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 md:gap-4 pt-1 md:pt-2">
                          <div className="space-y-1 md:space-y-2">
                            <Label className="text-[10px] md:text-xs text-ink-900/70">From Date</Label>
                            <Input type="date" required value={newSale.period_start} onChange={e => setNewSale({...newSale, period_start: e.target.value})} className="bg-white border-ink-900/20 focus-visible:ring-ink-900 text-xs md:text-sm h-8 md:h-9" />
                          </div>
                          <div className="space-y-1 md:space-y-2">
                            <Label className="text-[10px] md:text-xs text-ink-900/70">To Date</Label>
                            <Input type="date" required value={newSale.period_end} onChange={e => setNewSale({...newSale, period_end: e.target.value})} className="bg-white border-ink-900/20 focus-visible:ring-ink-900 text-xs md:text-sm h-8 md:h-9" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-xs md:text-sm">Units Sold</Label>
                      <Input type="number" required value={newSale.units_sold} onChange={e => setNewSale({...newSale, units_sold: e.target.value})} className="bg-white border-ink-900/20 focus-visible:ring-ink-900 text-sm h-9 md:h-10" />
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <Label className="text-xs md:text-sm">Payment Status</Label>
                      <Select value={newSale.status} onValueChange={v => setNewSale({...newSale, status: v})}>
                        <SelectTrigger className="bg-white border-ink-900/20 focus:ring-ink-900 text-sm h-9 md:h-10"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-white border-ink-900/10 text-ink-900">
                          <SelectItem value="pending" className="text-sm">Pending</SelectItem>
                          <SelectItem value="paid" className="text-sm">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700 h-9 md:h-10 text-sm">Log Sales</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {sales.length === 0 ? (
              <p className="text-ink-900/50 text-xs md:text-sm">No sales logged yet.</p>
            ) : (
              <div className="overflow-x-auto border border-ink-900/10 rounded-lg">
                <Table className="min-w-[400px]">
                  <TableHeader className="bg-ink-900/5">
                    <TableRow className="border-ink-900/10 hover:bg-transparent">
                      <TableHead className="text-ink-900/70 font-medium text-[10px] md:text-xs">Period</TableHead>
                      <TableHead className="text-ink-900/70 font-medium text-[10px] md:text-xs">Units</TableHead>
                      <TableHead className="text-ink-900/70 font-medium text-[10px] md:text-xs">Royalty</TableHead>
                      <TableHead className="text-right text-ink-900/70 font-medium text-[10px] md:text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sales.map(sale => {
                      const isSingle = sale.period_start === sale.period_end;
                      const startDate = new Date(sale.period_start).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                      const endDate = new Date(sale.period_end).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                      const displayPeriod = isSingle ? startDate : `${startDate} - ${endDate}`;

                      return (
                        <TableRow key={sale.id} className="border-ink-900/10 hover:bg-ink-900/5 transition-colors">
                          <TableCell className="text-ink-900 font-medium text-[10px] md:text-xs whitespace-nowrap">{displayPeriod}</TableCell>
                          <TableCell className="text-ink-900/80 text-[11px] md:text-sm">{sale.units_sold}</TableCell>
                          <TableCell className="text-green-600 font-semibold text-[11px] md:text-sm">₹{sale.royalty_earned}</TableCell>
                          <TableCell className="text-right">
                            <Select value={sale.status} onValueChange={(v) => updateSaleStatus(sale.id, v)}>
                              <SelectTrigger className={`h-6 w-24 text-[9px] md:text-[10px] uppercase font-semibold tracking-wider ml-auto border ${sale.status === 'paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-ink-900/10 text-ink-900">
                                <SelectItem value="pending" className="text-xs">Pending</SelectItem>
                                <SelectItem value="paid" className="text-xs">Paid</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </motion.div>
        </div>

        {/* AUDIT LOG SECTION */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white border border-ink-900/10 rounded-xl p-4 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-1.5 md:gap-2 mb-4 md:mb-6 text-ink-900 font-serif">
            <History className="text-gold-main w-4 h-4 md:w-5 md:h-5" /> Activity & Transparency Log
          </h2>
          
          {logs.length === 0 ? (
            <p className="text-ink-900/50 text-xs md:text-sm italic">No activity recorded yet.</p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {logs.map(log => {
                const isSystemLog = log.action_type === 'sale_logged' || log.action_type === 'book_created';
                return (
                  <div key={log.id} className="flex gap-3 md:gap-4 items-start p-2 md:p-3 hover:bg-ink-900/5 rounded-lg transition-colors">
                    <div className="pt-0.5 md:pt-1">
                      <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mt-1 md:mt-1.5 ${isSystemLog ? 'bg-green-500' : 'bg-gold-main'}`} />
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-ink-900 leading-relaxed font-sans">{log.description}</p>
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
        </motion.div>

      </div>
    </div>
  );
}
