'use client'

import { motion } from 'framer-motion'

interface CommunityMilestoneScreenProps {
  onContinue: () => void
}

const leaderboard = [
  { rank: 4, name: 'Vikram', days: 41 },
  { rank: 5, name: 'Sai', days: 33 },
  { rank: 6, name: 'Dev', days: 27 },
  { rank: 7, name: 'You', days: 14 },
  { rank: 8, name: 'Aman', days: 9 },
  { rank: 9, name: 'Rohit', days: 6 },
]

const podium = [
  { rank: 2, name: 'Rahul', days: 64, initials: 'RA', height: 'h-24 md:h-28', order: 'md:order-1', color: '#4F46E5' },
  { rank: 1, name: 'Arjun', days: 87, initials: 'AR', height: 'h-32 md:h-40', order: 'md:order-2', color: '#7C3AED' },
  { rank: 3, name: 'Karan', days: 52, initials: 'KA', height: 'h-20 md:h-24', order: 'md:order-3', color: '#9333EA' },
]

export default function CommunityMilestoneScreen({ onContinue }: CommunityMilestoneScreenProps) {
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
          background: '#7C3AED',
          width: '430px',
          height: '430px',
          top: '-130px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.36,
        }}
      />
      <div
        className="glow-orb"
        style={{
          background: '#4F46E5',
          width: '300px',
          height: '300px',
          bottom: '-80px',
          right: '-60px',
          opacity: 0.3,
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
            Climb the ranks.
          </h1>

          <div
            className="rounded-2xl border border-white/10 p-5 md:p-6 mb-7 text-left"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.045) 100%)',
              boxShadow: '0 24px 70px rgba(0,0,0,0.26)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-[12px] text-white/45 font-medium uppercase tracking-wider">
                Weekly top 9
              </p>
              <span className="rounded-full px-3 py-1.5 text-[12px] font-medium text-violet-100 border border-violet-400/30 bg-violet-500/15">
                Recovery league
              </span>
            </div>

            <div className="grid grid-cols-3 items-end gap-3 md:gap-5 mb-6">
              {podium.map((player) => (
                <div key={player.rank} className={`flex flex-col items-center ${player.order}`}>
                  <div className="relative mb-3">
                    <div
                      className="absolute inset-0 rounded-full blur-xl opacity-50"
                      style={{ background: player.color }}
                    />
                    <div
                      className="relative h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center text-white text-[14px] md:text-[15px] font-semibold border border-white/25"
                      style={{
                        background: `linear-gradient(135deg, ${player.color} 0%, #0A0A0F 135%)`,
                        boxShadow: `0 10px 28px ${player.color}55`,
                      }}
                    >
                      {player.initials}
                    </div>
                  </div>

                  <div className="text-center mb-3">
                    <p className="text-[13px] md:text-[15px] font-semibold text-white">
                      {player.name}
                    </p>
                    <p className="text-[12px] text-white/55">
                      {player.days}🔥
                    </p>
                  </div>

                  <div
                    className={`w-full rounded-t-2xl border border-white/10 ${player.height} flex items-center justify-center`}
                    style={{
                      background: `linear-gradient(180deg, ${player.color}44 0%, rgba(10,10,15,0.5) 100%)`,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), 0 16px 38px ${player.color}22`,
                    }}
                  >
                    <span
                      className="text-3xl md:text-5xl font-semibold text-white/90"
                      style={{ letterSpacing: '-1.4px' }}
                    >
                      {player.rank}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {leaderboard.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                    player.name === 'You'
                      ? 'border-violet-400/50 bg-violet-500/18'
                      : 'border-white/10 bg-black/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 text-[13px] font-semibold text-white/45">
                      #{player.rank}
                    </span>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold text-white border border-white/15"
                      style={{
                        background: player.name === 'You'
                          ? 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)'
                          : 'rgba(255,255,255,0.09)',
                      }}
                    >
                      {player.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="text-[15px] font-medium text-white">
                      {player.name}
                    </span>
                  </div>
                  <span className="text-[14px] text-white/70">
                    {player.days} days
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[15px] text-white/60 mb-10 max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
            Compete, earn milestones, stay accountable with a community that gets it. Coming soon.
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
