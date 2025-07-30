'use client';

import { motion } from 'framer-motion';
import { Shield, Database, Eye, Share2, Lock, UserCheck, Baby } from 'lucide-react';

export default function PrivacyPage() {
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
              {...fadeInUp}
            >
              Privacy Policy
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
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 md:p-12 shadow-2xl">
            
            {/* Introduction */}
            <motion.div className="mb-12" variants={fadeInUp}>
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-green-500/20">
                <p className="text-gray-300 leading-relaxed">
                  At SnipSearch, your privacy is a priority. This Privacy Policy explains how we collect, use, and protect your information.
                </p>
              </div>
            </motion.div>

            {/* Data We Collect */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">1. Data We Collect</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="space-y-6">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Search Queries</h3>
                    <p className="text-gray-300 leading-relaxed">
                      When you search on SnipSearch, we log anonymized queries to improve results.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Registration Data</h3>
                    <p className="text-gray-300 leading-relaxed">
                      If you register, we collect your name, email, and subscription details.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Browser Cookies</h3>
                    <p className="text-gray-300 leading-relaxed">
                      We use browser cookies to track session data and usage stats.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* How We Use Data */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">2. How We Use Data</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Personalization</h3>
                    <p className="text-gray-300">To personalize and improve your search experience.</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Performance Monitoring</h3>
                    <p className="text-gray-300">To monitor system performance and detect bugs.</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 md:col-span-2">
                    <h3 className="text-lg font-semibold text-white mb-3">Updates & Communication</h3>
                    <p className="text-gray-300">To send updates about new features or pricing (if opted-in).</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Sharing of Data */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">3. Sharing of Data</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-white mb-3">No Data Sales</h3>
                    <p className="text-gray-300 leading-relaxed">
                      We do not sell your data to third parties.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Third-Party Services</h3>
                    <p className="text-gray-300 leading-relaxed">
                      We may use third-party services (like analytics or payment providers) that require minimal user data to operate.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Data Storage & Security */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">4. Data Storage & Security</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Secure Storage</h3>
                    <p className="text-gray-300">
                      Your data is stored securely in Supabase and protected with access control.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Payment Security</h3>
                    <p className="text-gray-300">
                      All payments are processed through encrypted, PCI-compliant providers (e.g., Stripe).
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Your Rights */}
            <motion.section className="mb-16" variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">5. Your Rights</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="space-y-6">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Data Deletion</h3>
                    <p className="text-gray-300 leading-relaxed">
                      You may request deletion of your data at any time.
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Account Control</h3>
                    <p className="text-gray-300 leading-relaxed">
                      You may unsubscribe from emails or delete your account directly.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Children's Privacy */}
            <motion.section variants={fadeInUp}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl">
                  <Baby className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">6. Children's Privacy</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-xl p-6 border border-orange-500/20">
                  <p className="text-gray-300 leading-relaxed">
                    SnipSearch is not intended for users under 13 years of age.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 