import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProjectList({ files, loading, fetchFiles, projectName }) {
  const navigate = useNavigate();

  return (
    <>
      <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {files.length === 0 && !loading ? (
          <p className="text-center text-gray-800">No files available.</p>
        ) : (
          files.map(file => (
            <li key={file.name} className="flex justify-between items-center bg-gray-100 px-4 py-2 border border-gray-600 rounded-md focus-within:border-blue-500 transition-colors duration-200 text-gray-800 font-medium">
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
                        navigate("/individualDashboard", { state: { fileName: file.name, containerName: projectName } });
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
    </>
  );
}

export default ProjectList;