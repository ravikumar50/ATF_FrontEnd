import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const PersonCard = ({ person, onAddProject, onRemoveProject, allProjects }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  

  const assignedProjectNames = new Set(person.projects.map(p => p.name));
  const unassignedProjects = allProjects.filter(p => !assignedProjectNames.has(p.name));
  
  

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      onAddProject(person.id, newProjectName.trim());
      setNewProjectName('');
      setShowAddModal(false);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setNewProjectName('');
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden max-w-md h-auto flex flex-col">
        {/* Person Header */}
        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex-shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
              {person.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{person.name}</h3>
              <p className="text-blue-100">{person.email}</p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Projects ({person.projects.length})
            </h4>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>

          {/* Project Dropdown */}
          {person.projects.length > 0 && (
            <details className="mt-3 bg-gray-50 rounded-lg border border-gray-200">
              <summary className="cursor-pointer px-4 py-2 text-gray-800 font-medium rounded-t-lg">
                View Projects
              </summary>
              <div className="divide-y divide-gray-200">
                {person.projects.map((project) => (
                  <div
                    key={project.id}
                    className="px-4 py-2 flex justify-between items-center"
                  >
                    <span className="text-sm font-medium text-gray-900">{project.name}</span>
                    <button
                      onClick={() => onRemoveProject(person.id, project.name)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </details>
          )}

          {person.projects.length === 0 && (
            <p className="text-sm text-gray-500 mt-3">No projects assigned.</p>
          )}
        </div>

      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Project</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <select
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                disabled={unassignedProjects.length === 0}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800"
              >
                <option value="">Select a project...</option>
                {unassignedProjects.map((proj) => (
                  <option key={proj.id || proj.name} value={proj.name}>
                    {proj.name}
                  </option>
                ))}
              </select>
              {unassignedProjects.length === 0 && (
                <p className="text-sm text-red-500 mt-2">All projects are already assigned.</p>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddProject}
                disabled={!newProjectName.trim()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Add Project
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonCard;
