import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Volume2, Download, Upload, Trash2, Flame, Calendar, Sun, Moon } from 'lucide-react'
import { getDailyStreak, getSessionHeatmap, resetProgress } from '../store/progress'

export default function Settings({ progress, updateProgress }) {
  const [resetConfirm, setResetConfirm] = useState('')
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [importData, setImportData] = useState(null)
  const fileInputRef = useRef(null)

  const audioEnabled = progress.settings?.audioEnabled ?? true
  const theme = progress.settings?.theme || 'dark'
  const streak = getDailyStreak(progress.sessionDates)
  const heatmap = getSessionHeatmap(progress.sessionDates, 90)

  function toggleAudio() {
    updateProgress(prev => ({ ...prev, settings: { ...prev.settings, audioEnabled: !(prev.settings?.audioEnabled ?? true) } }))
  }
  function toggleTheme() {
    updateProgress(prev => ({ ...prev, settings: { ...prev.settings, theme: (prev.settings?.theme || 'dark') === 'dark' ? 'light' : 'dark' } }))
  }
  function handleExport() {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `hanbuddy-progress-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url)
  }
  function handleFileChange(e) {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => { try { setImportData(JSON.parse(evt.target.result)); setShowImportDialog(true) } catch { alert('Invalid JSON file.') } }
    reader.readAsText(file); e.target.value = ''
  }
  function handleReset() { if (resetConfirm === 'RESET') { updateProgress(() => resetProgress()); setShowResetDialog(false); setResetConfirm('') } }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/stages" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
        <ArrowLeft size={18} /><span className="text-sm">Back to Stages</span>
      </Link>
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      {/* Streak */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
        <div className="flex items-center gap-3 mb-4"><Flame size={22} className="text-danger-400" /><h2 className="text-lg font-semibold text-white">Daily Streak</h2></div>
        <div className="flex items-baseline gap-2"><span className="text-5xl font-black text-danger-400">{streak}</span><span className="text-slate-400 text-sm">{streak === 1 ? 'day' : 'days'} in a row</span></div>
      </motion.div>

      {/* Heatmap */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
        <div className="flex items-center gap-3 mb-4"><Calendar size={22} className="text-primary-400" /><h2 className="text-lg font-semibold text-white">Activity (Last 90 Days)</h2></div>
        <div className="flex flex-wrap gap-1">{heatmap.map((day, i) => (<div key={i} title={`${day.date}${day.active ? ' — active' : ''}`} className={`w-3 h-3 rounded-sm ${day.active ? 'bg-primary-500' : 'bg-slate-700/50'}`} />))}</div>
      </motion.div>

      {/* Audio */}
      <ToggleCard icon={<Volume2 size={22} className="text-accent-400" />} title="Audio Pronunciation" desc="Play audio when learning new words" value={audioEnabled} onToggle={toggleAudio} color="primary" />

      {/* Theme */}
      <ToggleCard icon={theme === 'dark' ? <Moon size={22} className="text-primary-400" /> : <Sun size={22} className="text-amber-400" />}
        title="Theme" desc={theme === 'dark' ? 'Dark mode' : 'Light mode'} value={theme === 'light'} onToggle={toggleTheme} color={theme === 'light' ? 'amber' : 'slate'} />

      {/* Data */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Data Management</h2>
        <div className="space-y-3">
          <DataButton icon={<Download size={20} className="text-primary-400" />} title="Export Progress" desc="Download as JSON" onClick={handleExport} />
          <DataButton icon={<Upload size={20} className="text-accent-400" />} title="Import Progress" desc="Restore from backup" onClick={() => fileInputRef.current?.click()} />
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setShowResetDialog(true)}
            className="w-full flex items-center gap-3 bg-red-950/30 hover:bg-red-950/50 text-white px-4 py-3 rounded-xl cursor-pointer border border-red-900/30 transition-colors text-left">
            <Trash2 size={20} className="text-danger-400" /><div><div className="font-medium text-danger-400">Reset All Progress</div><div className="text-xs text-slate-400">Permanently erase all data</div></div>
          </motion.button>
        </div>
      </motion.div>

      {/* Import Dialog */}
      {showImportDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 max-w-sm w-full">
            <h3 className="text-lg font-bold text-white mb-2">Import Progress</h3>
            <p className="text-sm text-slate-400 mb-6">This will replace all current progress. Cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowImportDialog(false); setImportData(null) }} className="flex-1 py-2 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium cursor-pointer border-0">Cancel</button>
              <button onClick={() => { if (importData) updateProgress(() => importData); setShowImportDialog(false); setImportData(null) }}
                className="flex-1 py-2 px-4 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium cursor-pointer border-0">Import</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reset Dialog */}
      {showResetDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-800 rounded-2xl p-6 border border-red-900/50 max-w-sm w-full">
            <h3 className="text-lg font-bold text-danger-400 mb-2">Reset All Progress</h3>
            <p className="text-sm text-slate-400 mb-4">Type <span className="font-mono font-bold text-danger-400">RESET</span> to confirm:</p>
            <input type="text" value={resetConfirm} onChange={e => setResetConfirm(e.target.value)} placeholder="Type RESET"
              className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-danger-400 mb-4 font-mono" />
            <div className="flex gap-3">
              <button onClick={() => { setShowResetDialog(false); setResetConfirm('') }} className="flex-1 py-2 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium cursor-pointer border-0">Cancel</button>
              <button onClick={handleReset} disabled={resetConfirm !== 'RESET'}
                className={`flex-1 py-2 px-4 rounded-xl font-medium border-0 ${resetConfirm === 'RESET' ? 'bg-red-600 hover:bg-red-500 text-white cursor-pointer' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}>Reset</button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

function ToggleCard({ icon, title, desc, value, onToggle, color }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">{icon}<div><h2 className="text-white font-semibold">{title}</h2><p className="text-sm text-slate-400">{desc}</p></div></div>
        <button onClick={onToggle} className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer border-0 ${value ? `bg-${color}-500` : 'bg-slate-600'}`}>
          <motion.div layout className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md" style={{ left: value ? '1.75rem' : '0.125rem' }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
        </button>
      </div>
    </motion.div>
  )
}

function DataButton({ icon, title, desc, onClick }) {
  return (
    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={onClick}
      className="w-full flex items-center gap-3 bg-slate-700/50 hover:bg-slate-700 text-white px-4 py-3 rounded-xl cursor-pointer border border-slate-600/50 transition-colors text-left">
      {icon}<div><div className="font-medium">{title}</div><div className="text-xs text-slate-400">{desc}</div></div>
    </motion.button>
  )
}
