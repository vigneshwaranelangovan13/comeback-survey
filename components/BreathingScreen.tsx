'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface BreathingScreenProps {
  onContinue: () => void
}

export default function BreathingScreen({ onContinue }: BreathingScreenProps) {
  const [isInhale, setIsInhale] = useState(true)
  const [canContinue, setCanContinue] = useState(false)

  useEffect(() => {
    const phaseTimer = window.setInterval(() => {
      setIsInhale((current) => !current)
    }, 4000)
    const continueTimer = window.setTimeout(() => setCanContinue(true), 8000)

    return () => {
      window.clearInterval(phaseTimer)
      window.clearTimeout(continueTimer)
    }
  }, [])

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
          width: '380px',
          height: '380px',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.38,
        }}
      />
      <div
        className="glow-orb"
        style={{
          background: '#9333EA',
          width: '280px',
          height: '280px',
          bottom: '-90px',
          right: '-70px',
          opacity: 0.3,
        }}
      />

      <div className="max-w-2xl mx-auto w-full p-12 md:p-16">
        <div className="relative z-10 flex flex-col items-center">
          <motion.p
            key={isInhale ? 'in' : 'out'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="gradient-text-light text-4xl md:text-[40px] font-semibold mb-8"
            style={{ letterSpacing: '-1.2px', lineHeight: 1.15 }}
          >
            {isInhale ? 'Breathe in' : 'Breathe out'}
          </motion.p>

          <svg viewBox="0 0 300 250" className="w-full max-w-[340px] h-auto mb-10 overflow-visible">
            <defs>
              <linearGradient id="breathGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="60%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#9333EA" />
              </linearGradient>
              <filter id="breathGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 56 205 L 150 48 L 244 205 Z"
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="2"
            />
            <path
              d="M 56 205 L 150 48 L 244 205"
              fill="none"
              stroke="url(#breathGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.85"
            />
            <motion.circle
              r="15"
              fill="url(#breathGradient)"
              filter="url(#breathGlow)"
              animate={{
                cx: [56, 150, 244, 56],
                cy: [205, 48, 205, 205],
              }}
              transition={{
                duration: 8,
                times: [0, 0.5, 1, 1],
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </svg>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={canContinue ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={onContinue}
            disabled={!canContinue}
            className="cta-gradient-large px-11 py-4 text-white rounded-2xl text-base font-semibold disabled:pointer-events-none"
          >
            Continue →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
