import { motion } from 'motion/react';

export function CyberpunkEffects() {
  // Grille en perspective
  const gridLines = Array.from({ length: 20 }, (_, i) => i);
  
  // Particules néon flottantes
  const neonParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
    color: ['#ff006e', '#00f5ff', '#b967ff'][Math.floor(Math.random() * 3)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grille cyberpunk en perspective */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] opacity-20" style={{ perspective: '1000px' }}>
        <motion.div
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg)',
          }}
        >
          {/* Lignes horizontales */}
          {gridLines.map((i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 right-0 border-t"
              style={{
                top: `${i * 5}%`,
                borderColor: '#ff006e',
                boxShadow: '0 0 10px #ff006e',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
          {/* Lignes verticales */}
          {gridLines.map((i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 border-l"
              style={{
                left: `${i * 5}%`,
                borderColor: '#00f5ff',
                boxShadow: '0 0 10px #00f5ff',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Particules néon flottantes */}
      {neonParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: '4px',
            height: '4px',
            backgroundColor: particle.color,
            boxShadow: `0 0 20px ${particle.color}`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Néons qui clignotent */}
      <motion.div
        className="absolute top-12 left-10 w-32 h-1 z-10"
        style={{
          backgroundColor: '#ff006e',
          boxShadow: '0 0 20px #ff006e, 0 0 40px #ff006e',
        }}
        animate={{
          opacity: [1, 0.3, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />

      <motion.div
        className="absolute top-32 right-20 w-1 h-32"
        style={{
          backgroundColor: '#00f5ff',
          boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff',
        }}
        animate={{
          opacity: [1, 0.3, 1],
        }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />

      {/* Hexagones néon */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <polygon
            points="50,10 90,30 90,70 50,90 10,70 10,30"
            fill="none"
            stroke="#b967ff"
            strokeWidth="2"
            opacity="0.6"
            style={{ filter: 'drop-shadow(0 0 10px #b967ff)' }}
          />
          <polygon
            points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5"
            fill="none"
            stroke="#ff006e"
            strokeWidth="2"
            opacity="0.6"
            style={{ filter: 'drop-shadow(0 0 10px #ff006e)' }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/3"
        animate={{
          rotate: -360,
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100">
          <polygon
            points="50,10 90,30 90,70 50,90 10,70 10,30"
            fill="none"
            stroke="#00f5ff"
            strokeWidth="2"
            opacity="0.6"
            style={{ filter: 'drop-shadow(0 0 10px #00f5ff)' }}
          />
        </svg>
      </motion.div>

      {/* Effet glitch */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10"
        animate={{
          x: [0, 2, -2, 0],
          y: [0, -2, 2, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      >
        <div className="text-6xl font-mono" style={{ color: '#ff006e', textShadow: '2px 2px #00f5ff' }}>
          CYBERPUNK
        </div>
      </motion.div>
    </div>
  );
}