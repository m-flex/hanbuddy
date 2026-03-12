import { NavLink } from 'react-router-dom';
import { BookOpen, Dumbbell, LayoutGrid, Settings } from 'lucide-react';

export default function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex z-50">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium ${
            isActive ? 'text-blue-600' : 'text-gray-500'
          }`
        }
      >
        <BookOpen size={20} />
        <span>Lessons</span>
      </NavLink>

      <NavLink
        to="/practice"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium ${
            isActive ? 'text-blue-600' : 'text-gray-500'
          }`
        }
      >
        <Dumbbell size={20} />
        <span>Practice</span>
      </NavLink>

      <NavLink
        to="/topics"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium ${
            isActive ? 'text-blue-600' : 'text-gray-500'
          }`
        }
      >
        <LayoutGrid size={20} />
        <span>Topics</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium ${
            isActive ? 'text-blue-600' : 'text-gray-500'
          }`
        }
      >
        <Settings size={20} />
        <span>Settings</span>
      </NavLink>
    </nav>
  );
}
