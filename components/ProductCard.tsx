import React from 'react';
import { Product } from '../types.ts';

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShowDetails: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAdd, isFavorite, onToggleFavorite, onShowDetails }) => {
  return (
    <div className="flex flex-col gap-2 group animate-in slide-in-from-bottom duration-500">
      <div 
        onClick={() => onShowDetails(product)}
        className="relative w-full aspect-square bg-[#f3ede7] dark:bg-[#3d2f21] rounded-2xl overflow-hidden shadow-sm cursor-pointer"
      >
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${product.imageUrl}")` }}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-green-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">New</span>
          )}
          {product.isLimited && (
            <span className="bg-red-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">Limited</span>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 dark:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-all z-10"
        >
          <span 
            className={`material-symbols-outlined text-lg ${isFavorite ? 'text-red-500' : 'text-[#9a734c] dark:text-white/60'}`}
            style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Add Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform z-10 hover:bg-orange-600"
        >
          <span className="material-symbols-outlined text-xl font-bold">add</span>
        </button>
      </div>
      
      <div className="px-1" onClick={() => onShowDetails(product)}>
        <p className="text-[10px] text-primary dark:text-primary font-black uppercase tracking-widest">{product.weight}</p>
        <h4 className="text-[#1b140d] dark:text-white text-sm font-extrabold leading-tight line-clamp-1 mt-0.5">{product.name}</h4>
        <p className="text-[#1b140d] dark:text-white text-base font-black mt-1">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;