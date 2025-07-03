import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/Homelayout";
import PersonCard from "../Components/PersonCard";
import { toast } from "react-toastify";


function ManageAccess() {
  const [people, setPeople] = useState([]);
  

  const fetchAccessDetails = async () => {
    // const url = "http://localhost:7071/api/accessDetails"; // or your deployed one
     const url = "https://functionapptry.azurewebsites.net/api/accessDetails"; // Use 
    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    console.log(data);
    

    const structuredPeople = Object.entries(data)
  .filter(([_, projects]) => projects[0] !== "Admin")
  .map(([email, projects], index) => ({
    id: index + 1,
    name: email,
    role: "User",
    avatar: email.slice(0, 2).toUpperCase(),
    projects: projects.map((name, i) => ({
      id: i + 1,
      name
    }))
  }));


    setPeople(structuredPeople);
  };

  const handleAddProject = async (personId, projectName) => {
  const person = people.find(p => p.id === personId);
  if (!person) return;

  const formData = new FormData();
  formData.append('email', person.name);
  formData.append('projectName', projectName);

  try {
    const url = "https://functionapptry.azurewebsites.net/api/addProjectAccess"; // or your deployed one
    //const url = "http://localhost:7071/api/addProjectAccess"; // Use this for local testing
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

    // Update the local state
    setPeople(prevPeople =>
      prevPeople.map(p =>
        p.id === personId
          ? {
              ...p,
              projects: [...p.projects, { id: Date.now(), name: projectName }]
            }
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
  formData.append('email', person.name);
  formData.append('projectName', projectName);

  try {
     const url = "https://functionapptry.azurewebsites.net/api/removeProjectAccess"; // or your deployed one
    //const url = "http://localhost:7071/api/removeProjectAccess"; // Use this for local testing
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

    // Update local state
    setPeople(prevPeople =>
      prevPeople.map(p =>
        p.id === personId
          ? {
              ...p,
              projects: p.projects.filter(project => project.name !== projectName)
            }
          : p
      )
    );
  } catch (error) {
    console.error("Error removing project:", error);
    toast.error("Error removing project. Please try again.");
  }
};



  useEffect(() => {
    fetchAccessDetails();
  }, []);

  return (
    <HomeLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">Manage Access</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map(person => (
            <PersonCard
              key={person.id}
              person={person}
              onAddProject={handleAddProject}
              onRemoveProject={handleRemoveProject}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default ManageAccess;