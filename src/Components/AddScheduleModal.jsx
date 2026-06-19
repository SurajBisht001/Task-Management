import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const COLOR_OPTIONS = ["#00C16A", "#3B82F6", "#F59E0B", "#8B5CF6", "#EF4444"];

const emptyForm = {
  title: "",
  location: "",
  date: "",
  time: "09:00",
  color: "#00C16A",
};

export default function AddScheduleModal({ isOpen, onClose, onAdd, defaultDate }) {
  const [form, setForm] = useState({ ...emptyForm, date: defaultDate || "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && defaultDate) {
      setForm((prev) => ({ ...prev, date: defaultDate }));
    }
  }, [isOpen, defaultDate]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.date) {
      setError("Title and date are required.");
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      location: form.location.trim() || "Online",
      date: form.date,
      time: form.time,
      color: form.color,
    });

    setForm({ ...emptyForm, date: defaultDate || "" });
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] w-full max-w-lg p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add Schedule</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-[#1B1B1B] flex items-center justify-center text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Event Title *</label>
            <input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Location</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="Zoom Meeting" className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Date *</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]" />
            </div>
            <div>
              <label className="text-sm text-gray-400">Time</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400">Color</label>
            <div className="flex gap-3 mt-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, color: c }))}
                  className={`w-8 h-8 rounded-full ${form.color === c ? "ring-2 ring-white ring-offset-2 ring-offset-[#111111]" : ""}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-full border border-[#2a2a2a] text-gray-300 hover:bg-[#1B1B1B]">Cancel</button>
            <button type="submit" className="px-6 py-3 rounded-full bg-[#00C16A] text-black font-semibold hover:bg-[#1AD97F]">Add Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}
