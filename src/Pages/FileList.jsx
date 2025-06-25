import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function FileList({ files, loading, fetchFiles }) {
  const navigate = useNavigate();

  return (
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
                  onClick={() => {
                    toast.promise(
                      new Promise(resolve => {
                        navigate("/individualDashboard", { state: { fileName: file.name } });
                        resolve();
                      }),
                      {
                        pending: "Loading dashboard...",
                        success: "Dashboard loaded successfully",
                        error: "Failed to load file"
                      },
                      { position: "top-right", autoClose: 2000 }
                    );
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold"
                >
                  Dashboard
                </button>
                <button
                  onClick={async () => {
                    let toastId = toast.loading("Deleting file...", { position: "top-right" });

                    try {
                      const res = await fetch(
                        `https://functionapptry.azurewebsites.net/api/deleteBlob?filename=${file.name}`,
                        { method: "DELETE" }
                      );
                      if (res.ok) {
                        toast.update(toastId, { render: "File deleted successfully", type: "success", isLoading: false, autoClose: 2000 });
                        fetchFiles();
                      } else {
                        toast.update(toastId, { render: "Failed to delete file", type: "error", isLoading: false, autoClose: 2000 });
                      }
                    } catch (err) {
                      toast.update(toastId, { render: "Error deleting file", type: "error", isLoading: false, autoClose: 2000 });
                      console.error(err);
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
  );
}

export default FileList;
