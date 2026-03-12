import { NavLink } from 'react-router-dom';
import { GraduationCap, Dumbbell, BookText, LayoutGrid, Settings } from 'lucide-react';

export default function BottomTabBar() {
  const tabClass = ({ isActive }: { isActive: boolean }) =>
    `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium ${
      isActive ? 'text-blue-600' : 'text-gray-500'
    }`;

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex z-50">
      <NavLink to="/" end className={tabClass}>
        <GraduationCap size={18} />
        <span>Learn</span>
      </NavLink>

      <NavLink to="/practice" className={tabClass}>
        <Dumbbell size={18} />
        <span>Practice</span>
      </NavLink>

      <NavLink to="/read" className={tabClass}>
        <BookText size={18} />
        <span>Read</span>
      </NavLink>

      <NavLink to="/topics" className={tabClass}>
        <LayoutGrid size={18} />
        <span>Topics</span>
      </NavLink>

      <NavLink to="/settings" className={tabClass}>
        <Settings size={18} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}
