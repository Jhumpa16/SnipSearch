'use client';

import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Users, Twitter, Linkedin, Github } from 'lucide-react';

export default function ContactPage() {
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6"
              {...fadeInUp}
            >
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
              {...fadeInUp}
            >
              We'd love to hear from you. Whether you have a question, feedback, a bug to report, or a partnership idea — drop us a message.
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
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 md:p-12 shadow-2xl">
            
            {/* Email Section */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Email</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  We're currently setting up a dedicated support email. In the meantime, please reach out to:
                </p>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <a 
                      href="mailto:support@snipsearch.io" 
                      className="text-xl font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      support@snipsearch.io
                    </a>
                    <span className="text-sm text-gray-400">(placeholder)</span>
                  </div>
                  <p className="text-gray-400 mt-2">We'll get back to you within 48 hours.</p>
                </div>
              </div>
            </motion.section>

            {/* Collaborate Section */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Collaborate or Partner?</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">
                  We're actively looking to collaborate with content studios, editing tools, and AI creators. If you want to integrate with SnipSearch or bring our clip discovery to your product, let's talk.
                </p>
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Partnership Opportunities:</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Content studio integrations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Editing tool partnerships</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>AI creator collaborations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>API integrations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Location Section */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Where We're Based</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-orange-400" />
                    <span className="text-xl font-semibold text-white">Remote-first</span>
                  </div>
                  <p className="text-gray-300">
                    Built by creators across India and beyond. We believe great ideas can come from anywhere, and our distributed team reflects that philosophy.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Social Media Section */}
            <motion.section variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Follow Our Journey</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-8">
                  Stay updated with our latest features, behind-the-scenes content, and creator stories.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                      <Twitter className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <h3 className="text-lg font-semibold text-white">Twitter (X)</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Coming soon</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                      <Linkedin className="w-6 h-6 text-blue-600 group-hover:text-blue-500 transition-colors" />
                      <h3 className="text-lg font-semibold text-white">LinkedIn</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Coming soon</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-500/50 transition-colors group">
                    <div className="flex items-center gap-3 mb-4">
                      <Github className="w-6 h-6 text-gray-400 group-hover:text-gray-300 transition-colors" />
                      <h3 className="text-lg font-semibold text-white">GitHub</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Coming soon</p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 