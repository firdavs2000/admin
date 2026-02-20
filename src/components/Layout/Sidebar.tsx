import React, { useEffect, useState } from "react";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingBag,
  User,
  Zap,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import userImg from "../../assets/img/bg.jpg";

type SubMenuItem = {
  id: string;
  label: string;
  link: string;
};

type MenuItem = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  link?: string;
  submenu?: SubMenuItem[];
  badge?: string;
  count?: string;
};

type SidebarProps = {
  collapsed: boolean;
};

const menuItems: MenuItem[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", link: "/" },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    submenu: [
      { id: "overview", label: "Overview", link: "/overview" },
      { id: "reports", label: "Reports", link: "/reports" },
      { id: "insights", label: "Insights", link: "/insights" },
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    label: "Ecommerce",
    submenu: [
      { id: "products", label: "Products", link: "/products" },
      { id: "orders", label: "Orders", link: "/orders" },
      { id: "customers", label: "Customers", link: "/customers" },
    ],
  },
  { id: "users", icon: User, label: "Users", link: "/users" },
  { id: "inventory", icon: Package, label: "Inventory", link: "/inventory" },
  { id: "transactions", icon: CreditCard, label: "Transactions", link: "/transactions" },
  { id: "messages", icon: MessageSquare, label: "Messages", link: "/messages" },
  { id: "calendar", icon: Calendar, label: "Calendar", link: "/calendar" },
  { id: "reports-main", icon: FileText, label: "Reports", link: "/reports-main" },
  { id: "settings", icon: Settings, label: "Settings", link: "/settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();

  const getDefaultExpanded = () => {
    const active = menuItems.find((item) =>
      item.submenu?.some((sub) => sub.link === location.pathname)
    );
    return active ? new Set([active.id]) : new Set<string>();
  };

  const [expandedItems, setExpandedItems] = useState<Set<string>>(getDefaultExpanded);

  useEffect(() => {
    setExpandedItems(getDefaultExpanded());
  }, [location.pathname]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <div
      className={`${collapsed ? "w-20" : "w-72"} h-screen sticky top-0 transition-all duration-300
      bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
      border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">Nexus</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            item.link === location.pathname ||
            item.submenu?.some((sub) => sub.link === location.pathname);

          return (
            <div key={item.id}>
              {item.link ? (
                <NavLink
                  to={item.link}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all
                  ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                      : "text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                </NavLink>
              ) : (
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all
                  ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                      : "text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    {!collapsed && <span>{item.label}</span>}
                  </div>

                  {!collapsed && item.submenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedItems.has(item.id) ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
              )}

              {/* Submenu */}
              {!collapsed && item.submenu && expandedItems.has(item.id) && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((sub) => (
                    <NavLink
                      key={sub.id}
                      to={sub.link}
                      className={({ isActive }) =>
                        `block p-2 text-sm rounded-lg ${
                          isActive
                            ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50"
                        }`
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img
              src={userImg}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
            />
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-white">
                Firdavs
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
