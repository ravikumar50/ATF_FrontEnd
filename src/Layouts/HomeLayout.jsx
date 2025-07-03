import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useIsAuthenticated } from "@azure/msal-react";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";

function HomeLayout({ children }) {
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  return (
    <div className="h-[90vh] flex flex-col text-white">
      {/* Navbar */}
      <nav className="bg-[#0b1120] w-full">
        <div className="w-full px-10 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            ATF Portal
          </Link>

          <div className="flex items-center justify-center gap-6 font-bold text-md text-white">
            <Link to="/" className="hover:text-[#00BBFF]">Home</Link>
            <Link to="/allProjects" className="hover:text-[#00BBFF]">View Projects</Link>
            {isAuthenticated && (
              <button
                onClick={()=>{navigate('/logout')}}
                className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
     
    </div>
  );
}

export default HomeLayout;
