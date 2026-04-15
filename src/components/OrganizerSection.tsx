import { Users, BookOpen, Heart, Star, Award, Verified } from "lucide-react";

const OrganizerSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-indigo-50 via-purple-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-12 left-16 text-5xl animate-float">💜</div>
        <div className="absolute bottom-16 right-20 text-4xl animate-float delay-1000">✨</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-float delay-2000">📖</div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Organizer Badge */}
          <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm border border-purple-200 rounded-full px-6 py-3 mb-6 shadow-lg">
            <Verified className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 font-semibold">Proudly Organized by</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              ink.fetish
            </span>
            <span className="ml-2">📝</span>
          </h2>

          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            India's most trusted writing community with a mission to empower every writer's journey
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-md hover:shadow-lg transition-shadow">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">186K+</div>
              <div className="text-sm text-gray-600">Passionate Writers</div>
            </div>



            <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-md hover:shadow-lg transition-shadow">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">15+</div>
              <div className="text-sm text-gray-600">Successful Events</div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-pink-200 shadow-md hover:shadow-lg transition-shadow">
              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* Trust Message */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            </div>
            <p className="text-gray-700 font-medium">
              "Dedicated to nurturing literary talent and creating opportunities for writers across India"
            </p>
            <p className="text-sm text-gray-600 mt-2">
              - Trusted by writers nationwide since 2019
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizerSection; 