'use client'

import { motion } from 'framer-motion'

interface PushUpInstructionsScreenProps {
  onContinue: () => void
}

const instructions = [
  'Place your phone or laptop a few steps ahead of you.',
  'Make sure you can see yourself in the frame.',
  'Get into push-up position, facing the camera.',
]

export default function PushUpInstructionsScreen({ onContinue }: PushUpInstructionsScreenProps) {
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
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.42,
        }}
      />
      <div
        className="glow-orb"
        style={{
          background: '#9333EA',
          width: '300px',
          height: '300px',
          bottom: '-80px',
          right: '-60px',
          opacity: 0.32,
        }}
      />

      <div className="max-w-2xl mx-auto w-full p-12 md:p-16">
        <div className="relative z-10">
          <h1
            className="gradient-text-light text-4xl md:text-[40px] font-semibold mb-8 max-w-xl mx-auto"
            style={{ letterSpacing: '-1.2px', lineHeight: 1.15 }}
          >
            Quick setup
          </h1>

          <div className="flex flex-col gap-3 mb-8 text-left">
            {instructions.map((instruction, index) => (
              <div
                key={instruction}
                className="flex gap-4 rounded-2xl border border-white/10 px-5 py-4"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)',
                    boxShadow: '0 6px 18px rgba(124,58,237,0.35)',
                  }}
                >
                  {index + 1}
                </span>
                <p className="text-[15px] text-white/80 leading-relaxed">
                  {instruction}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[15px] text-white/60 mb-10 max-w-md mx-auto" style={{ lineHeight: 1.7 }}>
            Your camera is just a mirror — nothing is recorded or saved. You'll count your own reps.
          </p>

          <button
            onClick={onContinue}
            className="cta-gradient-large px-11 py-4 text-white rounded-2xl text-base font-semibold"
          >
            Allow camera &amp; start →
          </button>
        </div>
      </div>
    </motion.div>
  )
}
