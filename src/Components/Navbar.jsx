// src/components/Navbar.jsx

import {
  FiSearch,
  FiBell,
  FiPlus,
  FiChevronDown,
} from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="w-full bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-8 py-5">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div>
          <p className="text-gray-400 text-sm">Good Morning 👋</p>

          <h1 className="text-3xl font-bold mt-1">
            Welcome Back, Suraj!!!
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center bg-[#1B1B1B] rounded-full px-5 py-3 w-[320px]">
            <FiSearch className="text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-white placeholder:text-gray-500 ml-3 w-full"
            />
          </div>

          {/* Notification */}
          <button className="relative w-12 h-12 rounded-full bg-[#1B1B1B] flex items-center justify-center hover:bg-[#252525] transition">
            <FiBell size={20} />

            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#00C16A]"></span>
          </button>

          {/* Add Button */}
          <button className="flex items-center gap-2 bg-[#00C16A] hover:bg-[#1AD97F] transition text-black font-semibold px-5 py-3 rounded-full">
            <FiPlus />
            New Project
          </button>

          {/* User */}
          <div className="flex items-center gap-3 bg-[#1B1B1B] rounded-full px-3 py-2 cursor-pointer hover:bg-[#252525] transition">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="hidden lg:block">
              <h3 className="text-sm font-semibold">Suraj</h3>
              <p className="text-xs text-gray-400">
                Product Designer
              </p>
            </div>

            <FiChevronDown className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}