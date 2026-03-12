import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../../store/progress';

export function WelcomeCard() {
  const completedLessons = useProgressStore((s) => s.completedLessons);
  const navigate = useNavigate();

  if (completedLessons.length > 0) {
    return null;
  }

  return (
    <div className="mx-4 mt-4 p-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg">
      <h2 className="text-lg font-bold mb-1">Welcome to Hanbuddy!</h2>
      <p className="text-blue-100 text-sm mb-4">
        Start your Korean journey with Lesson 1
      </p>
      <button
        onClick={() => navigate('/lessons/les-001')}
        className="bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
      >
        Start Learning
      </button>
    </div>
  );
}
