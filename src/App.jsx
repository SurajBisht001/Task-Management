import { useState } from "react";

import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import DashboardCards from "./Components/DashboardCards";
import RecentTasks from "./Components/RecentTasks";
import TeamCollaboration from "./Components/TeamCollaboration";
import RunningTask from "./Components/RunningTask";
import Schedule from "./Components/Schedule";
import ActivityFeed from "./Components/ActivityFeed";
import Support from "./Components/Support";
import Settings from "./Components/Settings";
import ProjectList from "./Components/ProjectList";
import AddProjectModal from "./Components/AddProjectModal";
import AddTaskModal from "./Components/AddTaskModal";
import AddUserModal from "./Components/AddUserModal";
import AddScheduleModal from "./Components/AddScheduleModal";
import TaskList from "./Components/TaskList";
import UserList from "./Components/UserList";
import Reporting from "./Components/Reporting";
import { useAppData } from "./context/AppContext";

const viewTitles = {
  dashboard: { greeting: "Good Morning 👋", title: "Welcome Back, Suraj!!!" },
  projects: { greeting: "Projects", title: "Manage Your Projects" },
  tasks: { greeting: "Tasks", title: "Your Task Board" },
  reporting: { greeting: "Reporting", title: "Analytics & Reports" },
  users: { greeting: "Users", title: "Team Members" },
  support: { greeting: "Support", title: "How Can We Help?" },
  settings: { greeting: "Settings", title: "Account Preferences" },
};

function DashboardContent({ onNavigate, onOpenModal }) {
  return (
    <div className="grid grid-cols-12 gap-5 flex-1 overflow-hidden">
      <section className="col-span-8 flex flex-col gap-5 overflow-y-auto pr-2">
        <DashboardCards />
        <RecentTasks onViewAll={() => onNavigate("tasks")} />

        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8">
            <TeamCollaboration onAddUser={() => onOpenModal("user")} />
          </div>
          <div className="col-span-4">
            <RunningTask onContinue={() => onNavigate("projects")} />
          </div>
        </div>
      </section>

      <aside className="col-span-4 flex flex-col gap-5 overflow-y-auto pr-2">
        <Schedule onAddSchedule={(date) => onOpenModal("schedule", date)} />
        <ActivityFeed
          onAddTask={() => onOpenModal("task")}
          onNavigate={onNavigate}
        />
      </aside>
    </div>
  );
}

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [modal, setModal] = useState(null);
  const [scheduleDefaultDate, setScheduleDefaultDate] = useState("");

  const {
    addProject,
    addTask,
    addUser,
    addScheduleEvent,
    projects,
    tasks,
    users,
    searchQuery,
    setSearchQuery,
  } = useAppData();

  const openModal = (type, defaultDate = "") => {
    if (type === "schedule") setScheduleDefaultDate(defaultDate);
    setModal(type);
  };

  const closeModal = () => {
    setModal(null);
    setScheduleDefaultDate("");
  };

  const handleAddProject = (project) => {
    addProject(project);
    setActiveView("projects");
  };

  const handleAddTask = (task) => {
    addTask(task);
    setActiveView("tasks");
  };

  const handleAddUser = (user) => {
    addUser(user);
    setActiveView("users");
  };

  const handleAddSchedule = (event) => {
    addScheduleEvent(event);
  };

  const renderContent = () => {
    switch (activeView) {
      case "projects":
        return <ProjectList onAddProject={() => openModal("project")} />;
      case "tasks":
        return <TaskList onAddTask={() => openModal("task")} />;
      case "reporting":
        return <Reporting />;
      case "users":
        return <UserList onAddUser={() => openModal("user")} />;
      case "support":
        return <Support />;
      case "settings":
        return <Settings />;
      default:
        return (
          <DashboardContent onNavigate={setActiveView} onOpenModal={openModal} />
        );
    }
  };

  const header = viewTitles[activeView] ?? viewTitles.dashboard;

  const searchResults =
    searchQuery.trim().length > 0
      ? {
          projects: projects.filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.description.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
          tasks: tasks.filter(
            (t) =>
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.description.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
          users: users.filter(
            (u) =>
              u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              u.role.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }
      : null;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="flex h-screen overflow-hidden p-5 gap-5">
        <aside className="w-75 rounded-[30px] bg-[#070707] border border-[#1A1A1A]">
          <Sidebar activeView={activeView} onNavigate={setActiveView} />
        </aside>

        <main className="flex-1 flex flex-col gap-5 overflow-hidden">
          <Navbar
            greeting={header.greeting}
            title={header.title}
            onNewProject={() => openModal("project")}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchResults={searchResults}
            onSearchNavigate={(view) => {
              setActiveView(view);
              setSearchQuery("");
            }}
          />
          {renderContent()}
        </main>
      </div>

      <AddProjectModal
        isOpen={modal === "project"}
        onClose={closeModal}
        onAdd={handleAddProject}
      />
      <AddTaskModal
        isOpen={modal === "task"}
        onClose={closeModal}
        onAdd={handleAddTask}
      />
      <AddUserModal
        isOpen={modal === "user"}
        onClose={closeModal}
        onAdd={handleAddUser}
      />
      <AddScheduleModal
        isOpen={modal === "schedule"}
        onClose={closeModal}
        onAdd={handleAddSchedule}
        defaultDate={scheduleDefaultDate}
      />
    </div>
  );
}

export default App;
