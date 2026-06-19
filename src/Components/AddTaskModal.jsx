import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useAppData } from "../context/AppContext";

const STATUS_OPTIONS = ["Planning", "In Progress", "Completed"];

const emptyForm = {
  title: "",
  description: "",
  status: "Planning",
  dueDate: "",
  progress: 0,
  projectId: "",
};

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
  const { projects } = useAppData();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      progress: Math.min(100, Math.max(0, form.progress)),
      projectId: form.projectId || projects[0]?.id || "",
      dueDate: form.dueDate || new Date().toISOString().split("T")[0],
      assigneeIds: [],
    });

    setForm(emptyForm);
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] w-full max-w-lg p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Task</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-[#1B1B1B] flex items-center justify-center text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Task Title *</label>
            <input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]">
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400">Due Date</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Progress (%)</label>
              <input type="number" name="progress" min={0} max={100} value={form.progress} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]" />
            </div>
            <div>
              <label className="text-sm text-gray-400">Project</label>
              <select name="projectId" value={form.projectId} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]">
                <option value="">None</option>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-full border border-[#2a2a2a] text-gray-300 hover:bg-[#1B1B1B]">Cancel</button>
            <button type="submit" className="px-6 py-3 rounded-full bg-[#00C16A] text-black font-semibold hover:bg-[#1AD97F]">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
