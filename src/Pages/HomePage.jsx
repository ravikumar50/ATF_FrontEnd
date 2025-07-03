import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/Homelayout";
import { useMsal, useAccount } from "@azure/msal-react";
import { useEffect, useState } from "react";

function HomePage() {

  const { accounts } = useMsal();
  const email = useAccount(accounts[0] || {}).username; 
  const formData = new FormData();
  formData.append('email', email);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchAdminStatus = async () => {

    const res = fetch("https://functionapptry.azurewebsites.net/api/isAdmin",{
      method: "POST",
      body: formData,
    })
    if((await res).status === 200)  setIsAdmin(true);
  }

  useEffect(() => {
    fetchAdminStatus();
  }, []);

  return (
    <HomeLayout>
      <div className="h-[90vh] bg-[#EAEFEF] flex flex-col items-center justify-center text-black px-6">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-snug">
            Seamlessly <span className="text-blue-600">Upload</span> and <span className="text-blue-600">Access</span> <br />
            Your ATF Files
          </h1>

          <p className="text-md sm:text-lg text-black">
            Upload your Automated Test Framework Files with ease. View and download files up to <strong>3 months</strong> old — organized, safe, and simple.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
           
            <Link to="/allProjects">
              <button className="bg-blue-500 text-lg text-white hover:bg-blue-600 px-4 py-3 rounded-md font-medium transition-all">
                View Projects
              </button>
            </Link>

            {isAdmin && <Link to="/access">
              <button className="bg-blue-500 text-lg text-white hover:bg-blue-600 px-4 py-3 rounded-md font-medium transition-all">
                Manage Access
              </button>
            </Link>}
          </div>
        </div>

       
      </div>
    </HomeLayout>
  );
}

export default HomePage;
