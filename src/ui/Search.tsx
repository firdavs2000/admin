"use client";

import { Search } from "lucide-react";
import React from "react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const Qidiruv: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <div className="relative">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        placeholder="Search anything..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl
        bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
        text-slate-800 dark:text-white placeholder-slate-500
        focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
      />

    
    </div>
  );
};

export default Qidiruv;
