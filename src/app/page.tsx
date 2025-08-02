"use client";
import React from "react";
import NavBar from "../components/NavBar";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import CountUp from 'react-countup';
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#0f172a] to-[#1e293b] text-zinc-100">
      <NavBar />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] text-white flex flex-col items-center justify-center py-28 px-4 w-full overflow-hidden"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        {/* Floating Icons - left */}
        <motion.div
          className="hidden md:block absolute left-12 top-1/3 text-5xl text-cyan-300 drop-shadow-lg z-10"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          🎬
        </motion.div>
        <motion.div
          className="hidden md:block absolute left-20 bottom-24 text-4xl text-pink-400 drop-shadow-lg z-10"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          🎥
        </motion.div>
        {/* Floating Icons - right */}
        <motion.div
          className="hidden md:block absolute right-16 top-1/4 text-5xl text-indigo-300 drop-shadow-lg z-10"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          🔍
        </motion.div>
        <motion.div
          className="hidden md:block absolute right-24 bottom-20 text-4xl text-purple-400 drop-shadow-lg z-10"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          🎬
        </motion.div>
        {/* Hero Content */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg mb-4 z-10"
        >
          Discover scenes, not summaries.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-2xl text-neutral-300 text-center max-w-2xl mb-10 z-10"
        >
          Find cinematic clips by mood, category, or prompt.
        </motion.p>
        {/* Social Proof Stats inside hero */}
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 z-10 mt-10">
          <div className="flex-1 flex flex-col items-center text-center">
            <span className="text-3xl md:text-4xl">🎥</span>
            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-purple-600 bg-clip-text text-transparent mt-2">
              <CountUp end={20000} duration={2} separator="," />+
            </span>
            <span className="text-neutral-300 text-base mt-1">clips indexed</span>
          </div>
          <div className="flex-1 flex flex-col items-center text-center">
            <span className="text-3xl md:text-4xl">🔍</span>
            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent mt-2">
              <CountUp end={300} duration={2} separator="," />+
            </span>
            <span className="text-neutral-300 text-base mt-1">moods and filters</span>
          </div>
          <div className="flex-1 flex flex-col items-center text-center">
            <span className="text-3xl md:text-4xl">❤️</span>
            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-fuchsia-600 bg-clip-text text-transparent mt-2">
              <CountUp end={1200} duration={2} separator="," />
            </span>
            <span className="text-neutral-300 text-base mt-1">Used by creators</span>
          </div>
        </div>
      </motion.section>

      {/* Video Carousel Section: Preview the Possibilities */}
      <VideoCarouselSection />
      {/* Why SnipSearch Section - above FAQ */}
      <section className="relative w-full py-20 px-4 md:px-0 bg-gradient-to-br from-[#0f1123] via-[#1a1440] to-[#2d0b3a] overflow-hidden">
        {/* Subtle grid background with radial fade, inspired by reference image */}
        <div className="absolute inset-0 -z-10 pointer-events-none select-none">
          <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <radialGradient id="grid-fade-why" cx="50%" cy="50%" r="0.7">
                <stop offset="80%" stopColor="#33415522" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            {/* Vertical lines */}
            {Array.from({ length: 25 }).map((_, index) => (
              <line key={index} x1={index * 48} y1="0" x2={index * 48} y2="600" stroke="url(#grid-fade-why)" strokeWidth="1" />
            ))}
            {/* Horizontal lines */}
            {Array.from({ length: 13 }).map((_, index) => (
              <line key={index} y1={index * 48} x1="0" y2={index * 48} x2="1200" stroke="url(#grid-fade-why)" strokeWidth="1" />
            ))}
          </svg>
        </div>
        {/* Animated pastel ring/gradient background */}
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 -z-10 opacity-30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
        >
          <svg width="520" height="520" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="ring1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a21caf" stopOpacity="0.18" />
                <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#0e1525" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="260" cy="260" r="200" stroke="url(#ring1)" strokeWidth="36" fill="none" />
          </svg>
        </motion.div>
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase text-cyan-400 tracking-wider mb-2">Search Smarter. Edit Faster.</p>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">Why SnipSearch</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🎯",
                title: "Tailored Discovery",
                desc: "Find iconic moments by mood, theme, or emotion—fast. No more scrolling through hours of footage."
              },
              {
                icon: "💡",
                title: "Creative Boost",
                desc: "Perfect for editors, creators, and storytellers. Instantly unlock inspiration from curated scenes."
              },
              {
                icon: "💸",
                title: "Affordable Access",
                desc: "Plans that fit solo creators or studios. Explore clips without breaking your budget."
              },
              {
                icon: "🎬",
                title: "Clip-Ready Output",
                desc: "Get direct links to clips you can use. No trimming, no fuss—just drop and edit."
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="rounded-2xl bg-[#111827] p-6 shadow-md flex flex-col items-center text-center border border-[1.5px] border-transparent [mask-image:linear-gradient(white,white)] relative"
                style={{
                  borderImage: 'linear-gradient(90deg, #f472b6, #22d3ee) 1',
                  borderWidth: '1.5px',
                  borderStyle: 'solid',
                  borderImageSlice: 1,
                }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <div className="font-bold text-lg mb-2 text-white">{card.title}</div>
                <div className="text-gray-300 text-sm">{card.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section (full width, parallax background) */}
      <section className="relative w-full min-h-[500px] py-24 px-0 mt-16 overflow-hidden">
        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-[#181f36] via-[#181f36] to-[#0e1525] opacity-90 animate-pulse"></div>
        {/* Overlay for extra darkness if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-0"></div>
        {/* FAQ Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-3xl md:text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">Frequently Asked Questions</motion.h2>
          <div className="space-y-6">
            {[
              {
                q: "What exactly does SnipSearch do?",
                a: "SnipSearch lets you find movie, anime, and viral video clips using moods, tags, and scene descriptions — perfect for creators, editors, and storytellers."
              },
              {
                q: "Can I download the clips?",
                a: "We only provide links to clips hosted on YouTube. Downloading must comply with YouTube's policies and copyright laws."
              },
              {
                q: "Is SnipSearch free?",
                a: "SnipSearch offers premium features for power users. But you can explore and search for clips freely during development beta."
              },
              {
                q: "Who is SnipSearch for?",
                a: "Creators, editors, meme-makers, or anyone who wants that *perfect* clip to express a moment."
              },
            ].map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-zinc-900/90 rounded-xl p-5 border border-zinc-800 shadow-lg group"
              >
                <summary className="font-semibold cursor-pointer text-lg text-cyan-400 group-open:text-pink-400 transition-colors">
                  {faq.q}
                </summary>
                <div className="mt-2 text-zinc-200 text-base">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
      {/* Calm, visually refined CTA Section - just above Demo Cards */}
      <section className="relative w-full py-24 px-6 md:px-0 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent">
            Find the perfect scene for your next punchline.
          </h1>
          <p className="text-neutral-400 mt-4 text-lg">
            SnipSearch helps you discover iconic moments from anime, films, and reels — in seconds.
          </p>
          {/* Demo search chips */}
          <div className="flex flex-wrap justify-center gap-y-2 mt-2">
            {[
              { label: "Thanos snap scene", href: "/search?q=Thanos+snap+scene" },
              { label: "Sad anime breakup", href: "/search?q=Sad+anime+breakup" },
              { label: "Iconic Bollywood villain laugh", href: "/search?q=Iconic+Bollywood+villain+laugh" },
            ].map((chip) => (
              <a
                key={chip.label}
                href={chip.href}
                className="inline-block text-sm px-4 py-2 mt-4 mx-1 rounded-full border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition"
                style={{ minWidth: 150 }}
              >
                {chip.label}
              </a>
            ))}
          </div>
          {/* CTA button */}
          <button
            type="button"
            onClick={() => router.push("/search")}
            className="mt-8 inline-block px-6 py-3 rounded-full text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-105 transition transform shadow-md text-base md:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400/30"
          >
            Try SnipSearch for Free
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// VideoCarouselSection component
function VideoCarouselSection() {
  const clips = [
    {
      title: "Neo dodges bullets",
      video: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWJxNmc5djc0d3d3czYxdmE0Y3k3OXdydTh3Znp0Zm50cGV2czZqdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZpmxRuLshtGVy/giphy.gif",
      tags: ["Action", "Sci-Fi", "Classic"],
      isYouTube: false,
      isGif: true,
    },
    {
      title: "Joker's laugh",
      video: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGtsYWZ6anRwc2doN284cGEzdG9lZWZzM2hoYjBiNGJ2bmFpdHJxcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zIwAuqRp2Ki7S/giphy.gif",
      tags: ["Drama", "Villain", "Iconic"],
      isYouTube: false,
      isGif: true,
    },
    {
      title: "Kakashi vs Obito",
      video: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2IyNzYwanFnMGM5ZGRsaXo5dGVsMTVndXJ4ejJkeWRlN3l0b2Y3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dVaAhVMJhVoqI/giphy.gif",
      tags: ["Anime", "Battle", "Emotional"],
      isYouTube: false,
      isGif: true,
    },
    {
      title: "Epic car chase",
      video: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWNhdGJnYXVpdzJtaGEzcjE1OXkzMWZxM3ZlMHFhbWFleWszdWs4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jEqWeLq3c2sdtVpGpm/giphy.gif",
      tags: ["Thriller", "Chase", "Blockbuster"],
      isGif: true,
      isYouTube: false,
    },
  ];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % clips.length);
      }, 4000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, paused, clips.length]);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((prevValue) => (prevValue - 1 + clips.length) % clips.length);
  const next = () => setCurrent((prevValue) => (prevValue + 1) % clips.length);

  return (
    <section className="relative w-full py-20 px-4 md:px-0 bg-gradient-to-br from-[#0f1123] via-[#1a1440] to-[#2d0b3a] overflow-hidden">
      {/* Animated glowing ring background */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-40 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
      >
        <svg width="700" height="700" viewBox="0 0 700 700" fill="none">
          <defs>
            <radialGradient id="carousel-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a21caf" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0e1525" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="350" cy="350" r="300" stroke="url(#carousel-glow)" strokeWidth="80" fill="none" />
        </svg>
      </motion.div>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-400 bg-clip-text text-transparent mb-3 drop-shadow-lg tracking-tight truncate">
            🎬 Preview the Possibilities
          </h2>
          <p className="text-lg md:text-xl text-violet-200 font-medium">
            Get a glimpse of the moments you can discover
          </p>
        </div>
        <div className="relative flex items-center justify-center">
          {/* Left arrow */}
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full p-2 shadow-lg transition"
            style={{ marginLeft: -32 }}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          {/* Carousel video card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-full max-w-lg mx-auto"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="rounded-2xl shadow-2xl border-2 border-cyan-400/30 bg-zinc-900/80 backdrop-blur-md overflow-hidden relative group transition-transform duration-300 hover:scale-105 hover:shadow-cyan-400/30">
                {clips[current].isGif ? (
                  <img
                    src={clips[current].video}
                    alt={clips[current].title}
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-cyan-400/30"
                    style={{ background: '#181f36', minHeight: 220 }}
                  />
                ) : clips[current].isYouTube ? (
                  <iframe
                    src={clips[current].video + '?autoplay=1&mute=1&loop=1&playlist=6vYEB7ehvWY'}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full aspect-video object-cover"
                    style={{ background: '#181f36', minHeight: 220 }}
                    title={clips[current].title}
                  />
                ) : (
                  <video
                    src={clips[current].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-cyan-400/30"
                    style={{ background: '#181f36' }}
                  />
                )}
              </div>
              <div className="flex flex-col items-center mt-6">
                <div className="font-bold text-xl md:text-2xl text-white mb-2 text-center line-clamp-2" style={{ maxWidth: 340 }}>
                  {clips[current].title}
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {clips[current].tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 text-white/90 font-medium shadow">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Right arrow */}
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full p-2 shadow-lg transition"
            style={{ marginRight: -32 }}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-6">
          {clips.map((_, idx: number) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${idx === current ? 'bg-cyan-400 scale-110 shadow' : 'bg-zinc-700'}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}