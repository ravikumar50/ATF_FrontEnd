import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/Homelayout";
import PersonCard from "../Components/PersonCard";


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

    const structuredPeople = Object.entries(data).map(([email, projects], index) => ({
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

  const handleAddProject = (personId, projectName) => {
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.id === personId
          ? {
              ...person,
              projects: [...person.projects, { id: Date.now(), name: projectName }]
            }
          : person
      )
    );
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
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default ManageAccess;