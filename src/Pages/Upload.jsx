import { useState } from 'react';
import axios from 'axios';

function Upload() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post("https://functionapptry.azurewebsites.net/api/uploadBlob", formData);
            setMessage("Upload successful! File URL: " + res.data.url);
        } catch (err) {
            console.error(err);
            setMessage("Upload failed");
        }
    };

    return (
        <div className="text-white p-10">
            <h2 className="text-2xl font-bold mb-4">Upload a File</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <br />
            <button onClick={handleUpload} className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
                Upload
            </button>
            <p className="mt-4">{message}</p>
        </div>
    );
}

export default Upload;
