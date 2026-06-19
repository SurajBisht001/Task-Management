// src/components/DashboardCards.jsx
import { motion } from "framer-motion";

import {
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: .5 }}
>

  <motion.div
whileHover={{
    y:-6,
    scale:1.02
}}

transition={{
duration:.25
}}
></motion.div>
    {/* Dashboard */}
</motion.div>


const cards = [
  {
    title: "Total Tasks",
    value: "248",
    change: "+12%",
    icon: <FiTrendingUp size={22} />,
    color: "bg-[#00C16A]",
  },
  {
    title: "Completed",
    value: "186",
    change: "+8%",
    icon: <FiCheckCircle size={22} />,
    color: "bg-blue-500",
  },
  {
    title: "In Progress",
    value: "42",
    change: "+5%",
    icon: <FiClock size={22} />,
    color: "bg-yellow-500",
  },
  {
    title: "Pending",
    value: "20",
    change: "-2%",
    icon: <FiAlertCircle size={22} />,
    color: "bg-red-500",
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-7">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6 hover:border-[#00C16A] transition-all duration-300"
        >
          {/* Top */}
          <div className="flex items-center justify-between">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-black ${card.color}`}
            >
              {card.icon}
            </div>

            <span
              className={`text-sm font-medium ${
                card.change.startsWith("+")
                  ? "text-[#00C16A]"
                  : "text-red-400"
              }`}
            >
              {card.change}
            </span>
          </div>

          {/* Number */}
          <h1 className="text-4xl font-bold mt-6">{card.value}</h1>

          <p className="text-gray-400 mt-2">{card.title}</p>

          {/* Mini Graph */}
          <div className="flex items-end gap-1 mt-8 h-14">
            {[25, 40, 18, 50, 35, 65, 55].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-full ${
                  i === 6 ? "bg-[#00C16A]" : "bg-[#2a2a2a]"
                }`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}