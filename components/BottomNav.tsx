import React from 'react';
import { View } from '../types.ts';

interface Props {
  currentView: View;
  onViewChange: (view: View) => void;
  cartCount: number;
}

const BottomNav: React.FC<Props> = ({ currentView, onViewChange, cartCount }) => {
  const navItems: { id: View; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'catalog', label: 'Catalog', icon: 'dashboard' },
    { id: 'cart', label: 'Cart', icon: 'shopping_bag' },
    { id: 'saved', label: 'Saved', icon: 'favorite' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 dark:bg-[#2d2218]/95 backdrop-blur-md border-t border-[#e7dbcf] dark:border-[#4d3a2a] flex justify-between items-end h-20 px-2 z-[100] shadow-[0_-8px_20px_rgba(0,0,0,0.06)]">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        const isCart = item.id === 'cart';

        if (isCart) {
          return (
            <div key={item.id} className="relative flex-1 flex flex-col items-center pb-2">
              <button 
                onClick={() => onViewChange(item.id)}
                className="group relative flex flex-col items-center transition-all duration-300"
              >
                <div className={`
                  flex items-center justify-center w-14 h-14 rounded-full -mt-14 mb-1
                  border-4 border-background-light dark:border-background-dark 
                  shadow-lg transition-all duration-300 active:scale-90
                  ${isActive ? 'bg-primary text-white scale-110' : 'bg-white dark:bg-[#3d2f21] text-[#9a734c] dark:text-[#c4a68a] hover:bg-primary/5'}
                `}>
                  <span 
                    className="material-symbols-outlined text-2xl block"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <span className={`text-[10px] font-extrabold uppercase tracking-tight transition-colors ${isActive ? 'text-primary' : 'text-[#9a734c] dark:text-[#c4a68a]'}`}>
                  {item.label}
                </span>
                
                {cartCount > 0 && (
                  <span className="absolute top-[-52px] right-[-4px] bg-red-500 text-white text-[10px] font-black min-w-[20px] h-5 flex items-center justify-center px-1 rounded-full ring-2 ring-white dark:ring-[#2d2218] animate-bounce shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          );
        }

        return (
          <button 
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 pb-3 transition-all duration-200 active:scale-90 ${isActive ? 'text-primary' : 'text-[#9a734c] dark:text-[#c4a68a]'}`}
          >
            <div className="h-6 flex items-center justify-center">
              <span 
                className="material-symbols-outlined text-2xl transition-all"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;