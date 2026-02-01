
import React from 'react';
import { Category } from '../types.ts';

interface Props {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}

const CategoryCard: React.FC<Props> = ({ category, isActive, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        flex flex-1 gap-3 rounded-2xl border p-3 items-center shadow-sm cursor-pointer transition-all active:scale-[0.97]
        ${isActive 
          ? 'bg-primary border-primary text-white shadow-lg shadow-orange-500/20' 
          : 'bg-white dark:bg-[#2d2218] border-[#e7dbcf] dark:border-[#4d3a2a] hover:border-primary/50'
        }
      `}
    >
      <div className={`
        flex items-center justify-center rounded-2xl w-11 h-11 shrink-0 
        ${isActive ? 'bg-white/20 text-white' : category.color}
      `}>
        <span className="material-symbols-outlined text-2xl">{category.icon}</span>
      </div>
      <h2 className={`text-sm font-extrabold leading-tight ${isActive ? 'text-white' : 'text-[#1b140d] dark:text-white'}`}>
        {category.name}
      </h2>
    </div>
  );
};

export default CategoryCard;
