import { FiBell, FiLock, FiMoon, FiUser } from "react-icons/fi";

const settingsSections = [
  {
    icon: <FiUser size={20} />,
    title: "Profile",
    fields: [
      { label: "Full Name", value: "Suraj", type: "text" },
      { label: "Email", value: "bishtsuraj751@gmail.com", type: "email" },
      { label: "Role", value: "Product Designer", type: "text" },
    ],
  },
  {
    icon: <FiBell size={20} />,
    title: "Notifications",
    toggles: [
      { label: "Email notifications", enabled: true },
      { label: "Task reminders", enabled: true },
      { label: "Team activity alerts", enabled: false },
    ],
  },
  {
    icon: <FiLock size={20} />,
    title: "Security",
    fields: [
      { label: "Password", value: "••••••••", type: "password" },
    ],
  },
  {
    icon: <FiMoon size={20} />,
    title: "Appearance",
    toggles: [
      { label: "Dark mode", enabled: true },
      { label: "Compact sidebar", enabled: false },
    ],
  },
];

export default function Settings() {
  return (
    <div className="flex flex-col gap-5 overflow-y-auto pr-2">
      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-8 py-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-400 mt-2">
          Manage your account preferences and application settings.
        </p>
      </div>

      {settingsSections.map((section) => (
        <div
          key={section.title}
          className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-8 py-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#1B1B1B] flex items-center justify-center text-[#00C16A]">
              {section.icon}
            </div>
            <h3 className="text-lg font-semibold">{section.title}</h3>
          </div>

          {section.fields && (
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.label}>
                  <label className="text-sm text-gray-400">{field.label}</label>
                  <input
                    type={field.type}
                    value={field.value}
                    readOnly
                    className="mt-1 w-full bg-[#1B1B1B] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#00C16A] transition"
                  />
                </div>
              ))}
            </div>
          )}

          {section.toggles && (
            <div className="space-y-4">
              {section.toggles.map((toggle) => (
                <div
                  key={toggle.label}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-gray-300">{toggle.label}</span>
                  <button
                    className={`w-12 h-6 rounded-full transition ${
                      toggle.enabled ? "bg-[#00C16A]" : "bg-[#2a2a2a]"
                    }`}
                    aria-label={toggle.label}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white transition transform ${
                        toggle.enabled ? "translate-x-6" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end gap-3">
        <button className="px-6 py-3 rounded-full border border-[#2a2a2a] text-gray-300 hover:bg-[#1B1B1B] transition">
          Cancel
        </button>
        <button className="px-6 py-3 rounded-full bg-[#00C16A] text-black font-semibold hover:bg-[#1AD97F] transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
