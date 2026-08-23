"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type Author = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  created_at: string;
};

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('author_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const list: Author[] = (data || []).map((docSnap: any) => ({
        id: docSnap.id,
        name: docSnap.name || "Author",
        phone: docSnap.phone || "N/A",
        email: docSnap.email || null,
        created_at: docSnap.created_at,
      }));

      setAuthors(list);
    } catch (error: any) {
      toast.error("Failed to load authors: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleCreateAuthor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.name || !newAuthor.phone) {
      toast.error("Name and Phone are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('author_profiles')
        .insert([
          {
            name: newAuthor.name,
            phone: newAuthor.phone,
            email: newAuthor.email || null,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const created: Author = {
        id: data.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        created_at: data.created_at,
      };

      toast.success("Author created successfully!");
      setAuthors([created, ...authors]);
      setIsDialogOpen(false);
      setNewAuthor({ name: "", phone: "", email: "" });
    } catch (error: any) {
      toast.error("Failed to create author: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Dashboard link copied to clipboard!");
  };

  const deleteAuthor = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author?")) return;
    
    try {
      const { error } = await supabase
        .from('author_profiles')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Author deleted.");
      setAuthors(authors.filter((a) => a.id !== id));
    } catch (error: any) {
      toast.error("Failed to delete author: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-ink-900 font-serif selection:bg-ink-900 selection:text-[#FDFBF7] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-ink-900 tracking-tight">
              Authors Management
            </h1>
            <p className="text-ink-900/60 mt-1 font-sans">Manage publishing authors, their sales, and royalties.</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ink-900 hover:bg-ink-charcoal text-white font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Add New Author
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#FDFBF7] text-ink-900 border border-ink-900/10 font-sans">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">Create New Author Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateAuthor} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newAuthor.name}
                    onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                    className="bg-white border-ink-900/20 focus-visible:ring-ink-900"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={newAuthor.phone}
                    onChange={(e) => setNewAuthor({ ...newAuthor, phone: e.target.value })}
                    className="bg-white border-ink-900/20 focus-visible:ring-ink-900"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAuthor.email}
                    onChange={(e) => setNewAuthor({ ...newAuthor, email: e.target.value })}
                    className="bg-white border-ink-900/20 focus-visible:ring-ink-900"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-gold-main hover:bg-gold-dark text-white font-semibold mt-4 transition-colors"
                >
                  {isSubmitting ? "Creating..." : "Create Author"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-ink-900/10 rounded-xl overflow-hidden shadow-sm font-sans"
        >
          {loading ? (
            <div className="p-8 text-center text-ink-900/60">Loading authors...</div>
          ) : authors.length === 0 ? (
            <div className="p-8 text-center text-ink-900/60">
              No authors found. Create your first author profile to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-ink-900/10 hover:bg-transparent">
                    <TableHead className="text-ink-900/60 font-medium">Name</TableHead>
                    <TableHead className="text-ink-900/60 font-medium">Contact</TableHead>
                    <TableHead className="text-ink-900/60 font-medium">Added On</TableHead>
                    <TableHead className="text-right text-ink-900/60 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {authors.map((author) => {
                    const dashboardUrl = typeof window !== 'undefined' 
                      ? `${window.location.origin}/author/dashboard/${author.id}`
                      : `/author/dashboard/${author.id}`;

                    return (
                      <TableRow key={author.id} className="border-ink-900/10 hover:bg-ink-900/5 transition-colors">
                        <TableCell className="font-semibold text-ink-900">{author.name}</TableCell>
                        <TableCell className="text-ink-900/70">
                          <div>{author.phone}</div>
                          <div className="text-xs text-ink-900/50">{author.email || 'No email'}</div>
                        </TableCell>
                        <TableCell className="text-ink-900/70">
                          {new Date(author.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-ink-900/20 bg-transparent hover:bg-ink-900/5 text-ink-900"
                              onClick={() => copyToClipboard(dashboardUrl)}
                              title="Copy secure link for author"
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Copy Link
                            </Button>
                            <Link href={`/admin/authors/${author.id}`}>
                              <Button 
                                size="sm" 
                                className="bg-ink-900 hover:bg-ink-charcoal text-white"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Manage
                              </Button>
                            </Link>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => deleteAuthor(author.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
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
    </div>
  );
}
