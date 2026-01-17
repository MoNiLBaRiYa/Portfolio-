'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'blue' | 'red'>('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'blue' | 'red' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = (newTheme: 'blue' | 'red') => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 flex gap-2 glass-card p-2 rounded-full"
    >
      <button
        onClick={() => toggleTheme('blue')}
        className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center ${
          theme === 'blue'
            ? 'bg-blue-600 shadow-lg shadow-blue-500/50 scale-110'
            : 'bg-blue-600/20 hover:bg-blue-600/40'
        }`}
        title="Blue Theme"
        aria-label="Switch to blue theme"
      >
        <span className="text-xl">💙</span>
      </button>
      <button
        onClick={() => toggleTheme('red')}
        className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center ${
          theme === 'red'
            ? 'bg-red-600 shadow-lg shadow-red-500/50 scale-110'
            : 'bg-red-600/20 hover:bg-red-600/40'
        }`}
        title="Red Theme"
        aria-label="Switch to red theme"
      >
        <span className="text-xl">❤️</span>
      </button>
    </motion.div>
  );
}
