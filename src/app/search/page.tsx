import React, { Suspense } from 'react';
import NavBar from '../../components/NavBar';
import SearchClient from './searchclient';
import "@fontsource-variable/inter";
import './globals.css';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <NavBar />
      <Suspense fallback={
        <div className="pt-20 max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 mb-4 flex items-center justify-center">
              <span className="animate-spin text-4xl">🌀</span>
            </div>
            <div className="text-lg text-zinc-300 animate-pulse">Loading search...</div>
          </div>
        </div>
      }>
        <SearchClient />
      </Suspense>
    </div>
  );
}