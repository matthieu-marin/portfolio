import { motion } from 'motion/react';

export function GalaxyEffects() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 5,
  }));

  const shootingStars = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: i * 8 + Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden blur-[2px] z-0">
      <motion.div
        className="absolute top-10 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #bb86fc 0%, #7cb9ff 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, #03dac6 0%, #bb86fc 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl opacity-10"
        style={{
          background: 'radial-gradient(circle, #ffd60a 0%, #ff9bce 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: '0 0 3px #ffffff',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute h-0.5 w-16 rounded-full"
          style={{
            background: 'linear-gradient(to right, transparent, #ffffff, transparent)',
            boxShadow: '0 0 10px #ffffff',
            top: `${Math.random() * 50}%`,
            left: '100%',
          }}
          animate={{
            x: [0, -window.innerWidth - 200],
            y: [0, window.innerHeight * 0.3],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            repeatDelay: 10,
          }}
        />
      ))}

      <motion.div
        className="absolute top-20 left-1/4"
        animate={{
          rotate: 360,
          y: [0, -20, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            <radialGradient id="planet1">
              <stop offset="0%" stopColor="#bb86fc" />
              <stop offset="100%" stopColor="#7cb9ff" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="40" fill="url(#planet1)" opacity="0.6" />
          <ellipse
            cx="60"
            cy="60"
            rx="60"
            ry="15"
            fill="none"
            stroke="#03dac6"
            strokeWidth="2"
            opacity="0.4"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="55"
            ry="12"
            fill="none"
            stroke="#bb86fc"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-1/4"
        animate={{
          rotate: -360,
          y: [0, 15, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <defs>
            <radialGradient id="planet2">
              <stop offset="0%" stopColor="#ffd60a" />
              <stop offset="100%" stopColor="#ff9bce" />
            </radialGradient>
          </defs>
          <circle cx="40" cy="40" r="30" fill="url(#planet2)" opacity="0.5" />
          <circle cx="30" cy="30" r="5" fill="#000000" opacity="0.2" />
          <circle cx="50" cy="35" r="4" fill="#000000" opacity="0.2" />
          <circle cx="42" cy="48" r="6" fill="#000000" opacity="0.2" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2"
        style={{ transformOrigin: 'center' }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            left: '150px',
            top: '-10px',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <rect x="7" y="7" width="6" height="6" fill="#03dac6" opacity="0.6" />
            <line x1="10" y1="0" x2="10" y2="7" stroke="#03dac6" strokeWidth="1" />
            <line x1="10" y1="13" x2="10" y2="20" stroke="#03dac6" strokeWidth="1" />
            <line x1="0" y1="10" x2="7" y2="10" stroke="#03dac6" strokeWidth="1" />
            <line x1="13" y1="10" x2="20" y2="10" stroke="#03dac6" strokeWidth="1" />
          </svg>
        </motion.div>
      </motion.div>
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000">
        <circle cx="200" cy="150" r="3" fill="#ffffff" />
        <circle cx="250" cy="180" r="3" fill="#ffffff" />
        <circle cx="280" cy="130" r="3" fill="#ffffff" />
        <circle cx="320" cy="160" r="3" fill="#ffffff" />
        <line x1="200" y1="150" x2="250" y2="180" stroke="#ffffff" strokeWidth="0.5" />
        <line x1="250" y1="180" x2="280" y2="130" stroke="#ffffff" strokeWidth="0.5" />
        <line x1="280" y1="130" x2="320" y2="160" stroke="#ffffff" strokeWidth="0.5" />
        <circle cx="700" cy="200" r="3" fill="#ffffff" />
        <circle cx="750" cy="250" r="3" fill="#ffffff" />
        <circle cx="800" cy="220" r="3" fill="#ffffff" />
        <circle cx="780" cy="180" r="3" fill="#ffffff" />
        <line x1="700" y1="200" x2="750" y2="250" stroke="#ffffff" strokeWidth="0.5" />
        <line x1="750" y1="250" x2="800" y2="220" stroke="#ffffff" strokeWidth="0.5" />
        <line x1="800" y1="220" x2="780" y2="180" stroke="#ffffff" strokeWidth="0.5" />
        <line x1="780" y1="180" x2="700" y2="200" stroke="#ffffff" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
