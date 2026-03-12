import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Volume2, Moon, Sun, RotateCcw } from 'lucide-react'
import { updateSetting, resetProgress } from '../store/progress'

export default function Settings({ progress, updateProgress }) {
  const toggleTheme = () => {
    const next = progress.settings?.theme === 'dark' ? 'light' : 'dark'
    updateProgress(prev => updateSetting({ ...prev }, 'theme', next))
  }
  const toggleAudio = () => {
    updateProgress(prev => updateSetting({ ...prev }, 'audioEnabled', !prev.settings?.audioEnabled))
  }
  const handleReset = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      updateProgress(() => resetProgress())
    }
  }
  const handleExport = () => {
    const data = JSON.stringify(progress, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'hanbuddy-progress.json'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center gap-1 text-slate-400 hover:text-white no-underline text-sm"><ArrowLeft size={16} /> Back</Link>
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <div />
      </div>
      <div className="space-y-4">
        <SettingRow icon={progress.settings?.theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          label="Theme" desc={progress.settings?.theme === 'dark' ? 'Dark' : 'Light'} onClick={toggleTheme} />
        <SettingRow icon={<Volume2 size={18} />}
          label="Audio" desc={progress.settings?.audioEnabled ? 'On' : 'Off'} onClick={toggleAudio} />
        <SettingRow icon={<span>📤</span>} label="Export Progress" desc="Download as JSON" onClick={handleExport} />
        <SettingRow icon={<RotateCcw size={18} className="text-red-400" />}
          label="Reset Progress" desc="Start over from scratch" onClick={handleReset} danger />
      </div>
    </motion.div>
  )
}

function SettingRow({ icon, label, desc, onClick, danger }) {
  return (
    <motion.button whileTap={{ scale: 0.98 }} onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border cursor-pointer transition-colors text-left
        ${danger ? 'border-red-500/20 hover:bg-red-500/5' : 'border-slate-700/50 hover:bg-slate-700/30'}`}>
      <div className="text-slate-400">{icon}</div>
      <div className="flex-1">
        <div className={`font-medium ${danger ? 'text-red-400' : 'text-white'}`}>{label}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
    </motion.button>
  )
}
