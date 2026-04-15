import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrizesSection = () => {
  const prizes = [
    {
      place: "🥇",
      title: "1st Prize",
      amount: "₹65,000",
      description: "Winner takes the crown + all publishing benefits",
      gradient: "from-yellow-400 to-yellow-600",
      celebration: "🎉🏆🎊",
      bgDecor: "👑"
    },
    {
      place: "🥈", 
      title: "2nd Prize",
      amount: "₹40,000",
      description: "Runner-up reward + publishing opportunity",
      gradient: "from-gray-400 to-gray-600",
      celebration: "🎉🥈✨",
      bgDecor: "⭐"
    },
    {
      place: "🥉",
      title: "3rd Prize", 
      amount: "₹20,000",
      description: "Third place honor + recognition",
      gradient: "from-amber-600 to-amber-800",
      celebration: "🎉🥉🌟",
      bgDecor: "🏅"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background celebration elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-8 text-4xl opacity-10 animate-bounce">🏆</div>
        <div className="absolute bottom-20 right-12 text-3xl opacity-10 animate-pulse delay-1000">💰</div>
        <div className="absolute top-1/3 right-1/4 text-5xl opacity-5 animate-float delay-2000">🎊</div>
        <div className="absolute bottom-1/3 left-1/5 text-4xl opacity-10 animate-float delay-3000">🎉</div>
        <div className="absolute top-20 right-20 text-3xl opacity-10 animate-bounce delay-4000">👑</div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced header with trophy visual */}
        <div className="text-center mb-12">
          {/* Trophy celebration header */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full p-6 md:p-8 border border-yellow-200">
                <div className="text-4xl md:text-6xl animate-bounce">🏆</div>
              </div>
              {/* Celebration sparks */}
              <div className="absolute -top-2 -left-2 text-lg md:text-2xl animate-pulse">✨</div>
              <div className="absolute -top-2 -right-2 text-lg md:text-2xl animate-pulse delay-500">✨</div>
              <div className="absolute -bottom-2 -left-2 text-lg md:text-2xl animate-pulse delay-1000">🎉</div>
              <div className="absolute -bottom-2 -right-2 text-lg md:text-2xl animate-pulse delay-1500">🎊</div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
            🏆 Cash Prizes Worth ₹1,25,000!
          </h2>
          <p className="text-base md:text-xl text-gray-700 max-w-3xl mx-auto">
            Compete with the best writers across India and win exciting cash rewards
          </p>
          
          {/* Prize distribution visual */}
          <div className="hidden md:flex justify-center items-center gap-6 mt-6">
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full border border-yellow-200 mb-2">
                <span className="text-3xl">🥇</span>
              </div>
              <span className="text-sm text-gray-600">₹65,000</span>
            </div>
            <div className="text-2xl text-purple-600">+</div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-4 rounded-full border border-gray-200 mb-2">
                <span className="text-3xl">🥈</span>
              </div>
              <span className="text-sm text-gray-600">₹40,000</span>
            </div>
            <div className="text-2xl text-purple-600">+</div>
            <div className="flex flex-col items-center">
              <div className="bg-amber-100 p-4 rounded-full border border-amber-200 mb-2">
                <span className="text-3xl">🥉</span>
              </div>
              <span className="text-sm text-gray-600">₹20,000</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
          {prizes.map((prize, index) => (
            <Card 
              key={index}
              className={`border-0 bg-white backdrop-blur-sm border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 animate-fade-in relative overflow-hidden shadow-lg ${
                index === 0 ? 'md:scale-110 md:-mt-8' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Decorative background */}
              <div className="absolute top-4 right-4 text-3xl md:text-4xl opacity-5">
                {prize.bgDecor}
              </div>
              
              {/* Celebration confetti for 1st place */}
              {index === 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-2 left-2 text-xs animate-pulse">🎊</div>
                  <div className="absolute top-2 right-2 text-xs animate-pulse delay-500">🎉</div>
                  <div className="absolute bottom-2 left-2 text-xs animate-pulse delay-1000">✨</div>
                  <div className="absolute bottom-2 right-2 text-xs animate-pulse delay-1500">⭐</div>
                </div>
              )}
              
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${prize.gradient}`}></div>
              <CardHeader className="text-center pb-3 md:pb-4">
                <div className="text-4xl md:text-6xl mb-3 md:mb-4 relative">
                  {prize.place}
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 text-lg md:text-2xl animate-bounce">👑</div>
                  )}
                </div>
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">{prize.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center px-4 md:px-6 pb-4 md:pb-6">
                <div className="text-3xl md:text-5xl font-bold text-yellow-600 mb-3 md:mb-4">{prize.amount}</div>
                <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">{prize.description}</p>
                
                {/* Celebration emojis */}
                <div className="text-sm opacity-50">
                  {prize.celebration}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Enhanced opportunities with visual elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-purple-100 to-indigo-100 backdrop-blur-sm border border-purple-200 shadow-lg relative overflow-hidden">
            {/* Background illustration */}
            <div className="absolute top-4 right-4 text-4xl md:text-5xl opacity-10">📚</div>
            <div className="absolute bottom-4 left-4 text-2xl md:text-3xl opacity-10">✍️</div>
            
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-center text-gray-900 flex items-center justify-center gap-2">
                <span className="text-2xl md:text-3xl">📚</span>
                Top 100 Writers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center px-4 md:px-6">
              {/* Visual representation */}
              <div className="bg-white/50 rounded-xl p-3 md:p-4 mb-3 md:mb-4 border border-purple-200">
                <div className="flex justify-center items-center gap-2 text-xl md:text-2xl mb-2">
                  <span>📝</span>
                  <span className="text-purple-600">→</span>
                  <span>📖</span>
                  <span className="text-indigo-600">→</span>
                  <span>🌟</span>
                </div>
              </div>
              
              <p className="text-base md:text-lg mb-3 md:mb-4 text-gray-700">Get the opportunity to <strong className="text-purple-600">publish your own book</strong></p>
              <p className="text-gray-600 text-sm md:text-base">Professional guidance and support throughout the publishing process</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-indigo-100 to-purple-100 backdrop-blur-sm border border-purple-200 shadow-lg relative overflow-hidden">
            {/* Background illustration */}
            <div className="absolute top-4 right-4 text-4xl md:text-5xl opacity-10">🌍</div>
            <div className="absolute bottom-4 left-4 text-2xl md:text-3xl opacity-10">📖</div>
            
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-center text-gray-900 flex items-center justify-center gap-2">
                <span className="text-2xl md:text-3xl">🌍</span>
                Top 200-250 Entries
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center px-4 md:px-6">
              {/* Visual representation */}
              <div className="bg-white/50 rounded-xl p-3 md:p-4 mb-3 md:mb-4 border border-indigo-200">
                <div className="flex justify-center items-center gap-2 text-xl md:text-2xl mb-2">
                  <span>✍️</span>
                  <span className="text-indigo-600">→</span>
                  <span>📄</span>
                  <span className="text-purple-600">→</span>
                  <span>🌍</span>
                </div>
              </div>
              
              <p className="text-base md:text-lg mb-3 md:mb-4 text-gray-700">Featured in a <strong className="text-indigo-600">printed book launched globally</strong></p>
              <p className="text-gray-600 text-sm md:text-base">Your writing + your name = published forever!</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Enhanced call to action with winner celebration */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-100 via-indigo-100 to-purple-100 backdrop-blur-sm rounded-2xl p-8 border border-purple-200 max-w-2xl mx-auto relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 text-4xl">💰</div>
              <div className="absolute bottom-4 right-4 text-4xl">🎯</div>
              <div className="absolute top-1/2 left-8 text-3xl">✨</div>
              <div className="absolute top-1/4 right-8 text-3xl">🏆</div>
            </div>
            
            {/* Winner celebration visual */}
            <div className="flex justify-center mb-6">
              <div className="bg-yellow-100 rounded-full p-4 border border-yellow-200">
                <div className="flex items-center gap-2 text-2xl">
                  <span className="animate-bounce">🏆</span>
                  <span className="animate-pulse">→</span>
                  <span className="animate-bounce delay-500">💰</span>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-900 relative z-10">
              🎯 Ready to Turn Your Writing Into Legacy?
            </h3>
            <p className="text-gray-700 mb-6 relative z-10">
              Don't let your talent remain hidden. This is your chance to shine among India's best writers.
            </p>
            <div className="text-lg relative z-10">
              <span className="text-gray-700">Starting at just </span>
              <span className="text-3xl font-bold text-yellow-600">₹249</span>
            </div>
            
            {/* Success stories ticker */}
            <div className="mt-6 bg-white/50 rounded-xl p-3 border border-green-200">
              <div className="flex items-center justify-center gap-2 text-green-700 text-sm">
                <span className="text-lg">🎉</span>
                <span>Last year: 347 writers won prizes, 1,247 got published!</span>
                <span className="text-lg">🎉</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;