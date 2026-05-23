'use client'

import { motion } from 'framer-motion'

interface DemoOutroScreenProps {
  onContinue: () => void
}

export default function DemoOutroScreen({ onContinue }: DemoOutroScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen w-full bg-ink relative overflow-hidden flex flex-col items-center justify-center text-center"
    >
      <div
        className="glow-orb"
        style={{
          background: '#4F46E5',
          width: '420px',
          height: '420px',
          top: '-140px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.42,
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
          <h1
            className="gradient-text text-5xl md:text-6xl font-semibold mb-7"
            style={{ letterSpacing: '-2px', lineHeight: 0.98 }}
          >
            That's Come Back.
          </h1>

          <p className="text-base md:text-xl text-white/75 mb-11 max-w-xl mx-auto font-medium" style={{ lineHeight: 1.6 }}>
            The urge you came in with? You just moved through it — breath, body, focus. No willpower. Just a better reflex.
          </p>

          <button
            onClick={onContinue}
            className="cta-gradient-large px-11 py-4 text-white rounded-2xl text-base font-semibold"
          >
            One last question →
          </button>
        </div>
      </div>
    </motion.div>
  )
}
