import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Denied() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Access Denied | 403";
  }, []);

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">403</h1>

      <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute">
        Access Denied
      </div>

      <button
        className="mt-5 relative inline-block text-sm font-medium text-white group active:text-yellow-500 focus:outline-none focus:ring"
        onClick={()=>{navigate("/")}}
      >
        <span className="relative block px-8 py-3 bg-[#1A2238] border border-current rounded-md">
          Go Back
        </span>
      </button>
    </main>
  );
}

export default Denied;
