import { Clock, Users, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UrgencySectionProps {
  onRegisterClick: () => void;
}

const UrgencySection = ({ onRegisterClick }: UrgencySectionProps) => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background urgency elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 text-4xl opacity-10 animate-pulse">⏰</div>
        <div className="absolute bottom-12 right-12 text-5xl opacity-10 animate-bounce delay-500">⚡</div>
        <div className="absolute top-1/4 right-1/4 text-3xl opacity-10 animate-float delay-1000">🚨</div>
        <div className="absolute bottom-1/4 left-1/5 text-4xl opacity-10 animate-pulse delay-1500">🔥</div>
        <div className="absolute top-32 right-32 text-3xl opacity-10 animate-bounce delay-2000">💨</div>
      </div>
      
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced urgency indicator */}
          <div className="inline-flex items-center gap-3 bg-red-100 backdrop-blur-sm border border-red-200 rounded-full px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8 relative">
            <div className="absolute -left-1 -top-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full animate-ping"></div>
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 animate-pulse" />
            <span className="text-red-600 font-semibold text-sm md:text-base">Limited Time Offer</span>
            <div className="absolute -right-1 -top-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full animate-ping delay-500"></div>
          </div>
          
          {/* Compact visual countdown element */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-full p-4 md:p-6 border border-red-200 relative">
              <div className="flex items-center gap-2 md:gap-3 text-2xl md:text-3xl">
                <span className="animate-bounce">⏰</span>
                <span className="text-red-600 font-bold">7</span>
                <span className="animate-pulse">🔥</span>
              </div>
              {/* Urgency sparks - smaller on mobile */}
              <div className="absolute -top-1 -left-1 md:-top-2 md:-left-2 text-sm md:text-lg animate-pulse">⚡</div>
              <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 text-sm md:text-lg animate-pulse delay-300">⚡</div>
              <div className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 text-sm md:text-lg animate-pulse delay-600">💨</div>
              <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 text-sm md:text-lg animate-pulse delay-900">💨</div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            Don't Let This Opportunity 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"> Slip Away</span>
          </h2>
          
          {/* Compact urgency cards for mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-white backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-200 shadow-lg relative overflow-hidden group hover:border-red-300 transition-colors">
              {/* Background illustration */}
              <div className="absolute top-2 right-2 text-2xl md:text-3xl opacity-10 group-hover:opacity-20 transition-opacity">⏰</div>
              
              {/* Pulse effect for urgency */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              
              <div className="relative z-10">
                <Clock className="w-8 h-8 md:w-12 md:h-12 text-purple-600 mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Registration Deadline</h3>
                <p className="text-sm md:text-base text-gray-700 mb-3">Only 7 days left to secure your spot in India's biggest writing competition</p>
                
                {/* Compact visual countdown */}
                <div className="bg-red-50 rounded-lg p-2 border border-red-200">
                  <div className="flex items-center justify-center gap-1 md:gap-2 text-red-700 text-xs md:text-sm">
                    <span className="text-sm md:text-lg">🚨</span>
                    <span className="font-bold">DEADLINE APPROACHING</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-200 shadow-lg relative overflow-hidden group hover:border-orange-300 transition-colors">
              {/* Background illustration */}
              <div className="absolute top-2 right-2 text-2xl md:text-3xl opacity-10 group-hover:opacity-20 transition-opacity">👥</div>
              
              {/* Scarcity indicator */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-500"></div>
              
              <div className="relative z-10">
                <Users className="w-8 h-8 md:w-12 md:h-12 text-indigo-600 mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Limited Seats</h3>
                <p className="text-sm md:text-base text-gray-700 mb-3">Only 330 spots available</p>
                
                {/* Compact visual urgency indicator */}
                <div className="bg-red-50 rounded-lg p-2 border border-red-200">
                  <div className="flex items-center justify-center gap-1 md:gap-2 text-red-700 text-xs md:text-sm">
                    <span className="text-sm md:text-lg">⚠️</span>
                    <span className="font-bold">LIMITED SPOTS</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-xl p-4 md:p-6 border border-purple-200 shadow-lg relative overflow-hidden group hover:border-yellow-300 transition-colors">
              {/* Background illustration */}
              <div className="absolute top-2 right-2 text-2xl md:text-3xl opacity-10 group-hover:opacity-20 transition-opacity">💰</div>
              
              {/* Price urgency indicator */}
              <div className="absolute top-3 left-3 md:top-4 md:left-4 w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-1000"></div>
              
              <div className="relative z-10">
                <Zap className="w-8 h-8 md:w-12 md:h-12 text-yellow-600 mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Price Increase</h3>
                <p className="text-sm md:text-base text-gray-700 mb-3">Entry fee increases to ₹499 after today. Save ₹250 now!</p>
                
                {/* Compact price comparison visual */}
                <div className="bg-yellow-50 rounded-lg p-2 border border-yellow-200">
                  <div className="flex items-center justify-center gap-1 md:gap-2 text-yellow-700 text-xs md:text-sm">
                    <span className="text-sm md:text-lg">💸</span>
                    <span className="font-bold">SAVE ₹250 TODAY!</span>
                  </div>
                  <div className="flex justify-center items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 line-through">₹499</span>
                    <span className="text-sm font-bold text-green-600">₹249</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Compact CTA with urgency animation */}
          <div className="relative">
            {/* Urgency glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-20 animate-pulse blur-sm"></div>
            
            {/* Compact success stories ticker above button */}
            <div className="bg-green-50 rounded-xl p-3 md:p-4 border border-green-200 mb-4 md:mb-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-green-700 text-xs md:text-sm">
                <span className="text-base md:text-lg animate-bounce">🔥</span>
                <span>127 writers registered in the last 24 hours!</span>
                <span className="text-base md:text-lg animate-bounce delay-500">🔥</span>
              </div>
            </div>
            
            <Button 
              onClick={onRegisterClick}
              className="relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 md:px-12 py-3 md:py-4 text-base md:text-lg rounded-xl shadow-2xl group overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="animate-pulse">⚡</span>
                Secure Your Spot Now
                <span className="animate-pulse delay-500">⚡</span>
              </span>
            </Button>
            
            {/* Compact urgency timer below button */}
            <div className="mt-3 md:mt-4 text-xs md:text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <span className="animate-pulse">⏰</span>
                <span>Price increases in: <span className="font-bold text-red-600">23:47:12</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection; 