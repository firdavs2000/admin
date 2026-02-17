import { 
  Bell, 
  ChevronDown, 
  Filter, 
  Menu, 
  Plus, 
  Search, 
  Settings, 
  Sun, 
  Moon, 
  LogOut, 
  User 
} from "lucide-react";
import { useState } from "react";
import avatar from "../../assets/img/bg.jpg";

function Header({ sidebarCollapsed, onToggleSidebar }) {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div className="min-h-[4rem] md:h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
      border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-3
      flex flex-col md:flex-row items-center md:justify-between gap-3">

      {/* Left */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300
          hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:block">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Welcome back, Firdavs 👋
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md w-full">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl
            bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
            text-slate-800 dark:text-white placeholder-slate-500
            focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5">
            <Filter className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 relative">
        {/* New */}
        <button className="hidden lg:flex items-center space-x-2 px-4 py-2
        bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl
        hover:shadow-lg transition">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New</span>
        </button>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300
          hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300
            hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500
            text-white text-xs rounded-full flex items-center justify-center">
              1
            </span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800
            rounded-xl shadow-lg border dark:border-slate-700 p-3 z-50">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Notifications
              </p>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                🔔 New order received  
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="relative">
          <button
            onClick={() => setUserOpen(!userOpen)}
            className="flex items-center space-x-2 pl-3 border-l border-slate-200
            dark:border-slate-700"
          >
            <img src={avatar} className="w-8 h-8 rounded-full ring-2 ring-blue-500" />
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {userOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800
            rounded-xl shadow-lg border dark:border-slate-700 p-2 z-50">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm
              hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                <User className="w-4 h-4" /> Profile
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm
              hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500
              hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
