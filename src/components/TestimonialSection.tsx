import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Priya S.",
      location: "Bihar",
      avatar: "👩‍🎓",
      avatarBg: "from-purple-400 to-pink-500",
      quote: "I never thought my poem could go this far. Inkfetish gave me confidence and clarity. Now my book is coming out next month!",
      highlight: "Published Author",
      illustration: "📚",
      successIcon: "🏆"
    },
    {
      name: "Rohan M.", 
      location: "Pune",
      avatar: "👨‍💼",
      avatarBg: "from-blue-400 to-indigo-500",
      quote: "I joined just for fun. But I ended up winning the 2nd prize and got my work published. Total game changer!",
      highlight: "₹40,000 Winner",
      illustration: "💰",
      successIcon: "🥈"
    },
    {
      name: "Sunita G.",
      location: "Delhi", 
      avatar: "👩‍🏫",
      avatarBg: "from-green-400 to-teal-500",
      quote: "The judging report helped me improve my writing massively. This is the best writing event in India!",
      highlight: "Published Writer",
      illustration: "📝",
      successIcon: "✨"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background testimonial elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-12 text-4xl opacity-10 animate-float">💬</div>
        <div className="absolute bottom-24 right-16 text-5xl opacity-10 animate-pulse delay-1000">⭐</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-10 animate-bounce delay-2000">👥</div>
        <div className="absolute bottom-1/4 left-1/5 text-4xl opacity-10 animate-float delay-3000">🎉</div>
        <div className="absolute top-40 right-40 text-3xl opacity-10 animate-pulse delay-4000">📈</div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header with testimonial visual */}
        <div className="text-center mb-12">
          {/* Success stories visual header */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full p-4 md:p-6 border border-indigo-200 relative">
              <div className="flex items-center gap-3 md:gap-4 text-2xl md:text-3xl">
                <span className="animate-bounce">💬</span>
                <span className="animate-pulse">⭐</span>
                <span className="animate-bounce delay-500">🏆</span>
              </div>
              {/* Success indicators */}
              <div className="absolute -top-3 left-6 text-xs bg-white px-2 py-1 rounded-full border border-indigo-200">Real</div>
              <div className="absolute -top-3 right-6 text-xs bg-yellow-100 px-2 py-1 rounded-full border border-yellow-200">Verified</div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
            💬 What Our Writers Say
          </h2>
          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto">
            Real stories from writers who transformed their dreams into reality
          </p>
          
          {/* Success journey visual */}
          <div className="hidden md:flex justify-center items-center gap-6 mt-6">
            <div className="bg-purple-100 p-4 rounded-xl border border-purple-200 text-center">
              <div className="text-2xl mb-2">📝</div>
              <div className="text-sm text-gray-600">Started Writing</div>
            </div>
            <div className="text-2xl text-purple-600">→</div>
            <div className="bg-indigo-100 p-4 rounded-xl border border-indigo-200 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm text-gray-600">Won Prizes</div>
            </div>
            <div className="text-2xl text-indigo-600">→</div>
            <div className="bg-green-100 p-4 rounded-xl border border-green-200 text-center">
              <div className="text-2xl mb-2">📚</div>
              <div className="text-sm text-gray-600">Published</div>
            </div>
            <div className="text-2xl text-green-600">→</div>
            <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-200 text-center">
              <div className="text-2xl mb-2">🌟</div>
              <div className="text-sm text-gray-600">Success</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-0 bg-white backdrop-blur-sm border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 animate-fade-in shadow-lg relative overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background success illustration */}
              <div className="absolute top-4 right-4 text-2xl md:text-3xl opacity-10">
                {testimonial.illustration}
              </div>
              
              {/* Success badge */}
              <div className="absolute top-4 left-4 text-base md:text-lg">
                {testimonial.successIcon}
              </div>
              
              <CardContent className="p-4 md:p-6">
                {/* Enhanced star rating with animation */}
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-yellow-500 fill-current animate-pulse" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                
                {/* Enhanced quote with visual frame */}
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 mb-6 border border-purple-100 relative">
                  {/* Quote marks */}
                  <div className="absolute -top-2 -left-2 text-2xl text-purple-400">"</div>
                  <div className="absolute -bottom-2 -right-2 text-2xl text-purple-400">"</div>
                  
                  <p className="text-center text-gray-700 italic leading-relaxed relative z-10">
                    {testimonial.quote}
                </p>
                </div>
                
                {/* Enhanced author info with success indicators */}
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${testimonial.avatarBg} flex items-center justify-center text-2xl border-4 border-white shadow-lg relative`}>
                    {testimonial.avatar}
                    {/* Verified badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs">
                      ✓
                    </div>
                  </div>
                  
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-3">
                    <span>📍</span>
                    <span>{testimonial.location}</span>
                  </div>
                  
                  {/* Enhanced success badge */}
                  <div className="mt-2 inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-xs font-semibold relative">
                    <span className="relative z-10">{testimonial.highlight}</span>
                    {/* Badge glow */}
                    <div className="absolute inset-0 bg-yellow-400 opacity-20 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Success timeline */}
                  <div className="mt-3 text-xs text-gray-500">
                    <div className="flex items-center justify-center gap-1">
                      <span>🗓️</span>
                      <span>Success story from 2023</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Enhanced trust indicators with visuals */}
        <div className="mt-8 md:mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-purple-200 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-8 text-4xl">📱</div>
              <div className="absolute bottom-4 right-8 text-4xl">👥</div>
              <div className="absolute top-1/2 left-1/4 text-3xl">💰</div>
              <div className="absolute top-1/4 right-1/4 text-3xl">📚</div>
            </div>
            
            {/* Community visual header */}
            <div className="flex justify-center mb-3 md:mb-4">
              <div className="bg-white/50 rounded-full p-4 border border-purple-200">
                <div className="flex items-center gap-2 text-2xl">
                  <span className="animate-bounce">👥</span>
                  <span className="animate-pulse">📈</span>
                  <span className="animate-bounce delay-500">🌟</span>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 relative z-10">
              📱 Join India's Largest Writing Community
            </h3>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10">
              <div className="bg-white/50 rounded-lg p-3 md:p-4 border border-purple-200">
                <div className="text-2xl md:text-3xl mb-2">📱</div>
                <div className="text-lg md:text-2xl font-bold text-purple-600 mb-1">186K+</div>
                <div className="text-gray-700 font-semibold text-xs md:text-sm">Instagram Followers</div>
                <div className="text-xs text-gray-600">@inkk.fetish</div>
                <div className="mt-1 text-xs text-green-600 flex items-center justify-center gap-1">
                  <span>📈</span>
                  <span>+2.3K this month</span>
                </div>
              </div>
              

              
                              <div className="bg-white/50 rounded-lg p-3 md:p-4 border border-yellow-200">
                <div className="text-2xl md:text-3xl mb-2">💰</div>
                <div className="text-lg md:text-2xl font-bold text-yellow-600 mb-1">5 lakhs +</div>
                <div className="text-gray-700 font-semibold text-xs md:text-sm">Prizes Awarded</div>
                <div className="text-xs text-gray-600">To Date</div>
                <div className="mt-1 text-xs text-green-600 flex items-center justify-center gap-1">
                  <span>🏆</span>
                  <span>₹1.25L this round</span>
              </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;