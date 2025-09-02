'use client';

import { useEffect, useCallback, useState } from 'react';
import { useEngagement } from '@/context/EngagementContext';
import { toast } from 'react-hot-toast';

type EasterEgg = {
  key: string;
  keys: string[];
  action: () => void;
};

export function EasterEggs() {
  const { engagementScore, updateInterests } = useEngagement();
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  // Easter egg actions
  const showDeveloperMode = useCallback(() => {
    toast.success('👨‍💻 Developer mode activated!', {
      icon: '💻',
      duration: 3000,
    });
    // Add developer interest
    updateInterests('developer');
  }, [updateInterests]);

  const showSecretMessage = useCallback(() => {
    toast('🎉 You found a secret!', {
      icon: '🔍',
      duration: 2000,
    });
  }, []);

  // Define Easter eggs
  const easterEggs: EasterEgg[] = [
    {
      key: 'dev',
      keys: ['d', 'e', 'v'],
      action: showDeveloperMode,
    },
    {
      key: 'secret',
      keys: ['s', 'e', 'c', 'r', 'e', 't'],
      action: showSecretMessage,
    },
  ];

  // Handle key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      // Update pressed keys
      setPressedKeys(prev => {
        const newKeys = [...prev, key].slice(-10); // Keep last 10 keys

        // Check for Easter eggs
        easterEggs.forEach(egg => {
          const keysStr = newKeys.join('');
          if (keysStr.includes(egg.keys.join(''))) {
            egg.action();
            return []; // Reset keys after triggering
          }
        });

        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [easterEggs]);

  // Show special message at high engagement
  useEffect(() => {
    if (engagementScore > 80) {
      const timer = setTimeout(() => {
        toast('🌟 Thanks for exploring my portfolio!', {
          icon: '🤩',
          duration: 4000,
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [engagementScore]);

  return null;
}
