import { motion } from 'motion/react';
import { Settings, Cog } from 'lucide-react';

export function SteampunkGears() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden blur-[2px] opacity-10 z-0">
      <motion.div
        className="absolute -top-20 -left-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Cog className="w-64 h-64 text-amber-600" strokeWidth={1} />
      </motion.div>
      <motion.div
        className="absolute -top-10 right-32"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <Settings className="w-40 h-40 text-amber-700" strokeWidth={1} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 -left-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <Settings className="w-32 h-32 text-amber-800" strokeWidth={1} />
      </motion.div>
      <motion.div
        className="absolute -bottom-32 -right-32"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <Cog className="w-80 h-80 text-amber-600" strokeWidth={1} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-1/4"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <Cog className="w-48 h-48 text-amber-700" strokeWidth={1} />
      </motion.div>
      <motion.div
        className="absolute top-1/2 -right-8"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Settings className="w-28 h-28 text-amber-800" strokeWidth={1} />
      </motion.div>
      <motion.div
        className="absolute top-1/4 right-1/4"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <Cog className="w-36 h-36 text-amber-600" strokeWidth={1} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-1/3"
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <Settings className="w-24 h-24 text-amber-700" strokeWidth={1} />
      </motion.div>
    </div>
  );
}

