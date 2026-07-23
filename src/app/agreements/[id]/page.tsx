"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileCheck, Clock, ShieldCheck, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AgreementCertificatePage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [agreement, setAgreement] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/agreements/${id}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setAgreement(data.agreement);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold text-destructive">Agreement Not Found</h1>
      </div>
    );
  }

  const isCompleted = agreement.status === 'completed';

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Agreement Tracker</h1>
        {isCompleted ? (
          <Badge variant="default" className="bg-green-500 text-sm px-3 py-1 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Fully Executed
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-sm px-3 py-1 flex items-center gap-1">
            <Clock className="w-4 h-4" /> Pending Signatures
          </Badge>
        )}
      </div>

      <Card className={`shadow-2xl border-4 ${isCompleted ? 'border-green-500/30' : 'border-primary/10'}`}>
        <CardHeader className={`text-center pb-8 pt-10 ${isCompleted ? 'bg-green-50/30' : 'bg-muted/30'}`}>
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <FileCheck className={`w-10 h-10 ${isCompleted ? 'text-green-600' : 'text-primary'}`} />
          </div>
          <CardTitle className="text-4xl font-serif tracking-tight uppercase">
            {agreement.title}
          </CardTitle>
          <CardDescription className="text-lg mt-2 flex flex-col items-center gap-2">
            <span>Agreement ID: <span className="font-mono text-xs text-muted-foreground">{agreement.id}</span></span>
            <span>Created on: {new Date(agreement.created_at).toLocaleDateString()}</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-10 px-8 pb-12 space-y-10">
          {agreement.amount && (
            <div className="text-center">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Agreed Amount</h3>
              <p className="text-3xl font-bold">{agreement.amount}</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-bold text-muted-foreground uppercase tracking-widest border-b pb-2 mb-6 text-center">
              Parties & Signatures
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {agreement.parties.map((party: any, index: number) => (
                <div key={party.id} className="border rounded-xl p-6 bg-card relative">
                  {party.has_signed && (
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white p-1 rounded-full shadow-lg">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  )}
                  <h4 className="font-bold text-lg mb-1">{party.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{party.email || party.phone}</p>
                  
                  {party.has_signed ? (
                    <div className="mt-4 p-4 bg-green-50/50 rounded border border-green-100 space-y-2">
                      <p className="text-xs text-muted-foreground uppercase">Digitally Signed On</p>
                      <p className="text-sm font-medium">{new Date(party.signed_at).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground uppercase mt-3">Signature</p>
                      <p className="text-2xl font-serif italic text-primary">{party.signature_data}</p>
                    </div>
                  ) : (
                    <div className="mt-4 p-4 bg-muted rounded border border-dashed flex items-center justify-center min-h-[100px]">
                      <span className="text-sm text-muted-foreground italic">Awaiting Signature...</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isCompleted && (
            <div className="text-center pt-8 border-t">
              <p className="text-muted-foreground mb-6">
                This document is a legally binding agreement digitally signed by all required parties.
              </p>
              <Button onClick={() => window.print()} className="gap-2" variant="outline">
                <Download className="w-4 h-4" /> Print / Save as PDF
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
