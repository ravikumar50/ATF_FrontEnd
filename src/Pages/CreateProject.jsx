import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import HomeLayout from "../Layouts/Homelayout";

function CreateProject(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [projectDetails, setProjectDetails] = useState({
        name: "",
        description: "",
    })

    function handleUserInput(e){
        const {name, value} = e.target;
        setProjectDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    
    async function onFormSubmit(event){
        event.preventDefault();

        if(!projectDetails.name || projectDetails.name.trim() === "" || !projectDetails.description || projectDetails.description.trim() === ""){
            return toast.error("Please fill all the fields")
        }

        

        

        const formData = new FormData();
        formData.append('name', projectDetails.name);
        formData.append('description', projectDetails.description);

        toast.loading("Creating Project...", {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
        })

        const response = await fetch("https://functionapptry.azurewebsites.net/api/newProject", {
            method: "POST",
            body: formData
        });

        if(response.status==200){
            toast.dismiss();
            toast.success("Project created successfully!", {
                position: "top-right",
                autoClose: 2000,
                theme: "dark",
            })
            navigate("/allProjects");
        }else{
            const errorData = await response.json();
            toast.error(`Error: ${errorData.message || "Failed to create project"}`);
            return;
        }

        setProjectDetails({
            name: "",
            description: "",
        })
        
    }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh] ">
                <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-center gap-3 text-white w-96 bg-white shadow-2xl rounded-lg hover:shadow-gray-400 p-4 transition-shadow duration-300 cursor-pointer">
                    <h1 className="text-center text-2xl font-bold text-gray-800 ">Create New Project</h1>


                    <div className="flex flex-col gap-1 text-gray-800">
                        <label htmlFor="name" className="font-semibold">Name</label>
                        <input
                            type="text"
                            required
                            name="name"
                            id="name"
                            placeholder="Enter Project Name"
                            onChange={handleUserInput}
                            value={projectDetails.name}
                            className="bg-transparent px-2 py-1 border rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-1 text-gray-800">
                        <label htmlFor="description" className="font-semibold">Description</label>
                        <textarea
                            className="bg-transparent border px-2 py-1 rounded-md resize-none h-40"
                            id="description"
                            name="description"
                            placeholder="Enter Description of Project"
                            onChange={handleUserInput}
                            value={projectDetails.description}
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300 mt-2 py-2 rounded-md font-semibold text-lg cursor-pointer text-white">
                        Create Project
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateProject;