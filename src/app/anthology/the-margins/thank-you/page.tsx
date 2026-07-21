import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Heart, ArrowLeft } from 'lucide-react';

export default function MarginsThankYouPage({
  searchParams,
}: {
  searchParams: { order_id?: string };
}) {
  const orderId = searchParams.order_id;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .bg-typewriter-paper { 
            background-color: #F5EEDB;
            background-image: radial-gradient(#d3c6a6 1px, transparent 1px);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
        }
      `}} />

      <div className="min-h-screen bg-[#F05C33] text-[#111] font-inter selection:bg-[#111] selection:text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] border-[10px] border-[#111] rounded-full mix-blend-overlay"></div>
          <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] border-[10px] border-[#111] rounded-full mix-blend-overlay"></div>
        </div>

        <div className="max-w-2xl w-full relative z-10">
          <div className="bg-[#111] border-4 border-white p-8 md:p-12 shadow-2xl relative text-center">
            
            <div className="w-24 h-24 bg-[#F05C33] rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-[#111] shadow-[0_0_30px_rgba(240,92,51,0.5)] transform -translate-y-16 absolute left-1/2 -ml-12 top-0">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>

            <div className="mt-8">
              <span className="font-mono text-[#F05C33] font-bold text-xs uppercase tracking-widest bg-[#F05C33]/20 px-3 py-1 rounded-sm mb-4 inline-block">
                Transaction Successful
              </span>
              <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase tracking-widest mb-6">
                Your Legacy Is Secured
              </h1>
              
              <div className="bg-white/5 border border-white/10 p-6 mb-8 text-left">
                <p className="text-white/80 font-inter text-sm leading-relaxed mb-4">
                  Thank you for securing your copy of <strong>The Margins: The Official Collection of Top 200 Hall of Fame Poets</strong>. Your order has been successfully placed.
                </p>
                <p className="text-white/80 font-inter text-sm leading-relaxed">
                  We are preparing your collector's edition. You will receive tracking details on your provided WhatsApp number once your book is dispatched.
                </p>
              </div>

              {orderId && (
                <div className="bg-[#F5EEDB] p-4 border border-[#111] mb-8 inline-block w-full max-w-sm mx-auto">
                  <span className="block text-xs font-oswald text-[#111]/70 uppercase tracking-widest mb-1">Order Reference ID</span>
                  <span className="block font-mono font-bold text-lg text-[#111] break-all">{orderId}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link 
                  href="/anthology/the-margins"
                  className="bg-[#F05C33] text-white px-8 py-4 font-oswald font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#111] transition-colors border-2 border-transparent hover:border-[#111] flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Page
                </Link>
                <Link 
                  href="/"
                  className="bg-transparent text-white border-2 border-white/30 px-8 py-4 font-oswald font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-[#111] transition-colors flex items-center justify-center gap-2"
                >
                  Explore Inkfetish <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-center gap-2 text-white/40 text-xs font-mono">
                <Heart className="w-3 h-3 fill-current text-[#F05C33]/50" /> Curated with love by Inkfetish Publications
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
