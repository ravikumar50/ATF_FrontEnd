import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Page Not Found | 404";
      }, []);

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
                404
            </h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute"> 
                Page Not Found
            </div>
            <button
                className="mt-5 relative inline-block text-sm font-medium text-white group active:text-yellow-500 focus:outline-none focus:ring"
                onClick={() => navigate(-1)}>
                <span className="relative block px-8 py-3 bg-[#1A2238] border border-current rounded-md">
                    Go Back
                </span>
            </button>
        </div>
    );
}

export default NotFound;