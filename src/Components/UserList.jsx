import {
  FiUsers,
  FiPlus,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
} from "react-icons/fi";
import { useAppData } from "../context/AppContext";

export default function UserList({ onAddUser }) {
  const { users, deleteUser, toggleUserStatus } = useAppData();

  const onlineCount = users.filter((u) => u.status === "Online").length;

  return (
    <div className="flex flex-col gap-5 overflow-y-auto pr-2 flex-1">
      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Members</h2>
          <p className="text-gray-400 mt-1">
            {users.length} members · {onlineCount} online
          </p>
        </div>
        <button
          onClick={onAddUser}
          className="flex items-center gap-2 bg-[#00C16A] hover:bg-[#1AD97F] transition text-black font-semibold px-5 py-3 rounded-full"
        >
          <FiPlus />
          Add Member
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6 hover:border-[#2a2a2a] transition group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                  <span
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#111111] ${
                      user.status === "Online" ? "bg-[#00C16A]" : "bg-yellow-400"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-400 text-sm">{user.role}</p>
                  <p className="text-gray-500 text-xs mt-1">{user.email}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className="w-9 h-9 rounded-full bg-[#1B1B1B] flex items-center justify-center text-gray-400 hover:text-[#00C16A] transition"
                  title="Toggle status"
                >
                  {user.status === "Online" ? <FiToggleRight size={18} /> : <FiToggleLeft size={18} />}
                </button>
                {user.email !== "bishtsuraj751@gmail.com" && (
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="w-9 h-9 rounded-full bg-[#1B1B1B] flex items-center justify-center text-gray-500 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1f1f1f] flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  user.status === "Online" ? "text-[#00C16A]" : "text-yellow-400"
                }`}
              >
                ● {user.status}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <FiUsers size={14} />
                Team Member
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
