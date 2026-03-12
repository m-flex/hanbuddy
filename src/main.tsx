import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import RootLayout from './components/layout/RootLayout';
import LessonListPage from './pages/LessonListPage';
import TopicListPage from './pages/TopicListPage';
import SettingsPage from './pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LessonListPage /> },
      { path: 'lessons/:lessonId', element: <div className="px-4 py-4 text-gray-500">Lesson detail coming soon…</div> },
      { path: 'topics', element: <TopicListPage /> },
      { path: 'topics/:topicId', element: <div className="px-4 py-4 text-gray-500">Topic detail coming soon…</div> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
