import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Download,
  Volume2,
  BookOpen,
  Award,
  Globe,
  Headphones,
  Play,
  Eye,
  Users,
  Calendar,
  Quote,
  CheckCircle,
  Truck,
  Shield,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Book data (same as in PublishedAuthor.tsx)
const books = [
  {
    id: 1,
    title: "The Memory Keeper's Daughter",
    subtitle: "A Novel",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description: "A haunting tale of family secrets and the power of memory that spans three generations.",
    genre: "Literary Fiction",
    publishYear: 2024,
    rating: 4.9,
    reviews: 12847,
    bestseller: true,
    newYorkTimesBestseller: true,
    weeksOnBestseller: 24,
    awards: ["National Book Award Winner", "Pulitzer Prize Finalist", "Goodreads Choice Award Winner", "BookTok Favorite 2024"],
    synopsis: "In this masterfully crafted novel, Elena Rodriguez weaves a story of three women connected by a mysterious photograph and a family secret that threatens to unravel everything they thought they knew about their past. Set against the backdrop of post-war Spain and modern-day New York, this emotional journey explores the lengths we go to protect the ones we love.",
    fullDescription: "Elena Rodriguez's latest masterpiece takes readers on an unforgettable journey through time, memory, and the unbreakable bonds of family. When Clara discovers a mysterious photograph in her late grandmother's attic, she unwittingly opens a door to a past that three generations of women have fought to keep buried. The story unfolds across two continents and seven decades, revealing how the choices we make in moments of crisis can echo through time, shaping the lives of those we love most. With her trademark lyrical prose and deep understanding of the human heart, Rodriguez has crafted a novel that is both intimate and epic, exploring themes of identity, sacrifice, and the power of truth to both destroy and heal.",
    pages: 384,
    isbn: "978-0-123456-78-9",
    publisher: "Penguin Random House",
    audiobook: true,
    narrator: "Penelope Cruz",
    movieRights: "Netflix (2024)",
    languages: 28,
    price: {
      hardcover: 27.99,
      paperback: 16.99,
      ebook: 12.99,
      audiobook: 24.99
    },
    quotes: [
      "Memory is the thread that weaves our past into our present, creating the tapestry of who we are.",
      "Some secrets are meant to protect, others to destroy. The art is knowing which is which.",
      "Love doesn't always look the way we expect it to. Sometimes it wears the mask of sacrifice."
    ],
    chapters: [
      "The Photograph",
      "Clara's Discovery", 
      "Barcelona, 1952",
      "The Wedding Dress",
      "Letters Never Sent",
      "The Truth Unveiled",
      "Three Generations",
      "The Memory Keeper"
    ],
    criticalPraise: [
      {
        source: "The New York Times",
        quote: "Rodriguez has outdone herself with this multigenerational saga that reads like a love letter to the resilience of women."
      },
      {
        source: "Washington Post", 
        quote: "A stunning achievement that confirms Rodriguez's place among the finest writers of her generation."
      },
      {
        source: "NPR Books",
        quote: "Beautifully written and emotionally devastating. This is the kind of book that stays with you long after the final page."
      }
    ]
  },
  {
    id: 2,
    title: "Whispers in the Wind",
    subtitle: "Poetry Collection",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    description: "An intimate collection of poems exploring love, loss, and the beauty of everyday moments.",
    genre: "Poetry",
    publishYear: 2023,
    rating: 4.9,
    reviews: 8892,
    bestseller: true,
    awards: ["Poetry Society Award", "Forward Prize Winner", "Costa Poetry Award"],
    synopsis: "This deeply personal collection captures the essence of human emotion through carefully crafted verses. From the quiet moments of dawn to the profound grief of loss, Rodriguez's poetry speaks to the universal experiences that connect us all.",
    fullDescription: "In her most personal work yet, Elena Rodriguez opens her heart to readers through 67 carefully crafted poems that explore the full spectrum of human emotion. From the tender joy of new love to the profound ache of loss, from the wonder of a child's first steps to the quiet dignity of aging, these poems find beauty and meaning in both the extraordinary and the mundane. Written over the course of five years, this collection represents Rodriguez's evolution not just as a poet, but as a woman, mother, and observer of the human condition.",
    pages: 128,
    isbn: "978-0-987654-32-1", 
    publisher: "Faber & Faber",
    audiobook: true,
    narrator: "Elena Rodriguez (Author's Voice)",
    languages: 15,
    poems: 67,
    price: {
      hardcover: 24.99,
      paperback: 14.99,
      ebook: 9.99,
      audiobook: 19.99
    },
    quotes: [
      "In the whisper of wind through autumn leaves, I hear the voices of all who came before.",
      "Love is not a destination but a journey written in the language of the heart.",
      "We are all stories in the end. Make yours worth telling."
    ]
  }
  // Add more books as needed
];

const BookPurchase: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<typeof books[0] | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'hardcover' | 'paperback' | 'ebook' | 'audiobook'>('hardcover');
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (bookId) {
      const foundBook = books.find(b => b.id === parseInt(bookId));
      setBook(foundBook || null);
    }
  }, [bookId]);

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Book Not Found</h1>
          <Button 
            onClick={() => navigate('/published/author')} 
            variant="outline"
            className="border-white/50 text-white hover:bg-white/10 hover:border-white/70 transition-colors bg-white/5 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-white">Back to Author Page</span>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsInCart(true);
    // Simulate cart addition
    setTimeout(() => setIsInCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-indigo-900/10"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Button 
            onClick={() => navigate('/published/author')} 
            variant="outline" 
            className="border-white/50 text-white hover:bg-white/10 hover:border-white/70 transition-colors bg-white/5 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-white">Back to Author Page</span>
          </Button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Book Cover & Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="relative">
                <div className="aspect-[3/4] max-w-xs sm:max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {book.bestseller && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black px-3 py-1">
                    Bestseller
                  </Badge>
                )}
                {book.newYorkTimesBestseller && (
                  <Badge className="absolute top-8 -right-2 bg-blue-600 text-white px-3 py-1">
                    NY Times #1
                  </Badge>
                )}
              </div>

              {/* Book Actions */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Button 
                  onClick={handleToggleWishlist}
                  variant="outline" 
                  className={`border-white/50 hover:bg-white/10 hover:border-white/70 transition-colors bg-white/5 ${isWishlisted ? 'bg-red-500/20 border-red-500/50 text-red-300' : 'text-white'}`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current text-red-300' : 'text-pink-400'}`} />
                  <span className="text-white font-medium">
                    {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                  </span>
                </Button>
                <Button variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:border-white/70 transition-colors bg-white/5">
                  <Share2 className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-white font-medium">Share Book</span>
                </Button>
                <Button variant="outline" className="border-white/50 text-white hover:bg-white/10 hover:border-white/70 transition-colors bg-white/5">
                  <Eye className="w-4 h-4 mr-2 text-green-400" />
                  <span className="text-white font-medium">Preview</span>
                </Button>
              </div>
            </motion.div>

            {/* Book Details & Purchase */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Book Info */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">{book.title}</h1>
                  <p className="text-lg sm:text-xl text-gray-300 mb-3 sm:mb-4">{book.subtitle}</p>
                  <p className="text-base sm:text-lg text-purple-300 font-medium">by Elena Rodriguez</p>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(book.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold">{book.rating}</span>
                  <span className="text-gray-400">({book.reviews.toLocaleString()} reviews)</span>
                </div>

                {/* Genre & Year */}
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                    {book.genre}
                  </Badge>
                  <span className="text-gray-400">{book.publishYear}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{book.pages} pages</span>
                </div>

                {/* Awards */}
                {book.awards && book.awards.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white">Awards & Recognition</h3>
                    <div className="flex flex-wrap gap-2">
                      {book.awards.slice(0, 3).map((award, index) => (
                        <div key={index} className="flex items-center space-x-1 text-xs text-yellow-300">
                          <Award className="w-3 h-3" />
                          <span>{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Format Selection */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Choose Format</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {Object.entries(book.price).map(([format, price]) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format as any)}
                      className={`p-2 sm:p-3 rounded-lg border transition-all ${
                        selectedFormat === format
                          ? 'border-purple-400 bg-purple-500/20 text-white'
                          : 'border-white/20 text-gray-300 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-medium capitalize">{format}</div>
                      <div className="text-base sm:text-lg font-bold">{formatPrice(price)}</div>
                      {format === 'audiobook' && (
                        <div className="text-xs text-gray-400 mt-1 hidden sm:block">
                          <Headphones className="w-3 h-3 inline mr-1" />
                          Narrated by {book.narrator}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between sm:space-x-4">
                  <div className="flex items-center border border-white/20 rounded-lg">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2 sm:px-3 py-2 text-white hover:bg-white/10 transition-colors text-lg"
                    >
                      -
                    </button>
                    <span className="px-3 sm:px-4 py-2 text-white border-l border-r border-white/20 min-w-[50px] text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2 sm:px-3 py-2 text-white hover:bg-white/10 transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {formatPrice(book.price[selectedFormat] * quantity)}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleAddToCart}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors flex-1"
                    disabled={isInCart}
                  >
                    {isInCart ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-colors flex-1">
                    Buy Now
                  </Button>
                </div>

                {/* Trust Signals */}
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-400 pt-4">
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Free shipping
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    Secure checkout
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-1" />
                    Easy returns
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Information Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-7xl mx-auto mt-12 sm:mt-16"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md border border-white/20 p-1">
                <TabsTrigger value="overview" className="text-white text-xs sm:text-sm font-medium data-[state=active]:text-white data-[state=active]:bg-purple-600/30 data-[state=active]:border-purple-400/50 px-2 sm:px-4">
                  <span className="text-white">Overview</span>
                </TabsTrigger>
                <TabsTrigger value="details" className="text-white text-xs sm:text-sm font-medium data-[state=active]:text-white data-[state=active]:bg-purple-600/30 data-[state=active]:border-purple-400/50 px-2 sm:px-4">
                  <span className="text-white">Details</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-white text-xs sm:text-sm font-medium data-[state=active]:text-white data-[state=active]:bg-purple-600/30 data-[state=active]:border-purple-400/50 px-2 sm:px-4">
                  <span className="text-white">Reviews</span>
                </TabsTrigger>
                <TabsTrigger value="author" className="text-white text-xs sm:text-sm font-medium data-[state=active]:text-white data-[state=active]:bg-purple-600/30 data-[state=active]:border-purple-400/50 px-1 sm:px-4">
                  <span className="text-white hidden sm:inline">About Author</span>
                  <span className="text-white sm:hidden">Author</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 sm:mt-8">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Synopsis</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {book.fullDescription || book.synopsis}
                      </p>
                      {book.quotes && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-white">Notable Quotes</h4>
                          {book.quotes.slice(0, 2).map((quote, index) => (
                            <blockquote key={index} className="border-l-4 border-purple-400 pl-4 italic text-gray-300 text-sm">
                              "{quote}"
                            </blockquote>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Critical Praise</h3>
                      <div className="space-y-4">
                        {book.criticalPraise?.map((praise, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center">
                              <Quote className="w-4 h-4 text-purple-400 mr-2" />
                              <span className="text-sm font-semibold text-purple-300">{praise.source}</span>
                            </div>
                            <p className="text-gray-300 text-sm italic pl-6">"{praise.quote}"</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-8">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white mb-4">Book Details</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">ISBN:</span>
                            <span className="text-white">{book.isbn}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Publisher:</span>
                            <span className="text-white">{book.publisher}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Pages:</span>
                            <span className="text-white">{book.pages}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Publication Year:</span>
                            <span className="text-white">{book.publishYear}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Languages:</span>
                            <span className="text-white">{book.languages} translations</span>
                          </div>
                          {book.audiobook && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Audiobook Narrator:</span>
                              <span className="text-white">{book.narrator}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {book.chapters && (
                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-white mb-4">Table of Contents</h3>
                          <div className="space-y-2">
                            {book.chapters.map((chapter, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <span className="text-gray-400 w-8">{index + 1}.</span>
                                <span className="text-gray-300">{chapter}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white">Reader Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(book.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-white font-semibold">{book.rating}</span>
                        <span className="text-gray-400">({book.reviews.toLocaleString()} reviews)</span>
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="space-y-6">
                      {[
                        {
                          name: "Sarah M.",
                          rating: 5,
                          date: "March 15, 2024",
                          review: "Absolutely stunning! Elena Rodriguez has outdone herself with this emotional masterpiece. I couldn't put it down and found myself crying at multiple points. The way she weaves together the stories of three generations is simply brilliant."
                        },
                        {
                          name: "Michael R.",
                          rating: 5,
                          date: "March 10, 2024", 
                          review: "This book will stay with me forever. The characters are so real and complex, and the story spans decades in the most beautiful way. Rodriguez's writing is poetry in prose form."
                        },
                        {
                          name: "Jennifer L.",
                          rating: 4,
                          date: "March 8, 2024",
                          review: "A powerful exploration of family secrets and the impact they have across generations. Some parts were slow, but the emotional payoff was worth it. Highly recommend for fans of literary fiction."
                        }
                      ].map((review, index) => (
                        <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <span className="font-semibold text-white">{review.name}</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < review.rating 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{review.review}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="author" className="mt-8">
                <Card className="bg-white/5 backdrop-blur-md border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
                        alt="Elena Rodriguez"
                        className="w-24 h-24 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">Elena Rodriguez</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          Elena Rodriguez is a globally celebrated contemporary author whose transformative storytelling has captivated millions of readers across six continents. With over fifteen years of literary excellence, she has penned twelve bestselling novels, five poetry collections, and numerous acclaimed short stories.
                        </p>
                        <Button 
                          onClick={() => navigate('/published/author')}
                          variant="outline" 
                          className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20"
                        >
                          View Full Author Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookPurchase;