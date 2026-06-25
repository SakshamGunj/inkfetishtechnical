const fs = require('fs');
const file = 'src/app/shakespeare-award-v2/register/RegisterClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add useRef import
content = content.replace(/import React, \{ useState, useEffect \} from 'react';/, "import React, { useState, useEffect, useRef } from 'react';");

// Add formRef and isFormFilled state
content = content.replace(/const router = useRouter\(\);/, `const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  
  const isFormFilled = formData.name && formData.email && formData.phone.length === 10 && formData.city && formData.state && formData.address1 && formData.pincode;
  
  const handleMobileCtaClick = () => {
    if (isFormFilled) {
      if (formRef.current) formRef.current.requestSubmit();
    } else {
      if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };`);

// Add ref to the form
content = content.replace(/<form onSubmit=\{handleSubmit\}/, '<form ref={formRef} onSubmit={handleSubmit}');

// Change form button text
content = content.replace(/"Proceed to Secure Checkout — ₹699"/, '"Secure My Spot Now — ₹699"');

// Add Mobile Sticky CTA at the end of the main div
const stickyCta = `
      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-[#14100C]/95 backdrop-blur-md border-t border-gold/20 z-50">
        <button 
          onClick={handleMobileCtaClick}
          disabled={isProcessing}
          className={\`w-full relative group overflow-hidden bg-gradient-to-b from-[#ebd298] to-[#c5a059] hover:from-[#fdfbf7] hover:to-[#ebd298] text-[#14100C] transition-all py-4 font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 \${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}\`}
        >
          <Lock className="w-4 h-4" />
          {isProcessing ? "Securing..." : (isFormFilled ? "Secure My Spot Now — ₹699" : "Complete Details to Pay")}
        </button>
      </div>
    </div>
  );
}`;

content = content.replace(/    <\/div>\n  \);\n\}/, stickyCta);

fs.writeFileSync(file, content);
console.log('Mobile CTA added successfully.');
