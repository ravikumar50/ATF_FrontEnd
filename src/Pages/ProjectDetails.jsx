import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/Homelayout";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom"; // ✅ import location
import ProjectList from "./ProjectList";
import SearchBar from "../Search/SearchBar";

function ProjectDetails() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // ✅ Get the route state
  const projectName = location.state?.name;

  const fetchFiles = async () => {
  setLoading(true);

  
  const loadingToastId = toast.info(`${projectName} is loading...`, {
    position: "top-right",
    autoClose: false, // Keep it open until manually dismissed
    theme: "dark",
  });

  try {
    const formData = new FormData();
    formData.append('containerName', projectName);
     const url = "https://functionapptry.azurewebsites.net/api/listBlob";
    // const url = "http://localhost:7071/api/listBlob"; // Use your local URL for testing
    

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setFiles(data);


    
    toast.dismiss(loadingToastId);

    
    toast.success(`${projectName} loaded successfully!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
  } catch (err) {
    

    
    toast.dismiss(loadingToastId);
    toast.error(`Failed to load ${projectName}`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchFiles();
  }, []);

  const filteredFiles = searchTerm
    ? files.filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : files;

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col justify-center gap-4 rounded-lg p-6 text-white w-full max-w-xl bg-white shadow-2xl hover:shadow-gray-400 transition-shadow duration-300 cursor-pointer">
          <h2 className="text-2xl flex items-center justify-center font-bold text-gray-800">Available Files</h2>
          <div className="flex justify-between items-center w-full gap-4">
            
            <SearchBar updateSearchTerm={setSearchTerm} />   
            <button
              onClick={fetchFiles}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm h-10 w-34"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          <ProjectList
            files={filteredFiles}
            loading={loading}
            fetchFiles={fetchFiles}
            projectName={projectName} 
          />
        </div>
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </HomeLayout>
  );
}

export default ProjectDetails;
