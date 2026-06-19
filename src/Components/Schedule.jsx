import { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiTrash2,
} from "react-icons/fi";
import { useAppData } from "../context/AppContext";
import {
  getMondayOfWeek,
  getWeekDays,
  formatMonthYear,
  formatTime,
  toDateKey,
} from "../utils/dateUtils";

export default function Schedule({ onAddSchedule }) {
  const { scheduleEvents, deleteScheduleEvent } = useAppData();
  const todayKey = toDateKey(new Date());

  const [weekStart, setWeekStart] = useState(() => getMondayOfWeek(new Date()));
  const [selectedDate, setSelectedDate] = useState(todayKey);

  const weekDays = getWeekDays(weekStart);
  const displayMonth = formatMonthYear(weekDays[2]?.fullDate || weekStart);

  const goToPrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(prev);
  };

  const goToNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  const dayEvents = scheduleEvents
    .filter((e) => e.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  const colorClass = (color) => {
    if (color.startsWith("#")) return "";
    return color;
  };

  return (
    <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Schedule</h2>
          <p className="text-sm text-gray-400">{displayMonth}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={goToPrevWeek}
            className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center hover:bg-[#2a2a2a] transition"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={goToNextWeek}
            className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center hover:bg-[#2a2a2a] transition"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-8">
        {weekDays.map((item) => {
          const isSelected = item.dateKey === selectedDate;
          const isToday = item.dateKey === todayKey;
          return (
            <button
              key={item.dateKey}
              onClick={() => setSelectedDate(item.dateKey)}
              className={`rounded-2xl py-4 transition ${
                isSelected
                  ? "bg-[#00C16A] text-black"
                  : "bg-[#181818] text-gray-300 hover:bg-[#232323]"
              }`}
            >
              <p className="text-xs">{item.day}</p>
              <h3 className="text-lg font-bold mt-1">{item.date}</h3>
              {isToday && !isSelected && (
                <p className="text-[10px] text-[#00C16A] mt-0.5">Today</p>
              )}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {dayEvents.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">No events for this day.</p>
        ) : (
          dayEvents.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-[#181818] rounded-2xl p-4 hover:bg-[#202020] transition group"
            >
              <div className="flex gap-4">
                <div
                  className={`w-2 rounded-full shrink-0 ${colorClass(meeting.color)}`}
                  style={meeting.color.startsWith("#") ? { backgroundColor: meeting.color } : undefined}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-white">{meeting.title}</h3>
                    <button
                      onClick={() => deleteScheduleEvent(meeting.id)}
                      className="text-gray-600 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-3">
                    <FiClock size={14} />
                    {formatTime(meeting.time)}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                    <FiMapPin size={14} />
                    {meeting.location}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => onAddSchedule?.(selectedDate)}
        className="w-full mt-6 py-3 rounded-2xl bg-[#00C16A] text-black font-semibold hover:bg-[#18d883] transition"
      >
        + Add Schedule
      </button>
    </div>
  );
}
