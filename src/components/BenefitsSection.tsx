import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Award, FileText, Users } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Lifetime Valid Certificate",
      description: "Signed & verified by Inkfetish Writers' Community with a unique author code. Perfect for resumes, portfolios, and applications.",
      color: "bg-gradient-to-br from-purple-100 to-indigo-100",
      iconColor: "text-yellow-500",
      emoji: "🏅",
      illustration: "📜"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Detailed Judging Report",
      description: "Your writing reviewed by expert judges panel - know exactly where you shine and how to improve.",
      color: "bg-gradient-to-br from-indigo-100 to-purple-100",
      iconColor: "text-indigo-600",
      emoji: "📋",
      illustration: "🔍"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Global Publication Opportunity",
      description: "Top 200-250 entries featured in a printed book, launched worldwide. Your name in print forever!",
      color: "bg-gradient-to-br from-purple-100 to-pink-100",
      iconColor: "text-purple-600",
      emoji: "🌍",
      illustration: "📚"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Personal Book Publishing Support",
      description: "Top 100 participants get help to publish their OWN solo poetry book with professional guidance.",
      color: "bg-gradient-to-br from-pink-100 to-purple-100",
      iconColor: "text-pink-600",
      emoji: "👥",
      illustration: "📖"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-5 animate-float">📚</div>
        <div className="absolute bottom-32 right-16 text-5xl opacity-5 animate-float delay-1000">✍️</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-5 animate-float delay-2000">🏆</div>
        <div className="absolute bottom-20 left-1/3 text-3xl opacity-5 animate-float delay-3000">📝</div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Visual Element */}
        <div className="text-center mb-12">
          {/* Visual header element */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full p-4 md:p-6 border border-purple-200">
              <div className="flex items-center gap-3 text-2xl md:text-3xl">
                <span className="animate-bounce">🎁</span>
                <span className="animate-pulse">✨</span>
                <span className="animate-bounce delay-500">🎉</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
            What You'll Get as a Participant
          </h2>
          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto">
            Every single participant receives valuable benefits that will boost your writing career
          </p>
          
          {/* Visual benefits flow */}
          <div className="hidden md:flex justify-center items-center gap-4 mt-6 text-2xl">
            <span className="bg-purple-100 p-3 rounded-full border border-purple-200">📝</span>
            <span className="text-purple-600">→</span>
            <span className="bg-indigo-100 p-3 rounded-full border border-indigo-200">📋</span>
            <span className="text-indigo-600">→</span>
            <span className="bg-pink-100 p-3 rounded-full border border-pink-200">🏅</span>
            <span className="text-pink-600">→</span>
            <span className="bg-yellow-100 p-3 rounded-full border border-yellow-200">📚</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="border-0 bg-white backdrop-blur-sm border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 animate-fade-in shadow-lg relative overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Decorative background element */}
              <div className="absolute top-4 right-4 text-2xl opacity-10">
                {benefit.illustration}
              </div>
              
              <CardHeader className="text-center pb-3 md:pb-4">
                <div className={`w-12 h-12 md:w-16 md:h-16 ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 border border-purple-200 relative`}>
                  {/* Emoji overlay */}
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 text-sm md:text-lg">
                    {benefit.emoji}
                  </div>
                  <span className={benefit.iconColor}>
                  {benefit.icon}
                  </span>
                </div>
                <CardTitle className="text-lg md:text-xl font-bold text-gray-900">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
                <p className="text-gray-700 text-center leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Enhanced investment comparison with visuals */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center border border-purple-200 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-8 text-4xl">💰</div>
            <div className="absolute bottom-4 right-8 text-4xl">🎯</div>
            <div className="absolute top-1/2 left-1/4 text-3xl">📈</div>
            <div className="absolute top-1/4 right-1/4 text-3xl">✨</div>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 relative z-10">
            🎯 Your Investment vs. Your Returns
          </h3>
          {/* Mobile-optimized two column layout */}
          <div className="grid grid-cols-2 gap-3 md:gap-8 max-w-4xl mx-auto relative z-10">
            <div className="bg-white/50 rounded-xl p-3 md:p-6 border border-purple-200">
              <div className="text-3xl md:text-6xl mb-2 md:mb-3">💸</div>
              <div className="text-sm md:text-lg text-gray-700 mb-1 md:mb-2">You Pay:</div>
              <div className="text-xl md:text-4xl font-bold text-purple-600">₹249</div>
              <div className="text-xs md:text-sm text-gray-600">One-time entry fee</div>
            </div>
            <div className="bg-white/50 rounded-xl p-3 md:p-6 border border-yellow-200">
              <div className="text-3xl md:text-6xl mb-2 md:mb-3">🏆</div>
              <div className="text-sm md:text-lg text-gray-700 mb-1 md:mb-2">You Could Win:</div>
              <div className="text-xl md:text-4xl font-bold text-yellow-600">₹65,000+</div>
              <div className="text-xs md:text-sm text-gray-600">Plus publishing opportunities</div>
            </div>
          </div>
          
          {/* Success rate visual */}
          <div className="mt-4 md:mt-8 bg-white/50 rounded-xl p-3 md:p-4 border border-green-200 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-green-700 text-xs md:text-sm">
              <span className="text-lg md:text-2xl">📊</span>
              <span className="font-semibold">89% participants report career benefits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;