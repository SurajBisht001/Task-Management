import { FiDownload, FiTrendingUp, FiCheckCircle, FiClock, FiFolder } from "react-icons/fi";
import { useAppData } from "../context/AppContext";

export default function Reporting() {
  const { projects, tasks, users } = useAppData();

  const completedProjects = projects.filter((p) => p.status === "Completed").length;
  const inProgressProjects = projects.filter((p) => p.status === "In Progress").length;
  const planningProjects = projects.filter((p) => p.status === "Planning").length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const avgProgress =
    projects.length > 0
      ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
      : 0;

  const statusBreakdown = [
    { label: "Completed", count: completedProjects, color: "#00C16A", total: projects.length },
    { label: "In Progress", count: inProgressProjects, color: "#F59E0B", total: projects.length },
    { label: "Planning", count: planningProjects, color: "#3B82F6", total: projects.length },
  ];

  const taskBreakdown = [
    { label: "Completed", count: tasks.filter((t) => t.status === "Completed").length, color: "#00C16A" },
    { label: "In Progress", count: tasks.filter((t) => t.status === "In Progress").length, color: "#F59E0B" },
    { label: "Planning", count: tasks.filter((t) => t.status === "Planning").length, color: "#3B82F6" },
  ];

  const exportReport = () => {
    const lines = [
      "TASKORA REPORT",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "=== PROJECTS ===",
      `Total: ${projects.length}`,
      `Completed: ${completedProjects}`,
      `In Progress: ${inProgressProjects}`,
      `Planning: ${planningProjects}`,
      `Average Progress: ${avgProgress}%`,
      "",
      "=== TASKS ===",
      `Total: ${tasks.length}`,
      `Completed: ${completedTasks}`,
      "",
      "=== TEAM ===",
      `Members: ${users.length}`,
      "",
      "=== PROJECT DETAILS ===",
      ...projects.map(
        (p) => `${p.name} | ${p.status} | ${p.progress}% | Due: ${p.dueDate}`,
      ),
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `taskora-report-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5 overflow-y-auto pr-2 flex-1">
      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] px-8 py-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics & Reports</h2>
          <p className="text-gray-400 mt-1">Overview of your workspace performance</p>
        </div>
        <button
          onClick={exportReport}
          className="flex items-center gap-2 bg-[#00C16A] hover:bg-[#1AD97F] transition text-black font-semibold px-5 py-3 rounded-full"
        >
          <FiDownload />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          { icon: <FiFolder size={22} />, label: "Total Projects", value: projects.length, color: "bg-[#00C16A]" },
          { icon: <FiCheckCircle size={22} />, label: "Completed Tasks", value: completedTasks, color: "bg-blue-500" },
          { icon: <FiTrendingUp size={22} />, label: "Avg Progress", value: `${avgProgress}%`, color: "bg-yellow-500" },
          { icon: <FiClock size={22} />, label: "Team Members", value: users.length, color: "bg-purple-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-black ${stat.color}`}>
              {stat.icon}
            </div>
            <h1 className="text-4xl font-bold mt-6">{stat.value}</h1>
            <p className="text-gray-400 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
          <h3 className="text-lg font-semibold mb-6">Project Status Breakdown</h3>
          <div className="space-y-5">
            {statusBreakdown.map((item) => {
              const pct = item.total > 0 ? Math.round((item.count / item.total) * 100) : 0;
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-semibold">{item.count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#2c2c2c] overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
          <h3 className="text-lg font-semibold mb-6">Task Status Breakdown</h3>
          <div className="space-y-5">
            {taskBreakdown.map((item) => {
              const pct = tasks.length > 0 ? Math.round((item.count / tasks.length) * 100) : 0;
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-semibold">{item.count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-[#2c2c2c] overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
        <h3 className="text-lg font-semibold mb-6">Project Progress Overview</h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${project.color}20`, color: project.color }}>
                <FiFolder size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium truncate">{project.name}</span>
                  <span className="text-gray-400">{project.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#2c2c2c] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
                </div>
              </div>
              <span className="text-xs text-gray-500 shrink-0">{project.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
