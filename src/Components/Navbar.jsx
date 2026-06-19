import { useState } from "react";
import {
  FiSearch,
  FiBell,
  FiPlus,
  FiChevronDown,
  FiFolder,
  FiCheckSquare,
  FiUsers,
} from "react-icons/fi";

export default function Navbar({
  greeting,
  title,
  onNewProject,
  searchQuery,
  onSearchChange,
  searchResults,
  onSearchNavigate,
}) {
  const [showResults, setShowResults] = useState(false);

  const hasResults =
    searchResults &&
    (searchResults.projects.length > 0 ||
      searchResults.tasks.length > 0 ||
      searchResults.users.length > 0);

  return (
    <header className="w-full bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-8 py-5 relative">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{greeting}</p>
          <h1 className="text-3xl font-bold mt-1">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex items-center bg-[#1B1B1B] rounded-full px-5 py-3 w-[320px]">
              <FiSearch className="text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search projects, tasks, users..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                className="bg-transparent outline-none text-white placeholder:text-gray-500 ml-3 w-full"
              />
            </div>

            {showResults && searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1B1B1B] border border-[#2a2a2a] rounded-2xl p-4 shadow-xl z-50 max-h-64 overflow-y-auto">
                {!hasResults ? (
                  <p className="text-gray-500 text-sm text-center py-3">No results found</p>
                ) : (
                  <div className="space-y-3">
                    {searchResults.projects.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                          <FiFolder size={12} /> Projects
                        </p>
                        {searchResults.projects.map((p) => (
                          <button
                            key={p.id}
                            onMouseDown={() => onSearchNavigate("projects")}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#252525] text-sm"
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    )}
                    {searchResults.tasks.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                          <FiCheckSquare size={12} /> Tasks
                        </p>
                        {searchResults.tasks.map((t) => (
                          <button
                            key={t.id}
                            onMouseDown={() => onSearchNavigate("tasks")}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#252525] text-sm"
                          >
                            {t.title}
                          </button>
                        ))}
                      </div>
                    )}
                    {searchResults.users.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                          <FiUsers size={12} /> Users
                        </p>
                        {searchResults.users.map((u) => (
                          <button
                            key={u.id}
                            onMouseDown={() => onSearchNavigate("users")}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#252525] text-sm"
                          >
                            {u.name} — {u.role}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => alert("No new notifications")}
            className="relative w-12 h-12 rounded-full bg-[#1B1B1B] flex items-center justify-center hover:bg-[#252525] transition"
          >
            <FiBell size={20} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#00C16A]"></span>
          </button>

          <button
            onClick={onNewProject}
            className="flex items-center gap-2 bg-[#00C16A] hover:bg-[#1AD97F] transition text-black font-semibold px-5 py-3 rounded-full"
          >
            <FiPlus />
            New Project
          </button>

          <div className="flex items-center gap-3 bg-[#1B1B1B] rounded-full px-3 py-2 cursor-pointer hover:bg-[#252525] transition">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden lg:block">
              <h3 className="text-sm font-semibold">Suraj</h3>
              <p className="text-xs text-gray-400">Product Designer</p>
            </div>
            <FiChevronDown className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
