import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "I'm a beginner. Can I participate?",
      answer: "Absolutely! Anyone can join - no matter your age, experience, or background. We welcome writers of all levels, from complete beginners to experienced authors. The judges will evaluate your work fairly and provide valuable feedback.",
      icon: "🌱"
    },
    {
      question: "Is there an age limit?",
      answer: "No age limit at all! Whether you're 15 or 75, if you can write, you can win. We believe creativity has no age boundaries.",
      icon: "🎂"
    },
    {
      question: "What kind of writing can I submit?",
      answer: "We accept all genres - love poetry, storytelling, philosophical writing, social commentary, and more. You can write in Hindi, English, Urdu, or any regional language. Your unique voice is what matters most.",
      icon: "📝"
    },
    {
      question: "Will I really get published?",
      answer: "Yes! We will print and publish the top 200-250 writings in a book launched globally. Additionally, the top 100 writers will receive guidance to publish their own individual poetry books.",
      icon: "📚"
    },
    {
      question: "Is ₹249 the total fee?",
      answer: "₹249 is for Stage 1 (Silver Tier). If you qualify for Stage 2 (Gold Tier), you get 1 submission for free. Additional submissions cost ₹99 for 2 entries or ₹180 for 3 entries (maximum).",
      icon: "💰"
    },
    {
      question: "How will I receive my certificate and report?",
      answer: "Certificates and detailed judging reports will be sent digitally after the competition concludes. The certificate has lifetime validity and includes a unique author code for verification.",
      icon: "🏅"
    },
    {
      question: "When will the results be announced?",
      answer: "Results will be announced within 30 days of the competition deadline. Winners will be notified via email and announced on our social media platforms.",
      icon: "📅"
    },
    {
      question: "How do I register and pay?",
      answer: "Simply click the 'Register Now' button, scan the QR code, or visit inkfetish.live. We accept all major payment methods and provide instant confirmation.",
      icon: "💳"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Background FAQ elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-8 text-4xl opacity-10 animate-float">❓</div>
        <div className="absolute bottom-24 right-12 text-5xl opacity-10 animate-pulse delay-1000">💡</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-10 animate-bounce delay-2000">🤔</div>
        <div className="absolute bottom-1/4 left-1/5 text-4xl opacity-10 animate-float delay-3000">✨</div>
        <div className="absolute top-40 right-40 text-3xl opacity-10 animate-pulse delay-4000">📋</div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header with FAQ visual */}
        <div className="text-center mb-12">
          {/* FAQ help visual */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full p-4 md:p-6 border border-purple-200 relative">
              <div className="flex items-center gap-3 md:gap-4 text-2xl md:text-3xl">
                <span className="animate-bounce">❓</span>
                <span className="animate-pulse">💡</span>
                <span className="animate-bounce delay-500">✅</span>
              </div>
              {/* Help indicators */}
              <div className="absolute -top-3 left-6 text-xs bg-white px-2 py-1 rounded-full border border-purple-200">Help</div>
              <div className="absolute -top-3 right-6 text-xs bg-green-100 px-2 py-1 rounded-full border border-green-200">Answers</div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
            ❓ Frequently Asked Questions
          </h2>
          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto">
            Got questions? We've got answers. Here's everything you need to know.
          </p>
          
          {/* FAQ journey visual */}
          <div className="hidden md:flex justify-center items-center gap-6 mt-6">
            <div className="bg-purple-100 p-4 rounded-xl border border-purple-200 text-center">
              <div className="text-2xl mb-2">🤔</div>
              <div className="text-sm text-gray-600">Question</div>
            </div>
            <div className="text-2xl text-purple-600">→</div>
            <div className="bg-indigo-100 p-4 rounded-xl border border-indigo-200 text-center">
              <div className="text-2xl mb-2">💡</div>
              <div className="text-sm text-gray-600">Answer</div>
            </div>
            <div className="text-2xl text-indigo-600">→</div>
            <div className="bg-green-100 p-4 rounded-xl border border-green-200 text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-sm text-gray-600">Clarity</div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-purple-200 bg-white backdrop-blur-sm rounded-lg px-4 md:px-6 hover:border-purple-300 transition-all duration-300 shadow-sm relative overflow-hidden group"
              >
                {/* Background question icon */}
                <div className="absolute top-4 right-4 md:right-6 text-xl md:text-2xl opacity-10 group-hover:opacity-20 transition-opacity">
                  {faq.icon}
                </div>
                
                <AccordionTrigger className="text-left font-semibold text-base md:text-lg hover:no-underline py-4 md:py-6 text-gray-900 relative z-10">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-lg md:text-2xl">{faq.icon}</span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-4 md:pb-6 leading-relaxed ml-8 md:ml-11 relative z-10 text-sm md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Enhanced help section with visuals */}
        <div className="mt-12 md:mt-16 text-center bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-200 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-8 text-4xl">💬</div>
            <div className="absolute bottom-4 right-8 text-4xl">📱</div>
            <div className="absolute top-1/2 left-1/4 text-3xl">🌐</div>
            <div className="absolute top-1/4 right-1/4 text-3xl">✨</div>
          </div>
          
          {/* Help visual header */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="bg-white/50 rounded-full p-3 md:p-4 border border-purple-200">
              <div className="flex items-center gap-2 text-xl md:text-2xl">
                <span className="animate-bounce">🤝</span>
                <span className="animate-pulse">💬</span>
                <span className="animate-bounce delay-500">📞</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 relative z-10">
            Still Have Questions?
          </h3>
          <p className="text-gray-700 mb-4 md:mb-6 max-w-2xl mx-auto relative z-10 text-sm md:text-base">
            We're here to help! Reach out to us on Instagram @inkk.fetish or visit our website for more details.
          </p>
          
          {/* Enhanced contact options */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 relative z-10">
            <div className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-xl px-4 md:px-6 py-3 md:py-4 hover:border-purple-300 transition-colors group">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">📱</span>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">Follow us</div>
                  <div className="text-xs md:text-sm text-gray-600">@inkk.fetish</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-xl px-4 md:px-6 py-3 md:py-4 hover:border-purple-300 transition-colors group">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">🌐</span>
                <div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">Visit Website</div>
                  <div className="text-xs md:text-sm text-gray-600">inkfetish.live</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Response time indicator */}
          <div className="mt-4 md:mt-6 bg-white/50 rounded-xl p-3 border border-green-200 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-green-700 text-xs md:text-sm">
              <span className="text-base md:text-lg">⚡</span>
              <span className="font-semibold">We respond within 2 hours!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;