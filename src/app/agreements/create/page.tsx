"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Link as LinkIcon, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface Party {
  name: string;
  email: string;
  phone: string;
}

export default function CreateAgreementPage() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [parties, setParties] = useState<Party[]>([{ name: "", email: "", phone: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // After creation
  const [createdAgreement, setCreatedAgreement] = useState<any>(null);
  const [createdParties, setCreatedParties] = useState<any[]>([]);

  const addParty = () => {
    setParties([...parties, { name: "", email: "", phone: "" }]);
  };

  const removeParty = (index: number) => {
    if (parties.length > 1) {
      setParties(parties.filter((_, i) => i !== index));
    }
  };

  const updateParty = (index: number, field: keyof Party, value: string) => {
    const newParties = [...parties];
    newParties[index][field] = value;
    setParties(newParties);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate
      if (!title) throw new Error("Title is required");
      if (parties.some(p => !p.name)) throw new Error("All parties must have a name");

      const res = await fetch("/api/agreements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount, parties }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create agreement");

      setCreatedAgreement(data.agreement);
      setCreatedParties(data.parties);
      toast.success("Agreement created successfully!");

    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = (token: string) => {
    const link = `${window.location.origin}/agreements/sign/${token}`;
    navigator.clipboard.writeText(link);
    toast.success("Signing link copied to clipboard");
  };

  if (createdAgreement) {
    return (
      <div className="container mx-auto py-10 max-w-3xl">
        <Card className="shadow-lg border-2 border-primary/20">
          <CardHeader className="text-center bg-muted/50 pb-8 pt-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold">Agreement Created!</CardTitle>
            <CardDescription className="text-lg mt-2">
              Share the unique signing links below with the respective parties.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold text-lg">{createdAgreement.title}</h3>
              {createdAgreement.amount && <p className="text-muted-foreground">Amount: {createdAgreement.amount}</p>}
              <div className="mt-2 text-sm text-muted-foreground">
                <Link href={`/agreements/${createdAgreement.id}`} className="text-primary hover:underline flex items-center gap-1">
                  View Final Agreement Page <LinkIcon className="w-3 h-3"/>
                </Link>
                <p className="text-xs mt-1">(Will show 'Completed' once everyone signs)</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Signing Links:</h4>
              {createdParties.map((party, idx) => (
                <div key={party.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                  <div>
                    <p className="font-medium text-lg">Party {idx + 1}: {party.name}</p>
                    <p className="text-sm text-muted-foreground">{party.email || party.phone || "No contact info provided"}</p>
                  </div>
                  <Button onClick={() => copyLink(party.token)} className="shrink-0 gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Copy Link
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6 pb-6">
            <Button variant="outline" onClick={() => {
              setCreatedAgreement(null);
              setTitle("");
              setAmount("");
              setParties([{ name: "", email: "", phone: "" }]);
            }}>
              Create Another Agreement
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Card className="shadow-lg border-2 border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-8 pt-8">
          <CardTitle className="text-3xl font-extrabold tracking-tight">Create Agreement</CardTitle>
          <CardDescription className="text-lg">
            Generate a new multi-party agreement and get unique signing links.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-semibold">Agreement Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Non-Disclosure Agreement, Service Contract" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-base font-semibold">Amount (Optional)</Label>
                <Input 
                  id="amount" 
                  placeholder="e.g. ₹10,000 or $500" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-dashed">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-lg font-semibold">Parties Involved</Label>
                <Button type="button" variant="outline" size="sm" onClick={addParty} className="gap-1">
                  <Plus className="w-4 h-4" /> Add Party
                </Button>
              </div>
              
              <div className="space-y-4">
                {parties.map((party, index) => (
                  <Card key={index} className="overflow-hidden border-primary/20">
                    <div className="bg-muted px-4 py-2 flex justify-between items-center border-b">
                      <span className="font-medium">Party {index + 1}</span>
                      {parties.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => removeParty(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <CardContent className="pt-4 pb-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Full Name <span className="text-red-500">*</span></Label>
                        <Input 
                          placeholder="John Doe" 
                          value={party.name} 
                          onChange={(e) => updateParty(index, "name", e.target.value)} 
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Email (Optional)</Label>
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            value={party.email} 
                            onChange={(e) => updateParty(index, "email", e.target.value)} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone (Optional)</Label>
                          <Input 
                            type="tel" 
                            placeholder="+91 9876543210" 
                            value={party.phone} 
                            onChange={(e) => updateParty(index, "phone", e.target.value)} 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-medium" disabled={isSubmitting}>
              {isSubmitting ? "Generating Agreement..." : "Create Agreement & Get Links"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
