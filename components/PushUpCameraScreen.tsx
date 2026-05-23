'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

interface PushUpCameraScreenProps {
  onContinue: () => void
}

const TARGET_REPS = 5

export default function PushUpCameraScreen({ onContinue }: PushUpCameraScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraFailed, setCameraFailed] = useState(false)
  const [repCount, setRepCount] = useState(0)

  const isComplete = repCount >= TARGET_REPS

  const incrementRep = useCallback(() => {
    setRepCount((current) => {
      if (current >= TARGET_REPS) return current
      return current + 1
    })
  }, [])

  useEffect(() => {
    let mounted = true

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('Camera unavailable')
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        })

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

    return () => {
      mounted = false
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space') return
      event.preventDefault()
      incrementRep()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [incrementRep])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen w-full bg-ink relative overflow-hidden flex items-center"
    >
      <div
        className="glow-orb"
        style={{
          background: '#7C3AED',
          width: '520px',
          height: '520px',
          top: '-170px',
          left: '18%',
          opacity: 0.34,
        }}
      />
      <div
        className="glow-orb"
        style={{
          background: '#4F46E5',
          width: '360px',
          height: '360px',
          bottom: '-120px',
          right: '-80px',
          opacity: 0.28,
        }}
      />

      <div className="max-w-6xl mx-auto w-full p-6 md:p-12 lg:p-16">
        <div className="relative z-10 flex flex-col md:flex-row items-stretch gap-7 md:gap-9">
          <div className="w-full md:basis-[60%]">
            <div
              className="relative w-full max-w-[640px] mx-auto md:mx-0 aspect-video rounded-2xl overflow-hidden border border-white/10"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              {!cameraFailed && (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transform: 'scaleX(-1)' }}
                />
              )}

              {cameraFailed && (
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <p className="text-base text-white/75 leading-relaxed max-w-sm">
                    No camera? No problem — just do your push-ups and count along.
                  </p>
                </div>
              )}

              {!cameraReady && !cameraFailed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[13px] text-white/45">Starting camera...</p>
                </div>
              )}

              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[12px] font-medium text-white/70 backdrop-blur">
                Mirror only
              </div>
            </div>
          </div>

          <div className="w-full md:basis-[40%] flex flex-col justify-center text-center md:text-left">
            <p className="text-[11px] text-white/50 mb-5 font-medium" style={{ letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              Move the urge
            </p>

            <h1
              className="gradient-text-light text-4xl md:text-[40px] font-semibold mb-4"
              style={{ letterSpacing: '-1.2px', lineHeight: 1.15 }}
            >
              Do 5 push-ups
            </h1>

            <p className="text-base text-white/70 mb-7 leading-relaxed">
              Each time you push up, press spacebar (or tap the button). We'll keep count.
            </p>

            <motion.div
              key={repCount}
              initial={{ scale: 0.92, opacity: 0.75 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="mb-6"
            >
              <span
                className="text-7xl md:text-8xl font-semibold text-white"
                style={{ letterSpacing: '-2.5px', textShadow: '0 10px 40px rgba(0,0,0,0.35)' }}
              >
                {repCount}
              </span>
              <span className="text-3xl md:text-4xl font-semibold text-white/35">
                {' '}/ {TARGET_REPS}
              </span>
            </motion.div>

            <p className="text-[13px] text-white/45 mb-5">
              Press spacebar or tap the button for each push-up.
            </p>

            <button
              onClick={incrementRep}
              disabled={isComplete}
              className="cta-gradient-large w-full px-9 py-4 text-white rounded-xl text-[15px] font-semibold disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              I did one 💪
            </button>

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="mt-6"
              >
                <p className="gradient-text-light text-2xl md:text-3xl font-semibold mb-5" style={{ letterSpacing: '-0.8px' }}>
                  Nice — 5 done! 💪
                </p>
                <button
                  onClick={onContinue}
                  className="cta-gradient-large w-full px-9 py-4 text-white rounded-xl text-[15px] font-semibold"
                >
                  Continue →
                </button>
              </motion.div>
            )}

            <button
              onClick={onContinue}
              className="mt-5 text-[13px] text-white/45 hover:text-white/70 transition-colors"
            >
              Skip this step →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
