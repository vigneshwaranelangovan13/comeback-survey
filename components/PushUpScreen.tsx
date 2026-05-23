'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface PushUpScreenProps {
  onContinue: () => void
}

export default function PushUpScreen({ onContinue }: PushUpScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraFailed, setCameraFailed] = useState(false)
  const [repCount, setRepCount] = useState(0)

  useEffect(() => {
    let mounted = true

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('Camera unavailable')
        }

        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setCameraReady(true)
      } catch {
        if (mounted) {
          setCameraFailed(true)
          setCameraReady(false)
        }
      }
    }

    void startCamera()

    const repTimer = window.setInterval(() => {
      setRepCount((current) => {
        if (current >= 5) {
          window.clearInterval(repTimer)
          return current
        }
        return current + 1
      })
    }, 2500)

    return () => {
      mounted = false
      window.clearInterval(repTimer)
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  const isComplete = repCount >= 5

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
          top: '-110px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.34,
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
          opacity: 0.28,
        }}
      />

      <div className="max-w-2xl mx-auto w-full p-12 md:p-16">
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-[11px] text-white/50 mb-5 font-medium" style={{ letterSpacing: '2.5px', textTransform: 'uppercase' }}>
            Move the urge
          </p>

          <div
            className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden mb-7 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {!cameraFailed && (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${cameraReady ? 'opacity-70' : 'opacity-0'}`}
                style={{ transform: 'scaleX(-1)' }}
              />
            )}

            {cameraFailed && (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <p className="text-base text-white/75 leading-relaxed">
                  No camera? No problem — just do 5 push-ups wherever you are.
                </p>
              </div>
            )}

            {!cameraReady && !cameraFailed && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[13px] text-white/45">Starting camera...</p>
              </div>
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span
                className="text-7xl md:text-8xl font-semibold text-white"
                style={{ letterSpacing: '-2.5px', textShadow: '0 10px 40px rgba(0,0,0,0.55)' }}
              >
                {repCount}
              </span>
              <span className="text-[12px] text-white/60 font-medium uppercase tracking-wider mt-2">
                reps
              </span>
            </div>
          </div>

          <motion.h1
            animate={{ opacity: 1 }}
            className="gradient-text-light text-3xl md:text-[36px] font-semibold mb-6 max-w-xl mx-auto"
            style={{ letterSpacing: '-1px', lineHeight: 1.2 }}
          >
            {isComplete ? 'Nice — 5 done.' : 'Give me 5.'}
          </motion.h1>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onClick={onContinue}
            disabled={!isComplete}
            className="cta-gradient-large px-11 py-4 text-white rounded-2xl text-base font-semibold disabled:pointer-events-none"
          >
            Continue →
          </motion.button>

          <button
            onClick={onContinue}
            className="mt-5 text-[13px] text-white/45 hover:text-white/70 transition-colors"
          >
            Skip this step →
          </button>
        </div>
      </div>
    </motion.div>
  )
}
