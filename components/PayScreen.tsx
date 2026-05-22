'use client'

import { motion } from 'framer-motion'

interface PayScreenProps {
  onSelect: (value: string) => void
}

const options = [
  { value: 'yes_99', label: 'Yes — ₹99/month is worth it' },
  { value: 'yes_trial', label: "Yes, but I'd want a few days to try it first" },
  { value: 'maybe', label: 'Maybe — depends on how well it works' },
  { value: 'pay_more', label: "I'd pay more for something that genuinely worked" },
]

export default function PayScreen({ onSelect }: PayScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen w-full bg-cream relative overflow-hidden flex items-center"
    >
      <div
        className="glow-orb"
        style={{
          background: '#7C3AED',
          width: '280px',
          height: '280px',
          top: '40%',
          right: '-100px',
          opacity: 0.35,
        }}
      />

      <div className="max-w-2xl mx-auto w-full p-12 md:p-16">
        <div className="relative z-10">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">
            One last question
          </p>

          <h1
            className="text-3xl md:text-4xl font-semibold text-ink mb-3 leading-[1.15]"
            style={{ letterSpacing: '-0.8px' }}
          >
            If Come Back actually helped you quit — would{' '}
            <em className="not-italic" style={{
              background: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontStyle: 'italic',
            }}>
              ₹99/month
            </em>{' '}
            be worth it?
          </h1>

          <p className="text-base text-neutral-600 mb-9 leading-relaxed">
            Less than two cups of chai a week.
            <br />
            For your focus. Your confidence. Your time back.
          </p>

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
