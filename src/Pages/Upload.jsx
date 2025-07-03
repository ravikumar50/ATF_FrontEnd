import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeLayout from '../Layouts/Homelayout';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

function Upload() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        

        if (!file) {
            toast.error("Please select a file first");
            return;
        }

        


        const formData = new FormData();
        formData.append('file', file);

        
        

        const toastId = toast.loading("Uploading file...");

        try {
            // const url = "https://functionapptry.azurewebsites.net/api/uploadBlob"; 
            const url = "http://localhost:7071/api/uploadBlob"; // Use 
            await axios.post(url, formData);

            toast.update(toastId, {
                render: "File uploaded successfully!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
                onClose: () => navigate("/")
            });
        } catch (err) {
            console.error(err);
            toast.update(toastId, {
                render: "Upload failed",
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
        }
    };


    return (
        <>
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <div className="flex flex-col justify-center gap-3 text-gray-800 w-96  bg-white shadow-lg rounded-lg p-4 hover:shadow-gray-400 transition-shadow duration-300 cursor-pointer space-x-4">
                    <h1 className="text-center text-2xl font-bold ">Upload File</h1>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="fileupload" className="font-semibold">Select File</label>
                        <input
                            type="file"
                            required
                            name="fileupload"
                            id="fileupload"
                            onChange={handleFileChange}
                            className="bg-transparent px-2 py-1 border rounded-md"
                        />
                    </div>

                    <button onClick={handleUpload} className="w-full bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300 mt-2 py-2 rounded-md font-semibold text-lg cursor-pointer text-white">
                        Upload File
                    </button>
                </div>
            </div>
        </HomeLayout>
        <ToastContainer position="top-center" theme="dark" />
        </>
        
    );
}

export default Upload;
