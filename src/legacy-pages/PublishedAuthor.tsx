import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Award, 
  Quote, 
  Mail, 
  Twitter, 
  Instagram, 
  Globe, 
  Star,
  Users,
  Calendar,
  MapPin,
  Heart,
  Share2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Mic,
  Video,
  Camera,
  Headphones,
  Sparkles,
  Crown,
  Zap,
  Flame,
  Rainbow,
  BookMarked,
  PenTool,
  FileText,
  Newspaper,
  Radio,
  Tv,
  Coffee,
  Feather,
  Palette,
  Music,
  Eye,
  Download,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Enhanced Mock data for the author
const authorData = {
  name: "Elena Rodriguez",
  title: "International Bestselling Author & Literary Icon",
  subtitle: "Master of Contemporary Fiction & Poetry",
  bio: "Elena Rodriguez is a globally celebrated contemporary author whose transformative storytelling has captivated millions of readers across six continents. With over fifteen years of literary excellence, she has penned twelve bestselling novels, five poetry collections, and numerous acclaimed short stories, earning her place among the most influential voices of her generation.",
  longBio: "Born in Barcelona to a Spanish poet mother and American journalist father, Elena Rodriguez was destined for literary greatness. Raised between the vibrant streets of Barcelona, the artistic quarters of Paris, and the bustling energy of New York City, she brings an unparalleled multicultural perspective to her writing. Her work masterfully explores themes of identity, belonging, love, loss, and the intricate tapestry of human emotions with profound depth and universal appeal. Elena holds an MFA in Creative Writing from Columbia University, where she graduated summa cum laude, and a PhD in Comparative Literature from Oxford University. Her works have been translated into 28 languages and adapted for film and television. She has been featured on the covers of The New York Times Book Review, The Guardian, Literary Review, Vogue, and TIME Magazine. Beyond writing, Elena is a passionate advocate for literacy programs worldwide, serves on the board of PEN International, and mentors emerging authors through her foundation, 'Words Without Borders.' She divides her time between her writing retreats in Tuscany, her Manhattan penthouse, and her childhood home in Barcelona.",
  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop&crop=face",
  location: "New York • Barcelona • Tuscany",
  website: "www.elenarodriguezauthor.com",
  social: {
    twitter: "@ElenaRodriguezAuthor",
    instagram: "@elena.writes",
    facebook: "ElenaRodriguezOfficial",
    linkedin: "elena-rodriguez-author",
    youtube: "ElenaRodriguezBooks",
    email: "contact@elenarodriguezauthor.com"
  },
  stats: {
    booksPublished: 17,
    copiesSold: "8.7M+",
    awards: 24,
    languages: 28,
    countries: 65,
    followers: "2.1M+",
    yearsActive: 15,
    adaptations: 7
  },
  achievements: [
    "New York Times #1 Bestseller (12 times)",
    "Pulitzer Prize Finalist (3 times)",
    "National Book Award Winner",
    "Man Booker Prize Longlist",
    "UNESCO Literary Ambassador",
    "Order of Arts and Letters (France)",
    "Royal Society of Literature Fellow"
  ]
};

const books = [
  {
    id: 1,
    title: "The Memory Keeper's Daughter",
    subtitle: "A Novel",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
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
    pages: 384,
    isbn: "978-0-123456-78-9",
    publisher: "Penguin Random House",
    audiobook: true,
    narrator: "Penelope Cruz",
    movieRights: "Netflix (2024)",
    languages: 28,
    quotes: [
      "Memory is the thread that weaves our past into our present, creating the tapestry of who we are.",
      "Some secrets are meant to protect, others to destroy. The art is knowing which is which."
    ]
  },
  {
    id: 2,
    title: "Whispers in the Wind",
    subtitle: "Poetry Collection",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
    description: "An intimate collection of poems exploring love, loss, and the beauty of everyday moments.",
    genre: "Poetry",
    publishYear: 2023,
    rating: 4.9,
    reviews: 8892,
    bestseller: true,
    awards: ["Poetry Society Award", "Forward Prize Winner", "Costa Poetry Award"],
    synopsis: "This deeply personal collection captures the essence of human emotion through carefully crafted verses. From the quiet moments of dawn to the profound grief of loss, Rodriguez's poetry speaks to the universal experiences that connect us all.",
    pages: 128,
    isbn: "978-0-987654-32-1",
    publisher: "Faber & Faber",
    audiobook: true,
    narrator: "Elena Rodriguez (Author's Voice)",
    languages: 15,
    poems: 67,
    quotes: [
      "In the whisper of wind through autumn leaves, I hear the voices of all who came before.",
      "Love is not a destination but a journey written in the language of the heart."
    ]
  },
  {
    id: 3,
    title: "The Last Summer",
    subtitle: "A Novel",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
    description: "A coming-of-age story set in a small coastal town during one transformative summer.",
    genre: "Literary Fiction",
    publishYear: 2022,
    rating: 4.8,
    reviews: 21156,
    bestseller: true,
    newYorkTimesBestseller: true,
    weeksOnBestseller: 18,
    awards: ["Amazon Best Books of the Year", "Indie Choice Award", "Goodreads Choice Nominee"],
    synopsis: "When seventeen-year-old Maya returns to her grandmother's coastal village for what she believes will be her last summer there, she discovers family secrets that will change her understanding of home, identity, and belonging forever.",
    pages: 312,
    isbn: "978-0-456789-12-3",
    publisher: "HarperCollins",
    audiobook: true,
    narrator: "Zendaya",
    movieRights: "A24 Films (In Production)",
    languages: 22,
    quotes: [
      "Sometimes the end of one story is just the beginning of another.",
      "Home isn't a place you find, it's a feeling you create."
    ]
  },
  {
    id: 4,
    title: "Midnight in Barcelona",
    subtitle: "A Novel",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop",
    description: "A romantic thriller set in the enchanting streets of Barcelona.",
    genre: "Romance/Thriller",
    publishYear: 2021,
    rating: 4.7,
    reviews: 18334,
    bestseller: true,
    newYorkTimesBestseller: true,
    weeksOnBestseller: 12,
    awards: ["International Latino Book Award", "Romantic Writers Association Award", "Thriller Writers Award"],
    synopsis: "Art historian Sofia Mendez thought her research trip to Barcelona would be routine until she discovers a hidden painting that leads her into a web of art forgery, family secrets, and unexpected romance with a mysterious antiquarian.",
    pages: 368,
    isbn: "978-0-789012-34-5",
    publisher: "Simon & Schuster",
    audiobook: true,
    narrator: "Sofia Vergara",
    movieRights: "Sony Pictures (Released 2023)",
    languages: 24,
    quotes: [
      "In the shadows of ancient streets, the past and present dance together in eternal embrace.",
      "Love finds us when we least expect it, in the most extraordinary circumstances."
    ]
  },
  {
    id: 5,
    title: "Echoes of Tomorrow",
    subtitle: "A Novel",
    cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=450&fit=crop",
    description: "A dystopian masterpiece exploring humanity's resilience in the face of climate change.",
    genre: "Dystopian Fiction",
    publishYear: 2020,
    rating: 4.8,
    reviews: 15678,
    bestseller: true,
    newYorkTimesBestseller: true,
    weeksOnBestseller: 16,
    awards: ["Hugo Award Nominee", "Environmental Fiction Award", "Kirkus Prize Finalist"],
    synopsis: "In 2050, rising seas have reshaped the world. Marine biologist Dr. Aria Chen leads a desperate mission to save the last coral reef while navigating political intrigue and personal loss in this powerful tale of hope and survival.",
    pages: 432,
    isbn: "978-0-345678-90-1",
    publisher: "Tor Books",
    audiobook: true,
    narrator: "Sandra Oh",
    tvRights: "HBO Max (In Development)",
    languages: 26,
    quotes: [
      "The ocean remembers what the land forgets - that all life is connected.",
      "In the darkest times, hope becomes an act of rebellion."
    ]
  },
  {
    id: 6,
    title: "Letters to My Younger Self",
    subtitle: "Essays & Reflections",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
    description: "A deeply personal collection of essays on writing, life, and finding your voice.",
    genre: "Memoir/Essays",
    publishYear: 2019,
    rating: 4.9,
    reviews: 9876,
    bestseller: true,
    awards: ["PEN America Award", "National Book Critics Circle Nominee"],
    synopsis: "In this intimate collection, Elena Rodriguez shares the lessons learned on her journey from aspiring writer to literary icon, offering wisdom, humor, and inspiration to readers and writers alike.",
    pages: 256,
    isbn: "978-0-567890-12-3",
    publisher: "Vintage Books",
    audiobook: true,
    narrator: "Elena Rodriguez (Author's Voice)",
    languages: 18,
    essays: 24,
    quotes: [
      "Your voice is your superpower - never let anyone convince you to silence it.",
      "The stories we tell ourselves become the life we live."
    ]
  }
];

const testimonials = [
  {
    id: 1,
    name: "Margaret Atwood",
    title: "Author of The Handmaid's Tale",
    quote: "Elena Rodriguez writes with the precision of a poet and the heart of a storyteller. Her work is both intimate and universal, a rare combination that marks truly exceptional literature. She is, without question, one of the most important voices of our time.",
    image: "https://images.unsplash.com/photo-1494790108755-2616c96d40b3?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    type: "author"
  },
  {
    id: 2,
    name: "The New York Times",
    title: "Book Review - Michiko Kakutani",
    quote: "Rodriguez has established herself as one of the most compelling voices in contemporary literature. Her latest work is a masterclass in emotional storytelling that will leave readers breathless and changed. A stunning achievement.",
    image: null,
    rating: 5,
    type: "publication"
  },
  {
    id: 3,
    name: "Isabel Allende",
    title: "Bestselling Author of The House of the Spirits",
    quote: "Reading Elena's work is like discovering a hidden treasure. She captures the complexity of the human experience with remarkable grace and insight. Her stories stay with you long after the last page is turned.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    type: "author"
  },
  {
    id: 4,
    name: "Publishers Weekly",
    title: "Starred Review",
    quote: "★★★★★ A tour de force of literary fiction. Rodriguez demonstrates once again why she is considered one of the most important voices of her generation. Absolutely magnificent storytelling that transcends genre boundaries.",
    image: null,
    rating: 5,
    type: "publication"
  },
  {
    id: 5,
    name: "Oprah Winfrey",
    title: "Media Mogul & Book Club Host",
    quote: "Elena Rodriguez has that rare gift of making you feel like you're not just reading a story, but living it. Her books have been featured in my book club multiple times because they spark the kind of conversations that matter.",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    type: "celebrity"
  },
  {
    id: 6,
    name: "The Guardian",
    title: "Literary Critic - Sarah Waters",
    quote: "Rodriguez's prose is like liquid gold - it flows beautifully, catches the light, and leaves you richer for having experienced it. She is a master of her craft and a true artist.",
    image: null,
    rating: 5,
    type: "publication"
  },
  {
    id: 7,
    name: "Colson Whitehead",
    title: "Pulitzer Prize Winner",
    quote: "Elena Rodriguez is a force of nature in the literary world. Her ability to weave complex emotions into compelling narratives is unmatched. I eagerly await each new release.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    type: "author"
  },
  {
    id: 8,
    name: "TIME Magazine",
    title: "Best Books of the Year",
    quote: "Rodriguez's latest novel is not just a book, it's an experience. Her storytelling transcends the written word to become something almost mystical. A must-read for anyone who believes in the power of literature.",
    image: null,
    rating: 5,
    type: "publication"
  }
];

const awards = [
  {
    year: 2024,
    title: "National Book Award Winner",
    work: "The Memory Keeper's Daughter",
    category: "Fiction",
    prestige: "highest",
    description: "The most prestigious award in American literature"
  },
  {
    year: 2024,
    title: "Pulitzer Prize Finalist",
    work: "The Memory Keeper's Daughter",
    category: "Fiction",
    prestige: "highest",
    description: "Recognized for distinguished fiction by an American author"
  },
  {
    year: 2023,
    title: "Poetry Society Award",
    work: "Whispers in the Wind",
    category: "Poetry",
    prestige: "high",
    description: "Celebrating excellence in contemporary poetry"
  },
  {
    year: 2023,
    title: "UNESCO Literary Ambassador",
    work: "Lifetime Achievement",
    category: "Global Recognition",
    prestige: "highest",
    description: "Appointed for promoting literacy worldwide"
  },
  {
    year: 2022,
    title: "Order of Arts and Letters",
    work: "Literary Contribution",
    category: "International Honor",
    prestige: "highest",
    description: "French government honor for cultural contribution"
  },
  {
    year: 2022,
    title: "Amazon Best Books of the Year",
    work: "The Last Summer",
    category: "Fiction",
    prestige: "medium",
    description: "Selected by Amazon's editorial team"
  },
  {
    year: 2021,
    title: "International Latino Book Award",
    work: "Midnight in Barcelona",
    category: "Fiction",
    prestige: "high",
    description: "Celebrating Latino literary excellence"
  },
  {
    year: 2020,
    title: "Goodreads Choice Award Winner",
    work: "Echoes of Tomorrow",
    category: "Fiction",
    prestige: "medium",
    description: "Voted by millions of Goodreads readers"
  },
  {
    year: 2019,
    title: "PEN America Award",
    work: "Letters to My Younger Self",
    category: "Nonfiction",
    prestige: "high",
    description: "Honoring exceptional literary achievement"
  },
  {
    year: 2018,
    title: "Royal Society of Literature Fellow",
    work: "Lifetime Achievement",
    category: "Fellowship",
    prestige: "highest",
    description: "Elite fellowship for distinguished writers"
  }
];

const mediaAppearances = [
  {
    id: 1,
    type: "TV",
    show: "The Tonight Show Starring Jimmy Fallon",
    date: "2024-03-15",
    topic: "Discussing 'The Memory Keeper's Daughter'",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&h=200&fit=crop",
    duration: "12 minutes",
    views: "2.3M"
  },
  {
    id: 2,
    type: "Podcast",
    show: "Fresh Air with Terry Gross",
    date: "2024-02-28",
    topic: "The Art of Literary Storytelling",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=200&fit=crop",
    duration: "45 minutes",
    downloads: "1.8M"
  },
  {
    id: 3,
    type: "TV",
    show: "CBS Sunday Morning",
    date: "2024-01-20",
    topic: "Profile: Elena Rodriguez's Writing Journey",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
    duration: "8 minutes",
    views: "3.1M"
  },
  {
    id: 4,
    type: "Radio",
    show: "BBC Radio 4 - Desert Island Discs",
    date: "2023-11-10",
    topic: "Elena Rodriguez's Life in Books and Music",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=200&fit=crop",
    duration: "58 minutes",
    listeners: "4.2M"
  }
];

const upcomingEvents = [
  {
    id: 1,
    type: "Book Tour",
    title: "The Memory Keeper's Daughter - World Tour",
    date: "2024-04-15",
    location: "Lincoln Center, New York",
    description: "An intimate evening with Elena Rodriguez discussing her latest masterpiece",
    ticketsAvailable: true,
    soldOut: false,
    capacity: 2500
  },
  {
    id: 2,
    type: "Literary Festival",
    title: "Hay Festival Wales",
    date: "2024-05-22",
    location: "Hay-on-Wye, Wales",
    description: "Panel discussion on 'The Future of Contemporary Fiction'",
    ticketsAvailable: true,
    soldOut: true,
    capacity: 1200
  },
  {
    id: 3,
    type: "Masterclass",
    title: "Writing Workshop: Finding Your Voice",
    date: "2024-06-08",
    location: "Columbia University, New York",
    description: "Exclusive 3-day intensive workshop for aspiring writers",
    ticketsAvailable: true,
    soldOut: false,
    capacity: 50
  },
  {
    id: 4,
    type: "Book Launch",
    title: "Next Novel Announcement",
    date: "2024-07-12",
    location: "The Strand Bookstore, NYC",
    description: "First reading from Elena's highly anticipated next novel",
    ticketsAvailable: false,
    soldOut: false,
    capacity: 300
  }
];

const writingProcess = {
  dailyRoutine: "I write every morning from 5 AM to 9 AM, when the world is quiet and my mind is clear.",
  inspiration: "I find inspiration in overheard conversations, old photographs, and the spaces between words.",
  workspace: "My writing studio overlooks Central Park, with floor-to-ceiling windows and walls lined with books from floor to ceiling.",
  tools: "I write longhand first, then type on my 1960s Royal typewriter before moving to digital.",
  revision: "I revise each page at least seven times. The magic happens in the rewriting.",
  advice: "Read everything, write fearlessly, and never underestimate the power of a well-placed comma."
};

const PublishedAuthor: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Floating particles animation
  const particleVariants = {
    animate: {
      y: [-20, -100, -20],
      x: [-10, 10, -10],
      rotate: [0, 180, 360],
      scale: [1, 1.2, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-indigo-900/10"></div>
      
      {/* Minimal background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>
      {/* Professional Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Professional Author Image */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative inline-block mb-8"
                >
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto lg:mx-0">
                    <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-purple-500/20 shadow-2xl">
                      <img
                        src={authorData.image}
                        alt={authorData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Subtle badge */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Professional name and title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                    {authorData.name}
                  </h1>
                  
                  <p className="text-xl sm:text-2xl text-purple-200 font-medium">
                    {authorData.title}
                  </p>
                  
                  <p className="text-lg text-gray-300">
                    {authorData.subtitle}
                  </p>
                  
                  <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{authorData.location}</span>
                  </div>
                </motion.div>

                {/* Professional Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-3"
                >
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-400/50 text-white hover:bg-purple-600/20 hover:border-purple-400/70 transition-colors bg-purple-500/10"
                  >
                    <Globe className="w-4 h-4 mr-2 text-purple-300" />
                    <span className="text-white font-medium">Website</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-blue-400/50 text-white hover:bg-blue-600/20 hover:border-blue-400/70 transition-colors bg-blue-500/10"
                  >
                    <Twitter className="w-4 h-4 mr-2 text-blue-300" />
                    <span className="text-white font-medium">Twitter</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-pink-400/50 text-white hover:bg-pink-600/20 hover:border-pink-400/70 transition-colors bg-pink-500/10"
                  >
                    <Instagram className="w-4 h-4 mr-2 text-pink-300" />
                    <span className="text-white font-medium">Instagram</span>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-gray-400/50 text-white hover:bg-gray-600/20 hover:border-gray-400/70 transition-colors bg-gray-500/10"
                  >
                    <Mail className="w-4 h-4 mr-2 text-gray-300" />
                    <span className="text-white font-medium">Contact</span>
                  </Button>
                </motion.div>
              </div>

              {/* Professional Bio and Stats */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3 text-purple-400" />
                    About the Author
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {authorData.bio}
                  </p>
                  
                  {/* Key achievements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {authorData.achievements.slice(0, 4).map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-emerald-300">
                        <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Full Biography
                  </Button>
                </motion.div>

                {/* Professional Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {[
                    { value: authorData.stats.booksPublished, label: "Books Published", icon: BookOpen },
                    { value: authorData.stats.copiesSold, label: "Copies Sold", icon: Heart },
                    { value: authorData.stats.awards, label: "Awards Won", icon: Award },
                    { value: authorData.stats.languages, label: "Languages", icon: Globe },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Additional stats row for mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {[
                    { value: authorData.stats.countries, label: "Countries", icon: MapPin },
                    { value: authorData.stats.followers, label: "Followers", icon: Users },
                    { value: authorData.stats.yearsActive, label: "Years Active", icon: Calendar },
                    { value: authorData.stats.adaptations, label: "Adaptations", icon: Video },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    >
                      <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Books Showcase */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Published Works
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Critically acclaimed novels and poetry collections
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:bg-white/10">
                  <CardContent className="p-4 sm:p-6">
                    <div className="relative mb-4">
                      <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      {book.bestseller && (
                        <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs px-2 py-1">
                          Bestseller
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-white text-base sm:text-lg leading-tight">{book.title}</h3>
                        <p className="text-gray-400 text-sm">{book.subtitle}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 text-xs">
                          {book.genre}
                        </Badge>
                        <span className="text-gray-400 text-sm">{book.publishYear}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(book.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-400 text-xs">({book.reviews.toLocaleString()})</span>
                      </div>
                      
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {book.description}
                      </p>
                      
                      <Button 
                        size="sm" 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors text-sm"
                      >
                        Purchase Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Praise & Recognition
            </h2>
            <p className="text-lg text-gray-300">
              What critics and fellow authors say
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 text-center"
                >
                  <Quote className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <blockquote className="text-lg sm:text-xl text-white leading-relaxed mb-6 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-3">
                    {testimonials[currentTestimonial].image && (
                      <img
                        src={testimonials[currentTestimonial].image!}
                        alt={testimonials[currentTestimonial].name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div className="text-left">
                      <div className="font-semibold text-purple-300 text-sm sm:text-base">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-gray-400 text-xs sm:text-sm">
                        {testimonials[currentTestimonial].title}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Mobile-friendly navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30 transition-colors"
                  onClick={prevTestimonial}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                
                {/* Testimonial dots */}
                <div className="flex space-x-2">
                  {testimonials.slice(0, 6).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentTestimonial 
                          ? 'bg-purple-400 scale-125' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30 transition-colors"
                  onClick={nextTestimonial}
                >
                  <ChevronRight className="w-4 h-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube & Media Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Media & Interviews
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Watch exclusive interviews and behind-the-scenes content
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Featured YouTube Video */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="aspect-video bg-gradient-to-br from-red-900/20 to-red-700/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop" 
                  alt="YouTube Interview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                "The Art of Storytelling" - Author Interview
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                A deep dive into Elena's writing process and inspiration behind her bestselling novels.
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>📺 2.3M views</span>
                <span>⏱️ 24 minutes</span>
              </div>
            </motion.div>

            {/* Second Video */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="aspect-video bg-gradient-to-br from-blue-900/20 to-blue-700/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
                  alt="Book Reading"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Live Reading: "The Memory Keeper's Daughter"
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Elena reads an exclusive excerpt from her award-winning novel at the Lincoln Center.
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>📺 1.8M views</span>
                <span>⏱️ 18 minutes</span>
              </div>
            </motion.div>
          </div>

          {/* Media Appearances Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {mediaAppearances.map((appearance, index) => (
              <motion.div
                key={appearance.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  {appearance.type === 'TV' && <Tv className="w-6 h-6 text-white" />}
                  {appearance.type === 'Podcast' && <Headphones className="w-6 h-6 text-white" />}
                  {appearance.type === 'Radio' && <Radio className="w-6 h-6 text-white" />}
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">{appearance.show}</h4>
                <p className="text-xs text-gray-400 mb-2">{appearance.topic}</p>
                <div className="text-xs text-purple-300">
                  {appearance.views && `${appearance.views} views`}
                  {appearance.downloads && `${appearance.downloads} downloads`}
                  {appearance.listeners && `${appearance.listeners} listeners`}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Writing Process Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-purple-900/10 to-blue-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Behind the Words
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              An intimate look into Elena's creative process and daily routine
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Coffee className="w-6 h-6 text-amber-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Daily Routine</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {writingProcess.dailyRoutine}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Palette className="w-6 h-6 text-pink-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Inspiration</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {writingProcess.inspiration}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <PenTool className="w-6 h-6 text-blue-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Writing Tools</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {writingProcess.tools}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-emerald-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Workspace</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {writingProcess.workspace}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-6 h-6 text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Revision Process</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {writingProcess.revision}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Advice for Writers</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {writingProcess.advice}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Meet Elena at these exclusive literary events and book signings
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-blue-400 mr-2" />
                      <span className="text-blue-300 text-sm font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                  </div>
                  {event.soldOut && (
                    <Badge className="bg-red-500 text-white text-xs">
                      SOLD OUT
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>👥 {event.capacity} seats</span>
                    <span>🎫 {event.type}</span>
                  </div>
                  {event.ticketsAvailable && !event.soldOut && (
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors text-xs">
                      Get Tickets
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Awards & Recognition
            </h2>
            <p className="text-xl text-gray-300">
              Celebrating literary excellence and critical acclaim
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-6 bg-white/5 backdrop-blur-md border border-purple-400/20 rounded-xl p-6 hover:border-purple-400/40 transition-colors duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-white">{award.title}</h3>
                    <p className="text-gray-400">{award.work}</p>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">
                    {award.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-white/5 backdrop-blur-md border border-purple-400/20 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Stay Connected
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Be the first to know about new releases, upcoming events, and exclusive content
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Subscribe to Newsletter
                </Button>
                <Button variant="outline" className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Follow on Social
                </Button>
              </div>
              
              <div className="flex justify-center space-x-6">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Globe className="w-5 h-5" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBook(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-gradient-to-br from-slate-900 to-purple-900 border border-purple-400/30 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Book Cover */}
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={selectedBook.cover}
                      alt={selectedBook.title}
                      className="w-80 h-[480px] object-cover rounded-lg shadow-2xl"
                    />
                    {selectedBook.bestseller && (
                      <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                        Bestseller
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Book Details */}
                <div className="space-y-6 overflow-y-auto">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedBook.title}</h2>
                    <p className="text-xl text-gray-300 mb-4">{selectedBook.subtitle}</p>
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                        {selectedBook.genre}
                      </Badge>
                      <span className="text-gray-400">{selectedBook.publishYear}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(selectedBook.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white font-medium">{selectedBook.rating}</span>
                      <span className="text-gray-400">({selectedBook.reviews} reviews)</span>
                    </div>
                  </div>

                  {selectedBook.awards.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Awards & Recognition</h3>
                      <div className="space-y-2">
                        {selectedBook.awards.map((award, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-yellow-400" />
                            <span className="text-gray-300">{award}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Synopsis</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedBook.synopsis}</p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Purchase Book
                    </Button>
                    <Button variant="outline" className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20">
                      <Heart className="w-4 h-4 mr-2" />
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PublishedAuthor;