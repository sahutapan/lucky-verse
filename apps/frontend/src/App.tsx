import { Outlet, useLocation } from 'react-router-dom';
import { TopNav } from './components/layout/TopNav';
import { Sidebar } from './components/layout/Sidebar';

import { RightSidebar } from './components/layout/RightSidebar';

function App() {
  const location = useLocation();

  // Don't show layout on login/register pages
  const showLayout = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div className="min-h-screen bg-navy-void">
      {showLayout ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
              <Outlet />
            </main>
          </div>
          <RightSidebar />
        </div>
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </div>
  );
}

export default App;
