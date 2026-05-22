'use client'

import { motion } from 'framer-motion'
import ProgressBar from './ProgressBar'

interface Option {
  value: string
  label: string
}

interface QuestionScreenProps {
  step: number
  totalSteps: number
  meta: string
  question: React.ReactNode
  subtitle?: string
  options: Option[]
  onSelect: (value: string) => void
  glowConfig?: { color: string; position: string; size: string }
}

export default function QuestionScreen({
  step,
  totalSteps,
  meta,
  question,
  subtitle,
  options,
  onSelect,
  glowConfig,
}: QuestionScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen w-full bg-cream relative overflow-hidden flex items-center"
    >
      {glowConfig && (
        <div
          className="glow-orb"
          style={{
            background: glowConfig.color,
            ...JSON.parse(glowConfig.position),
            width: glowConfig.size,
            height: glowConfig.size,
            opacity: 0.4,
          }}
        />
      )}

      <div className="max-w-2xl mx-auto w-full p-12 md:p-16">
        <div className="relative z-10">
          <ProgressBar current={step} total={totalSteps} />

          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
            {meta}
          </p>

          <h1
            className="text-3xl md:text-4xl font-semibold text-ink mb-3 leading-[1.15]"
            style={{ letterSpacing: '-0.8px' }}
          >
            {question}
          </h1>

          {subtitle && (
            <p className="text-base text-neutral-600 mb-9 leading-relaxed">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col gap-2.5">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSelect(opt.value)}
                className="option-button px-5 py-4 text-left bg-white border border-black/[0.06] rounded-2xl text-[15px] font-medium text-ink"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
