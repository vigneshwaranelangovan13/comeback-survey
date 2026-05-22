'use client'

import { motion } from 'framer-motion'

interface RevealScreenProps {
  onContinue: () => void
}

export default function RevealScreen({ onContinue }: RevealScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen w-full bg-ink relative overflow-hidden flex flex-col items-center justify-center text-center"
    >
      <div
        className="glow-orb"
        style={{
          background: '#4F46E5',
          width: '420px',
          height: '420px',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.5,
        }}
      />
      <div
        className="glow-orb"
        style={{
          background: '#9333EA',
          width: '320px',
          height: '320px',
          bottom: '-100px',
          right: '-80px',
          opacity: 0.35,
        }}
      />

      <div className="max-w-2xl mx-auto w-full p-12 md:p-16">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[11px] text-white/50 mb-7 font-medium"
            style={{ letterSpacing: '2.5px', textTransform: 'uppercase' }}
          >
            Introducing
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="gradient-text text-6xl md:text-7xl font-semibold mb-9"
            style={{ letterSpacing: '-2.5px', lineHeight: 0.95 }}
          >
            Come Back
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-xl text-white mb-5 max-w-xl mx-auto font-medium"
            style={{ lineHeight: 1.5 }}
          >
            A blocker that doesn't show a wall.
            <br />
            It moves the urge through your body.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-[15px] text-white/65 mb-11 max-w-md mx-auto"
            style={{ lineHeight: 1.7 }}
          >
            Hit a blocked site → do 20 push-ups. Or 5 minutes of yoga.
            Track your streak. Heal your triggers. Built in India.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            onClick={onContinue}
            className="cta-gradient-large px-11 py-4 text-white rounded-2xl text-base font-semibold"
          >
            See if it's for you →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
