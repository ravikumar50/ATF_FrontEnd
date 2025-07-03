import React from 'react';
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ name, description }) => {
  const navigate = useNavigate();

  name = name || "Project 1";
  description = description || "This is the description of the project. It provides an overview of the project's purpose and features.";
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden w-full h-80" onClick={() => navigate("/projectDetails", { state: { name } })}>
      
      <div 
        className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white cursor-pointer"
        
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
            {initial}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-purple-100">Project</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Description
          </h4>
        </div>

        <div className="flex-1">
          <div className="p-3 bg-gray-50 rounded-lg h-full">
            <p className="text-gray-900 leading-relaxed text-sm overflow-hidden">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;