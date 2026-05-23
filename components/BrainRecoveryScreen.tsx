'use client'

import { motion } from 'framer-motion'

interface BrainRecoveryScreenProps {
  onContinue: () => void
}

export default function BrainRecoveryScreen({ onContinue }: BrainRecoveryScreenProps) {
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
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.38,
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

      <div className="max-w-3xl mx-auto w-full p-8 md:p-16">
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="text-[11px] text-white/50 mb-5 font-medium" style={{ letterSpacing: '2.5px', textTransform: 'uppercase' }}>
            Coming soon
          </p>

          <div
            className="w-full max-w-2xl rounded-2xl border border-white/10 p-5 md:p-6 mb-8"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.045) 100%)',
              boxShadow: '0 24px 70px rgba(0,0,0,0.28)',
            }}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="shrink-0">
                <motion.svg
                  width="180"
                  height="150"
                  viewBox="0 0 180 150"
                  fill="none"
                  aria-hidden="true"
                  animate={{ scale: [1, 1.025, 1], opacity: [0.92, 1, 0.92] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <defs>
                    <linearGradient id="brainGradient" x1="25" y1="18" x2="158" y2="132" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4F46E5" />
                      <stop offset="0.58" stopColor="#7C3AED" />
                      <stop offset="1" stopColor="#9333EA" />
                    </linearGradient>
                    <filter id="brainGlow" x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    d="M74 28C55 14 28 24 26 48C10 55 12 84 29 91C26 112 51 126 68 114C75 130 103 132 112 114C132 122 155 107 150 86C166 76 158 46 139 45C134 20 102 15 89 34C85 31 80 29 74 28Z"
                    fill="rgba(124,58,237,0.14)"
                    stroke="url(#brainGradient)"
                    strokeWidth="5"
                    strokeLinejoin="round"
                    filter="url(#brainGlow)"
                  />
                  <path d="M75 31C66 45 67 62 79 73C65 82 65 103 76 115" stroke="url(#brainGradient)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M99 34C89 48 91 63 104 73C92 84 92 101 106 113" stroke="url(#brainGradient)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M42 55C55 51 69 54 79 64" stroke="url(#brainGradient)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M111 64C124 54 137 56 146 66" stroke="url(#brainGradient)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M43 91C57 94 66 89 76 80" stroke="url(#brainGradient)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M105 82C119 91 132 93 144 84" stroke="url(#brainGradient)" strokeWidth="4" strokeLinecap="round" />
                </motion.svg>
              </div>

              <div className="w-full max-w-lg">
                <div className="flex justify-between text-[12px] text-white/45 mb-3">
                  <span>Day 1</span>
                  <span>Day 30</span>
                  <span>Day 90</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden bg-white/10">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '75%' }}
                    transition={{ delay: 0.2, duration: 1.5, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 60%, #9333EA 100%)',
                      boxShadow: '0 0 22px rgba(124,58,237,0.5)',
                    }}
                  />
                </div>
                <p className="text-[13px] text-white/45 mt-3 text-center">
                  Recovery preview
                </p>
              </div>
            </div>
          </div>

          <h1
            className="gradient-text-light text-4xl md:text-[40px] font-semibold mb-4 max-w-xl mx-auto"
            style={{ letterSpacing: '-1.2px', lineHeight: 1.15 }}
          >
            Your brain can recover.
          </h1>

          <p className="text-base text-white/72 leading-relaxed max-w-xl mx-auto mb-7">
            Studies link heavy porn use to changes in the brain's reward system. Come Back helps you build the habits that let it recover — and shows your progress over time.
          </p>

          <div className="flex flex-col items-center gap-2 mb-8 max-w-xl mx-auto">
            <p className="text-[13px] text-white/50 leading-relaxed">
              Heavy use is linked to reduced activity in the brain's reward circuits.
            </p>
            <p className="text-[13px] text-white/50 leading-relaxed">
              The brain is adaptable — habits can reshape it over time (neuroplasticity).
            </p>
            <p className="text-[13px] text-white/50 leading-relaxed">
              Many people report sharper focus and mood weeks after quitting.
            </p>
          </div>

          <p className="text-[15px] text-white/60 mb-8">
            Come Back tracks your recovery, day by day.
          </p>

          <button
            onClick={onContinue}
            className="cta-gradient-large px-11 py-4 text-white rounded-2xl text-base font-semibold"
          >
            Keep going →
          </button>
        </div>
      </div>
    </motion.div>
  )
}
