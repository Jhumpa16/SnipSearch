import React from "react";
import SnipSearchLogo from "./SnipSearchLogo";

const socialIcons = [
  {
    name: "Twitter",
    href: "#",
    svg: (
      <svg className="inline-block w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z" /></svg>
    ),
  },
  {
    name: "Discord",
    href: "#",
    svg: (
      <svg className="inline-block w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.472 17.462c-1.527 1.527-6.417 1.527-7.944 0C4.5 15.434 2 12.5 2 12.5s2.5-2.934 7.528-4.962c1.527-1.527 6.417-1.527 7.944 0C19.5 9.566 22 12.5 22 12.5s-2.5 2.934-7.528 4.962z" /></svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    svg: (
      <svg className="inline-block w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v5h-4v-5a2 2 0 0 0-4 0v5h-4v-5a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" rx="2" /></svg>
    ),
  },
  {
    name: "ProductHunt",
    href: "#",
    svg: (
      <svg className="inline-block w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#da552f"/><path d="M15.5 7h-7A.5.5 0 0 0 8 7.5v9a.5.5 0 0 0 .5.5h2.25v-2.25H10.5V13h2.25a2.25 2.25 0 0 0 0-4.5H10.5V8.5h5V7.5a.5.5 0 0 0-.5-.5zm-2.75 4.5H10.5v-1.5h2.25a.75.75 0 0 1 0 1.5z" fill="#fff"/></svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0e1525] text-white border-t border-gray-700 mt-8 px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Logo, description, social icons */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <SnipSearchLogo />
          </div>
          <div className="text-sm text-gray-400 max-w-md">
            SnipSearch helps you discover cinematic video moments by mood, genre, or prompt. Instantly find the perfect scene for your story, edit, or inspiration—no more endless scrolling.
          </div>
          <div className="flex gap-4 mt-2">
            {socialIcons.map((icon) => (
              <a key={icon.name} href={icon.href} aria-label={icon.name} className="hover:opacity-80 transition">
                {icon.svg}
              </a>
            ))}
          </div>
        </div>
        {/* Middle: Company links */}
        <div className="space-y-4">
          <div className="text-lg font-semibold mb-2">Company</div>
          <ul className="space-y-2">
            <li><a href="/about" className="text-sm text-gray-300 hover:text-cyan-400 transition">About</a></li>
            <li><a href="/contact" className="text-sm text-gray-300 hover:text-cyan-400 transition">Contact</a></li>
            <li><a href="#" className="text-sm text-gray-300 hover:text-cyan-400 transition">Blog</a></li>
          </ul>
        </div>
        {/* Right: Legal links */}
        <div className="space-y-4">
          <div className="text-lg font-semibold mb-2">Legal</div>
          <ul className="space-y-2">
            <li><a href="/privacy" className="text-sm text-gray-300 hover:text-pink-400 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="text-sm text-gray-300 hover:text-pink-400 transition">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-6 text-center">
        © 2025 SnipSearch. All rights reserved.
      </div>
    </footer>
  );
} 