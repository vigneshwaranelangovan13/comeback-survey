'use client'

import { motion } from 'framer-motion'

interface TrackerTeaserScreenProps {
  onContinue: () => void
}

const stats = [
  { label: 'Clean streak', value: '14 days' },
  { label: 'Relapses', value: '2' },
  { label: 'Nightfall logged', value: '3' },
  { label: 'New habits built', value: '5' },
]

export default function TrackerTeaserScreen({ onContinue }: TrackerTeaserScreenProps) {
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

      <div className="max-w-4xl mx-auto w-full p-8 md:p-16">
        <div className="relative z-10">
          <p className="text-[11px] text-white/50 mb-5 font-medium" style={{ letterSpacing: '2.5px', textTransform: 'uppercase' }}>
            Coming soon
          </p>

          <h1
            className="gradient-text-light text-4xl md:text-[40px] font-semibold mb-8 max-w-xl mx-auto"
            style={{ letterSpacing: '-1.2px', lineHeight: 1.15 }}
          >
            Your recovery system
          </h1>

          <div
            className="relative rounded-2xl border border-cyan-300/20 p-5 md:p-6 mb-7 text-left overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(12,22,34,0.92) 0%, rgba(10,10,15,0.78) 100%)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.34), 0 0 36px rgba(79,70,229,0.18), inset 0 0 28px rgba(34,211,238,0.06)',
            }}
          >
            <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
            <div className="absolute inset-x-5 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/55 to-transparent" />
            <div className="absolute left-4 top-4 h-5 w-5 border-l border-t border-cyan-300/55" />
            <div className="absolute right-4 top-4 h-5 w-5 border-r border-t border-cyan-300/55" />
            <div className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-violet-300/45" />
            <div className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-violet-300/45" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-5">
              <div
                className="rounded-2xl border border-cyan-300/20 p-5"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(34,211,238,0.16), rgba(255,255,255,0.045) 42%, rgba(0,0,0,0.12) 100%)',
                  boxShadow: 'inset 0 0 24px rgba(34,211,238,0.06)',
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <p className="text-[12px] text-cyan-100/55 font-medium uppercase tracking-wider">
                    Status card
                  </p>
                  <span className="rounded-full px-3 py-1.5 text-[12px] font-medium text-cyan-100 border border-cyan-300/25 bg-cyan-400/10">
                    Active
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full bg-cyan-300/20 blur-2xl" />
                    <svg width="116" height="116" viewBox="0 0 116 116" fill="none" aria-hidden="true" className="relative">
                      <defs>
                        <linearGradient id="systemEmblem" x1="18" y1="14" x2="98" y2="102" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#22D3EE" />
                          <stop offset="0.48" stopColor="#7C3AED" />
                          <stop offset="1" stopColor="#9333EA" />
                        </linearGradient>
                      </defs>
                      <path d="M58 9L100 33V82L58 107L16 82V33L58 9Z" fill="rgba(34,211,238,0.08)" stroke="url(#systemEmblem)" strokeWidth="3" />
                      <path d="M58 25L85 41V73L58 91L31 73V41L58 25Z" fill="rgba(124,58,237,0.12)" stroke="rgba(255,255,255,0.22)" strokeWidth="2" />
                      <path d="M58 38L73 47V66L58 76L43 66V47L58 38Z" fill="url(#systemEmblem)" opacity="0.88" />
                      <path d="M58 9V25M100 33L85 41M100 82L85 73M58 107V91M16 82L31 73M16 33L31 41" stroke="rgba(34,211,238,0.38)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  <p className="text-[12px] text-white/45 font-medium uppercase tracking-wider mb-2">
                    Recovery streak
                  </p>
                  <h2 className="text-5xl md:text-6xl font-semibold text-white mb-2" style={{ letterSpacing: '-2px', lineHeight: 0.95 }}>
                    Day 14
                  </h2>
                  <p className="text-[13px] text-cyan-100/60">
                    Focus rising. System stable.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-cyan-300/14 p-4"
                      style={{ background: 'rgba(255,255,255,0.045)' }}
                    >
                      <p className="text-[12px] text-white/42 font-medium uppercase tracking-wider mb-2">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-semibold text-white" style={{ letterSpacing: '-0.7px' }}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-2xl border border-violet-300/18 p-5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.14) 0%, rgba(34,211,238,0.06) 100%)',
                  }}
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <p className="text-[12px] text-white/45 font-medium uppercase tracking-wider">
                      Journal
                    </p>
                    <span className="text-[12px] text-cyan-100/55">
                      Tap to journal
                    </span>
                  </div>
                  <p className="text-[15px] text-white/78 leading-relaxed">
                    Day 14 — felt the urge at night, did push-ups instead. Stayed clean.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[15px] text-white/60 mb-10 max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
            Track your journey, journal your wins. Coming soon.
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
