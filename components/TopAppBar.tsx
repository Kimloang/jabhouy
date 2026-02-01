import React from 'react';

const TopAppBar: React.FC = () => {
  return (
    <div className="flex items-center bg-background-light dark:bg-background-dark px-4 py-3 justify-between sticky top-0 z-50 border-b border-[#e7dbcf]/30 dark:border-[#4d3a2a]/30">
      <div className="w-12 flex items-center">
        <div className="p-0.5 rounded-full border-2 border-primary/20 hover:border-primary/50 transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-3xl block text-primary">account_circle</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center">
        <span className="text-[9px] font-extrabold text-primary uppercase tracking-[0.25em] mb-0.5">Jab Houy By Y.Kloang</span>
        <h2 className="text-[#1b140d] dark:text-white text-xl font-black leading-none tracking-tight">Bong Panha  MART</h2>
      </div>
      
      <div className="w-12 flex items-center justify-end">
        <button className="relative flex items-center justify-center rounded-xl h-10 w-10 bg-[#f3ede7] dark:bg-[#3d2f21] text-[#1b140d] dark:text-white shadow-sm hover:bg-[#ebe2d8] dark:hover:bg-[#4d3a2a] active:scale-90 transition-all">
          <span className="material-symbols-outlined text-2xl">notifications</span>
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-primary ring-2 ring-background-light dark:ring-background-dark"></span>
        </button>
      </div>
    </div>
  );
};

export default TopAppBar;