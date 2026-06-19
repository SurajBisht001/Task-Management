import {
  FiPlus,
  FiMessageCircle,
  FiPhone,
  FiVideo,
  FiMoreHorizontal,
} from "react-icons/fi";
import { useAppData } from "../context/AppContext";
import { formatDisplayDate, formatTime } from "../utils/dateUtils";

export default function TeamCollaboration({ onAddUser }) {
  const { users, scheduleEvents } = useAppData();

  const onlineCount = users.filter((u) => u.status === "Online").length;
  const displayMembers = users.slice(0, 4);

  const nextMeeting = scheduleEvents
    .filter((e) => new Date(e.date + "T00:00:00") >= new Date())
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))[0];

  const handleAction = (action, name) => {
    alert(`${action} with ${name} — demo feature`);
  };

  return (
    <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Team Collaboration</h2>
          <p className="text-sm text-gray-400">{onlineCount} Members Online</p>
        </div>
        <button
          onClick={onAddUser}
          className="w-11 h-11 rounded-full bg-[#00C16A] text-black flex items-center justify-center hover:bg-[#19d983] transition"
        >
          <FiPlus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {displayMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between bg-[#181818] hover:bg-[#202020] rounded-2xl p-4 transition"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full object-cover" />
                <span
                  className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#181818] ${
                    member.status === "Online" ? "bg-[#00C16A]" : "bg-yellow-400"
                  }`}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-400">{member.role}</p>
                <span
                  className={`text-xs ${
                    member.status === "Online" ? "text-[#00C16A]" : "text-yellow-400"
                  }`}
                >
                  ● {member.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleAction("Message", member.name)}
                className="w-10 h-10 rounded-full bg-[#222222] hover:bg-[#00C16A] hover:text-black flex items-center justify-center transition"
              >
                <FiMessageCircle />
              </button>
              <button
                onClick={() => handleAction("Call", member.name)}
                className="w-10 h-10 rounded-full bg-[#222222] hover:bg-[#00C16A] hover:text-black flex items-center justify-center transition"
              >
                <FiPhone />
              </button>
              <button
                onClick={() => handleAction("Video", member.name)}
                className="w-10 h-10 rounded-full bg-[#222222] hover:bg-[#00C16A] hover:text-black flex items-center justify-center transition"
              >
                <FiVideo />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#222222] hover:bg-[#2c2c2c] flex items-center justify-center transition">
                <FiMoreHorizontal />
              </button>
            </div>
          </div>
        ))}
      </div>

      {nextMeeting && (
        <div className="mt-6 bg-linear-to-r from-[#00C16A] to-[#1ad983] rounded-3xl p-6 text-black">
          <h3 className="text-xl font-bold">{nextMeeting.title}</h3>
          <p className="text-sm mt-2 opacity-80">
            {formatDisplayDate(nextMeeting.date)} • {formatTime(nextMeeting.time)} • {nextMeeting.location}
          </p>
          <button
            onClick={() => alert(`Joining ${nextMeeting.location} — demo feature`)}
            className="mt-5 bg-black text-white px-6 py-3 rounded-full hover:bg-[#181818] transition"
          >
            Join Meeting
          </button>
        </div>
      )}
    </div>
  );
}
