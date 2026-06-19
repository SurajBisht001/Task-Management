import { toDateKey } from "../utils/dateUtils";

function weekDate(dayOffset) {
  const today = new Date();
  const monday = new Date(today);
  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff + dayOffset);
  return toDateKey(monday);
}

export const initialScheduleEvents = [
  {
    id: "1",
    date: weekDate(0),
    time: "09:00",
    title: "UI Design Meeting",
    location: "Zoom Meeting",
    color: "#00C16A",
  },
  {
    id: "2",
    date: weekDate(1),
    time: "12:30",
    title: "Development Review",
    location: "Conference Room",
    color: "#3B82F6",
  },
  {
    id: "3",
    date: weekDate(2),
    time: "16:00",
    title: "Client Presentation",
    location: "Google Meet",
    color: "#F59E0B",
  },
  {
    id: "4",
    date: weekDate(4),
    time: "10:00",
    title: "Weekly Sprint Meeting",
    location: "Google Meet",
    color: "#8B5CF6",
  },
];
