// src/components/ActivityFeed.jsx

import {
  FiBell,
  FiPlus,
  FiUpload,
  FiFolder,
} from "react-icons/fi";

const activities = [
  {
    id: 1,
    text: 'Suraj completed "API Integration"',
  },
  {
    id: 2,
    text: 'Komal commented on "Mobile App Redesign"',
  },
  {
    id: 3,
    text: 'Rohan uploaded new files',
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-[#111111] border border-[#1b1b1b] rounded-[28px] p-6">
      {/* Buttons */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <button className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#00C16A] text-black font-medium hover:bg-[#1adb84] duration-300">
          <FiPlus />
          Add Task
        </button>

        <button className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#00C16A] text-black font-medium hover:bg-[#1adb84] duration-300">
          <FiUpload />
          Upload
        </button>

        <button className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#00C16A] text-black font-medium hover:bg-[#1adb84] duration-300">
          <FiFolder />
          Folder
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Activity Feed</h2>

        <button className="text-[#00C16A] text-sm hover:underline">
          See All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 bg-[#181818] rounded-2xl p-4 hover:bg-[#202020] transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#232323] flex items-center justify-center text-yellow-400">
              <FiBell size={18} />
            </div>

            <div className="text-sm leading-6 text-gray-300">
              {activity.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}