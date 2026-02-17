import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

function RevenueChart() {
  const data = [
    { name: "January", revenue: 2400, expense: 2400 },
    { name: "February", revenue: 1398, expense: 2210 },
    { name: "March", revenue: 9800, expense: 2290 },
    { name: "April", revenue: 3908, expense: 2000 },
    { name: "May", revenue: 5800, expense: 2181 },
    { name: "June", revenue: 3800, expense: 2500 },
    { name: "July", revenue: 4300, expense: 2100 },
    { name: "Avg", revenue: 4300, expense: 2100 },
    { name: "Sep", revenue: 4300, expense: 2100 },
    { name: "Oct", revenue: 4300, expense: 2100 },
    { name: "Nov", revenue: 4300, expense: 2100 },
    { name: "Dec", revenue: 4300, expense: 2100 },
  ];

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-bl-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm text-slate-800 font-semibold dark:text-white">
            Revenue Chart
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly Revenue and Expenses
          </p>
        </div>
        <div className="flex items-center space-x-6">
          {/* Revenue Legend */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Revenue</span>
          </div>
          {/* Expenses Legend */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Expenses</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
            <Bar dataKey="expense" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;
