import { FiMail, FiMessageCircle, FiBookOpen, FiPhone } from "react-icons/fi";

const helpItems = [
  {
    icon: <FiBookOpen size={22} />,
    title: "Help Center",
    description: "Browse guides and tutorials to get the most out of Taskora.",
  },
  {
    icon: <FiMessageCircle size={22} />,
    title: "Live Chat",
    description: "Chat with our support team — we typically reply within a few minutes.",
  },
  {
    icon: <FiMail size={22} />,
    title: "Email Support",
    description: "Send us a message at support@taskora.com and we'll get back within 24 hours.",
  },
  {
    icon: <FiPhone size={22} />,
    title: "Phone Support",
    description: "Call us Mon–Fri, 9am–6pm at +1 (800) 123-4567.",
  },
];

export default function Support() {
  return (
    <div className="flex flex-col gap-5 overflow-y-auto pr-2">
      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-8 py-6">
        <h2 className="text-2xl font-bold">Support</h2>
        <p className="text-gray-400 mt-2">
          Need help? Choose an option below and we&apos;ll assist you.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {helpItems.map((item) => (
          <button
            key={item.title}
            className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-6 py-6 text-left hover:border-[#00C16A] transition group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1B1B1B] flex items-center justify-center text-[#00C16A] group-hover:bg-[#00C16A] group-hover:text-black transition">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{item.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-8 py-6">
        <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
        <div className="mt-4 space-y-4">
          <div className="border-b border-[#1f1f1f] pb-4">
            <p className="font-medium">How do I create a new project?</p>
            <p className="text-gray-400 text-sm mt-1">
              Click &quot;New Project&quot; in the top navbar and fill in the project details.
            </p>
          </div>
          <div className="border-b border-[#1f1f1f] pb-4">
            <p className="font-medium">How do I assign tasks to team members?</p>
            <p className="text-gray-400 text-sm mt-1">
              Open a task, click &quot;Assign&quot;, and select a team member from the list.
            </p>
          </div>
          <div>
            <p className="font-medium">Can I export my task reports?</p>
            <p className="text-gray-400 text-sm mt-1">
              Yes — go to Reporting and use the Export button to download PDF or CSV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
