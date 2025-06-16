
import { Link } from "react-router-dom"
import HomeLayout from "../Layouts/Homelayout"
import HomePageImage from "../assets/Images/Social_media_image_upload-removebg-preview.png"
function HomePage(){
    return(
        <HomeLayout>
            <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-4xl font-semibold">
                        Find out best the place to <br></br>
                        <span className="text-yellow-500 font-bold"> 
                            Upload and Download ATF Files
                        </span>
                    </h1>

                    <p className="text-xl text-gray-200">
                        We hava a big storage where you can upload the ATF. You can view and download the ATF files which are 3 months old. 
                    </p>

                    <div className="space-x-6">
                        <Link to={"/upload"}>
                            <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                Upload Files
                            </button>
                        </Link>
                        <Link to={"/download"}>
                            <button className="border border-yellow-50 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                                View Files
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-1/2 flex items-center justify-center">
                    <img src={HomePageImage} alt="Home Page Image" />
                </div>


            </div>
        </HomeLayout>
    )
}

export default HomePage