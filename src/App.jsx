import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { loadProgress, saveProgress, checkAchievements } from './store/progress'
import Navbar from './components/Navbar'
import AchievementToast from './components/AchievementToast'
import Dashboard from './pages/Dashboard'
import CourseMap from './pages/CourseMap'
import UnitDetail from './pages/UnitDetail'
import Lesson from './pages/Lesson'
import Review from './pages/Review'
import Stats from './pages/Stats'
import Settings from './pages/Settings'

export default function App() {
  const [progress, setProgress] = useState(() => loadProgress())
  const [toast, setToast] = useState(null)
  const location = useLocation()

  const theme = progress.settings?.theme || 'dark'
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const updateProgress = useCallback((updater) => {
    setProgress(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      const newAchievements = checkAchievements(next)
      if (newAchievements.length > 0) {
        setToast(newAchievements[0])
        setTimeout(() => setToast(null), 3000)
      }
      saveProgress(next)
      return next
    })
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar progress={progress} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard progress={progress} />} />
            <Route path="/course" element={<CourseMap progress={progress} />} />
            <Route path="/unit/:unitId" element={<UnitDetail progress={progress} />} />
            <Route path="/lesson/:unitId/:lessonIdx" element={<Lesson progress={progress} updateProgress={updateProgress} />} />
            <Route path="/review" element={<Review progress={progress} updateProgress={updateProgress} />} />
            <Route path="/stats" element={<Stats progress={progress} />} />
            <Route path="/settings" element={<Settings progress={progress} updateProgress={updateProgress} />} />
          </Routes>
        </AnimatePresence>
      </main>
      <AchievementToast achievement={toast} />
    </div>
  )
}
