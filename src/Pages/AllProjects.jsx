import { useLocation, useNavigate } from "react-router-dom";
import projectInfo from "../assets/ProjectDetails/ProjectInfo";
import HomeLayout from "../Layouts/Homelayout";
import ProjectCard from "../Components/ProjectCard";
import Search from "../Search/Search";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMsal, useAccount } from "@azure/msal-react";



function AllProjects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const { accounts } = useMsal();
  const email = useAccount(accounts[0] || {}).username; 

  
  


  const fetchProjects = async () => {
    
    
    setLoading(true);

    try{
      const formData = new FormData();
      formData.append('email',email);
      const url = "https://functionapptry.azurewebsites.net/api/listProjects";
      //const url = "http://localhost:7071/api/listProjects";
      const response = await fetch(url, {
          method: "POST",
          body: formData
      });

      
      

      
      const data = await response.json();
      setProjects(data);
      

    }catch (error) {
      
      toast.error("Failed to load Projects", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }




  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProject = searchTerm
    ? projects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : projects;
  return(
    <HomeLayout>
        <div className="flex flex-col items-center justify-center min-h-screen mt-5 mb-5">
          <div>
            <h1 className="text-3xl  text-gray-800 font-bold mb-6">All Projects</h1>
          </div>
          <div className="flex items-center justify-start w-[85%] max-w-6xl px-4 mb-6 gap-4">
            
            <div className="flex-grow">
              <Search updateSearchTerm={setSearchTerm} placeholder={"Filter Projects"} />
            </div>

            <button
              onClick={fetchProjects}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm h-10 w-34"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            <button
              onClick={() => navigate("/createProject")}
              className="h-10 flex-shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded whitespace-nowrap"
            >
              <span className="text-xl">+</span>
              <span>New project</span>
            </button>

          </div>

          <div className="min-h-[460px] flex items-center justify-center w-full px-4">
  {filteredProject.length === 0 ? (
    <p className="text-balance text-xl text-gray-700 font-medium">No files available.</p>
  ) : (
    <div className="flex flex-wrap items-center justify-evenly gap-8 max-w-6xl w-full">
      {filteredProject.map((project, index) => (
        <ProjectCard name={project.name} description={project.description} key={index}/>
      ))}
    </div>
  )}
</div>



          
            
        </div>
    </HomeLayout>
  )
}

export default AllProjects;