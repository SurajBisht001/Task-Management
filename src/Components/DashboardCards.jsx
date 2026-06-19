import {
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";
import { useAppData } from "../context/AppContext";

const cards = [
  {
    title: "Total Tasks",
    value: "0",
    change: "+0%",
    icon: <FiTrendingUp size={22} />,
    color: "bg-[#00C16A]",
  },
  {
    title: "Completed",
    value: "0",
    change: "+0%",
    icon: <FiCheckCircle size={22} />,
    color: "bg-blue-500",
  },
  {
    title: "In Progress",
    value: "0",
    change: "+0%",
    icon: <FiClock size={22} />,
    color: "bg-yellow-500",
  },
  {
    title: "Pending",
    value: "0",
    change: "+0%",
    icon: <FiAlertCircle size={22} />,
    color: "bg-red-500",
  },
];

export default function DashboardCards() {
  const { projects, tasks } = useAppData();

  const totalProjects = projects.length;
  const completed = projects.filter((p) => p.status === "Completed").length;
  const inProgress = projects.filter((p) => p.status === "In Progress").length;
  const planning = projects.filter((p) => p.status === "Planning").length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;

  const dynamicCards = [
    { ...cards[0], value: String(totalProjects), title: "Total Projects" },
    { ...cards[1], value: String(completedTasks), title: "Completed Tasks" },
    { ...cards[2], value: String(inProgress), title: "In Progress" },
    { ...cards[3], value: String(planning), title: "Planning" },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-7">
      {dynamicCards.map((card) => (
        <div
          key={card.title}
          className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6 hover:border-[#00C16A] transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-black ${card.color}`}>
              {card.icon}
            </div>
            <span className="text-sm font-medium text-[#00C16A]">{card.change}</span>
          </div>
          <h1 className="text-4xl font-bold mt-6">{card.value}</h1>
          <p className="text-gray-400 mt-2">{card.title}</p>
          <div className="flex items-end gap-1 mt-8 h-14">
            {[25, 40, 18, 50, 35, 65, 55].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-full ${i === 6 ? "bg-[#00C16A]" : "bg-[#2a2a2a]"}`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
