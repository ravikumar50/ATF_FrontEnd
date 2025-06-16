import { useEffect, useState } from "react";
import HomeLayout from "../Layouts/Homelayout";

function DownloadPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://functionapptry.azurewebsites.net/api/listBlobs');
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
        <div className="flex flex-col justify-center gap-4 rounded-lg p-6 text-white w-full max-w-xl shadow-[0_0_10px_black]">
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
                  <span className="truncate max-w-[60%]">{file.name}</span>
                  <a
                    href={file.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm font-semibold"
                  >
                    Download
                  </a>
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
