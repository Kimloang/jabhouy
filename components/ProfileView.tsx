import React from 'react';

const ProfileView: React.FC = () => {
  // Mock data simulating Telegram WebApp user data
  const user = {
    id: 123456789,
    first_name: "Yen",
    last_name: "Kimloang",
    username: "panhadev",
    language_code: "en",
    photo_url: "https://ui-avatars.com/api/?name=Panha+Dev&background=ee8c2b&color=fff&size=200"
  };

  return (
    <div className="px-4 pt-4 pb-20 animate-in slide-in-from-right duration-300">
      {/* Header / Avatar Section */}
      <div className="flex flex-col items-center justify-center mb-8 mt-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-primary to-orange-300 shadow-xl shadow-orange-500/20">
            <img 
              src={user.photo_url} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover border-4 border-background-light dark:border-background-dark"
            />
          </div>
          <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-background-light dark:border-background-dark"></div>
        </div>
        
        <h2 className="text-2xl font-black text-[#1b140d] dark:text-white mt-4 tracking-tight">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-primary font-bold text-sm">@{user.username}</p>
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
          <MenuItem icon="language" label="Language" value={user.language_code.toUpperCase()} />
          <div className="h-[1px] bg-[#e7dbcf] dark:bg-[#4d3a2a] mx-4" />
          <MenuItem icon="notifications" label="Notifications" toggle />
        </div>

        <div className="bg-white dark:bg-[#2d2218] rounded-2xl border border-[#e7dbcf] dark:border-[#4d3a2a] overflow-hidden shadow-sm mt-2">
           <MenuItem icon="help" label="Help & Support" />
        </div>
      </div>

      <p className="text-center text-xs text-[#9a734c] font-bold mt-8 opacity-50">
        Version 1.0.0 • ID: {user.id}
      </p>
    </div>
  );
};

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