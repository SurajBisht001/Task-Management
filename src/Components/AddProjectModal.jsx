import { useState } from "react";
import { FiX } from "react-icons/fi";

const STATUS_OPTIONS = ["Planning", "In Progress", "Completed"];
const COLOR_OPTIONS = [
  { label: "Green", value: "#00C16A" },
  { label: "Blue", value: "#3B82F6" },
  { label: "Yellow", value: "#F59E0B" },
  { label: "Purple", value: "#8B5CF6" },
  { label: "Red", value: "#EF4444" },
];

const emptyForm = {
  name: "",
  description: "",
  status: "Planning",
  dueDate: "",
  progress: 0,
  teamSize: 1,
  color: "#00C16A",
};

export default function AddProjectModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "progress" || name === "teamSize" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Project name is required.");
      return;
    }

    if (!form.dueDate) {
      setError("Due date is required.");
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      description: form.description.trim(),
      status: form.status,
      progress: Math.min(100, Math.max(0, form.progress)),
      dueDate: form.dueDate,
      teamSize: Math.max(1, form.teamSize),
      color: form.color,
    });

    setForm(emptyForm);
    setError("");
    onClose();
  };

  const handleClose = () => {
    setForm(emptyForm);
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] w-full max-w-lg p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">New Project</h2>
            <p className="text-gray-400 text-sm mt-1">
              Fill in the details to create a project
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-[#1B1B1B] flex items-center justify-center text-gray-400 hover:text-white transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Project Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Mobile App Dashboard"
              className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A] transition"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description of the project..."
              className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A] transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A] transition"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400">Due Date *</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Progress (%)</label>
              <input
                type="number"
                name="progress"
                min={0}
                max={100}
                value={form.progress}
                onChange={handleChange}
                className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A] transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Team Size</label>
              <input
                type="number"
                name="teamSize"
                min={1}
                value={form.teamSize}
                onChange={handleChange}
                className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A] transition"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Accent Color</label>
            <div className="flex gap-3 mt-2">
              {COLOR_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, color: c.value }))}
                  className={`w-8 h-8 rounded-full transition ${
                    form.color === c.value
                      ? "ring-2 ring-white ring-offset-2 ring-offset-[#111111]"
                      : ""
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 rounded-full border border-[#2a2a2a] text-gray-300 hover:bg-[#1B1B1B] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#00C16A] text-black font-semibold hover:bg-[#1AD97F] transition"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
