import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Users, Trophy } from "lucide-react";

interface CTASectionProps {
  onRegisterClick: () => void;
}

const CTASection = ({ onRegisterClick }: CTASectionProps) => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white rounded-full animate-float delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            🚀 Join India's Biggest Writing Revolution
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
            Your name in a book. Your poetry winning cash. Your voice inspiring others.
            All starting with just <strong>₹249</strong> and one decision today.
          </p>
          
          {/* Key benefits recap */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-4 md:p-6 text-center">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-yellow-300" />
                <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Win Big</h3>
                <p className="text-xs md:text-sm text-white/80">Cash prizes worth ₹1,25,000</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-4 md:p-6 text-center">
                <Users className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-yellow-300" />
                <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Get Published</h3>
                <p className="text-xs md:text-sm text-white/80">Global book publication opportunity</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-4 md:p-6 text-center">
                <Clock className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-yellow-300" />
                <h3 className="font-bold mb-1 md:mb-2 text-sm md:text-base">Build Career</h3>
                <p className="text-xs md:text-sm text-white/80">Lifetime certificate + expert feedback</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Urgency */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-8 mb-8 md:mb-12 max-w-3xl mx-auto mx-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 text-yellow-300">
              ⏰ Limited Time Opportunity
            </h3>
            <p className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
              Don't miss this once-in-a-lifetime chance to turn your writing into legacy.
              Thousands are already registered!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 md:gap-8 text-sm sm:text-base md:text-lg font-semibold">
              <div className="bg-white/10 px-3 py-1 rounded-full">🔥 Limited Entries</div>
              <div className="bg-white/10 px-3 py-1 rounded-full">💰 ₹249 Only</div>
              <div className="bg-white/10 px-3 py-1 rounded-full">⚡ Instant Registration</div>
            </div>
          </div>
          
          {/* Main CTA */}
          <div className="space-y-4 md:space-y-6 px-4">
            <Button 
              onClick={onRegisterClick}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black text-lg sm:text-xl md:text-2xl px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-6 h-auto font-bold rounded-lg md:rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <span className="mr-2">Register Now - Start Your Journey</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            
            <div className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
              🛡️ Safe Payment • ✅ Instant Confirmation • 📱 Full Community Access
            </div>
            
            <div className="text-center pt-4 md:pt-8">

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;