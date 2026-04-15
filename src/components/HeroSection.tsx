import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Trophy, BookOpen, PenTool, Award, Target, Calendar, Globe } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import TrustBadges from "./TrustBadges";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-purple-50 to-indigo-100 overflow-hidden">
      {/* Professional Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-16 w-96 h-96 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-16 w-80 h-80 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-300 to-indigo-400 rounded-full blur-3xl"></div>
      </div>
      
      {/* Hero Illustration - Writing themed */}
      <div className="absolute top-20 right-8 hidden lg:block opacity-20">
        <div className="w-80 h-80 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-30"></div>
          <div className="absolute top-12 left-12 text-6xl animate-pulse">✍️</div>
          <div className="absolute bottom-16 right-16 text-4xl animate-bounce delay-1000">📖</div>
          <div className="absolute top-1/2 left-1/4 text-3xl animate-float">🖋️</div>
        </div>
          </div>
          
      {/* Writing-themed floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 text-4xl opacity-15 animate-float">✍️</div>
        <div className="absolute bottom-28 left-20 text-3xl opacity-15 animate-float delay-1000">📚</div>
        <div className="absolute top-1/3 left-12 text-3xl opacity-15 animate-float delay-2000">🖋️</div>
        <div className="absolute bottom-1/4 right-28 text-3xl opacity-15 animate-float delay-3000">📖</div>
        <div className="absolute top-1/2 right-1/4 text-2xl opacity-10 animate-float delay-4000">🏆</div>
        <div className="absolute bottom-1/3 left-1/3 text-2xl opacity-10 animate-float delay-5000">📝</div>
      </div>
          
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Professional Header */}
          <div className="text-center mb-12">
            <div className="space-y-6">
              <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
              <span className="text-gray-600 text-sm md:text-base font-medium tracking-wider uppercase">
                Inkfetish Presents
              </span>
            </div>

              <div className="inline-flex items-center gap-2 bg-purple-100 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <BookOpen className="w-4 h-4 text-purple-600" />
                <span className="text-purple-700 font-medium text-sm sm:text-base">India's Premier Writing Competition</span>
            </div>

            {/* Beautiful Image Banner */}
              <div className="relative animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-purple-200">
                {/* Unsplash Image */}
                <img 
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=300&q=80"
                  alt="Writing and Publishing Banner"
                  className="w-full h-40 md:h-64 object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-indigo-900/50 to-purple-900/70"></div>
          
                {/* Banner Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="text-white px-6">
                    <h3 className="text-lg md:text-3xl font-bold mb-2 drop-shadow-lg">
                      Transform Your Words Into Legacy
                    </h3>
                    <p className="text-sm md:text-lg opacity-90 drop-shadow-md">
                      Where passionate writers become published authors
                    </p>
                  </div>
                </div>
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-4 left-4 text-white/80">
                  <span className="text-xl md:text-3xl">✍️</span>
                </div>
                <div className="absolute top-4 right-4 text-white/80">
                  <span className="text-xl md:text-3xl">📚</span>
                </div>
                <div className="absolute bottom-4 left-4 text-white/80">
                  <span className="text-xl md:text-3xl">🏆</span>
                </div>
                <div className="absolute bottom-4 right-4 text-white/80">
                  <span className="text-xl md:text-3xl">⭐</span>
                </div>
              </div>
            </div>

            {/* Main Headline with Animated Underline - MOBILE OPTIMIZED */}
              <div className="relative my-6 md:my-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 animate-gradient-x drop-shadow-2xl">
                  The Authorverse Summit
                </span>
                <span className="inline-block ml-2 md:ml-4 text-purple-600">
                  <PenTool className="w-6 h-6 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 inline-block animate-float" />
                </span>
              </h1>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 animate-fade-in mt-1 md:mt-2" style={{ animationDelay: '400ms' }}>
                  Poetry Competition!
                </p>
            </div>
            
            {/* Professional Subtitle - MOBILE OPTIMIZED */}
              <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            <span className="text-purple-600 font-semibold">"From Writer to Author in 30 days"</span>, Transform Your Literary Dreams Into Published Reality
            </p>
            
                <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              Join India's most prestigious writing summit where your talent meets global recognition.
              <span className="text-purple-600 font-semibold"> Connect with 186,000+ passionate writers</span> and publishers worldwide.
            </p>
              </div>
            </div>
          </div>

          {/* Enhanced Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-x-12 gap-y-10 items-start">

            {/* Right Column - CTA & Pricing with Visual Enhancement */}
            <div className="space-y-6 lg:sticky lg:top-8 lg:order-last animate-fade-in" style={{ animationDelay: '600ms' }}>
              {/* Success Story Visual */}
              <div className="hidden lg:block bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-green-700">
                  <span className="text-lg">🌟</span>
                  <span>1,247+ writers already published!</span>
                  <span className="text-lg">🌟</span>
                </div>
              </div>
              
              {/* Countdown Timer */}
              <CountdownTimer />
              
              {/* Enhanced Pricing Card */}
              <div className="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-2xl">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-red-100 border border-red-200 rounded-full px-3 py-1 mb-4">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-red-600 font-medium text-sm">Limited Time Offer</span>
          </div>
          
                  <div className="mb-4">
                    <div className="text-gray-600 mb-1">Early Bird Price</div>
                    <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">₹249</div>
                    <div className="text-sm text-gray-500 line-through mb-2">Regular: ₹499</div>
                    <div className="text-sm text-green-600 font-semibold">Save ₹250!</div>
                  </div>
                  
                  <Button 
                    onClick={onRegisterClick}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl mb-4 transition-all duration-300 hover:scale-105"
                  >
                    <span className="mr-2">🚀 Register Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  
                  <div className="text-xs text-gray-600 mb-3">
                    ✅ Instant confirmation • 🔒 Secure payment • 📱 Mobile friendly
                  </div>
                  
                  {/* What you get preview */}
                  <div className="bg-purple-50 rounded-lg p-3 text-left">
                    <div className="text-sm font-semibold text-gray-900 mb-2">🎁 What you get:</div>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div>🏅 Lifetime valid certificate</div>
                      <div>📋 Expert judging report</div>
                      <div>📚 Publishing opportunity</div>
                      <div>💰 Chance to win ₹65,000</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Urgency indicator */}
              <div className="bg-gradient-to-r from-red-100 to-orange-100 backdrop-blur-sm rounded-xl p-3 border border-red-200 text-center">
                <div className="text-red-600 font-bold text-sm">⚠️ Only 330 spots available!</div>
              </div>
            </div>

            {/* Left Column - Benefits & Features with Visual Elements */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '700ms' }}>
              {/* Decorative Writer's Image */}
              <div className="hidden md:block relative">
                <div className="w-full h-32 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center border border-purple-200">
                  <div className="flex items-center gap-4 text-4xl">
                    <span className="animate-bounce">📝</span>
                    <span className="text-purple-600 font-bold">→</span>
                    <span className="animate-pulse">📚</span>
                    <span className="text-indigo-600 font-bold">→</span>
                    <span className="animate-bounce delay-500">🏆</span>
                  </div>
                </div>
              </div>
              
              {/* Key Benefits Grid - 2x2 on Mobile, Eye-catching Design */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group bg-gradient-to-br from-purple-100 to-indigo-100 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 text-center">
                  <Trophy className="w-6 h-6 md:w-10 md:h-10 text-yellow-500 mb-2 md:mb-4 group-hover:scale-110 transition-transform mx-auto" />
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">₹1,25,000</h3>
                  <p className="text-purple-600 font-medium text-sm mb-1">Prize Pool</p>
                  <p className="text-gray-600 text-sm leading-tight">Multiple categories with cash rewards for emerging writers</p>
                </div>
                
                <div className="group bg-gradient-to-br from-indigo-100 to-purple-100 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-200 hover:border-indigo-300 transition-all duration-300 hover:scale-105 text-center">
                  <Globe className="w-6 h-6 md:w-10 md:h-10 text-indigo-600 mb-2 md:mb-4 group-hover:scale-110 transition-transform mx-auto" />
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">Global</h3>
                  <p className="text-indigo-600 font-medium text-sm mb-1">Publication</p>
                  <p className="text-gray-600 text-sm leading-tight">Get featured in international literary magazines</p>
                </div>
                
                <div className="group bg-gradient-to-br from-purple-100 to-pink-100 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 text-center">
                  <PenTool className="w-6 h-6 md:w-10 md:h-10 text-purple-600 mb-2 md:mb-4 group-hover:scale-110 transition-transform mx-auto" />
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">Expert</h3>
                  <p className="text-purple-600 font-medium text-sm mb-1">Mentorship</p>
                  <p className="text-gray-600 text-sm leading-tight">Learn from published authors and industry professionals</p>
                </div>
                
                <div className="group bg-gradient-to-br from-indigo-100 to-purple-100 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-200 hover:border-indigo-300 transition-all duration-300 hover:scale-105 text-center">
                  <Award className="w-6 h-6 md:w-10 md:h-10 text-indigo-600 mb-2 md:mb-4 group-hover:scale-110 transition-transform mx-auto" />
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">Lifetime</h3>
                  <p className="text-indigo-600 font-medium text-sm mb-1">Certificate</p>
                  <p className="text-gray-600 text-sm leading-tight">Professional credential for your writing portfolio</p>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white backdrop-blur-sm rounded-xl p-4 border border-purple-200 shadow-lg">
                <TrustBadges />
              </div>
            </div>
          </div>
          
          {/* Bottom Social Proof - MOBILE OPTIMIZED */}
          <div className="mt-16 sm:mt-20 lg:mt-24 pt-12 border-t border-purple-200 text-center animate-fade-in" style={{ animationDelay: '800ms' }}>
            <div className="text-gray-600 mb-4 text-sm">Trusted by writers across India</div>
            <div className="grid grid-cols-3 gap-4 text-gray-900">
              <div className="flex flex-col items-center gap-1">
                <Users className="w-5 h-5 md:w-8 md:h-8 text-indigo-600" />
                <span className="text-lg md:text-2xl font-bold">186K+</span>
                <span className="text-gray-700 text-sm md:text-base">Active Community</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BookOpen className="w-5 h-5 md:w-8 md:h-8 text-purple-600" />
                <span className="text-lg md:text-2xl font-bold">1,247+</span>
                <span className="text-gray-700 text-sm md:text-base">Writers Published</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Trophy className="w-5 h-5 md:w-8 md:h-8 text-yellow-500" />
                <span className="text-lg md:text-2xl font-bold">₹82L+</span>
                <span className="text-gray-700 text-sm md:text-base">Prizes Awarded</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;