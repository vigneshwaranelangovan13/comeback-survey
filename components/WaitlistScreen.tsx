'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface WaitlistScreenProps {
  onJoin: (email: string) => void
  onSkip: () => void
}

export default function WaitlistScreen({ onJoin, onSkip }: WaitlistScreenProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!email.trim()) {
      setError('Enter your email to lock in the discount')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("That doesn't look like a valid email")
      return
    }
    setError('')
    onJoin(email.trim().toLowerCase())
  }

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
          width: '420px',
          height: '420px',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.4,
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

      <div className="max-w-2xl mx-auto w-full p-12 md:p-16">
        <div className="relative z-10 w-full flex flex-col items-center">
          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full mb-6 text-xs font-medium"
            style={{
              background: 'rgba(124, 58, 237, 0.18)',
              border: '1px solid rgba(124, 58, 237, 0.4)',
              color: '#C4B5FD',
              letterSpacing: '0.3px',
            }}
          >
            ✦ Early supporter offer
          </div>

          <h1
            className="gradient-text-light text-4xl md:text-[40px] font-semibold mb-5 max-w-xl mx-auto"
            style={{ letterSpacing: '-1.2px', lineHeight: 1.15 }}
          >
            Lock in 30% off — forever.
          </h1>

          <p className="text-base text-white/75 mb-3 max-w-md mx-auto leading-relaxed">
            Join the waitlist today. When we launch, you'll get Come Back for life at{' '}
            <span className="text-white font-semibold">₹69/month</span> instead of ₹99.
          </p>

          <p className="text-[13px] text-white/45 mb-9 max-w-sm mx-auto leading-relaxed">
            Only the first 500 people who join get this price locked in for life.
            After that, it's ₹99/month for everyone.
          </p>

          <div className="w-full max-w-sm">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError('')
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="your@email.com"
              className="w-full px-5 py-4 text-[15px] text-white rounded-xl mb-3.5 outline-none focus:border-violet-500 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            />

            {error && (
              <p className="text-[13px] text-red-400 mb-3 text-left">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              className="cta-gradient-large w-full px-9 py-4 text-white rounded-xl text-[15px] font-semibold"
            >
              Claim my 30% lifetime discount →
            </button>

            <button
              onClick={onSkip}
              className="mt-5 text-[13px] text-white/45 hover:text-white/70 transition-colors"
            >
              No thanks, skip
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
