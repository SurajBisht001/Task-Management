import {
  FiFolder,
  FiPlus,
  FiMoreHorizontal,
  FiClock,
  FiCheckCircle,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";
import { useProjects } from "../context/AppContext";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  if (status === "Completed") {
    return (
      <span className="flex items-center gap-1.5 text-[#00C16A] text-sm font-medium">
        <FiCheckCircle size={16} />
        Completed
      </span>
    );
  }

  if (status === "In Progress") {
    return (
      <span className="flex items-center gap-1.5 text-yellow-400 text-sm font-medium">
        <FiClock size={16} />
        In Progress
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-blue-400 text-sm font-medium">
      <FiFolder size={16} />
      Planning
    </span>
  );
}

export default function ProjectList({ onAddProject }) {
  const { projects, deleteProject } = useProjects();

  return (
    <div className="flex flex-col gap-5 overflow-y-auto pr-2 flex-1">
      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">All Projects</h2>
          <p className="text-gray-400 mt-1">
            {projects.length} project{projects.length !== 1 ? "s" : ""} in total
          </p>
        </div>
        <button
          onClick={onAddProject}
          className="flex items-center gap-2 bg-[#00C16A] hover:bg-[#1AD97F] transition text-black font-semibold px-5 py-3 rounded-full"
        >
          <FiPlus />
          New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-12 text-center">
          <FiFolder size={48} className="text-gray-600 mx-auto" />
          <h3 className="text-xl font-semibold mt-4">No projects yet</h3>
          <p className="text-gray-400 mt-2">
            Create your first project to get started.
          </p>
          <button
            onClick={onAddProject}
            className="mt-6 flex items-center gap-2 bg-[#00C16A] hover:bg-[#1AD97F] transition text-black font-semibold px-5 py-3 rounded-full mx-auto"
          >
            <FiPlus />
            New Project
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6 hover:border-[#2a2a2a] transition group"
            >
              <div className="flex justify-between items-start">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${project.color}20`, color: project.color }}
                >
                  <FiFolder size={22} />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="w-9 h-9 rounded-full bg-[#1B1B1B] flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-[#252525] transition opacity-0 group-hover:opacity-100"
                    title="Delete project"
                  >
                    <FiTrash2 size={16} />
                  </button>
                  <button className="text-gray-500 hover:text-white transition">
                    <FiMoreHorizontal size={20} />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-4">{project.name}</h3>
              <p className="text-gray-400 text-sm mt-2 leading-6 line-clamp-2">
                {project.description || "No description provided."}
              </p>

              <div className="mt-4">
                <StatusBadge status={project.status} />
              </div>

              <div className="mt-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#2c2c2c] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: project.color,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#1f1f1f]">
                <span className="flex items-center gap-2 text-gray-400 text-sm">
                  <FiUsers size={16} />
                  {project.teamSize} members
                </span>
                <span className="px-4 py-2 rounded-full bg-[#1B1B1B] text-gray-300 text-sm">
                  Due {formatDate(project.dueDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
