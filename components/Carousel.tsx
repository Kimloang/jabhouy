import React, { useState, useEffect, useCallback } from 'react';
import { HIGHLIGHTS } from '../constants.ts';

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HIGHLIGHTS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative px-4 mt-4 h-[200px] w-full">
      <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-xl shadow-orange-500/10">
        {HIGHLIGHTS.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                isActive ? 'opacity-100 scale-105 z-10' : 'opacity-0 scale-100 z-0'
              }`}
            >
              <div 
                className="w-full h-full bg-center bg-no-repeat bg-cover flex flex-col justify-end p-5"
                style={{ backgroundImage: `url("${item.imageUrl}")` }}
              >
                {/* Gradient Overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Content */}
                <div className={`relative z-20 transition-all duration-700 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  <span className="inline-block bg-primary text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider mb-2">
                    {item.badge}
                  </span>
                  <h2 className="text-white text-xl font-black leading-tight drop-shadow-md">
                    {item.name}
                  </h2>
                  <p className="text-white/80 text-xs font-medium mt-1">
                    {item.info}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Indicators */}
        <div className="absolute bottom-4 right-5 z-30 flex gap-1.5">
          {HIGHLIGHTS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-6 bg-primary' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;