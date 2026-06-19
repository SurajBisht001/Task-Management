// src/App.jsx

import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import DashboardCards from "./Components/DashboardCards";
import RecentTasks from "./Components/RecentTasks";
import TeamCollaboration from "./Components/TeamCollaboration";
import RunningTask from "./Components/RunningTask";
import Schedule from "./Components/Schedule";
import ActivityFeed from "./Components/ActivityFeed";

function App() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <div className="flex h-screen overflow-hidden p-5 gap-5">
        {/* Sidebar */}
        <aside className="w-75 rounded-[30px] bg-[#070707] border border-[#1A1A1A]">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-5 overflow-hidden">
          {/* Navbar */}
          <Navbar />

          {/* Dashboard */}
          <div className="grid grid-cols-12 gap-5 flex-1 overflow-hidden">
            {/* Left Side */}
            <section className="col-span-8 flex flex-col gap-5 overflow-y-auto pr-2">
              <DashboardCards />
              <RecentTasks />

              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-8">
                  <TeamCollaboration />
                </div>

                <div className="col-span-4">
                  <RunningTask />
                </div>
              </div>
            </section>

            {/* Right Side */}
            <aside className="col-span-4 flex flex-col gap-5 overflow-y-auto pr-2">
              <Schedule />
              <ActivityFeed />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
