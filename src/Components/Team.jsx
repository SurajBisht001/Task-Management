// src/components/TeamCollaboration.jsx

import {
  FiMessageCircle,
  FiVideo,
  FiPhone,
  FiPlus,
} from "react-icons/fi";

const members = [
  {
    id: 1,
    name: "Mohamed",
    role: "UI Designer",
    avatar: "https://i.pravatar.cc/150?img=11",
    online: true,
  },
  {
    id: 2,
    name: "Sarah",
    role: "Frontend Dev",
    avatar: "https://i.pravatar.cc/150?img=32",
    online: true,
  },
  {
    id: 3,
    name: "David",
    role: "Backend Dev",
    avatar: "https://i.pravatar.cc/150?img=14",
    online: false,
  },
  {
    id: 4,
    name: "Emily",
    role: "Project Manager",
    avatar: "https://i.pravatar.cc/150?img=45",
    online: true,
  },
];

export default function TeamCollaboration() {
  return (
    <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Team Collaboration
          </h2>

          <p className="text-sm text-gray-400">
            Active Team Members
          </p>
        </div>

        <button className="w-12 h-12 rounded-full bg-[#00C16A] flex items-center justify-center text-black hover:bg-[#18d883] transition">
          <FiPlus size={22} />
        </button>
      </div>

      {/* Team Members */}
      <div className="space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between bg-[#181818] rounded-2xl p-4 hover:bg-[#202020] transition"
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
                  className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-[#181818] ${
                    member.online
                      ? "bg-[#00C16A]"
                      : "bg-gray-500"
                  }`}
                ></span>
              </div>

              <div>
                <h3 className="text-white font-semibold">
                  {member.name}
                </h3>

                <p className="text-sm text-gray-400">
                  {member.role}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center hover:bg-[#00C16A] hover:text-black transition">
                <FiMessageCircle />
              </button>

              <button className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center hover:bg-[#00C16A] hover:text-black transition">
                <FiPhone />
              </button>

              <button className="w-10 h-10 rounded-full bg-[#222222] flex items-center justify-center hover:bg-[#00C16A] hover:text-black transition">
                <FiVideo />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 bg-[#181818] rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Weekly Team Meeting
          </h3>

          <p className="text-sm text-gray-400 mt-1">
            Friday • 10:00 AM
          </p>
        </div>

        <button className="px-5 py-3 rounded-full bg-[#00C16A] text-black font-semibold hover:bg-[#18d883] transition">
          Join Now
        </button>
      </div>
    </div>
  );
}