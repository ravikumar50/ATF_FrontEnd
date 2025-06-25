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
      <div className="flex flex-col items-center justify-center h-[90vh] gap-6">
        <Search updateSearchTerm={setSearchTerm} />
        <FileList
          files={filteredFiles}
          loading={loading}
          fetchFiles={fetchFiles}
        />
      </div>
      <ToastContainer position="top-center" theme="dark" />
    </HomeLayout>
  );
}

export default Files;
