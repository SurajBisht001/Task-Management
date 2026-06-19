// src/components/TeamCollaboration.jsx

import {
  FiPlus,
  FiMessageCircle,
  FiPhone,
  FiVideo,
  FiMoreHorizontal,
} from "react-icons/fi";

const members = [
  {
    id: 1,
    name: "Mohamed",
    role: "UI/UX Designer",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "Online",
  },
  {
    id: 2,
    name: "Sarah",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: "Online",
  },
  {
    id: 3,
    name: "David",
    role: "Backend Developer",
    avatar: "https://i.pravatar.cc/150?img=15",
    status: "Away",
  },
  {
    id: 4,
    name: "Emily",
    role: "Project Manager",
    avatar: "https://i.pravatar.cc/150?img=45",
    status: "Online",
  },
];

export default function TeamCollaboration() {
  return (
    <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Team Collaboration
          </h2>
          <p className="text-sm text-gray-400">
            4 Members Active
          </p>
        </div>

        <button className="w-11 h-11 rounded-full bg-[#00C16A] text-black flex items-center justify-center hover:bg-[#19d983] transition">
          <FiPlus size={20} />
        </button>
      </div>

      {/* Team Members */}
      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between bg-[#181818] hover:bg-[#202020] rounded-2xl p-4 transition"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <span
                  className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#181818] ${
                    member.status === "Online"
                      ? "bg-[#00C16A]"
                      : "bg-yellow-400"
                  }`}
                />
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  {member.name}
                </h3>

                <p className="text-sm text-gray-400">
                  {member.role}
                </p>

                <span
                  className={`text-xs ${
                    member.status === "Online"
                      ? "text-[#00C16A]"
                      : "text-yellow-400"
                  }`}
                >
                  ● {member.status}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-[#222222] hover:bg-[#00C16A] hover:text-black flex items-center justify-center transition">
                <FiMessageCircle />
              </button>

              <button className="w-10 h-10 rounded-full bg-[#222222] hover:bg-[#00C16A] hover:text-black flex items-center justify-center transition">
                <FiPhone />
              </button>

              <button className="w-10 h-10 rounded-full bg-[#222222] hover:bg-[#00C16A] hover:text-black flex items-center justify-center transition">
                <FiVideo />
              </button>

              <button className="w-10 h-10 rounded-full bg-[#222222] hover:bg-[#2c2c2c] flex items-center justify-center transition">
                <FiMoreHorizontal />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Card */}
      <div className="mt-6 bg-linear-to-r from-[#00C16A] to-[#1ad983] rounded-3xl p-6 text-black">
        <h3 className="text-xl font-bold">
          Weekly Sprint Meeting
        </h3>

        <p className="text-sm mt-2 opacity-80">
          Friday • 10:00 AM • Google Meet
        </p>

        <button className="mt-5 bg-black text-white px-6 py-3 rounded-full hover:bg-[#181818] transition">
          Join Meeting
        </button>
      </div>
    </div>
  );
}