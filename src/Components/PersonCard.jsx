import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const PersonCard = ({ person, onAddProject }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

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
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden max-w-md">
        {/* Person Header */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
              {person.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{person.name}</h3>
              <p className="text-blue-100">{person.role}</p>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
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

          <div className="space-y-3">
            {person.projects.map((project) => (
              <div key={project.id} className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">
                  {project.name}
                </span>
              </div>
            ))}
            {person.projects.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Plus className="w-8 h-8 mx-auto mb-2" />
                <p>No projects yet. Add one to get started!</p>
              </div>
            )}
          </div>
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
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddProject()}
                placeholder="Enter project name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddProject}
                disabled={!newProjectName.trim()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
              >
              Hello
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
