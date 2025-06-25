import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/Homelayout";
import { toast, ToastContainer } from "react-toastify";

function SelectProject() {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectName) {
      toast.error("Please select a project first.");
      return;
    }

    // Navigate to /files and pass selectedProject via state
    navigate("/files", { state: { projectName: projectName } });
  };

  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[80vh]">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm text-white"
        >
          <h2 className="text-xl font-bold mb-4">Select Your Project</h2>

          <select
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          >
            <option value="">-- Select Project --</option>
            <option value="project1">Project 1</option>
            <option value="project2">Project 2</option>
            <option value="project3">Project 3</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    <ToastContainer position="top-center" theme="dark" />
    </HomeLayout>
  );
}

export default SelectProject;
