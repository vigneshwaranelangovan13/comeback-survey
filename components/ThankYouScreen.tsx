'use client'

import { motion } from 'framer-motion'

interface ThankYouScreenProps {
  joinedWaitlist: boolean
}

export default function ThankYouScreen({ joinedWaitlist }: ThankYouScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen w-full bg-ink relative overflow-hidden flex flex-col items-center justify-center text-center"
    >
      <div
        className="glow-orb"
        style={{
          background: '#7C3AED',
          width: '380px',
          height: '380px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.3,
        }}
      />

      <div className="max-w-2xl mx-auto w-full p-12 md:p-16">
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            className="w-14 h-14 rounded-full mx-auto mb-7 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)',
              boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="gradient-text-light text-3xl md:text-[36px] font-semibold mb-6 max-w-xl mx-auto"
            style={{ letterSpacing: '-1px', lineHeight: 1.2 }}
          >
            {joinedWaitlist
              ? "You're in. Welcome to Come Back."
              : "That's exactly what we needed to hear."}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-[15px] text-white/70 max-w-md mx-auto"
            style={{ lineHeight: 1.7 }}
          >
            {joinedWaitlist
              ? <>We'll email you the moment Come Back is ready. Until then — try doing 20 push-ups next time the urge hits. It works. That's the whole product, basically.</>
              : <>Whatever you answered — thank you for being honest.<br />You just helped build something that might help thousands of people like us.</>
            }
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="text-[12px] text-white/40 mt-8"
            style={{ letterSpacing: '1.8px', textTransform: 'uppercase' }}
          >
            — Vignesh, Come Back
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
