import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Download, Trash2, BarChart2 } from "lucide-react";



function ProjectList({ files, loading, fetchFiles, projectName }) {
  const navigate = useNavigate();

  async function deleteFile(fileName, containerName) {
    const toastId = toast.loading("Deleting file...", { position: "top-right" });

    try {
      // const url = "http://localhost:7071/api/deleteBlob";
      const url = "https://functionapptry.azurewebsites.net/api/deleteBlob"; // 
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("containerName", containerName);

      const res = await fetch(url, {
        method: "DELETE",
        body: formData,
      });

      if (res.ok) {
        toast.update(toastId, {
          render: "File deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        fetchFiles(); // Refresh list
      } else {
        toast.update(toastId, {
          render: "Failed to delete file",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: "Error deleting file",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }

  return (
    <>
      <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {files.length === 0 && !loading ? (
          <p className="text-center text-gray-800">No files available.</p>
        ) : (
          files.map((file) => (
            <li
              key={file.name}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 border border-gray-600 rounded-md focus-within:border-blue-500 transition-colors duration-200 text-gray-800 font-medium"
            >
              <div className="w-1/2">
                <span className="truncate">{file.name}</span>
              </div>
              <div className="flex gap-3">
                <a
                  href={file.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1 rounded text-sm font-semibold flex items-center justify-center"
                  title="Download"
                >
                  <Download size={16} />
                </a>
                <button
                  onClick={() => {
                    toast.promise(
                      new Promise((resolve) => {
                        navigate("/individualDashboard", {
                          state: {
                            fileName: file.name,
                            containerName: projectName,
                          },
                        });
                        resolve();
                      }),
                      {
                        pending: "Loading dashboard...",
                        success: "Dashboard loaded successfully",
                        error: "Failed to load file",
                      },
                      { position: "top-right", autoClose: 2000 }
                    );
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold flex items-center gap-1"
                  title="View Dashboard"
                >
                  <BarChart2 size={16} />

                </button>

                <button
                  onClick={() => deleteFile(file.name, projectName)}
                  className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold flex items-center justify-center"
                  title="Delete"
                >
                  <Trash2 size={16} />
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
