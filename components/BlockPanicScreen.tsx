'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface BlockPanicScreenProps {
  site: string
  onContinue: () => void
}

const quoteWords = "Don't quit. The story isn't done.".split(' ')

export default function BlockPanicScreen({ site, onContinue }: BlockPanicScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const displaySite = site.trim() || 'That site'

  useEffect(() => {
    const playPromise = videoRef.current?.play()
    if (playPromise) {
      playPromise.catch(() => undefined)
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
      <video
        ref={videoRef}
        src="/motivation.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-10 bg-black/60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 42%, rgba(185, 28, 28, 0.34), rgba(10, 10, 15, 0.76) 54%, rgba(0, 0, 0, 0.9) 100%)',
        }}
      />

      <div className="max-w-2xl mx-auto w-full p-12 md:p-16 relative z-20">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.24, ease: 'easeOut' }}
            className="mb-9"
          >
            <p className="text-[11px] text-white/50 mb-4 font-medium" style={{ letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              Attempt intercepted
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <h1
                className="text-3xl md:text-4xl font-semibold text-white max-w-xl break-words"
                style={{ letterSpacing: '-0.8px', lineHeight: 1.15 }}
              >
                {displaySite}
              </h1>
              <span
                className="px-3.5 py-1.5 rounded-lg text-[12px] font-bold text-red-100 border border-red-400/70 bg-red-600/25"
                style={{ letterSpacing: '1.6px', transform: 'rotate(-3deg)' }}
              >
                BLOCKED
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.16, delayChildren: 0.45 } },
            }}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl font-semibold text-white mb-6 max-w-2xl"
            style={{ letterSpacing: '-1.6px', lineHeight: 1.05 }}
          >
            {quoteWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.42, ease: 'easeOut' }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.65, duration: 0.4 }}
            className="text-[15px] text-white/55 mb-11"
          >
            — your future self
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.15, duration: 0.4, ease: 'easeOut' }}
            onClick={onContinue}
            className="cta-gradient-large px-11 py-4 text-white rounded-2xl text-base font-semibold"
          >
            I'm staying strong →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
