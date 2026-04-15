import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CompetitionSectionProps {
  onRegisterClick: () => void;
}

const CompetitionSection = ({ onRegisterClick }: CompetitionSectionProps) => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background competition elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-12 text-4xl opacity-10 animate-float">📝</div>
        <div className="absolute bottom-24 right-16 text-5xl opacity-10 animate-pulse delay-1000">🏁</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-10 animate-bounce delay-2000">⚡</div>
        <div className="absolute bottom-1/4 left-1/5 text-4xl opacity-10 animate-float delay-3000">🎯</div>
        <div className="absolute top-40 right-40 text-3xl opacity-10 animate-pulse delay-4000">🚀</div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header with competition visual */}
        <div className="text-center mb-12">
          {/* Competition stages visual */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full p-4 md:p-6 border border-indigo-200 relative">
              <div className="flex items-center gap-3 md:gap-4 text-2xl md:text-3xl">
                <span className="animate-bounce">📝</span>
                <span className="text-indigo-600">→</span>
                <span className="animate-pulse">🥈</span>
                <span className="text-purple-600">→</span>
                <span className="animate-bounce delay-500">🥇</span>
              </div>
              {/* Stage indicators */}
              <div className="absolute -top-3 left-8 text-xs bg-white px-2 py-1 rounded-full border border-indigo-200">Start</div>
              <div className="absolute -top-3 right-8 text-xs bg-yellow-100 px-2 py-1 rounded-full border border-yellow-200">Win!</div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
            📝 Two-Stage Competition
          </h2>
          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto">
            Simple, exciting, and designed to bring out the best in your writing
          </p>
          
          {/* Competition flow visual */}
          <div className="hidden md:flex justify-center items-center gap-6 mt-6">
            <div className="bg-purple-100 p-4 rounded-xl border border-purple-200 text-center">
              <div className="text-2xl mb-2">📋</div>
              <div className="text-sm text-gray-600">Register</div>
            </div>
            <div className="text-2xl text-purple-600">→</div>
            <div className="bg-indigo-100 p-4 rounded-xl border border-indigo-200 text-center">
              <div className="text-2xl mb-2">🥈</div>
              <div className="text-sm text-gray-600">Silver Tier</div>
            </div>
            <div className="text-2xl text-indigo-600">→</div>
            <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-200 text-center">
              <div className="text-2xl mb-2">🥇</div>
              <div className="text-sm text-gray-600">Gold Tier</div>
            </div>
            <div className="text-2xl text-yellow-600">→</div>
            <div className="bg-green-100 p-4 rounded-xl border border-green-200 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm text-gray-600">Winner</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Stage 1 - Enhanced */}
          <Card className="border-0 bg-white backdrop-blur-sm border border-purple-200 hover:border-purple-300 transition-all duration-300 shadow-lg relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-4 right-4 text-3xl md:text-4xl opacity-10">🥈</div>
            <div className="absolute bottom-4 left-4 text-2xl md:text-3xl opacity-10">📝</div>
            
            {/* Stage indicator */}
            <div className="absolute top-4 left-4 bg-purple-100 px-3 py-1 rounded-full text-xs font-bold text-purple-700 border border-purple-200">
              STAGE 1
            </div>
            
            <CardHeader className="text-center pt-8 md:pt-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 relative">
                <span className="text-xl md:text-2xl font-bold text-white">1</span>
                {/* Sparkle effect */}
                <div className="absolute -top-1 -right-1 text-xs">✨</div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">🥈 Silver Tier Round</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
              {/* Price visual */}
              <div className="text-center bg-purple-50 rounded-xl p-3 md:p-4 border border-purple-200">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-xl md:text-2xl">💰</span>
                  <div className="text-base md:text-lg text-gray-700">Entry Fee</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600">₹249</div>
                <div className="text-sm md:text-sm text-gray-600 flex items-center justify-center gap-1">
                  <span>📝</span>
                  <span>One writing submission</span>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">Submit your best poem in any genre</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">Get reviewed by expert judges panel</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">If selected, qualify for the Gold Tier final stage</p>
                </div>
              </div>
              
              <div className="bg-purple-100 backdrop-blur-sm rounded-lg p-3 md:p-4 border-l-4 border-purple-500 relative">
                <div className="absolute top-2 right-2 text-base md:text-lg">🎁</div>
                <p className="font-semibold text-purple-700 text-sm md:text-base">All participants get:</p>
                <p className="text-sm text-gray-700">Certificate + Detailed judging report + Publishing consideration</p>
              </div>
              
              {/* Success rate indicator */}
              <div className="bg-green-50 rounded-lg p-3 border border-green-200 text-center">
                <div className="flex items-center justify-center gap-2 text-green-700 text-sm">
                  <span className="text-base md:text-lg">📈</span>
                  <span>76% participants advance to Gold Tier</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stage 2 - Enhanced */}
          <Card className="border-0 bg-white backdrop-blur-sm border border-purple-200 hover:border-yellow-400 transition-all duration-300 relative shadow-lg overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-4 right-4 text-3xl md:text-4xl opacity-10">🥇</div>
            <div className="absolute bottom-4 left-4 text-2xl md:text-3xl opacity-10">🏆</div>
            
            {/* Premium indicator */}
            <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
              QUALIFIED WRITERS ONLY
            </div>
            
            {/* Winner celebration elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-8 right-8 text-xs animate-pulse">🎊</div>
              <div className="absolute bottom-8 left-8 text-xs animate-pulse delay-500">✨</div>
            </div>
            
            <CardHeader className="text-center pt-8 md:pt-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 relative">
                <span className="text-xl md:text-2xl font-bold text-black">2</span>
                {/* Crown effect */}
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-1 text-base md:text-lg">👑</div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">🥇 Gold Tier Round</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
              {/* Pricing options visual */}
              <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3 md:p-4 border border-yellow-200">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl md:text-2xl">🎯</span>
                  <div className="text-base md:text-lg text-gray-700">Additional Submissions</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-gray-700 text-sm md:text-base">
                    <span className="text-base md:text-lg">🆓</span>
                    <span><span className="font-bold text-purple-600">1 entry:</span> FREE</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-700 text-sm md:text-base">
                    <span className="text-base md:text-lg">💫</span>
                    <span><span className="font-bold text-indigo-600">2 entries:</span> ₹99</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-700 text-sm md:text-base">
                    <span className="text-base md:text-lg">🌟</span>
                    <span><span className="font-bold text-yellow-600">3 entries:</span> ₹180 <span className="text-xs text-gray-600">(maximum)</span></span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">Compete with the best writers across India</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">Multiple submission opportunities for better chances</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">Win cash prizes worth ₹1,25,000</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-black text-xs">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm md:text-base">Get published in global book launch</p>
                </div>
              </div>
              
              <div className="bg-yellow-100 backdrop-blur-sm rounded-lg p-3 md:p-4 border-l-4 border-yellow-500 relative">
                <div className="absolute top-2 right-2 text-base md:text-lg">👑</div>
                <p className="font-semibold text-yellow-700 text-sm md:text-base">Gold Tier Benefits:</p>
                <p className="text-sm text-gray-700">Higher winning chances + Premium publishing opportunities</p>
              </div>
              
              {/* Success rate indicator */}
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-200 text-center">
                <div className="flex items-center justify-center gap-2 text-orange-700 text-sm">
                  <span className="text-base md:text-lg">🎯</span>
                  <span>Last year: 23% Gold Tier participants won prizes!</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Enhanced competition details with visuals - Mobile Optimized */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-200 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-8 text-4xl">📚</div>
            <div className="absolute bottom-4 right-8 text-4xl">🌍</div>
            <div className="absolute top-1/2 left-1/4 text-3xl">✍️</div>
            <div className="absolute top-1/4 right-1/4 text-3xl">🎯</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center relative z-10">
            <div className="bg-white/50 rounded-xl p-4 md:p-6 border border-purple-200">
              <div className="text-3xl md:text-4xl mb-2 md:mb-4">📚</div>
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-gray-900">Theme</h3>
              <p className="text-sm md:text-base text-gray-700 mb-2">Open (All genres welcome)</p>
              <div className="text-xs md:text-xs text-gray-600 bg-purple-50 px-2 py-1 rounded-full inline-block">
                Poetry • Short Stories • Essays
              </div>
            </div>
            <div className="bg-white/50 rounded-xl p-4 md:p-6 border border-indigo-200">
              <div className="text-3xl md:text-4xl mb-2 md:mb-4">👥</div>
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-gray-900">Age Limit</h3>
              <p className="text-sm md:text-base text-gray-700 mb-2">No age limit at all!</p>
              <div className="text-xs md:text-xs text-gray-600 bg-indigo-50 px-2 py-1 rounded-full inline-block">
                All ages welcome
              </div>
            </div>
            <div className="bg-white/50 rounded-xl p-4 md:p-6 border border-purple-200">
              <div className="text-3xl md:text-4xl mb-2 md:mb-4">🌍</div>
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-gray-900">Language</h3>
              <p className="text-sm md:text-base text-gray-700 mb-2">Hindi, English, Urdu, Regional</p>
              <div className="text-xs md:text-xs text-gray-600 bg-purple-50 px-2 py-1 rounded-full inline-block">
                Multiple languages
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced CTA with motivation */}
        <div className="text-center mt-16">
          {/* Motivational visual */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-full p-6 border border-green-200">
              <div className="flex items-center gap-3 text-2xl">
                <span className="animate-bounce">🚀</span>
                <span className="animate-pulse">→</span>
                <span className="animate-bounce delay-500">🏆</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Your writing deserves to be seen. Don't let this opportunity pass by.
          </p>
          
          {/* Success story ticker */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 max-w-md mx-auto mb-6">
            <div className="flex items-center justify-center gap-2 text-green-700 text-sm">
              <span className="text-lg">🌟</span>
              <span>4,687 writers already registered this month!</span>
            </div>
          </div>
          
          <Button 
            onClick={onRegisterClick}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl relative group"
          >
            <span className="relative z-10 flex items-center">
            Register for Silver Tier - ₹249
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompetitionSection;