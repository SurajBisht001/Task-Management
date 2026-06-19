import {
  FiHome,
  FiFolder,
  FiCheckSquare,
  FiPieChart,
  FiUsers,
  FiHelpCircle,
  FiSettings,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";

const menuItems = [
  { id: "dashboard", title: "Overview", icon: <FiHome size={20} /> },
  { id: "projects", title: "Projects", icon: <FiFolder size={20} /> },
  { id: "tasks", title: "Tasks", icon: <FiCheckSquare size={20} /> },
  { id: "reporting", title: "Reporting", icon: <FiPieChart size={20} /> },
  { id: "users", title: "Users", icon: <FiUsers size={20} /> },
];

export default function Sidebar({ activeView, onNavigate }) {
  const isBottomActive = (view) => activeView === view;

  return (
    <div className="h-full flex flex-col justify-between px-6 py-8 bg-[#050505] rounded-[30px]">
      <div>
        <div className="flex items-center gap-3 mb-14">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#6F4EF2] to-white flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-white"></div>
          </div>
          <h1 className="text-3xl font-bold tracking-wide">Taskora</h1>
        </div>

        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                activeView === item.id
                  ? "bg-[#1FC77A] text-black font-semibold"
                  : "text-gray-300 hover:bg-[#151515]"
              }`}
            >
              <div className="flex items-center gap-4">
                {item.icon}
                <span>{item.title}</span>
              </div>
              <FiChevronDown />
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="space-y-3">
          <button
            onClick={() => onNavigate("support")}
            className={`flex items-center gap-4 transition w-full px-2 py-2 rounded-xl ${
              isBottomActive("support")
                ? "text-[#00C16A] font-semibold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <FiHelpCircle size={20} />
            <span>Support</span>
          </button>

          <button
            onClick={() => onNavigate("settings")}
            className={`flex items-center gap-4 transition w-full px-2 py-2 rounded-xl ${
              isBottomActive("settings")
                ? "text-[#00C16A] font-semibold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <FiSettings size={20} />
            <span>Settings</span>
          </button>
        </div>

        <div className="border-t border-[#1f1f1f] my-8"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              import photo from "./photo.jpeg";

              <img
              src={photo}
              alt="Suraj"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-sm font-semibold">Suraj</h3>
              <p className="text-xs text-gray-500">bishtsuraj751@gmail.com</p>
            </div>
          </div>

          <button className="text-gray-400 hover:text-white transition">
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
