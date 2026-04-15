import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface StickyMobileBannerProps {
  onRegisterClick: () => void;
}

const StickyMobileBanner = ({ onRegisterClick }: StickyMobileBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    const pulseTimer = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 p-4 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 bg-yellow-400 rounded-full ${isPulsing ? 'animate-ping' : ''}`}></div>
            <div className="text-white">
              <div className="font-bold text-sm">🔥 Authorverse Summit</div>
              <div className="text-xs opacity-90">Limited Spots Left!</div>
            </div>
          </div>
          <Button 
            size="sm" 
            onClick={onRegisterClick}
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            Register Now
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileBanner; 