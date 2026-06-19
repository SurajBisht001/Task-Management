import {
  FiBell,
  FiPlus,
  FiUpload,
  FiFolder,
  FiCheckCircle,
  FiMessageCircle,
} from "react-icons/fi";
import { useAppData } from "../context/AppContext";

const iconMap = {
  complete: FiCheckCircle,
  comment: FiMessageCircle,
  upload: FiUpload,
  project: FiFolder,
  task: FiPlus,
  user: FiBell,
  schedule: FiBell,
  info: FiBell,
};

export default function ActivityFeed({ onAddTask, onNavigate }) {
  const { activities, addActivity } = useAppData();
  const recentActivities = activities.slice(0, 5);

  const handleUpload = () => {
    addActivity("Suraj uploaded new files", "upload");
  };

  const handleFolder = () => {
    onNavigate?.("projects");
  };

  return (
    <div className="bg-[#111111] border border-[#1b1b1b] rounded-[28px] p-6">
      <div className="grid grid-cols-3 gap-3 mb-8">
        <button
          onClick={onAddTask}
          className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#00C16A] text-black font-medium hover:bg-[#1adb84] duration-300"
        >
          <FiPlus />
          Add Task
        </button>
        <button
          onClick={handleUpload}
          className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#00C16A] text-black font-medium hover:bg-[#1adb84] duration-300"
        >
          <FiUpload />
          Upload
        </button>
        <button
          onClick={handleFolder}
          className="flex items-center justify-center gap-2 py-3 rounded-full bg-[#00C16A] text-black font-medium hover:bg-[#1adb84] duration-300"
        >
          <FiFolder />
          Folder
        </button>
      </div>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Activity Feed</h2>
        <span className="text-gray-500 text-sm">{activities.length} total</span>
      </div>

      <div className="space-y-4">
        {recentActivities.map((activity) => {
          const Icon = iconMap[activity.type] || FiBell;
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 bg-[#181818] rounded-2xl p-4 hover:bg-[#202020] transition"
            >
              <div className="w-10 h-10 rounded-full bg-[#232323] flex items-center justify-center text-yellow-400 shrink-0">
                <Icon size={18} />
              </div>
              <div className="text-sm leading-6 text-gray-300">{activity.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
