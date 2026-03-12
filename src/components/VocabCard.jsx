import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function VocabCard({ item, mastery, onClick, size = 'md' }) {
  const stars = mastery?.stars || 0
  const sizes = {
    sm: 'w-20 h-16 text-sm',
    md: 'w-28 h-24 text-lg',
    lg: 'w-36 h-32 text-2xl',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick?.(item)}
      className={`${sizes[size]} relative flex flex-col items-center justify-center rounded-2xl
        bg-slate-800/80 border border-slate-600/50 hover:border-primary-400/50
        transition-colors cursor-pointer group`}
    >
      <span className="hangul font-bold">{item.word}</span>
      <span className="text-xs text-slate-400 mt-1 font-medium truncate max-w-full px-1">
        {item.meaning}
      </span>
      {stars > 0 && (
        <div className="absolute -top-1 -right-1 flex">
          {[...Array(stars)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className="text-accent-400 fill-accent-400 -ml-0.5"
            />
          ))}
        </div>
      )}
    </motion.button>
  )
}
