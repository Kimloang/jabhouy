import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import TopAppBar from './components/TopAppBar.tsx';
import SearchBar from './components/SearchBar.tsx';
import Carousel from './components/Carousel.tsx';
import CategoryCard from './components/CategoryCard.tsx';
import ProductCard from './components/ProductCard.tsx';
import BottomNav from './components/BottomNav.tsx';
import ProfileView from './components/ProfileView.tsx';
import { CATEGORIES } from './constants.ts';
import { View, CartItem, Product } from './types.ts';
import { api } from './api.ts';

type CheckoutStep = 'idle' | 'scanning' | 'success';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  
  // API States
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Checkout State
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('idle');
  const [paymentTimer, setPaymentTimer] = useState(600); 

  // Infinite Scroll Ref
  const loaderRef = useRef<HTMLDivElement>(null);

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('snackmart_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('snackmart_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('snackmart_cart', JSON.stringify(cart));
  }, [cart]);

  // Toast Auto-hide
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Payment Timer Effect
  useEffect(() => {
    let interval: any;
    if (checkoutStep === 'scanning' && paymentTimer > 0) {
      interval = setInterval(() => setPaymentTimer(p => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [checkoutStep, paymentTimer]);

  const fetchItems = useCallback(async (pageNum: number, isNewSearch: boolean = false) => {
    if (isNewSearch) setLoading(true);
    else setFetchingMore(true);

    try {
      const response = await api.getProducts({
        page: pageNum,
        limit: 4,
        category: selectedCategory,
        query: searchQuery
      });

      if (pageNum === 1) setProducts(response.data);
      else setProducts(prev => [...prev, ...response.data]);
      
      setHasMore(response.hasMore);
      setTotalCount(response.total);
    } catch (error) {
      console.error("Failed to fetch snacks", error);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !fetchingMore && currentView === 'home') {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, fetchingMore, currentView]);

  useEffect(() => { fetchItems(page, page === 1); }, [page, fetchItems]);

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, [selectedCategory, searchQuery]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast(`${product.name} added`);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const renderProductModal = () => {
    if (!selectedProduct) return null;
    return (
      <div className="fixed inset-0 z-[300] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="absolute inset-0" onClick={() => setSelectedProduct(null)} />
        <div className="relative w-full max-w-[430px] bg-background-light dark:bg-background-dark rounded-t-[3rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">
          <div className="relative h-64 w-full">
            <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" />
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent" />
          </div>
          <div className="px-8 pb-10 pt-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-primary font-black uppercase text-xs tracking-widest">{selectedProduct.weight}</span>
                <h2 className="text-2xl font-black text-[#1b140d] dark:text-white mt-1">{selectedProduct.name}</h2>
              </div>
              <p className="text-3xl font-black text-[#1b140d] dark:text-white">${selectedProduct.price.toFixed(2)}</p>
            </div>
            <p className="text-[#9a734c] dark:text-[#c4a68a] text-sm leading-relaxed mb-6">{selectedProduct.description}</p>
            <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange-500/20">
              ADD TO BASKET <span className="material-symbols-outlined">shopping_basket</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderKHQRPortal = () => {
    if (checkoutStep !== 'scanning') return null;
    return (
      <div className="fixed inset-0 z-[500] bg-background-light dark:bg-background-dark flex flex-col animate-in slide-in-from-bottom duration-500">
        <div className="flex items-center px-4 py-4 border-b border-[#e7dbcf] dark:border-[#4d3a2a]">
          <button onClick={() => setCheckoutStep('idle')} className="text-[#1b140d] dark:text-white"><span className="material-symbols-outlined text-3xl">arrow_back</span></button>
          <h3 className="flex-1 text-center font-black text-lg tracking-tight uppercase">Pay with KHQR</h3>
          <div className="w-8"></div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-[340px] bg-white dark:bg-[#2d2218] rounded-[2.5rem] p-6 shadow-2xl border border-red-500/10 relative">
            <div className="flex justify-between items-center mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Bakong_Logo.png" className="h-5" />
              <div className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[9px] font-black uppercase tracking-widest">{formatTime(paymentTimer)}</div>
            </div>
            
            <div className="relative p-4 bg-white rounded-2xl mb-6 flex items-center justify-center aspect-square w-full border border-gray-100 shadow-inner">
               <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PM_${cartTotal.toFixed(2)}`} className="w-full h-full max-w-[200px]" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-lg border border-gray-50"><span className="material-symbols-outlined text-primary text-xl">storefront</span></div>
               <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/40 animate-[scan_2s_linear_infinite]" />
            </div>

            <div className="text-center pb-2">
              <p className="text-[#9a734c] text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">Total to Pay</p>
              <h2 className="text-3xl font-black text-[#1b140d] dark:text-white tracking-tighter">${cartTotal.toFixed(2)}</h2>
            </div>
          </div>

          <div className="mt-8 w-full max-w-[340px] flex flex-col gap-3">
            <button onClick={() => { setCart([]); setCheckoutStep('success'); }} className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-600/20 active:scale-95 transition-all">SIMULATE SCAN SUCCESS</button>
            <p className="text-center text-[9px] text-[#9a734c] font-black uppercase tracking-widest opacity-40">Scan using Bakong or any banking app</p>
          </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      {!searchQuery && !selectedCategory && <Carousel />}
      <div className="px-4">
        <div className="flex items-center justify-between pb-2 pt-4">
          <h3 className="text-[#1b140d] dark:text-white text-lg font-extrabold tracking-tight">Categories</h3>
          <button onClick={() => setSelectedCategory(null)} className="text-primary text-xs font-bold uppercase hover:opacity-70">Clear</button>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {CATEGORIES.map(cat => (
            <CategoryCard 
              key={cat.id} 
              category={cat} 
              isActive={selectedCategory === cat.id}
              onClick={() => setSelectedCategory(prev => prev === cat.id ? null : cat.id)}
            />
          ))}
        </div>
      </div>

      <div className="px-4 mt-8">
        <div className="flex items-center gap-2 pb-4 border-b border-[#e7dbcf]/30 dark:border-[#4d3a2a]/30 mb-6">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          <h3 className="text-[#1b140d] dark:text-white text-lg font-black">{selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : 'Staff Picks'}</h3>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={addToCart}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => toggleFavorite(product.id)}
              onShowDetails={(p) => setSelectedProduct(p)}
            />
          ))}
          {(loading || fetchingMore) && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2"><div className="w-full aspect-square skeleton rounded-2xl" /><div className="h-3 w-1/3 skeleton rounded-full" /></div>
          ))}
        </div>
        <div ref={loaderRef} className="h-20" />
      </div>
    </>
  );

  const renderCart = () => {
    if (checkoutStep === 'success') {
      return (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center animate-in zoom-in duration-500">
          <div className="bg-green-500/10 p-10 rounded-full mb-6 text-green-500">
            <span className="material-symbols-outlined text-7xl">task_alt</span>
          </div>
          <h2 className="text-2xl font-black mb-2">THANK YOU!</h2>
          <p className="text-sm text-[#9a734c] mb-8">Your snack order has been received and is being prepared.</p>
          <button onClick={() => { setCheckoutStep('idle'); setCurrentView('home'); }} className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all">CONTINUE SHOPPING</button>
        </div>
      );
    }

    return (
      <div className="px-4 pt-4">
        <h3 className="text-[#1b140d] dark:text-white text-xl font-black mb-6 tracking-tight">Your Basket</h3>
        {cart.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center opacity-40">
            <span className="material-symbols-outlined text-7xl mb-4">shopping_basket</span>
            <p className="font-bold">Basket is empty</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-white dark:bg-[#2d2218] p-3 rounded-2xl border border-[#e7dbcf] dark:border-[#4d3a2a] shadow-sm animate-in slide-in-from-left duration-300">
                <img src={item.imageUrl} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="font-extrabold text-[13px] leading-tight text-[#1b140d] dark:text-white line-clamp-1">{item.name}</h4>
                    <p className="text-primary font-black text-sm mt-0.5">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-[#f3ede7] dark:bg-[#3d2f21] rounded-lg px-1 py-0.5">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-[#9a734c] dark:text-[#c4a68a] hover:text-primary active:scale-75 transition-all"
                      >
                        <span className="material-symbols-outlined text-lg font-bold">remove</span>
                      </button>
                      <span className="w-8 text-center text-xs font-black text-[#1b140d] dark:text-white">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#9a734c] dark:text-[#c4a68a] hover:text-primary active:scale-75 transition-all"
                      >
                        <span className="material-symbols-outlined text-lg font-bold">add</span>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#9a734c] dark:text-[#c4a68a] hover:text-red-500 active:scale-90 transition-all p-1"
                    >
                      <span className="material-symbols-outlined text-xl">delete_outline</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-8 border-t border-[#e7dbcf] dark:border-[#4d3a2a] pt-6 pb-12">
               <div className="flex justify-between items-center mb-6">
                 <div>
                   <p className="text-[10px] font-black uppercase text-[#9a734c] tracking-[0.15em] mb-1 opacity-60">Total Amount</p>
                   <span className="font-extrabold text-[#1b140d] dark:text-white">Due Now</span>
                 </div>
                 <span className="text-3xl font-black text-[#1b140d] dark:text-white tracking-tighter">${cartTotal.toFixed(2)}</span>
               </div>
               <button onClick={() => { setCheckoutStep('scanning'); setPaymentTimer(600); }} className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all">PAY WITH KHQR</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-[430px] mx-auto bg-background-light dark:bg-background-dark shadow-2xl pb-24 overflow-x-hidden">
      <TopAppBar />
      
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[1000] w-auto animate-in slide-in-from-top-4 duration-500">
          <div className="bg-primary/95 dark:bg-orange-600/95 backdrop-blur-md text-white py-2 px-5 rounded-full shadow-2xl flex items-center justify-center gap-2.5 border border-white/20">
            <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
            <span className="font-bold text-[13px] tracking-tight whitespace-nowrap">{toast}</span>
          </div>
        </div>
      )}

      <main className="flex-1">
        {currentView === 'home' && renderHome()}
        {currentView === 'cart' && renderCart()}
        {currentView === 'profile' && <ProfileView />}
        {(currentView === 'saved' || currentView === 'catalog') && renderOther(currentView.toUpperCase(), 'construction')}
      </main>

      {renderProductModal()}
      {renderKHQRPortal()}
      <BottomNav currentView={currentView} onViewChange={(v) => { setCurrentView(v); setCheckoutStep('idle'); }} cartCount={cartCount} />
    </div>
  );
};

const renderOther = (title: string, icon: string) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
    <span className="material-symbols-outlined text-6xl text-primary/20 mb-4">{icon}</span>
    <h3 className="font-black text-xl mb-2">{title}</h3>
    <p className="text-sm opacity-50">This feature is coming soon in the next update!</p>
  </div>
);

export default App;