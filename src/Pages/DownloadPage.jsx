import { useEffect, useState } from "react";

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
    <div className="p-10 text-white relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Available Files</h2>
        <button
          onClick={fetchFiles}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <ul className="space-y-4">
        {files.map(file => (
          <li key={file.name}>
            <a 
              href={file.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yellow-400 hover:underline"
            >
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DownloadPage;
