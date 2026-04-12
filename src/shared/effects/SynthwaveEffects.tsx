import { motion } from 'motion/react';

export function SynthwaveEffects() {
  const gridLines = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(to bottom, #ff006e 0%, #ff6ec7 20%, #ffd319 40%, #2b1055 70%, #16062e 100%)',
        }}
      />

      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="60" fill="#ff6ec7" opacity="0.8" style={{ filter: 'blur(2px)' }} />
          <circle cx="100" cy="100" r="50" fill="#ffd319" opacity="0.9" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="40"
              y1={70 + i * 8}
              x2="160"
              y2={70 + i * 8}
              stroke="#ff006e"
              strokeWidth="2"
              opacity="0.6"
            />
          ))}
        </svg>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[70%] opacity-25" style={{ perspective: '800px' }}>
        <motion.div
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(75deg)',
          }}
          animate={{
            y: ['0%', '5%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {gridLines.map((i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 border-t-2"
              style={{
                top: `${i * 5}%`,
                borderColor: '#ff6ec7',
                boxShadow: '0 0 10px #ff6ec7',
              }}
            />
          ))}
          {gridLines.map((i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 border-l-2"
              style={{
                left: `${i * 5}%`,
                borderColor: '#00f5ff',
                boxShadow: '0 0 10px #00f5ff',
              }}
            />
          ))}
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-32 left-10 opacity-40"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.4 }}
        transition={{ duration: 2 }}
      >
        <svg width="80" height="120" viewBox="0 0 80 120">
          <rect x="35" y="40" width="10" height="80" fill="#2b1055" />
          <path d="M40,40 Q20,20 10,10" stroke="#2b1055" strokeWidth="8" fill="none" />
          <path d="M40,40 Q60,20 70,10" stroke="#2b1055" strokeWidth="8" fill="none" />
          <path d="M40,40 Q10,30 5,25" stroke="#2b1055" strokeWidth="6" fill="none" />
          <path d="M40,40 Q70,30 75,25" stroke="#2b1055" strokeWidth="6" fill="none" />
          <path d="M40,40 Q25,40 15,45" stroke="#2b1055" strokeWidth="6" fill="none" />
          <path d="M40,40 Q55,40 65,45" stroke="#2b1055" strokeWidth="6" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-20 opacity-40"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.4 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <svg width="100" height="140" viewBox="0 0 100 140">
          <rect x="45" y="50" width="12" height="90" fill="#2b1055" />
          <path d="M50,50 Q25,25 10,10" stroke="#2b1055" strokeWidth="10" fill="none" />
          <path d="M50,50 Q75,25 90,10" stroke="#2b1055" strokeWidth="10" fill="none" />
          <path d="M50,50 Q15,35 5,30" stroke="#2b1055" strokeWidth="8" fill="none" />
          <path d="M50,50 Q85,35 95,30" stroke="#2b1055" strokeWidth="8" fill="none" />
          <path d="M50,50 Q30,50 20,55" stroke="#2b1055" strokeWidth="8" fill="none" />
          <path d="M50,50 Q70,50 80,55" stroke="#2b1055" strokeWidth="8" fill="none" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/4"
        animate={{
          rotate: 360,
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100">
          <polygon
            points="50,10 90,80 10,80"
            fill="none"
            stroke="#ff6ec7"
            strokeWidth="3"
            opacity="0.6"
            style={{ filter: 'drop-shadow(0 0 10px #ff6ec7)' }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/4"
        animate={{
          rotate: -360,
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100">
          <polygon
            points="50,90 90,20 10,20"
            fill="none"
            stroke="#00f5ff"
            strokeWidth="3"
            opacity="0.6"
            style={{ filter: 'drop-shadow(0 0 10px #00f5ff)' }}
          />
        </svg>
      </motion.div>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '3px',
            height: '3px',
            backgroundColor: i % 2 === 0 ? '#ff6ec7' : '#ffd319',
            boxShadow: `0 0 10px ${i % 2 === 0 ? '#ff6ec7' : '#ffd319'}`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
