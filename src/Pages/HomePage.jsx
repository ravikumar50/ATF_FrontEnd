import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/Homelayout";

function HomePage() {
  return (
    <HomeLayout>
      <div className="h-[100vh] bg-[#EAEFEF] flex flex-col items-center justify-center text-black px-6">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-snug">
            Seamlessly <span className="text-[#00BBFF]">Upload</span> and <span className="text-[#00BBFF]">Access</span> <br />
            Your ATF Files
          </h1>

          <p className="text-base sm:text-lg text-black opacity-80">
            Upload your Automated Transaction Files with ease. View and download files up to <strong>3 months</strong> old — organized, safe, and simple.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
           
            <Link to="/allProjects">
              <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-all">
                View Projects
              </button>
            </Link>

            <Link to="/access">
              <button className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all">
                Manage Access
              </button>
            </Link>
          </div>
        </div>

       
      </div>
    </HomeLayout>
  );
}

export default HomePage;
