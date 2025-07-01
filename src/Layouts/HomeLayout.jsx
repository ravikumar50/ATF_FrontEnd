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
    <div className="min-h-screen flex flex-col bg-[#0b1120] text-white">
      {/* Navbar */}
      <nav className="	bg-[#EAEFEF] shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-[#333446]">
            ATF Portal
          </Link>

          <div className="space-x-6 text-sm text-[#333446]">
            <Link to="/" className="hover:text-yellow-400">Home</Link>
            <Link to="/upload" className="hover:text-yellow-400">Upload</Link>
            <Link to="/overallDashboard" className="hover:text-yellow-400">Dashboard</Link>
            <Link to="/files" className="hover:text-yellow-400">View Files</Link>
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
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomeLayout;
