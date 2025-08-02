'use client';

import { motion } from 'framer-motion';
import { Brain, Rocket, Users, Sprout } from 'lucide-react';

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="pt-20 pb-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6"
              {...fadeInUp}
            >
              About SnipSearch
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
              {...fadeInUp}
            >
              Where search meets story — lightning-fast, deeply contextual, and made for creators.
            </motion.p>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="max-w-4xl mx-auto px-4 pb-20"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 md:p-12 shadow-2xl">
            
            {/* Our Vision Section */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Our Vision</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  In an era where creativity moves at the speed of thought, SnipSearch exists to remove friction from the creative process.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We envision a world where anyone — from video editors and YouTubers to meme-makers and storytellers — can find the exact video moment they imagine, simply by describing it in words. No more endlessly scrubbing timelines. No more vague keyword searches. Just intuitive, intelligent video discovery powered by AI.
                </p>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">We believe:</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>That video is the new language of culture.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>That search should speak human.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>That every second saved is a second earned for creativity.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* What We Do Section */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">What We Do</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-8">
                  SnipSearch is an AI-powered search engine that helps creators discover short, iconic, and emotionally resonant clips from movies, anime, and internet content.
                </p>
                <p className="text-gray-300 leading-relaxed mb-8">
                  Whether you want a reaction shot, an emotional moment, or a specific character vibe, SnipSearch uses semantic search to understand your intent and match it with relevant content.
                </p>
                
                <h3 className="text-2xl font-semibold text-white mb-6">Features We&apos;re Proud Of:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3">🎯 Semantic Search Engine</h4>
                    <p className="text-gray-300">Describe a moment in natural language and get results that understand what you mean.</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3">🧩 Filtered, High-Quality Clips</h4>
                    <p className="text-gray-300">No trailers. No fluff. Just meme-worthy, mood-rich, and editor-approved clips.</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3">⚡ Fast and Intuitive Interface</h4>
                    <p className="text-gray-300">Built with creators in mind. Simple UI, smart filters, and fast load times.</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-lg font-semibold text-white mb-3">🔁 Instant Copy & Share Links</h4>
                    <p className="text-gray-300">Get a clip&apos;s YouTube link in one click.</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Who We Built This For Section */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Who We Built This For</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  SnipSearch is made for:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">YouTubers adding emotional beats or meme moments to videos.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Editors sourcing perfect references in seconds.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Social media creators needing iconic moments for short-form content.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Educators or students searching for visual examples.</span>
                  </div>
                  <div className="flex items-start gap-3 md:col-span-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Anyone who&apos;s tired of keyword-based video scavenger hunts.</span>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Our Story Section */}
            <motion.section variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Our Story</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  SnipSearch was born from a problem we faced ourselves: creative people waste too much time searching for clips they can picture but not find. So we built the tool we always wanted — and made it powerful enough to scale with creators of all sizes.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  What started as a weekend experiment is now evolving into a full-fledged AI platform for creative search, discovery, and inspiration.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We&apos;re a small, creator-led team — designers, coders, editors, and AI enthusiasts — building the future of content search.
                </p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}