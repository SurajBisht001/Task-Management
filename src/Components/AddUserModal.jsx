import { useState } from "react";
import { FiX } from "react-icons/fi";

const emptyForm = {
  name: "",
  role: "",
  email: "",
  status: "Online",
};

export default function AddUserModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      role: form.role.trim() || "Team Member",
      email: form.email.trim(),
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(form.email)}`,
      status: form.status,
    });

    setForm(emptyForm);
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] w-full max-w-lg p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Add Team Member</h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-[#1B1B1B] flex items-center justify-center text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Role</label>
            <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Frontend Developer" className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]" />
          </div>
          <div>
            <label className="text-sm text-gray-400">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A]">
              <option value="Online">Online</option>
              <option value="Away">Away</option>
            </select>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-full border border-[#2a2a2a] text-gray-300 hover:bg-[#1B1B1B]">Cancel</button>
            <button type="submit" className="px-6 py-3 rounded-full bg-[#00C16A] text-black font-semibold hover:bg-[#1AD97F]">Add Member</button>
          </div>
        </form>
      </div>
    </div>
  );
}
