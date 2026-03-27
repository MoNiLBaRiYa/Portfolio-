'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  useEffect(() => {
    // Track 404 occurrence
    if (typeof window !== 'undefined' && (window as any).trackEvent) {
      (window as any).trackEvent('404_error', {
        page_path: window.location.pathname,
        referrer: document.referrer,
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-6 py-12">
      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Search className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-8xl font-black text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            404
          </h1>
          <h2 className="text-2xl font-bold text-white mb-4">
            Oops! This page seems to have vanished.
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            The link you followed might be broken, or the page may have been moved. 
            Don&apos;t worry, even the best explorers get lost sometimes.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all duration-200 shadow-lg shadow-blue-500/20 group"
          >
            <Home className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full border border-gray-700 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 text-gray-500 text-sm"
        >
          <p>© {new Date().getFullYear()} Monil Bariya Portfolio</p>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
