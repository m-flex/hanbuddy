import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import RootLayout from './components/layout/RootLayout';
import LessonListPage from './pages/LessonListPage';
import LessonDetailPage from './pages/LessonDetailPage';
import TopicListPage from './pages/TopicListPage';
import TopicDetailPage from './pages/TopicDetailPage';
import SettingsPage from './pages/SettingsPage';
import PracticeDashboardPage from './pages/PracticeDashboardPage';
import FlashcardReviewPage from './pages/FlashcardReviewPage';
import ClozeExercisePage from './pages/ClozeExercisePage';
import ListeningExercisePage from './pages/ListeningExercisePage';
import SentenceBuildPage from './pages/SentenceBuildPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LessonListPage /> },
      { path: 'lessons/:lessonId', element: <LessonDetailPage /> },
      { path: 'topics', element: <TopicListPage /> },
      { path: 'topics/:topicId', element: <TopicDetailPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'practice', element: <PracticeDashboardPage /> },
      { path: 'practice/review', element: <FlashcardReviewPage /> },
      { path: 'practice/cloze', element: <ClozeExercisePage /> },
      { path: 'practice/listening', element: <ListeningExercisePage /> },
      { path: 'practice/build', element: <SentenceBuildPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
