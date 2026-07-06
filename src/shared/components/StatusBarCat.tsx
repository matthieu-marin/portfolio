import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

export function StatusBarCat() {
  const [isWalking, setIsWalking] = useState(false);
  const timerRef = useRef<number | null>(null);

  const scheduleNextWalk = useCallback((delay: number) => {
    timerRef.current = window.setTimeout(() => {
      setIsWalking(true);
    }, delay);
  }, []);

  useEffect(() => {
    // First appearance at ~20s
    scheduleNextWalk(20000);

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [scheduleNextWalk]);

  return isWalking ? (
    <motion.span
      initial={{ x: '-5vw' }}
      animate={{ x: '105vw' }}
      transition={{ duration: 14, ease: 'linear' }}
      onAnimationComplete={() => {
        setIsWalking(false);
        // Schedule next walk after current one completes
        const nextInterval = 90000 + Math.random() * 90000; // 90-180s
        scheduleNextWalk(nextInterval);
      }}
      className="text-xs pointer-events-none absolute inset-y-0 flex items-center"
      aria-hidden="true"
    >
      🐈‍⬛
    </motion.span>
  ) : null;
}
