import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/Homelayout";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Search from "../Search/Search";
import FileList from "./FileList";

function Files() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://functionapptry.azurewebsites.net/api/listBlob');
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error("Error fetching files:", err);
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
        <div className="flex flex-col justify-center gap-4 rounded-lg p-6 text-white w-full max-w-xl shadow-2xl bg-gray-700">
          <h2 className="text-2xl flex items-center justify-center font-bold">Available Files</h2>
          <div className="flex items-center justify-between">
            <Search updateSearchTerm={setSearchTerm} />   
            <button
              onClick={fetchFiles}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm w-25 h-9"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          
          
          <FileList
            files={filteredFiles}
            loading={loading}
            fetchFiles={fetchFiles}
          />
        </div>
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </HomeLayout>
  );
}

export default Files;
