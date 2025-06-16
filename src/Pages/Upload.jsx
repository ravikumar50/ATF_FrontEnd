import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Upload() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

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

        // Show loading toast
        const toastId = toast.loading("Uploading file...");

        try {
            await axios.post("https://functionapptry.azurewebsites.net/api/uploadBlob", formData);

            // Update toast to success
            toast.update(toastId, {
                render: "File uploaded successfully!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
                onClose: () => navigate("/")
            });
        } catch (err) {
            console.error(err);

            // Update toast to error
            toast.update(toastId, {
                render: "Upload failed",
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
        }
    };

    return (
        <div className="text-white p-10">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">Upload a File</h2>
            <div className="flex flex-col gap-1">
                <label htmlFor="fileupload">Select Files</label>
                <input
                    id='fileupload'
                    type="file"
                    onChange={handleFileChange}
                    placeholder='No file choosen'
                    className="bg-transparent px-3 py-1 border rounded-md w-80"
                />
            </div>
            <button onClick={handleUpload} className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 mt-4">
                Upload
            </button>
        </div>
    );
}

export default Upload;
