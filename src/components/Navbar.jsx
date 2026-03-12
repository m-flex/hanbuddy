import { Link, useLocation } from 'react-router-dom'
import { Home, BookOpen, BarChart3, Settings, Star } from 'lucide-react'
import { getLevel } from '../store/progress'

export default function Navbar({ progress }) {
  const location = useLocation()
  const level = getLevel(progress.xp)
  const isLesson = location.pathname.startsWith('/lesson/')

  if (isLesson) return null // Hide navbar during lessons

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/course', icon: BookOpen, label: 'Course' },
    { to: '/stats', icon: BarChart3, label: 'Stats' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="hangul text-lg font-bold" style={{ color: level.color }}>한</span>
          <span className="text-white font-semibold text-sm hidden sm:inline">Hanbuddy</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to || (to === '/course' && location.pathname.startsWith('/unit'))
            return (
              <Link key={to} to={to} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg no-underline text-xs font-medium transition-colors
                ${active ? 'bg-primary-500/20 text-primary-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-1.5 text-sm">
          <Star size={14} className="text-amber-400" />
          <span className="text-amber-400 font-medium">{progress.xp}</span>
        </div>
      </div>
    </nav>
  )
}
