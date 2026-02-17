import React from "react";
import { MoreHorizontal, TrendingUp } from "lucide-react";

/* ---------------- TYPES ---------------- */
type OrderStatus = "completed" | "pending" | "cancelled";

type Order = {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: OrderStatus;
  date: string;
};

type Product = {
  name: string;
  sales: number;
  revenue: string;
  trend: "up" | "down";
  change: string;
};

/* ---------------- DATA ---------------- */
const recentOrders: Order[] = [
  {
    id: "#3849",
    customer: "Mike Wilson",
    product: "Airpods Pro",
    amount: "$249",
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "#3850",
    customer: "Sarah Johnson",
    product: "iPhone 15 Case",
    amount: "$39",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "#3851",
    customer: "David Lee",
    product: "Gaming Mouse",
    amount: "$79",
    status: "cancelled",
    date: "2024-01-16",
  },
  {
    id: "#3852",
    customer: "Emma Brown",
    product: "Bluetooth Speaker",
    amount: "$129",
    status: "completed",
    date: "2024-01-17",
  },
];

const topProducts: Product[] = [
  {
    name: "MacBook Pro",
    sales: 1247,
    revenue: "$2,987,530",
    trend: "up",
    change: "+8%",
  },
  {
    name: "iPhone 15 Pro",
    sales: 1985,
    revenue: "$1,654,200",
    trend: "up",
    change: "+12%",
  },
  {
    name: "AirPods Pro",
    sales: 1643,
    revenue: "$739,350",
    trend: "down",
    change: "-3%",
  },
  {
    name: "Apple Watch Ultra",
    sales: 932,
    revenue: "$821,400",
    trend: "up",
    change: "+6%",
  },
  {
    name: "iPad Pro",
    sales: 1108,
    revenue: "$1,203,760",
    trend: "down",
    change: "-5%",
  },
];

/* ---------------- HELPERS ---------------- */
const getStatusStyle = (status: OrderStatus): string => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-600";
    case "pending":
      return "bg-yellow-100 text-yellow-600";
    case "cancelled":
      return "bg-red-100 text-red-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const getTrendStyle = (trend: "up" | "down") => {
  return trend === "up" ? "text-emerald-500" : "text-red-500";
};

/* ---------------- COMPONENT ---------------- */
const TableSection: React.FC = () => {
  return (
    <div className="space-y-6">

      {/* -------- RECENT ORDERS -------- */}
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-b-xl
        border border-slate-200/50 dark:hover:border-slate-700/50 overflow-hidden">
        
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Recent Orders
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Latest customer orders
              </p>
            </div>
            <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {["Order ID","Customer","Product","Amount","Status","Action"].map(h => (
                    <th key={h} className="text-left p-4 text-sm font-semibold text-slate-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}
                    className="border-b border-slate-200/50 dark:border-slate-700/50 
                    hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    
                    <td className="p-4 text-sm font-medium text-blue-500">{order.id}</td>
                    <td className="p-4 text-sm text-slate-800 dark:text-white">{order.customer}</td>
                    <td className="p-4 text-sm text-slate-800 dark:text-white">{order.product}</td>
                    <td className="p-4 text-sm text-slate-800 dark:text-white">{order.amount}</td>

                    <td className="p-4">
                      <span className={`font-medium text-xs px-3 py-1 rounded-full ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <MoreHorizontal className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-700" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* -------- TOP PRODUCTS -------- */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border
        border-slate-200/50 dark:border-slate-700/50 overflow-hidden">

        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Top Products</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              best performing products
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="p-6 space-y-4">
          {topProducts.map((item, index) => (
            <div key={index}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 
              dark:hover:bg-slate-800/50 transition-colors">

              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.sales.toLocaleString()} sales
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">
                  {item.revenue}
                </p>

                <div className="flex items-center justify-end space-x-1 text-xs">
                  <TrendingUp
                    className={`w-3 h-3 ${
                      item.trend === "up"
                        ? "text-emerald-500"
                        : "text-red-500 rotate-180"
                    }`}
                  />
                  <span className={getTrendStyle(item.trend)}>
                    {item.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableSection;
