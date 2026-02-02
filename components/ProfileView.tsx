"use client";

import React, { useEffect, useState } from 'react';

// 1. Define Telegram User Interface
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

// 2. Define Window Interface for TypeScript
declare global {
  interface Window {
    Telegram: any;
  }
}

const ProfileView: React.FC = () => {
  // State for the user profile and the raw security string
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [initData, setInitData] = useState<string>('');

  useEffect(() => {
    // 3. Check if running inside Telegram
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand(); // Optional: expands app to full height

      const telegramUser = tg.initDataUnsafe?.user;
      const rawData = tg.initData;

      if (telegramUser) {
        setUser(telegramUser);
        setInitData(rawData);
      } else {
        // Fallback: If in Telegram but no user data (rare), or if testing in Chrome
        loadMockData();
      }
    } else {
      // 4. Fallback for Local Development (Chrome/Edge)
      loadMockData();
    }
  }, []);

  const loadMockData = () => {
    setUser({
      id: 123456789,
      first_name: "Yen",
      last_name: "Kimloang",
      username: "panhadev",
      language_code: "en",
      photo_url: "https://ui-avatars.com/api/?name=Panha+Dev&background=ee8c2b&color=fff&size=200"
    });
  };

  // 5. Function to simulate syncing with your Java Backend
  const handleSync = () => {
    if (!initData) {
      alert("No Telegram data found. Are you in Dev mode?");
      return;
    }
    console.log("SEND THIS TO JAVA BACKEND:", initData);
    alert("Check Console for the initData string!");
    // axios.post('/api/auth/telegram', { initData });
  };

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="px-4 pt-4 pb-20 animate-in slide-in-from-right duration-300">
      {/* Header / Avatar Section */}
      <div className="flex flex-col items-center justify-center mb-8 mt-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-orange-300 shadow-xl shadow-orange-500/20">
            <img 
              src={user.photo_url || `https://ui-avatars.com/api/?name=${user.first_name}&background=random`} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover border-4 border-background-light dark:border-background-dark"
            />
          </div>
          {/* Online Indicator */}
          <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-background-light dark:border-background-dark"></div>
        </div>
        
        <h2 className="text-2xl font-black text-[#1b140d] dark:text-white mt-4 tracking-tight">
          {user.first_name} {user.last_name}
        </h2>
        {user.username && (
            <p className="text-primary font-bold text-sm">@{user.username}</p>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-white dark:bg-[#2d2218] p-4 rounded-2xl border border-[#e7dbcf] dark:border-[#4d3a2a] shadow-sm flex flex-col items-center">
          <span className="text-2xl font-black text-[#1b140d] dark:text-white">12</span>
          <span className="text-xs font-bold text-[#9a734c] uppercase tracking-wider mt-1">Orders</span>
        </div>
        <div className="bg-white dark:bg-[#2d2218] p-4 rounded-2xl border border-[#e7dbcf] dark:border-[#4d3a2a] shadow-sm flex flex-col items-center">
          <span className="text-2xl font-black text-[#1b140d] dark:text-white">245</span>
          <span className="text-xs font-bold text-[#9a734c] uppercase tracking-wider mt-1">Points</span>
        </div>
      </div>

      {/* Menu List */}
      <div className="flex flex-col gap-3">
        <div className="bg-white dark:bg-[#2d2218] rounded-2xl border border-[#e7dbcf] dark:border-[#4d3a2a] overflow-hidden shadow-sm">
          <MenuItem icon="person" label="Personal Information" />
          <div className="h-[1px] bg-[#e7dbcf] dark:bg-[#4d3a2a] mx-4" />
          <MenuItem icon="location_on" label="Shipping Addresses" />
          <div className="h-[1px] bg-[#e7dbcf] dark:bg-[#4d3a2a] mx-4" />
          <MenuItem icon="history" label="Order History" />
        </div>

        <div className="bg-white dark:bg-[#2d2218] rounded-2xl border border-[#e7dbcf] dark:border-[#4d3a2a] overflow-hidden shadow-sm mt-2">
          <MenuItem 
            icon="language" 
            label="Language" 
            value={user.language_code?.toUpperCase() || 'EN'} 
          />
          <div className="h-[1px] bg-[#e7dbcf] dark:bg-[#4d3a2a] mx-4" />
          <MenuItem icon="notifications" label="Notifications" toggle />
        </div>

        {/* Sync / Security Section */}
        <div className="bg-white dark:bg-[#2d2218] rounded-2xl border border-[#e7dbcf] dark:border-[#4d3a2a] overflow-hidden shadow-sm mt-2">
           <div onClick={handleSync}>
             <MenuItem icon="sync_lock" label="Sync Profile (Dev)" />
           </div>
           <div className="h-[1px] bg-[#e7dbcf] dark:bg-[#4d3a2a] mx-4" />
           <MenuItem icon="help" label="Help & Support" />
        </div>
      </div>

      <p className="text-center text-xs text-[#9a734c] font-bold mt-8 opacity-50">
        Version 1.0.0 • ID: {user.id}
      </p>
    </div>
  );
};

// Reusable Menu Item Component
const MenuItem: React.FC<{ icon: string; label: string; value?: string; toggle?: boolean }> = ({ icon, label, value, toggle }) => (
  <button className="w-full flex items-center justify-between p-4 hover:bg-[#f3ede7] dark:hover:bg-[#3d2f21] active:bg-[#e7dbcf] dark:active:bg-[#4d3a2a] transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <span className="material-symbols-outlined text-lg">{icon}</span>
      </div>
      <span className="font-bold text-[#1b140d] dark:text-white text-sm">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-xs font-bold text-[#9a734c]">{value}</span>}
      {toggle ? (
        <div className="w-10 h-6 bg-primary rounded-full relative">
          <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
        </div>
      ) : (
        <span className="material-symbols-outlined text-[#9a734c] text-lg">chevron_right</span>
      )}
    </div>
  </button>
);

export default ProfileView;
