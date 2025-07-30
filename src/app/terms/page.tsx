'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Copyright, AlertTriangle, Zap, Settings, XCircle } from 'lucide-react';

export default function TermsPage() {
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-6"
              {...fadeInUp}
            >
              Terms of Service
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
              {...fadeInUp}
            >
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 md:p-12 shadow-2xl">
            
            {/* Introduction */}
            <motion.div className="mb-12" variants={fadeInUp}>
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/20">
                <p className="text-gray-300 leading-relaxed">
                  Welcome to SnipSearch. By accessing or using our services, you agree to the following Terms of Service. If you do not agree, please do not use the platform.
                </p>
              </div>
            </motion.div>

            {/* Service Description */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">1. Service Description</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  SnipSearch provides a search and discovery platform for video clips, using metadata and AI-powered search. We do not host videos; we link to publicly available YouTube content.
                </p>
              </div>
            </motion.section>

            {/* User Access */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">2. User Access</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="space-y-4">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-300 leading-relaxed">
                      Users may search up to 3 times/day under the demo plan.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-300 leading-relaxed">
                      Premium access requires a subscription.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <p className="text-gray-300 leading-relaxed">
                      Users may not scrape, reverse-engineer, or repurpose our backend logic.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Content Ownership */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl">
                  <Copyright className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">3. Content Ownership</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  All video content linked through SnipSearch remains the intellectual property of the respective YouTube creators. We do not claim rights to any videos.
                </p>
              </div>
            </motion.section>

            {/* Fair Use Disclaimer */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">4. Fair Use Disclaimer</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
                  <p className="text-gray-300 leading-relaxed">
                    SnipSearch is intended for editorial, educational, and creative use under the principles of fair use. It is your responsibility to ensure your usage of third-party content complies with applicable laws.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Limitations of Liability */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">5. Limitations of Liability</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  SnipSearch is not liable for inaccuracies, outages, or loss of data. Our AI models work to improve search accuracy but do not guarantee perfection.
                </p>
              </div>
            </motion.section>

            {/* Changes to Service */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">6. Changes to Service</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify or discontinue any part of the service at any time. You will be notified in advance for major changes.
                </p>
              </div>
            </motion.section>

            {/* Termination */}
            <motion.section variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">7. Termination</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to suspend or terminate accounts in case of misuse or abuse of the service.
                </p>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 