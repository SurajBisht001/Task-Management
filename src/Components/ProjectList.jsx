// src/components/ProjectList.jsx
import { useNavigate } from "react-router-dom";

import {
  FiFolder,
  FiMoreHorizontal,
  FiArrowUpRight,
} from "react-icons/fi";

const projects = [
  {
    id: 1,
    name: "Mobile App UI",
    client: "Dribbble",
    progress: 78,
    color: "bg-[#00C16A]",
  },
  {
    id: 2,
    name: "Dashboard Design",
    client: "Behance",
    progress: 55,
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Landing Page",
    client: "Figma",
    progress: 90,
    color: "bg-yellow-400",
  },
  {
    id: 4,
    name: "E-Commerce",
    client: "Shopify",
    progress: 42,
    color: "bg-red-500",
  },
];

export default function ProjectList() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#111111] border border-[#1d1d1d] rounded-[28px] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            Projects
          </h2>

          <p className="text-sm text-gray-400">
            Active Projects
          </p>
        </div>

        <button className="text-[#00C16A] hover:text-white transition">
          <FiArrowUpRight size={20} />
        </button>
      </div>

      {/* Projects */}
      <div className="space-y-5">
        {projects.map((project) => (
          <div
key={project.id}
onClick={() => navigate(`/project/${project.id}`)}
className="bg-[#181818] rounded-2xl p-4 cursor-pointer hover:bg-[#202020] transition duration-300"
>
            {/* Top */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${project.color}`}
                >
                  <FiFolder
                    className="text-black"
                    size={22}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {project.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {project.client}
                  </p>
                </div>
              </div>

              <button className="text-gray-500 hover:text-white">
                <FiMoreHorizontal size={20} />
              </button>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">
                  Progress
                </span>

                <span className="text-[#00C16A] font-semibold">
                  {project.progress}%
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-[#2b2b2b] overflow-hidden">
                <div
                  className="h-full bg-[#00C16A] rounded-full"
                  style={{
                    width: `${project.progress}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}