import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help & Support | Inkfetish',
  description: 'Submit a ticket for help and support.',
};

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Help & Support
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="mt-8 relative w-full h-[800px] overflow-hidden rounded-md">
          {/* Iframe used to isolate Zoho scripts and prevent conflicts with React */}
          <iframe 
            src="/zoho-help-form.html" 
            className="w-full h-full border-0"
            title="Zoho Support Web To Case Form"
          />
        </div>
      </div>
    </div>
  );
}
