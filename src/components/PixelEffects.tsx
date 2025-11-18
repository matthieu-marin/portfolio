import { motion } from 'motion/react';

export function PixelEffects() {
  // Fonction pour générer des pixels aléatoires
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

  // Génération de pixels qui tombent (effet Matrix)
  const fallingPixels = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (i * 5) % 100,
    delay: Math.random() * 3,
    duration: 8 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
      {/* Pixels flottants */}
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

      {/* Pixels tombants (effet Matrix) */}
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

      {/* Grandes formes géométriques pixelisées */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <rect x="10" y="10" width="20" height="20" fill="#ffff00" opacity="0.6" />
          <rect x="40" y="10" width="20" height="20" fill="#9bbc0f" opacity="0.6" />
          <rect x="70" y="10" width="20" height="20" fill="#00ffff" opacity="0.6" />
          <rect x="10" y="40" width="20" height="20" fill="#00ffff" opacity="0.6" />
          <rect x="70" y="40" width="20" height="20" fill="#ffff00" opacity="0.6" />
          <rect x="10" y="70" width="20" height="20" fill="#9bbc0f" opacity="0.6" />
          <rect x="40" y="70" width="20" height="20" fill="#ffff00" opacity="0.6" />
          <rect x="70" y="70" width="20" height="20" fill="#00ffff" opacity="0.6" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20"
        animate={{
          rotate: [360, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <rect x="40" y="0" width="20" height="20" fill="#ff00ff" opacity="0.6" />
          <rect x="20" y="20" width="20" height="20" fill="#ffff00" opacity="0.6" />
          <rect x="40" y="20" width="20" height="20" fill="#00ff00" opacity="0.6" />
          <rect x="60" y="20" width="20" height="20" fill="#00ffff" opacity="0.6" />
          <rect x="0" y="40" width="20" height="20" fill="#00ffff" opacity="0.6" />
          <rect x="20" y="40" width="20" height="20" fill="#ffff00" opacity="0.6" />
          <rect x="40" y="40" width="20" height="20" fill="#ff00ff" opacity="0.6" />
          <rect x="60" y="40" width="20" height="20" fill="#9bbc0f" opacity="0.6" />
          <rect x="80" y="40" width="20" height="20" fill="#ffff00" opacity="0.6" />
          <rect x="20" y="60" width="20" height="20" fill="#9bbc0f" opacity="0.6" />
          <rect x="40" y="60" width="20" height="20" fill="#00ffff" opacity="0.6" />
          <rect x="60" y="60" width="20" height="20" fill="#ff00ff" opacity="0.6" />
          <rect x="40" y="80" width="20" height="20" fill="#00ff00" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Sprites pixel art qui traversent l'écran */}
      <motion.div
        className="absolute top-1/3"
        animate={{
          x: ['-100px', '100vw'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 8 8">
          <rect x="2" y="0" width="4" height="2" fill="#ffff00" />
          <rect x="1" y="2" width="6" height="2" fill="#ffff00" />
          <rect x="0" y="4" width="8" height="2" fill="#ffff00" />
          <rect x="2" y="6" width="2" height="2" fill="#ffff00" />
          <rect x="4" y="6" width="2" height="2" fill="#ffff00" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4"
        animate={{
          x: ['100vw', '-100px'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
          delay: 5,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 10 10">
          <rect x="3" y="0" width="4" height="2" fill="#ff00ff" />
          <rect x="2" y="2" width="6" height="2" fill="#ff00ff" />
          <rect x="1" y="4" width="8" height="2" fill="#ff00ff" />
          <rect x="0" y="6" width="4" height="2" fill="#ff00ff" />
          <rect x="6" y="6" width="4" height="2" fill="#ff00ff" />
          <rect x="1" y="8" width="3" height="2" fill="#ff00ff" />
          <rect x="6" y="8" width="3" height="2" fill="#ff00ff" />
        </svg>
      </motion.div>

      {/* Effet de grille pixel en arrière-plan */}
      <motion.div
        className="absolute top-1/2 left-1/4"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={col * 10}
                y={row * 10}
                width="8"
                height="8"
                fill={(row + col) % 2 === 0 ? '#9bbc0f' : '#00ffff'}
                opacity="0.4"
              />
            ))
          )}
        </svg>
      </motion.div>
    </div>
  );
}
