import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProjectCard({ name, description}) {
    const navigate = useNavigate();

    
    name = name || "Project 1";
    description = description || "This is the description of the project. It provides an overview of the project's purpose and features.";
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    return (
        <div 
            className="flex flex-col gap-8 w-120 h-70 bg-white shadow-lg rounded-lg p-4 hover:shadow-gray-400 transition-shadow duration-300 cursor-pointer items-start space-x-4" 
            onClick={()=>navigate("/projectDetails", { state: { name } })}
        >
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-md bg-purple-700 text-white flex items-center justify-center text-lg font-semibold">
                    {initial}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
            </div>
            <div>
                <p className="text-md text-gray-800 font-medium mt-1">{description}</p>
            </div>
        </div>
    );
}

export default ProjectCard;
