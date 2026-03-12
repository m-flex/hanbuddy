import { Outlet } from 'react-router-dom';
import BottomTabBar from './BottomTabBar';

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
