'use client';

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
  Crown,
  Sparkles,
  PenTool,
  FileText,
  Coffee,
  Feather,
  Palette,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Author data for Lillian Blythe
const authorData = {
  name: "Lillian Blythe",
  title: "Emerging Voice in Contemporary Poetry & Prose",
  subtitle: "Student Writer & Passionate Storyteller",
  bio: "Lillian Blythe is a 15-year-old emerging writer whose passion for storytelling has been her constant companion since childhood. What began as a creative outlet in 4th standard has evolved into a dedicated craft, with Lillian becoming a regular writer by 7th standard. Through the challenges of the COVID-19 pandemic and personal loss, she has found solace and expression through the written word, transforming pain into powerful poetry and prose.",
  longBio: "Born with an innate sensitivity to the world around her, Lillian Blythe discovered her calling as a writer at an early age. Her journey began in 4th standard when she first picked up a pen to express her thoughts, but it was during the 7th standard that writing became a regular practice and passion. The COVID-19 pandemic, with its isolation and heartbreak, became a defining period in her literary development. Confined to her room during lockdown, with only her pen as a companion, Lillian channeled her emotions and observations into powerful verses. The tragic loss of her closest friend further deepened her connection to writing, giving her profound reasons to explore themes of love, loss, and grief. Despite her young age, Lillian possesses a mature perspective that sets her apart. She writes from a place of authentic experience, addressing the bitter truths of life with empathy and understanding. Her work resonates with those who feel alienated or misunderstood, offering comfort through shared experience and emotional honesty.",
  image: "https://i.ibb.co/KjLhjmZf/f101f1f5-0108-4594-b9bc-ae7c8a8f9ffb.jpg",
  location: "India",
  age: 15,
  role: "Student & Writer",
  website: "",
  social: {
    twitter: "",
    instagram: "thesecretdiariesofred",
    facebook: "",
    linkedin: "",
    email: "unwovenversesoflillian@gmail.com",
    blogger: "https://www.blogger.com/profile"
  },
  stats: {
    age: 15,
    yearsWriting: "Since 4th Standard",
    currentWork: "Studying",
    poemsInProgress: "50+",
    poetryStyles: "5+",
    themes: "Love, Loss & Grief"
  },
  journey: {
    start: "I developed this passion for writing since 4th standard, and became a regular in 7th standard. During COVID-19 pandemic, many heart-wrenching events happened which eventually led me to spill my thoughts on paper. Isolated in a room, pen has been my only companion.",
    motivation: "I have always felt that most people never understood me or always opposed my opinions, which still stands true even as I write this. The feeling of alienation from the society due to different opinions and perspective-a philosophy of a pre-matured writer, motivated me to write. My closest friend's tragic death, afterwards, gave me enough reasons to write.",
    vision: "Becoming an empathetic writer whose words won't fail to comfort people with bitter truths of life.",
    currentProject: "An anthology of my own which consists of 50 poems. They contain: sonnets, quatrains, sestet, octaves, and verses based on themes of love, loss and grief.",
    message: "I write to gather the fragments of silence, the fleeting moments, and the emotions too fragile for speech. My words are not answers, but bridges - across solitude, toward a quiet belonging. If even one heart finds itself reflected in my pages, then every word has found its purpose."
  }
};

const currentProject = {
  title: "Untitled Poetry Anthology",
  description: "An intimate collection of 50 poems exploring the depths of human emotion",
  status: "In Progress",
  poems: 50,
  styles: ["Sonnets", "Quatrains", "Sestets", "Octaves", "Free Verse"],
  themes: ["Love", "Loss", "Grief", "Solitude", "Belonging"],
  completion: "Work in Progress"
};

const testimonials = [
  {
    id: 1,
    name: "Literature Teacher",
    title: "Academic Mentor",
    quote: "Lillian's writing displays a maturity far beyond her years. Her ability to capture complex emotions with such clarity is remarkable for someone so young.",
    image: null,
    rating: 5,
    type: "academic"
  },
  {
    id: 2,
    name: "Peer Review",
    title: "Fellow Student Writer",
    quote: "Reading Lillian's poetry feels like finding someone who truly understands. Her words have a way of making you feel less alone in the world.",
    image: null,
    rating: 5,
    type: "peer"
  },
  {
    id: 3,
    name: "Writing Circle Member",
    title: "Creative Writing Group",
    quote: "Lillian's perspective brings depth to our discussions. Her unique voice and authentic experiences add richness to our creative community.",
    image: null,
    rating: 5,
    type: "community"
  }
];

const writingProcess = {
  inspiration: "I find inspiration in the quiet moments between chaos, in overheard conversations, and in the emotions too complex for everyday language.",
  workspace: "My writing space is simple - just a notebook, a pen, and the solitude of my room where thoughts can flow freely onto paper.",
  routine: "I write whenever emotions demand expression, whether it's the stillness of early morning or the depth of late night reflection.",
  tools: "I prefer the intimacy of pen and paper first, feeling the physical connection between thought and word before transitioning to digital formats.",
  revision: "Each poem goes through multiple drafts as I search for the exact words that capture the feeling I'm trying to convey.",
  advice: "Write from your truth, even when it hurts. The most powerful words come from authentic experience."
};

const LillianBlytheAuthor: React.FC = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo/Brand - Mobile Optimized */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <PenTool className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg font-bold text-white truncate">inkfetish publication</h1>
                <p className="text-xs text-gray-400 truncate">X Lillian Blythe</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2"
                onClick={() => {
                  const menu = document.getElementById('mobile-menu');
                  if (menu) menu.classList.toggle('hidden');
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#work" className="text-gray-300 hover:text-white transition-colors">Work</a>
              <a href="#journey" className="text-gray-300 hover:text-white transition-colors">Journey</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2"
                onClick={() => window.open(`https://instagram.com/${authorData.social.instagram}`, '_blank')}
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2"
                onClick={() => window.open(`mailto:${authorData.social.email}`, '_blank')}
              >
                <Mail className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2"
                onClick={() => window.open(authorData.social.blogger, '_blank')}
              >
                <Globe className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div id="mobile-menu" className="hidden md:hidden border-t border-white/10 py-4">
            <div className="flex flex-col space-y-3">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors py-2">About</a>
              <a href="#work" className="text-gray-300 hover:text-white transition-colors py-2">Work</a>
              <a href="#journey" className="text-gray-300 hover:text-white transition-colors py-2">Journey</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors py-2">Contact</a>
              <div className="flex items-center space-x-3 pt-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                  onClick={() => window.open(`https://instagram.com/${authorData.social.instagram}`, '_blank')}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                  onClick={() => window.open(`mailto:${authorData.social.email}`, '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                  onClick={() => window.open(authorData.social.blogger, '_blank')}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Blogger
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-indigo-900/10"></div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section id="about" className="relative py-16 sm:py-20 lg:py-32 pt-20 sm:pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Author Image */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative inline-block mb-6 sm:mb-8"
                >
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto lg:mx-0">
                    <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-purple-500/20 shadow-2xl">
                      <img
                        src={authorData.image}
                        alt={authorData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <Feather className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-4"
                >
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                    {authorData.name}
                  </h1>

                  <p className="text-lg sm:text-xl lg:text-2xl text-purple-200 font-medium">
                    {authorData.title}
                  </p>

                  <p className="text-base sm:text-lg text-gray-300">
                    {authorData.subtitle}
                  </p>

                  <div className="flex items-center justify-center lg:justify-start space-x-4 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{authorData.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Age {authorData.age}</span>
                    </div>
                  </div>
                </motion.div>

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
                    onClick={() => window.open(`mailto:${authorData.social.email}`, '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2 text-purple-300" />
                    <span className="text-white font-medium">Connect</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-pink-400/50 text-white hover:bg-pink-600/20 hover:border-pink-400/70 transition-colors bg-pink-500/10"
                    onClick={() => window.open(`https://instagram.com/${authorData.social.instagram}`, '_blank')}
                  >
                    <Instagram className="w-4 h-4 mr-2 text-pink-300" />
                    <span className="text-white font-medium">Instagram</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-400/50 text-white hover:bg-blue-600/20 hover:border-blue-400/70 transition-colors bg-blue-500/10"
                    onClick={() => window.open(authorData.social.blogger, '_blank')}
                  >
                    <Globe className="w-4 h-4 mr-2 text-blue-300" />
                    <span className="text-white font-medium">Blogger</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-pink-400/50 text-white hover:bg-pink-600/20 hover:border-pink-400/70 transition-colors bg-pink-500/10"
                  >
                    <Heart className="w-4 h-4 mr-2 text-pink-300" />
                    <span className="text-white font-medium">Support</span>
                  </Button>
                </motion.div>
              </div>

              {/* Author Bio and Stats */}
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

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-emerald-300">
                      <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                      <span>Passionate writer since 4th standard</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-emerald-300">
                      <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                      <span>Regular writer since 7th standard</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-emerald-300">
                      <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                      <span>Currently working on 50-poem anthology</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-emerald-300">
                      <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                      <span>Specializes in multiple poetry forms</span>
                    </div>
                  </div>

                  <Button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-colors"
                    onClick={() => {
                      const element = document.getElementById('full-biography');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Full Biography
                  </Button>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
                >
                  {[
                    { value: authorData.stats.age, label: "Age", icon: Calendar },
                    { value: authorData.stats.yearsWriting, label: "Writing Since", icon: PenTool },
                    { value: authorData.stats.currentWork, label: "Currently", icon: BookOpen },
                    { value: authorData.stats.poemsInProgress, label: "Poems in Anthology", icon: FileText },
                    { value: authorData.stats.poetryStyles, label: "Poetry Forms", icon: Palette },
                    { value: authorData.stats.themes, label: "Main Themes", icon: Heart },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 sm:p-4 text-center hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    >
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-base sm:text-lg font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-400 leading-tight">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Biography Section */}
      <section id="full-biography" className="py-16 sm:py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Full Biography
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The complete story of Lillian's writing journey
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  {authorData.longBio}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <PenTool className="w-5 h-5 mr-2 text-purple-400" />
                      Writing Philosophy
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Lillian believes in the power of authentic expression and the importance of giving voice to emotions that are often left unspoken. Her writing serves as a bridge between solitude and belonging, offering comfort to those who feel misunderstood.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-pink-400" />
                      Impact & Vision
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Through her poetry, Lillian aims to create a space where readers can find themselves reflected in her words, knowing they are not alone in their experiences of love, loss, and the complex emotions of growing up.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Work Section */}
      <section id="work" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Current Work
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              An intimate look into Lillian's ongoing poetry anthology
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8"
            >
              <div className="text-center mb-8">
                <div className="w-32 h-48 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-2xl flex items-center justify-center">
                  <div className="text-white text-center">
                    <BookOpen className="w-12 h-12 mx-auto mb-2" />
                    <div className="text-xs font-semibold">COMING SOON</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{currentProject.title}</h3>
                <p className="text-gray-300 mb-4">{currentProject.description}</p>
                <Badge className="bg-yellow-500 text-black font-semibold">
                  {currentProject.status}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white flex items-center">
                    <PenTool className="w-5 h-5 mr-2 text-purple-400" />
                    Poetry Forms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.styles.map((style, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-600/20 text-purple-300">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-pink-400" />
                    Themes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.themes.map((theme, index) => (
                      <Badge key={index} variant="secondary" className="bg-pink-600/20 text-pink-300">
                        {theme}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Project Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Poems:</span>
                      <span className="text-white font-medium">{currentProject.poems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-white font-medium">{currentProject.completion}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-colors" disabled>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Coming Soon
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-16 sm:py-20 bg-gradient-to-r from-purple-900/10 to-blue-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Writing Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              The story behind the words - from childhood passion to dedicated craft
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Journey Start */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-yellow-400" />
                How It All Began
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {authorData.journey.start}
              </p>
            </motion.div>

            {/* Motivation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-red-400" />
                What Drives Me
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {authorData.journey.motivation}
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-blue-400" />
                Future Vision
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {authorData.journey.vision}
              </p>
            </motion.div>

            {/* Current Project */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <PenTool className="w-6 h-6 mr-3 text-purple-400" />
                Current Focus
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {authorData.journey.currentProject}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">
              A Message from Lillian
            </h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12"
            >
              <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6" />
              <blockquote className="text-lg sm:text-xl text-white leading-relaxed italic mb-6">
                "{authorData.journey.message}"
              </blockquote>
              <div className="text-purple-300 font-semibold">
                - {authorData.name}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Writing Process */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Behind the Words
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              An intimate look into Lillian's creative process and writing routine
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-6 h-6 text-amber-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Inspiration</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {writingProcess.inspiration}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Coffee className="w-6 h-6 text-amber-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Writing Routine</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {writingProcess.routine}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <PenTool className="w-6 h-6 text-blue-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Tools & Process</h3>
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
                  <h3 className="text-xl font-semibold text-white">Revision</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {writingProcess.revision}
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <Heart className="w-6 h-6 text-pink-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Advice</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {writingProcess.advice}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              What Others Say
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Voices from Lillian's writing community
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
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 text-center"
                >
                  <Quote className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <blockquote className="text-base sm:text-lg lg:text-xl text-white leading-relaxed mb-4 sm:mb-6 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-3">
                    {testimonials[currentTestimonial].image && (
                      <img
                        src={testimonials[currentTestimonial].image}
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

              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white/70 hover:bg-white/10 hover:border-white/30 transition-colors"
                  onClick={prevTestimonial}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentTestimonial
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
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-20 relative">
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
                Follow the Journey
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Stay connected as Lillian continues to explore the depths of human emotion through poetry
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Support Young Writer
                </Button>
                <Button variant="outline" className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Story
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LillianBlytheAuthor;