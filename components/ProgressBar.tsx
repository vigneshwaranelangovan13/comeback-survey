interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex gap-1.5 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-[3px] rounded-full transition-all duration-300"
          style={{
            background: i < current
              ? 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)'
              : 'rgba(0,0,0,0.08)'
          }}
        />
      ))}
    </div>
  )
}
