import { Outlet } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import { useState } from "react";

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={false}
        onToggle={() => setCollapsed(!collapsed)}
      />


      <div className="flex-1 flex flex-col">


        <Header
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />


        {/* 👇 shu joyga Dashboard / Products keladi */}
        <main className="flex-1 p-6 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
