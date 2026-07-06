import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function StatusBarCat() {
  const [isWalking, setIsWalking] = useState(false);

  useEffect(() => {
    // First appearance at ~20s
    const firstTimer = setTimeout(() => {
      setIsWalking(true);
    }, 20000);

    let currentTimer: NodeJS.Timeout;

    const scheduleNextWalk = () => {
      const interval = 90000 + Math.random() * 90000; // 90-180s
      currentTimer = setTimeout(() => {
        setIsWalking(true);
      }, interval);
    };

    return () => {
      clearTimeout(firstTimer);
      if (currentTimer) clearTimeout(currentTimer);
    };
  }, []);

  return isWalking ? (
    <motion.span
      initial={{ x: '-5vw' }}
      animate={{ x: '105vw' }}
      transition={{ duration: 14, ease: 'linear' }}
      onAnimationComplete={() => {
        setIsWalking(false);
        // Schedule next walk after current one completes
        const nextInterval = 90000 + Math.random() * 90000;
        setTimeout(() => {
          setIsWalking(true);
        }, nextInterval);
      }}
      className="text-xs pointer-events-none absolute inset-y-0 flex items-center"
      aria-hidden="true"
    >
      🐈‍⬛
    </motion.span>
  ) : null;
}
