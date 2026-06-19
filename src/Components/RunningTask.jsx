import { FiPlay, FiClock } from "react-icons/fi";
import { useAppData } from "../context/AppContext";
import { daysUntil } from "../utils/dateUtils";

export default function RunningTask({ onContinue }) {
  const { projects } = useAppData();

  const activeProject =
    projects.find((p) => p.status === "In Progress") || projects[0];

  if (!activeProject) {
    return (
      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6 text-center text-gray-400">
        No active projects
      </div>
    );
  }

  const circumference = 2 * Math.PI * 68;
  const offset = circumference - (activeProject.progress / 100) * circumference;
  const tasksDone = Math.round((activeProject.progress / 100) * 50);
  const remaining = 50 - tasksDone;

  return (
    <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Running Task</h2>
          <p className="text-sm text-gray-400">Current Project Progress</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center">
          <FiPlay className="text-[#00C16A]" />
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative w-44 h-44">
          <svg className="w-44 h-44 -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="68" stroke="#2b2b2b" strokeWidth="12" fill="none" />
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke={activeProject.color}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white">{activeProject.progress}%</h1>
            <span className="text-gray-400 text-sm">Completed</span>
          </div>
        </div>
      </div>

      <div className="bg-[#181818] rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white">{activeProject.name}</h3>
        <p className="text-gray-400 text-sm mt-2 leading-6">{activeProject.description}</p>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-gray-400">
            <FiClock />
            <span>{daysUntil(activeProject.dueDate)}</span>
          </div>
          <button
            onClick={onContinue}
            className="bg-[#00C16A] text-black px-5 py-2 rounded-full font-semibold hover:bg-[#18d883] transition"
          >
            Continue
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-[#181818] rounded-2xl p-4">
          <p className="text-gray-400 text-sm">Tasks Done</p>
          <h2 className="text-3xl font-bold mt-2">{tasksDone}</h2>
        </div>
        <div className="bg-[#181818] rounded-2xl p-4">
          <p className="text-gray-400 text-sm">Remaining</p>
          <h2 className="text-3xl font-bold mt-2">{remaining}</h2>
        </div>
      </div>
    </div>
  );
}
