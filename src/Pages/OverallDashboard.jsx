import { useSelector } from "react-redux";
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import HomeLayout from "../Layouts/Homelayout";
import { useState } from "react";

function OverallDashboard(){

  //  const {passed,failed,skipped} = useSelector((state)=> state.counter)
      const {passed, failed, warning, skipped} = [10,15,20,3];

    const [chartName, setChartName] = useState("Pie");

    

    function handleChartNameChange(){
        setChartName(chartName=="Bar" ? "Pie" : "Bar");
    }


    return(
        <HomeLayout>
            <div className="pt-5 flex flex-col items-center gap-3 text-white px-4 pb-20">
                <h1 className="text-center text-3xl font-semibold text-yellow-500">
                    Dashboard
                </h1>

                <div className="flex flex-col gap-5 m-auto mx-10">
                <div className="flex justify-center items-center w-full">
                    <div className="flex flex-col items-center justify-center gap-5 p-5 shadow-2xl bg-gray-100 rounded-md w-160 max-w-3xl">
                    {
                        chartName=="Pie" ? <PieChart Passed={passed} Failed={failed} Warning={warning} Skipped={skipped} /> : 
                        <BarChart Passed={passed} Failed={failed} Warning={warning} Skipped={skipped} />                 
                    }
                    
                    </div>
                </div>
                </div>
                <button onClick={handleChartNameChange} className="bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300 mt-2 py-2 rounded-md font-semibold text-md cursor-pointer text-white px-3">
                Click here to see {chartName=="Pie" ? "Bar" : "Pie"} chart
                </button>
            </div>
        </HomeLayout>
    )
}

export default OverallDashboard