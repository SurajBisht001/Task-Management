// src/components/RunningTask.jsx

import { FiPlay, FiClock } from "react-icons/fi";

export default function RunningTask() {
  return (
    <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            Running Task
          </h2>
          <p className="text-sm text-gray-400">
            Current Project Progress
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center">
          <FiPlay className="text-[#00C16A]" />
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex justify-center mb-8">
        <div className="relative w-44 h-44">
          <svg
            className="w-44 h-44 -rotate-90"
            viewBox="0 0 160 160"
          >
            {/* Background */}
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#2b2b2b"
              strokeWidth="12"
              fill="none"
            />

            {/* Progress */}
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#00C16A"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="427"
              strokeDashoffset="96"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white">
              78%
            </h1>
            <span className="text-gray-400 text-sm">
              Completed
            </span>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-[#181818] rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white">
          Dashboard UI Design
        </h3>

        <p className="text-gray-400 text-sm mt-2 leading-6">
          Designing a modern analytics dashboard with responsive
          components and clean user experience.
        </p>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-gray-400">
            <FiClock />
            <span>4 Days Left</span>
          </div>

          <button className="bg-[#00C16A] text-black px-5 py-2 rounded-full font-semibold hover:bg-[#18d883] transition">
            Continue
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-[#181818] rounded-2xl p-4">
          <p className="text-gray-400 text-sm">
            Tasks Done
          </p>

          <h2 className="text-3xl font-bold mt-2">
            39
          </h2>
        </div>

        <div className="bg-[#181818] rounded-2xl p-4">
          <p className="text-gray-400 text-sm">
            Remaining
          </p>

          <h2 className="text-3xl font-bold mt-2">
            11
          </h2>
        </div>
      </div>
    </div>
  );
}