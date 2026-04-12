import { motion } from 'motion/react';

export function PixelEffects() {
  const generatePixels = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 8 + Math.random() * 16,
    }));
  };

  const floatingPixels = generatePixels(15);
  const fallingPixels = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i * 5) % 100,
    delay: Math.random() * 3,
    duration: 8 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
      {floatingPixels.map((pixel) => (
        <motion.div
          key={`float-${pixel.id}`}
          className="absolute"
          style={{
            left: `${pixel.x}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: pixel.duration,
            repeat: Infinity,
            delay: pixel.delay,
            ease: 'linear',
          }}
        >
          <div
            style={{
              width: `${pixel.size}px`,
              height: `${pixel.size}px`,
              backgroundColor: '#9bbc0f',
              boxShadow: '0 0 10px #9bbc0f',
            }}
          />
        </motion.div>
      ))}

      {fallingPixels.map((pixel) => (
        <motion.div
          key={`fall-${pixel.id}`}
          className="absolute top-0"
          style={{
            left: `${pixel.x}%`,
          }}
          animate={{
            y: ['0vh', '110vh'],
          }}
          transition={{
            duration: pixel.duration,
            repeat: Infinity,
            delay: pixel.delay,
            ease: 'linear',
          }}
        >
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: i === 0 ? '#ffff00' : '#9bbc0f',
                  opacity: 1 - i * 0.2,
                  boxShadow: i === 0 ? '0 0 8px #ffff00' : '0 0 6px #9bbc0f',
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

