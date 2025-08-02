"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import UserProfile from "./UserProfile";
import SnipSearchLogo from "./SnipSearchLogo";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Pricing", href: "/pricing" },
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" },
];

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-6 md:px-12 bg-zinc-900/80 backdrop-blur-sm shadow-lg"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Logo and brand name */}
      <Link href="/" className="select-none group">
        <div className="flex items-center gap-2 h-10">
          <SnipSearchLogo />
        </div>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-zinc-200 hover:text-indigo-400 transition-colors font-medium px-2"
          >
            {link.name}
          </Link>
        ))}
        {user ? (
          <div className="flex items-center gap-4">
            <motion.a
              href="/dashboard"
              className="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-md hover:shadow-pink-500/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-base"
              whileHover={{ scale: 1.07, boxShadow: "0 0 24px #ec4899aa" }}
            >
              Dashboard
            </motion.a>
            <UserProfile />
          </div>
        ) : (
          <motion.a
            href="/login"
            className="ml-2 px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-md hover:shadow-pink-500/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-base"
            whileHover={{ scale: 1.07, boxShadow: "0 0 24px #ec4899aa" }}
          >
            Sign In
          </motion.a>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button
          className="text-zinc-200 hover:text-indigo-400 focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-menu"
          >
            <line x1="3" y1="12" x2="25" y2="12" />
            <line x1="3" y1="20" x2="25" y2="20" />
            <line x1="3" y1="4" x2="25" y2="4" />
          </svg>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute top-16 right-4 w-48 bg-zinc-900 rounded-xl shadow-xl border border-zinc-800 flex flex-col gap-2 py-4 px-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-zinc-200 hover:text-indigo-400 transition-colors font-medium py-1 px-2 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <a
                    href="/dashboard"
                    className="mt-2 px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-md hover:shadow-pink-500/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-base text-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </a>
                  <div className="border-t border-zinc-800 pt-2 mt-2">
                    <UserProfile />
                  </div>
                </>
              ) : (
                <motion.a
                  href="/login"
                  className="mt-2 px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-md hover:shadow-pink-500/40 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-base text-center"
                  whileHover={{ scale: 1.07, boxShadow: "0 0 24px #ec4899aa" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </motion.a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavBar;