import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

// Chat qui traverse le bas de la carte « Chatterie de la Terre de Brasco »
// (et uniquement celle-là). Première traversée rapide, puis toutes les 45–120 s.
export function WalkingCat() {
  const [isWalking, setIsWalking] = useState(false);
  const timerRef = useRef<number | null>(null);

  const scheduleNextWalk = useCallback((delay: number) => {
    timerRef.current = window.setTimeout(() => {
      setIsWalking(true);
    }, delay);
  }, []);

  useEffect(() => {
    scheduleNextWalk(4000);

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [scheduleNextWalk]);

  return (
    <div
      className="absolute inset-x-0 bottom-0 h-6 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {isWalking && (
        <motion.span
          initial={{ left: '-2.5rem' }}
          animate={{ left: '102%' }}
          transition={{ duration: 10, ease: 'linear' }}
          onAnimationComplete={() => {
            setIsWalking(false);
            scheduleNextWalk(45000 + Math.random() * 75000);
          }}
          className="absolute bottom-0.5 text-sm"
        >
          🐈‍⬛
        </motion.span>
      )}
    </div>
  );
}
