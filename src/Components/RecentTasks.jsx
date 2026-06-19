// src/components/RecentTasks.jsx

import {
  FiMoreHorizontal,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

const tasks = [
  {
    id: 1,
    title: "Mobile App Dashboard",
    description:
      "Design a modern dashboard UI for the mobile application.",
    status: "In Progress",
    progress: 72,
    due: "Today",
    avatars: [
      "https://i.pravatar.cc/150?img=11",
      "https://i.pravatar.cc/150?img=12",
      "https://i.pravatar.cc/150?img=13",
    ],
  },
  {
    id: 2,
    title: "Website Redesign",
    description:
      "Improve homepage layout and add responsive animations.",
    status: "Completed",
    progress: 100,
    due: "Tomorrow",
    avatars: [
      "https://i.pravatar.cc/150?img=14",
      "https://i.pravatar.cc/150?img=15",
      "https://i.pravatar.cc/150?img=16",
    ],
  },
];

export default function RecentTasks() {
  return (
    <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Tasks
          </h2>

          <p className="text-gray-400 text-sm">
            Your latest project activities
          </p>
        </div>

        <button className="text-[#00C16A] text-sm hover:underline">
          View All
        </button>
      </div>

      {/* Task Cards */}
      <div className="grid md:grid-cols-2 gap-5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#181818] rounded-3xl p-6 hover:bg-[#202020] transition duration-300"
          >
            {/* Top */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {task.title}
                </h3>

                <p className="text-gray-400 text-sm mt-2 leading-6">
                  {task.description}
                </p>
              </div>

              <button className="text-gray-500 hover:text-white">
                <FiMoreHorizontal size={20} />
              </button>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mt-5">
              {task.status === "Completed" ? (
                <>
                  <FiCheckCircle className="text-[#00C16A]" />
                  <span className="text-[#00C16A] text-sm font-medium">
                    Completed
                  </span>
                </>
              ) : (
                <>
                  <FiClock className="text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">
                    In Progress
                  </span>
                </>
              )}
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">
                  Progress
                </span>

                <span className="text-white font-semibold">
                  {task.progress}%
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-[#2c2c2c] overflow-hidden">
                <div
                  className="h-full bg-[#00C16A] rounded-full"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between mt-6">
              {/* Members */}
              <div className="flex -space-x-3">
                {task.avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-[#181818]"
                  />
                ))}
              </div>

              {/* Due Date */}
              <span className="px-4 py-2 rounded-full bg-[#222222] text-gray-300 text-sm">
                {task.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}