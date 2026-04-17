"use client";

import React, { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Copy, Download, QrCode, Send, RefreshCw } from 'lucide-react';

export default function AnthologyQRGenerator() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const qrRef = useRef<SVGSVGElement>(null);

  const handleGenerate = async () => {
    if (!content.trim()) {
      toast.error('Please enter some poetry content.');
      return;
    }

    setLoading(true);
    try {
      if (!supabase) {
        throw new Error('Supabase client is not initialized. Please check your environment variables (NEXT_PUBLIC_VITE_SUPABASE_URL and NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY).');
      }

      const { data, error } = await supabase
        .from('iwl_anthology_poetry')
        .insert([
          { 
            content: content.trim(), 
            title: title.trim(), 
            author_name: author.trim() 
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setGeneratedId(data.id);
      toast.success('Anthology link generated successfully!');
    } catch (error: any) {
      console.error('Error generating link:', error);
      toast.error(error.message || 'Failed to generate link. Please check if the table exists.');
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = generatedId 
    ? `${window.location.origin}/indianwritersleague/season1/anthology/${generatedId}` 
    : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Link copied to clipboard!');
  };

  const downloadQR = () => {
    if (!qrRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(qrRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `iwl-qr-${generatedId?.slice(0, 8)}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const reset = () => {
    setGeneratedId(null);
    setContent('');
    setTitle('');
    setAuthor('');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            IWL Anthology QR Generator
          </h1>
          <p className="mt-3 text-xl text-slate-500 max-w-2xl mx-auto">
            Create high-authority poetry links and QR codes for the Indian Writers League Season 1 Anthology.
          </p>
        </div>

        {!generatedId ? (
          <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <QrCode className="w-6 h-6 text-indigo-600" />
                Submission Details
              </CardTitle>
              <CardDescription>
                Paste the poetry content below. Each submission generates a unique ID and QR code.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Poetry Title (Optional)</label>
                  <Input 
                    placeholder="Enter title..." 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-slate-200 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Author Name (Optional)</label>
                  <Input 
                    placeholder="Enter author..." 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border-slate-200 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Poetry Content *</label>
                <Textarea 
                  placeholder="Paste the poetry here..." 
                  className="min-h-[300px] border-slate-200 focus:ring-indigo-500 text-lg leading-relaxed font-serif"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={loading}
                className="w-full h-12 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-200"
              >
                {loading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <QrCode className="w-5 h-5 mr-2" />
                    Generate QR & Link
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-none shadow-2xl bg-white overflow-hidden animate-in fade-in zoom-in duration-500">
            <div className="h-2 bg-indigo-600 w-full" />
            <CardContent className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 space-y-6 text-center md:text-left">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">Link Generated!</h2>
                    <p className="text-slate-500 mt-1">Your poetry is now live and ready to be scanned.</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Public URL</label>
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 group">
                      <span className="text-indigo-600 font-mono text-sm truncate flex-1">{shareUrl}</span>
                      <Button variant="ghost" size="icon" onClick={copyToClipboard} className="hover:bg-indigo-50 text-indigo-600">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                    <Button onClick={downloadQR} className="bg-indigo-600 hover:bg-indigo-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download QR
                    </Button>
                    <Button variant="outline" onClick={reset}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Create New
                    </Button>
                    <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" className="text-slate-600">
                        <Send className="h-4 w-4 mr-2" />
                        Preview Page
                      </Button>
                    </a>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow-inner border border-slate-100">
                  <QRCodeSVG 
                    ref={qrRef}
                    value={shareUrl} 
                    size={200}
                    level="H"
                    includeMargin={true}
                    imageSettings={{
                      src: "/images/inkfetish_logo.png",
                      x: undefined,
                      y: undefined,
                      height: 40,
                      width: 40,
                      excavate: true,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-slate-400 text-sm">
          Powered by Inkfetish Publications © 2026
        </div>
      </div>
    </div>
  );
}
