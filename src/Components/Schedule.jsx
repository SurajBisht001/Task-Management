// src/components/Schedule.jsx

import {
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const days = [
  { day: "Mon", date: "12" },
  { day: "Tue", date: "13" },
  { day: "Wed", date: "14", active: true },
  { day: "Thu", date: "15" },
  { day: "Fri", date: "16" },
];

const meetings = [
  {
    time: "09:00 AM",
    title: "UI Design Meeting",
    location: "Zoom Meeting",
    color: "bg-[#00C16A]",
  },
  {
    time: "12:30 PM",
    title: "Development Review",
    location: "Conference Room",
    color: "bg-blue-500",
  },
  {
    time: "04:00 PM",
    title: "Client Presentation",
    location: "Google Meet",
    color: "bg-yellow-500",
  },
];

export default function Schedule() {
  return (
    <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            Schedule
          </h2>

          <p className="text-sm text-gray-400">
            July 2026
          </p>
        </div>

        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center hover:bg-[#2a2a2a]">
            <FiChevronLeft />
          </button>

          <button className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center hover:bg-[#2a2a2a]">
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {days.map((item) => (
          <button
            key={item.date}
            className={`rounded-2xl py-4 transition ${
              item.active
                ? "bg-[#00C16A] text-black"
                : "bg-[#181818] text-gray-300 hover:bg-[#232323]"
            }`}
          >
            <p className="text-xs">{item.day}</p>

            <h3 className="text-lg font-bold mt-1">
              {item.date}
            </h3>
          </button>
        ))}
      </div>

      {/* Meetings */}
      <div className="space-y-4">
        {meetings.map((meeting, index) => (
          <div
            key={index}
            className="bg-[#181818] rounded-2xl p-4 hover:bg-[#202020] transition"
          >
            <div className="flex gap-4">
              <div
                className={`w-2 rounded-full ${meeting.color}`}
              ></div>

              <div className="flex-1">
                <h3 className="font-semibold text-white">
                  {meeting.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-400 text-sm mt-3">
                  <FiClock />
                  {meeting.time}
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                  <FiMapPin />
                  {meeting.location}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="w-full mt-6 py-3 rounded-2xl bg-[#00C16A] text-black font-semibold hover:bg-[#18d883] transition">
        + Add Schedule
      </button>
    </div>
  );
}