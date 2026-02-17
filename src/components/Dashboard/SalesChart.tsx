import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const data = [
  { name: "Electronics", value: 45, color: "#3b82f6" },
  { name: "Clothing", value: 30, color: "#8b5cf6" },
  { name: "Books", value: 15, color: "#10b981" },
  { name: "Other", value: 10, color: "#f59e0b" },
];

function SalesChart() {
  return (
    <div className='bg-white dark:bg-slate-900 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 p-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-bold text-slate-800 dark:text-white'>
          Sales by Category
        </h3>
        <p className='text-sm text-slate-500 dark:text-slate-400'>
          Production Distribution
        </p>
      </div>
      <div className='h-48'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={5}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className='space-y-3'>
        {data.map((item, index) => (
          <div className='flex items-center justify-between' key={index}>
            <div className='flex items-center space-x-3'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: item.color }}
              ></div>
              <span className='text-sm text-slate-700 dark:text-slate-300'>{item.name}</span>
            </div>
            <span className='text-sm font-semibold text-slate-800 dark:text-white'>{item.value}%</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default SalesChart;
