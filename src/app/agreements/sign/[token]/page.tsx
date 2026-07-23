"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function SignAgreementPage() {
  const params = useParams();
  const token = params.token as string;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [partyData, setPartyData] = useState<any>(null);
  const [signature, setSignature] = useState("");
  const [isSigning, setIsSigning] = useState(false);

  useEffect(() => {
    if (!token) return;

    fetch(`/api/agreements/${token}/sign`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toast.error(data.error);
        } else {
          setPartyData(data.party);
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load agreement details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signature.trim()) {
      toast.error("Please enter your signature");
      return;
    }
    // simple validation: ensure they typed their name roughly
    if (signature.toLowerCase().trim() !== partyData.name.toLowerCase().trim()) {
      toast.error(`Please type your name exactly as: ${partyData.name}`);
      return;
    }

    setIsSigning(true);
    try {
      const res = await fetch(`/api/agreements/${token}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signatureData: signature }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Failed to sign");

      toast.success("Successfully signed!");
      // Reload to show signed state
      setPartyData({ ...partyData, has_signed: true, signature_data: signature, signed_at: new Date().toISOString() });

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSigning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!partyData) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold text-destructive">Invalid or Expired Link</h1>
        <p className="text-muted-foreground mt-2">The signing link you used is not valid.</p>
      </div>
    );
  }

  const agreement = partyData.agreements;

  if (partyData.has_signed) {
    return (
      <div className="container mx-auto py-10 max-w-2xl">
        <Card className="shadow-lg border-2 border-green-500/20 text-center">
          <CardHeader className="bg-green-50/50 pb-8 pt-10">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-800">You have signed this agreement</CardTitle>
            <CardDescription className="text-lg mt-2">
              Thank you, {partyData.name}. Your signature has been securely recorded.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="p-4 bg-muted rounded-lg text-left">
              <p><strong>Agreement:</strong> {agreement.title}</p>
              <p><strong>Signed On:</strong> {new Date(partyData.signed_at).toLocaleString()}</p>
              <p><strong>Signature:</strong> <span className="font-serif italic border-b text-lg">{partyData.signature_data}</span></p>
            </div>
            <div className="mt-8">
              <Link href={`/agreements/${agreement.id}`}>
                <Button variant="outline" className="w-full h-12">View Final Agreement Status</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Card className="shadow-xl border-t-4 border-t-primary">
        <CardHeader className="pb-8">
          <div className="flex items-center justify-center mb-6">
            <ShieldCheck className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold text-center">Review & Sign</CardTitle>
          <CardDescription className="text-center text-lg mt-2">
            Please review the agreement details below before signing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-6 rounded-lg space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Agreement Title</h3>
              <p className="text-xl font-medium">{agreement.title}</p>
            </div>
            {agreement.amount && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Amount</h3>
                <p className="text-xl font-medium">{agreement.amount}</p>
              </div>
            )}
            <div className="pt-4 border-t border-dashed">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Signee Information</h3>
              <p className="text-lg font-medium">{partyData.name}</p>
              <p className="text-muted-foreground">{partyData.email || partyData.phone}</p>
            </div>
          </div>

          <form onSubmit={handleSign} className="bg-card border rounded-lg p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="signature" className="text-base font-semibold">Digital Signature</Label>
              <p className="text-sm text-muted-foreground mb-2">
                By typing your full name below, you are signing this document electronically. Type exactly: <strong>{partyData.name}</strong>
              </p>
              <Input 
                id="signature" 
                placeholder={`Type "${partyData.name}"`}
                value={signature} 
                onChange={(e) => setSignature(e.target.value)} 
                required
                className="h-14 text-lg font-serif italic"
              />
            </div>
            <Button type="submit" className="w-full h-14 text-lg font-bold" disabled={isSigning}>
              {isSigning ? "Signing securely..." : "I Agree & Sign Document"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
