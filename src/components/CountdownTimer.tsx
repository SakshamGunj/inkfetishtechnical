import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set deadline to 24 hours from now
    const deadline = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-purple-50 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-900">Registration Deadline</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-4 text-center border border-purple-200">
          <div className="text-3xl font-bold text-gray-900">{timeLeft.days.toString().padStart(2, '0')}</div>
          <div className="text-sm text-gray-600 mt-1">DAYS</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
          <div className="text-3xl font-bold text-gray-900">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <div className="text-sm text-gray-600 mt-1">HRS</div>
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 text-center border border-purple-200">
          <div className="text-3xl font-bold text-gray-900">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <div className="text-sm text-gray-600 mt-1">MIN</div>
        </div>
        <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
          <div className="text-3xl font-bold text-gray-900">{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <div className="text-sm text-gray-600 mt-1">SEC</div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <div className="text-sm text-gray-600 mb-2">Don't miss this opportunity</div>
        <div className="text-red-600 font-medium">Limited spots available</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
