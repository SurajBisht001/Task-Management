import { createContext, useContext, useState } from "react";
import { initialProjects } from "../data/initialProjects";
import { initialUsers } from "../data/initialUsers";
import { initialTasks } from "../data/initialTasks";
import { initialScheduleEvents } from "../data/initialSchedule";
import { initialActivities } from "../data/initialActivities";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);
  const [users, setUsers] = useState(initialUsers);
  const [tasks, setTasks] = useState(initialTasks);
  const [scheduleEvents, setScheduleEvents] = useState(initialScheduleEvents);
  const [activities, setActivities] = useState(initialActivities);
  const [searchQuery, setSearchQuery] = useState("");

  const addActivity = (text, type = "info") => {
    setActivities((prev) => [
      { id: crypto.randomUUID(), text, type },
      ...prev,
    ]);
  };

  const addProject = (project) => {
    setProjects((prev) => [project, ...prev]);
    addActivity(`New project "${project.name}" was created`, "project");
  };

  const deleteProject = (id) => {
    const project = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (project) addActivity(`Project "${project.name}" was deleted`, "project");
  };

  const addUser = (user) => {
    setUsers((prev) => [user, ...prev]);
    addActivity(`${user.name} was added to the team`, "user");
  };

  const deleteUser = (id) => {
    const user = users.find((u) => u.id === id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (user) addActivity(`${user.name} was removed from the team`, "user");
  };

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Online" ? "Away" : "Online" }
          : u,
      ),
    );
  };

  const addTask = (task) => {
    setTasks((prev) => [task, ...prev]);
    addActivity(`New task "${task.title}" was created`, "task");
  };

  const deleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (task) addActivity(`Task "${task.title}" was deleted`, "task");
  };

  const updateTaskStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const progress =
          status === "Completed" ? 100 : status === "Planning" ? t.progress : t.progress;
        return { ...t, status, progress: status === "Completed" ? 100 : progress };
      }),
    );
    const task = tasks.find((t) => t.id === id);
    if (task && status === "Completed") {
      addActivity(`"${task.title}" was marked as completed`, "complete");
    }
  };

  const addScheduleEvent = (event) => {
    setScheduleEvents((prev) => [...prev, event]);
    addActivity(`"${event.title}" was added to schedule`, "schedule");
  };

  const deleteScheduleEvent = (id) => {
    setScheduleEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const value = {
    projects,
    users,
    tasks,
    scheduleEvents,
    activities,
    searchQuery,
    setSearchQuery,
    addProject,
    deleteProject,
    addUser,
    deleteUser,
    toggleUserStatus,
    addTask,
    deleteTask,
    updateTaskStatus,
    addScheduleEvent,
    deleteScheduleEvent,
    addActivity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within AppProvider");
  }
  return context;
}

export function useProjects() {
  const { projects, addProject, deleteProject } = useAppData();
  return { projects, addProject, deleteProject };
}
