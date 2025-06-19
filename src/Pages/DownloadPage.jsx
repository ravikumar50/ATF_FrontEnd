import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/Homelayout";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";
import { decrementCounts } from "../Redux/Slices/CounterSlice";
import { useDispatch } from "react-redux";
import countTestCases from "../Helpers/CountTestCases";

function DownloadPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <div className="flex flex-col justify-center gap-4 rounded-lg p-6 text-white w-full max-w-xl shadow-2xl bg-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">Available Files</h2>
            <button
              onClick={fetchFiles}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded text-sm"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {files.length === 0 && !loading ? (
              <p className="text-center text-gray-300">No files available.</p>
            ) : (
              files.map(file => (
                <li key={file.name} className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-md">
                  
                  <div className="w-1/2">
                    <span className="truncate">{file.name}</span>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={file.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm font-semibold"
                    >
                      Download
                    </a>
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch(file.url);
                          const text = await response.text(); // Get raw XML content

                          navigate("/individualDashboard", { state: { sampleFile: text } });
                        } catch (err) {
                          toast.error("Failed to load file.", {
                            position: "top-right",
                            autoClose: 2000,
                          });
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={async () => {
                        try {
                          // Step 1: Fetch the file to get XML content
                          const fileResponse = await fetch(file.url);
                          const xmlText = await fileResponse.text();

                          const { p, f, s } = countTestCases(xmlText);
                          
                          const deleteResponse = await fetch(
                            `https://functionapptry.azurewebsites.net/api/deleteBlob?filename=${file.name}`,
                            { method: 'DELETE' }
                          );

                          if (deleteResponse.ok) {
                            dispatch(decrementCounts({
                              passed: parseInt(p),
                              failed: parseInt(f),
                              skipped: parseInt(s)
                            }));

                            toast.success("File deleted successfully");
                            fetchFiles();
                          } else {
                            toast.error("Failed to delete the file");
                          }
                        } catch (error) {
                          toast.error("Error deleting file");
                          console.error(error);
                        }
                      }}
                      className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold"
                    >
                      Delete
                    </button>


                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </HomeLayout>
  );
}

export default DownloadPage;