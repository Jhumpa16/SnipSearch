import React from "react";
import Image from "next/image";

const SnipSearchLogo: React.FC = () => (
  <span className="flex items-center gap-2 select-none">
    <Image src="/logo-icon.svg" alt="SnipSearch Logo" width={40} height={40} priority />
    <span className="text-2xl md:text-3xl font-extrabold tracking-wide bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg select-none transition-transform duration-200 hover:scale-105" style={{ fontFamily: 'Sora, Poppins, sans-serif' }}>
      SnipSearch
    </span>
  </span>
);

export default SnipSearchLogo; 