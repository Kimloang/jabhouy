
import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="px-4 py-4">
      <div className="flex w-full items-stretch rounded-2xl h-14 shadow-sm overflow-hidden border border-[#e7dbcf] dark:border-[#4d3a2a] bg-[#f3ede7] dark:bg-[#3d2f21] focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        <div className="w-12 flex items-center justify-center text-[#9a734c] dark:text-[#c4a68a]">
          <span className="material-symbols-outlined text-2xl">search</span>
        </div>
        <input 
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-[#1b140d] dark:text-white placeholder:text-[#9a734c] dark:placeholder:text-[#c4a68a] text-base font-bold px-2" 
          placeholder="Search for snacks..."
        />
        {value && (
          <button 
            onClick={() => onChange('')}
            className="w-10 flex items-center justify-center text-[#9a734c] hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">cancel</span>
          </button>
        )}
        <div className="w-12 flex items-center justify-center border-l border-[#e7dbcf]/50 dark:border-[#4d3a2a]/50">
          <button className="flex items-center justify-center p-2 rounded-xl hover:bg-primary/10 text-[#9a734c] dark:text-[#c4a68a] hover:text-primary transition-all">
            <span className="material-symbols-outlined text-2xl">tune</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
