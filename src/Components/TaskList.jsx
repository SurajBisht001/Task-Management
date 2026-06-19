import { useState } from "react";
import {
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiTrash2,
  FiFilter,
} from "react-icons/fi";
import { useAppData } from "../context/AppContext";
import { formatDueLabel } from "../utils/dateUtils";

const FILTERS = ["All", "Planning", "In Progress", "Completed"];

export default function TaskList({ onAddTask }) {
  const { tasks, users, deleteTask, updateTaskStatus } = useAppData();
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  const getAvatars = (assigneeIds) =>
    users.filter((u) => assigneeIds.includes(u.id)).slice(0, 3);

  return (
    <div className="flex flex-col gap-5 overflow-y-auto pr-2 flex-1">
      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Tasks</h2>
          <p className="text-gray-400 mt-1">{tasks.length} tasks total</p>
        </div>
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 bg-[#00C16A] hover:bg-[#1AD97F] transition text-black font-semibold px-5 py-3 rounded-full"
        >
          <FiPlus />
          New Task
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <FiFilter className="text-gray-400" size={16} />
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === f
                ? "bg-[#00C16A] text-black"
                : "bg-[#1B1B1B] text-gray-300 hover:bg-[#252525]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((task) => {
          const avatars = getAvatars(task.assigneeIds);
          return (
            <div
              key={task.id}
              className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6 hover:border-[#2a2a2a] transition group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <p className="text-gray-400 text-sm mt-2 leading-6">{task.description}</p>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="w-9 h-9 rounded-full bg-[#1B1B1B] flex items-center justify-center text-gray-500 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2 mt-4">
                {task.status === "Completed" ? (
                  <>
                    <FiCheckCircle className="text-[#00C16A]" />
                    <span className="text-[#00C16A] text-sm font-medium">Completed</span>
                  </>
                ) : task.status === "In Progress" ? (
                  <>
                    <FiClock className="text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">In Progress</span>
                  </>
                ) : (
                  <span className="text-blue-400 text-sm font-medium">Planning</span>
                )}
              </div>

              <div className="mt-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-semibold">{task.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#2c2c2c] overflow-hidden">
                  <div className="h-full bg-[#00C16A] rounded-full" style={{ width: `${task.progress}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex -space-x-3">
                  {avatars.map((u) => (
                    <img key={u.id} src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full border-2 border-[#111111]" />
                  ))}
                </div>
                <span className="px-4 py-2 rounded-full bg-[#1B1B1B] text-gray-300 text-sm">
                  {formatDueLabel(task.dueDate)}
                </span>
              </div>

              {task.status !== "Completed" && (
                <button
                  onClick={() => updateTaskStatus(task.id, "Completed")}
                  className="w-full mt-4 py-2.5 rounded-xl bg-[#1B1B1B] text-[#00C16A] text-sm font-medium hover:bg-[#252525] transition"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">No tasks match this filter.</div>
      )}
    </div>
  );
}
