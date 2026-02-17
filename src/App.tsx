import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [sideBarCollapse, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className="h-screen w-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">

      {/* Sidebar */}
      <Sidebar
        collapsed={sideBarCollapse}
        onToggle={() => setSideBarCollapsed(!sideBarCollapse)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col h-full">
        <Header
          sidebarCollapsed={sideBarCollapse}
          onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapse)}
        />

        <main className="flex-1 overflow-y-auto bg-transparent">
         <div className='p-6 space-y-6'>
          {currentPage === "dashboard" && <Dashboard />}
         </div>
        </main>
      </div>
    </div>
  );
}

export default App;
