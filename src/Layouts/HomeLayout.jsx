import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useIsAuthenticated } from "@azure/msal-react";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";

function HomeLayout({ children }) {
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(logoutFromAccount());
    if (res?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="h-[100vh] flex flex-col text-white">
      {/* Navbar */}
      <nav className="bg-[#0b1120] shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            ATF Portal
          </Link>

          <div className="space-x-6 font-bold text-sm text-white">
            <Link to="/" className="hover:text-[#00BBFF]">Home</Link>
            <Link to="/allProjects" className="hover:text-[#00BBFF]">View Projects</Link>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
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
