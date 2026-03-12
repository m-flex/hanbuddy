import { motion } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import { speak } from '../utils/audio'

export default function TeachSlide({ slide, index, direction }) {
  return (
    <motion.div
      key={index}
      initial={{ x: direction * 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -direction * 300, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-full"
    >
      {slide.type === 'explanation' && <ExplanationSlide slide={slide} />}
      {slide.type === 'breakdown' && <BreakdownSlide slide={slide} />}
      {slide.type === 'example' && <ExampleSlide slide={slide} />}
      {slide.type === 'cultural-note' && <CulturalNoteSlide slide={slide} />}
      {slide.type === 'pattern' && <PatternSlide slide={slide} />}
      {slide.type === 'comparison' && <ComparisonSlide slide={slide} />}
    </motion.div>
  )
}

function ExplanationSlide({ slide }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{slide.title}</h2>
      <p className="text-slate-300 leading-relaxed whitespace-pre-line">{slide.content}</p>
      {slide.korean && (
        <div className="mt-4 text-center">
          <button onClick={() => speak(slide.korean)} className="hangul text-4xl font-bold text-primary-400 cursor-pointer bg-transparent border-0 p-0 hover:text-primary-300 transition-colors">
            {slide.korean} <Volume2 className="inline w-5 h-5 ml-1 opacity-50" />
          </button>
        </div>
      )}
    </div>
  )
}

function BreakdownSlide({ slide }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">{slide.title}</h2>
      <div className="space-y-3">
        {slide.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-4 bg-slate-700/30 rounded-xl p-4 border border-slate-600/30"
          >
            <button
              onClick={() => speak(item.char)}
              className="flex-shrink-0 hangul text-3xl font-black text-white bg-slate-600/50
                w-14 h-14 rounded-xl flex items-center justify-center cursor-pointer
                border border-slate-500/30 hover:bg-primary-600/30 hover:border-primary-500/30 transition-colors"
            >
              {item.char}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary-400 font-semibold">{item.roman}</span>
                <span className="text-slate-400 text-sm">— {item.sound}</span>
              </div>
              <p className="text-sm text-slate-400">{item.mnemonic}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ExampleSlide({ slide }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{slide.title}</h2>
      <p className="text-slate-300 mb-5">{slide.content}</p>
      {slide.korean && (
        <div className="text-center mb-5">
          <button onClick={() => speak(slide.korean)} className="cursor-pointer bg-transparent border-0 p-0">
            <span className="hangul text-3xl sm:text-4xl font-bold text-primary-400">{slide.korean}</span>
          </button>
        </div>
      )}
      {slide.breakdown && (
        <div className="space-y-2">
          {slide.breakdown.map((b, i) => (
            <div key={i} className="flex items-center gap-3 bg-slate-700/30 rounded-lg px-4 py-2">
              <button onClick={() => speak(b.part)} className="hangul text-xl font-bold text-white cursor-pointer bg-transparent border-0 p-0 hover:text-primary-400 transition-colors">
                {b.part}
              </button>
              <span className="text-slate-400 text-sm">{b.role}</span>
            </div>
          ))}
        </div>
      )}
      {slide.examples && (
        <div className="space-y-2">
          {slide.examples.map((ex, i) => (
            <div key={i} className="bg-slate-700/30 rounded-lg px-4 py-3">
              <button onClick={() => speak(ex.kr)} className="hangul text-lg text-white cursor-pointer bg-transparent border-0 p-0 text-left hover:text-primary-400 transition-colors">
                {ex.kr}
              </button>
              <div className="text-sm text-slate-400 mt-1">{ex.en}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CulturalNoteSlide({ slide }) {
  return (
    <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🇰🇷</span>
        <h2 className="text-xl font-bold text-amber-300">{slide.title}</h2>
      </div>
      <p className="text-amber-100/80 leading-relaxed">{slide.content}</p>
    </div>
  )
}

function PatternSlide({ slide }) {
  return (
    <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-purple-300 mb-3">{slide.title}</h2>
      {slide.content && <p className="text-slate-300 mb-4">{slide.content}</p>}
      {slide.examples && (
        <div className="space-y-2">
          {slide.examples.map((ex, i) => (
            <div key={i} className="bg-slate-700/30 rounded-lg px-4 py-3">
              <button onClick={() => speak(ex.kr)} className="hangul text-lg text-white cursor-pointer bg-transparent border-0 p-0 text-left hover:text-purple-400 transition-colors">
                {ex.kr}
              </button>
              <div className="text-sm text-slate-400 mt-1">{ex.en}</div>
            </div>
          ))}
        </div>
      )}
      {slide.pairs && (
        <div className="space-y-2">
          {slide.pairs.map((p, i) => (
            <div key={i} className="flex items-center gap-3 bg-slate-700/30 rounded-lg px-4 py-2">
              <button onClick={() => speak(p.basic)} className="text-slate-300 font-medium cursor-pointer bg-transparent border-0 p-0 hover:text-white transition-colors">{p.basic}</button>
              <span className="text-slate-500">→</span>
              <button onClick={() => speak(p.aspirated)} className="text-purple-300 font-medium cursor-pointer bg-transparent border-0 p-0 hover:text-purple-200 transition-colors">{p.aspirated}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ComparisonSlide({ slide }) {
  return (
    <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3">{slide.title}</h2>
      <p className="text-slate-300 mb-4">{slide.content}</p>
      {slide.pairs && (
        <div className="space-y-2">
          {slide.pairs.map((p, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2 bg-slate-700/30 rounded-lg px-4 py-3">
              {p.basic && <button onClick={() => speak(p.basic)} className="text-slate-300 text-sm cursor-pointer bg-transparent border-0 p-0 hover:text-white transition-colors">{p.basic}</button>}
              {p.y && (
                <>
                  <span className="text-slate-500">→</span>
                  <button onClick={() => speak(p.y)} className="text-cyan-300 text-sm font-medium cursor-pointer bg-transparent border-0 p-0 hover:text-cyan-200 transition-colors">{p.y}</button>
                </>
              )}
              {p.aspirated && <button onClick={() => speak(p.aspirated)} className="text-cyan-300 text-sm cursor-pointer bg-transparent border-0 p-0 hover:text-cyan-200 transition-colors">{p.aspirated}</button>}
              {p.tensed && (
                <>
                  <span className="text-slate-500">|</span>
                  <button onClick={() => speak(p.tensed)} className="text-amber-300 text-sm cursor-pointer bg-transparent border-0 p-0 hover:text-amber-200 transition-colors">{p.tensed}</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
