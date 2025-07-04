import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/Homelayout";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom"; // ✅ import location
import ProjectList from "./ProjectList";
import SearchBar from "../Search/SearchBar";
import { BarChart2, RefreshCcw, UploadCloud } from "lucide-react";


  function ProjectDetails() {
    const [files, setFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation(); // ✅ Get the route state
    const projectName = location.state?.name;
    const navigate = useNavigate();

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

  async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    
    formData.append('containerName', projectName);

    const toastId = toast.loading("Uploading file...", {
      position: "top-right",
      autoClose: false,
      theme: "dark",
    });

    try {
      const url = "https://functionapptry.azurewebsites.net/api/uploadBlob";
      // const url = "http://localhost:7071/api/uploadBlob"; // Use your local URL for testing
      await fetch(url, {
        method: "POST",
        body: formData,
      });

      toast.update(toastId, {
        render: "File uploaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      
      fetchFiles(); // Refresh the file list after upload
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: "Upload failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }





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
          <h2 className="text-2xl flex items-center justify-center font-bold text-gray-800">{projectName}</h2>
          <div className="flex justify-between items-center w-full gap-2">
            
            <SearchBar updateSearchTerm={setSearchTerm} />   
            <button
              onClick={fetchFiles}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded text-sm h-10 w-auto flex items-center justify-center gap-2"
              disabled={loading} title="Refresh"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
              
            </button>

            <label className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded text-sm h-10 w-auto cursor-pointer flex items-center justify-center gap-2" title="Upload File">
              <UploadCloud size={16} />

              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleFileUpload(file);
                    e.target.value = null; // Reset input for reuploading same file
                  }
                }}
              />
            </label>

            <button
                  onClick={() => {
                    toast.promise(
                      new Promise((resolve) => {
                        navigate("/individualDashboard", {
                          state: {
                            fileName: "Overall",
                            containerName: projectName,
                          },
                        });
                        resolve();
                      }),
                      {
                        
                        
                        pending: "Loading dashboard...",
                        success: "Dashboard loaded successfully",
                        error: error => `Error: ${error.message}`,
                      },
                      { position: "top-right", autoClose: 2000 }
                    );
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-sm font-semibold flex items-center gap-1 w-auto h-10"
                  title="View Dashboard"
                >
                  <BarChart2 size={16} />
                  Dashboard
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
