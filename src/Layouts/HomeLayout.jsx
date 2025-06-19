import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import Footer from "../Components/Footer";
import { useIsAuthenticated } from "@azure/msal-react";

function HomeLayout({children}){

    const isAuthenticated = useIsAuthenticated();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changeWidth(){
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 'auto' 
    }

    function hideDrawer(){
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false; 
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0';
    }

    async function handleLogout(e) {
        e.preventDefault();
        const res = await dispatch(logoutFromAccount());
        if (res?.payload?.success) {
          navigate("/");
        }
    }


    return(
        <div className="min-h-screen overflow-auto">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" type="checkbox" id="my-drawer"/>
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={"32px"} 
                            className=" text-3xl font-bold text-white m-4"
                        />
                    </label>
                </div> 

                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay">
                    </label>
                    <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24}/>
                            </button>
                        </li>
                        
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        
                        <li>
                            <Link to={"/overallDashboard"}>Dashboard</Link>
                        </li>                        

                        
                        <li>
                            <Link to={"/upload"}>Upload Files</Link>
                        </li>

                        <li>
                            <Link to={"/download"}>View/Download Files</Link>
                        </li>



                        <li>
                            <Link to={"/contact"}>Contact Us</Link> 
                        </li>
                        <li>
                            <Link to={"/about"}>About Us</Link>
                        </li>
                        
                        <li className="absolute bottom-4 w-[90%]">
                            <div className="w-full flex items-center justify-center">
                            <button className="btn btn-secondary px-4 py-1 font-semibold rounded-md w-full text-center" onClick={() => navigate("/logout")}>
                                Logout 
                            </button>
                            </div>
                        </li>
                        
                    </ul>
                </div>
            
            </div>
            {children}
        </div>
    )
}

export default HomeLayout;