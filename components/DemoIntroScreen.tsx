'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface DemoIntroScreenProps {
  onContinue: (siteText: string) => void
}

export default function DemoIntroScreen({ onContinue }: DemoIntroScreenProps) {
  const [siteText, setSiteText] = useState('')
  const trimmedSite = siteText.trim()

  const handleSubmit = () => {
    if (!trimmedSite) return
    onContinue(trimmedSite)
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
          background: '#4F46E5',
          width: '420px',
          height: '420px',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.45,
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
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1
            className="gradient-text-light text-4xl md:text-[40px] font-semibold mb-5 max-w-xl mx-auto"
            style={{ letterSpacing: '-1.2px', lineHeight: 1.15 }}
          >
            Want to feel it work?
          </h1>

          <p className="text-base text-white/75 mb-9 max-w-md mx-auto leading-relaxed">
            Type a site you'd want to block. We'll show you exactly what happens when the urge hits.
          </p>

          <div className="w-full max-w-sm">
            <input
              type="text"
              value={siteText}
              onChange={(e) => setSiteText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="e.g. a site you visit too often"
              className="w-full px-5 py-4 text-[15px] text-white rounded-xl mb-3.5 outline-none focus:border-violet-500 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            />

            <button
              onClick={handleSubmit}
              disabled={!trimmedSite}
              className="cta-gradient-large w-full px-9 py-4 text-white rounded-xl text-[15px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              Block it now →
            </button>

            <p className="text-[13px] text-white/45 mt-5">
              Nothing you type is ever saved.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
