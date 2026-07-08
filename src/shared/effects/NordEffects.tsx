import { motion } from 'motion/react';

export function NordEffects() {
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    size: 8 + Math.random() * 8,
    sway: 20 + Math.random() * 30,
  }));

  const iceCrystals = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    rotation: Math.random() * 360,
    size: 40 + Math.random() * 40,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden blur-[2px] z-0">
      <motion.div
        className="absolute top-0 left-0 right-0 h-[60%] opacity-20"
        style={{
          background: 'linear-gradient(to bottom, #88c0d0 0%, #81a1c1 30%, #5e81ac 60%, transparent 100%)',
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scaleY: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-0 right-0 w-[40%] h-[50%] opacity-15 blur-3xl"
        style={{
          background: 'linear-gradient(135deg, #a3be8c 0%, #88c0d0 50%, transparent 100%)',
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-0 left-0 w-[40%] h-[50%] opacity-15 blur-3xl"
        style={{
          background: 'linear-gradient(-135deg, #b48ead 0%, #81a1c1 50%, transparent 100%)',
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute top-0"
          style={{
            left: `${flake.x}%`,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, flake.sway, -flake.sway, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: 'linear',
          }}
        >
          <svg width={flake.size} height={flake.size} viewBox="0 0 24 24">
            <path
              d="M12 2 L12 22 M2 12 L22 12 M6 6 L18 18 M18 6 L6 18"
              stroke="#88c0d0"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <circle cx="12" cy="12" r="2" fill="#88c0d0" opacity="0.4" />
            <circle cx="12" cy="2" r="1.5" fill="#88c0d0" opacity="0.6" />
            <circle cx="12" cy="22" r="1.5" fill="#88c0d0" opacity="0.6" />
            <circle cx="2" cy="12" r="1.5" fill="#88c0d0" opacity="0.6" />
            <circle cx="22" cy="12" r="1.5" fill="#88c0d0" opacity="0.6" />
            <circle cx="6" cy="6" r="1.5" fill="#88c0d0" opacity="0.6" />
            <circle cx="18" cy="18" r="1.5" fill="#88c0d0" opacity="0.6" />
            <circle cx="18" cy="6" r="1.5" fill="#88c0d0" opacity="0.6" />
            <circle cx="6" cy="18" r="1.5" fill="#88c0d0" opacity="0.6" />
          </svg>
        </motion.div>
      ))}
      {iceCrystals.map((crystal) => (
        <motion.div
          key={crystal.id}
          className="absolute opacity-10"
          style={{
            left: `${crystal.x}%`,
            top: `${crystal.y}%`,
          }}
          animate={{
            rotate: [crystal.rotation, crystal.rotation + 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width={crystal.size} height={crystal.size} viewBox="0 0 100 100">
            <polygon
              points="50,10 80,30 80,70 50,90 20,70 20,30"
              fill="none"
              stroke="#88c0d0"
              strokeWidth="2"
            />
            <polygon
              points="50,25 70,37.5 70,62.5 50,75 30,62.5 30,37.5"
              fill="none"
              stroke="#81a1c1"
              strokeWidth="1.5"
            />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#88c0d0" strokeWidth="1" />
            <line x1="20" y1="30" x2="80" y2="70" stroke="#88c0d0" strokeWidth="1" />
            <line x1="20" y1="70" x2="80" y2="30" stroke="#88c0d0" strokeWidth="1" />
            <circle cx="50" cy="50" r="5" fill="#88c0d0" opacity="0.8" />
          </svg>
        </motion.div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 opacity-10">
        <svg width="100%" height="300" viewBox="0 0 1000 300" preserveAspectRatio="none">
          <polygon
            points="0,300 200,100 400,300"
            fill="#88c0d0"
          />
          <polygon
            points="300,300 500,50 700,300"
            fill="#81a1c1"
          />
          <polygon
            points="600,300 800,120 1000,300"
            fill="#5e81ac"
          />
        </svg>
      </div>
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '3px',
            height: '3px',
            backgroundColor: '#88c0d0',
            boxShadow: '0 0 6px #88c0d0',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`wind-${i}`}
          className="absolute w-8 h-0.5 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: '-10%',
            backgroundColor: '#88c0d0',
            opacity: 0.3,
          }}
          animate={{
            x: ['0vw', '110vw'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
        />
      ))}

      <motion.div
        className="absolute top-1/4 right-1/4 opacity-10"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="60" fill="none" stroke="#88c0d0" strokeWidth="2" />
          <circle cx="75" cy="75" r="45" fill="none" stroke="#81a1c1" strokeWidth="1.5" />
          <circle cx="75" cy="75" r="30" fill="none" stroke="#5e81ac" strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 75 + 30 * Math.cos(angle);
            const y1 = 75 + 30 * Math.sin(angle);
            const x2 = 75 + 60 * Math.cos(angle);
            const y2 = 75 + 60 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#88c0d0"
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}
