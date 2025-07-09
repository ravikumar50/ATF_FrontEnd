import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/Homelayout";
import PersonCard from "../Components/PersonCard";
import SearchBar from "../Search/SearchBar";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useLocation } from "react-router-dom";

function ManageAccess() {
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('User');
  const [newUserName, setNewUserName] = useState('');
  const location = useLocation();
  const allProjects = location.state?.allProjects || [];

  const fetchAccessDetails = async () => {
    const url = "https://functionapptry.azurewebsites.net/api/accessDetails";
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
   

    const structuredPeople = Object.entries(data)
      .filter(([_, projects]) => projects[0] !== "Admin")
      .map(([email, projects], index) => {
        const name = projects[projects.length - 1];  // Name will be the last entry
        const projectList = projects.slice(0, -1);  // all the things before name will be projects
        return {
          id: index + 1,
          email,
          name,
          role: "User",
          avatar: name.slice(0, 2).toUpperCase(),
          projects: projectList.map((proj, i) => ({
            id: i + 1,
            name: proj
          }))
        };
      });

    setPeople(structuredPeople);
  };

  const handleAddProject = async (personId, projectName) => {
    const person = people.find(p => p.id === personId);
    if (!person) return;

    const formData = new FormData();
    formData.append('email', person.email);
    formData.append('projectName', projectName);

    try {
      const url = "https://functionapptry.azurewebsites.net/api/addProjectAccess";
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const message = await res.text();
      if (!res.ok) {
        toast.error(`Failed to add project: ${message}`);
        return;
      }

      toast.success(`Project "${projectName}" added for ${person.name}`);
      setPeople(prev =>
        prev.map(p =>
          p.id === personId
            ? { ...p, projects: [...p.projects, { id: Date.now(), name: projectName }] }
            : p
        )
      );
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Error adding project. Please try again.");
    }
  };

  const handleRemoveProject = async (personId, projectName) => {
    const person = people.find(p => p.id === personId);
    if (!person) return;

    const confirm = window.confirm(`Are you sure you want to remove "${projectName}" from ${person.name}?`);
    if (!confirm) return;

    const formData = new FormData();
    formData.append('email', person.email);
    formData.append('projectName', projectName);

    try {
      const url = "https://functionapptry.azurewebsites.net/api/removeProjectAccess";
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const message = await res.text();
      if (!res.ok) {
        toast.error(`Failed to remove project: ${message}`);
        return;
      }

      toast.success(`Project "${projectName}" removed for ${person.name}`);
      setPeople(prev =>
        prev.map(p =>
          p.id === personId
            ? { ...p, projects: p.projects.filter(proj => proj.name !== projectName) }
            : p
        )
      );
    } catch (error) {
      console.error("Error removing project:", error);
      toast.error("Error removing project. Please try again.");
    }
  };

  const handleAddUser = async () => {
    const formData = new FormData();
    formData.append('email', newUserEmail);
    formData.append('role', newUserRole);
    formData.append('name', newUserName);

    const toastId = toast.loading(`Sending invitation to ${newUserEmail}...`);

    try {
      const url = "https://functionapptry.azurewebsites.net/api/addUser";
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: await res.text() };
      }

      if (!res.ok) {
        toast.update(toastId, {
          render: `Failed to add user: ${data.message || res.statusText}`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        return;
      }

      toast.update(toastId, {
        render: `Invitation sent to ${newUserEmail}`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setIsModalOpen(false);
      setNewUserEmail('');
      setNewUserRole('User');
      setNewUserName('');
      fetchAccessDetails();
    } catch (error) {
      console.error("Error inviting user:", error);
      toast.update(toastId, {
        render: "Error adding user. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchAccessDetails();
  }, []);

  const filteredPeople = searchTerm
    ? people.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : people;

  return (
    <HomeLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">Manage Access</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
            <SearchBar updateSearchTerm={setSearchTerm} />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 w-40 h-10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              Add New User
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPeople.length === 0 ? (
              <div className="col-span-full text-center text-2xl text-gray-800 font-bold">No users found.</div>
            ) : (
              filteredPeople.map(person => (
                <div key={person.id} className="self-start">
                  <PersonCard
                    person={person}
                    onAddProject={handleAddProject}
                    onRemoveProject={handleRemoveProject}
                    allProjects={allProjects}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Invite New User</h2>

              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded mb-4"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />

              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 rounded mb-4"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />

              <label className="block mb-2 text-sm font-medium">Role</label>
              <select
                className="w-full border border-gray-300 p-2 rounded mb-4"
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>

              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={handleAddUser}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default ManageAccess;
