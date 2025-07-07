import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/Homelayout";
import ProjectCard from "../Components/ProjectCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMsal, useAccount } from "@azure/msal-react";
import SearchBar from "../Search/SearchBar";
import { RefreshCcw, X, Info } from "lucide-react";

function AllProjects() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.state?.isAdmin || false;
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProjectDetails, setNewProjectDetails] = useState({
    name: '',
    description: ''
  });
  const [creating, setCreating] = useState(false);
  const { accounts } = useMsal();
  const email = useAccount(accounts[0] || {})?.username;

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      const url = "https://functionapptry.azurewebsites.net/api/listProjects";
      const response = await fetch(url, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load Projects", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    const { name, description } = newProjectDetails;

    if (!name.trim() || !description.trim()) {
      toast.error("Please fill all the fields");
      return;
    }

    

    if (!/^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$/.test(name)) {
      toast.error("Invalid project name. Use 3–63 chars, lowercase letters, numbers, and dashes only. No leading/trailing dash.");
      return;
    }

    setCreating(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);

      toast.loading("Creating Project...", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });

      const response = await fetch("https://functionapptry.azurewebsites.net/api/newProject", {
        method: "POST",
        body: formData
      });

      if (response.status === 200) {
        toast.dismiss();
        toast.success("Project created successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
        setNewProjectDetails({ name: '', description: '' });
        setShowAddModal(false);
        fetchProjects();
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || "Failed to create project"}`);
      }
    } catch (error) {
      toast.error("Failed to create project");
    } finally {
      setCreating(false);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setNewProjectDetails({ name: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Only apply sanitization on project name field
    let sanitizedValue = value;
    if (name === "name") {
      sanitizedValue = value
        .toLowerCase()               // Convert to lowercase
        .replace(/[^a-z0-9-]/g, '')  // Allow only lowercase letters, numbers, and dashes
    }

    setNewProjectDetails(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };



  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProject = searchTerm
    ? projects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : projects;

  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-center min-h-screen mt-5 mb-5 gap-3">
        <div>
          <h1 className="text-3xl text-gray-800 font-bold mb-6">All Projects</h1>
        </div>

        <div className="flex items-center justify-start w-[100%] max-w-6xl px-4 mb-6 gap-4">
          <div className="flex-grow">
            <SearchBar updateSearchTerm={setSearchTerm} placeholder={"Search Projects"} />
          </div>

          <button
            onClick={fetchProjects}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-md h-10 w-34 flex items-center justify-center gap-2"
            disabled={loading}
          >
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            {loading ? "Refreshing.." : "Refresh"}
          </button>

          {isAdmin && (
            <button
              onClick={() => {
                setNewProjectDetails({ name: '', description: '' });
                setShowAddModal(true);
              }}
              className="h-10 flex-shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded whitespace-nowrap"
            >
              <span className="text-xl">+</span>
              <span>New project</span>
            </button>
          )}
        </div>

        <div className="min-h-[460px] flex justify-center w-full px-4">
          {filteredProject.length === 0 ? (
            <p className="text-balance text-xl text-gray-700 font-medium">No projects available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
              {filteredProject.map((project, index) => (
                <ProjectCard
                  name={project.name}
                  description={project.description}
                  key={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Project</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                Project Name
                <div className="relative group">
                  <Info className="w-4 h-4 text-gray-800 cursor-pointer" />
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    Lowercase, numbers, dashes only. 3–63 chars.
                  </div>
                </div>
              </label>
              <input
                type="text"
                name="name"
                value={newProjectDetails.name}
                onChange={handleInputChange}
                
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleCreateProject()}
                placeholder="Enter project name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={newProjectDetails.description}
                onChange={handleInputChange}
                placeholder="Enter project description..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 resize-none"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleCreateProject}
                disabled={!newProjectDetails.name.trim() || !newProjectDetails.description.trim() || creating}
                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                {creating ? "Creating..." : "Create Project"}
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
    </HomeLayout>
  );
}

export default AllProjects;
