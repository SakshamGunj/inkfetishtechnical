import { Star } from "lucide-react";

const TrustBadges = () => {
  return (
    <div className="w-full">
      {/* Simple Star Ratings and Stats */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <div className="text-center">
          <div className="flex justify-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-purple-600 font-bold text-lg">4.9/5</div>
          <div className="text-gray-600 text-sm">2,847 reviews</div>
        </div>
        
        <div className="w-px h-12 bg-purple-200"></div>
        
        <div className="text-center">
          {/* Writer avatars stack */}
          <div className="flex justify-center items-center mb-2 -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">👩‍🎓</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">👨‍💼</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">👩‍🏫</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">👨‍🎨</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">👩‍💻</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">👨‍🎓</div>
          </div>
          <div className="text-red-600 font-bold text-sm">⚠️ Only 330 spots available!</div>
        </div>
      </div>

      {/* Featured Reviews */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-yellow-500 text-sm font-medium">5.0</span>
          </div>
          <p className="text-gray-700 text-sm mb-3">"Outstanding platform for emerging writers. Got published within 2 months!"</p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-xs border border-white shadow-sm">
              👩‍🎓
            </div>
            <p className="text-gray-500 text-xs">Priya M., Mumbai</p>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-yellow-500 text-sm font-medium">5.0</span>
          </div>
          <p className="text-gray-700 text-sm mb-3">"Professional experience from registration to publication. Highly recommended!"</p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-xs border border-white shadow-sm">
              👨‍💼
            </div>
            <p className="text-gray-500 text-xs">Rahul K., Delhi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges; 