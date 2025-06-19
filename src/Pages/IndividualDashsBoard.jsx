import { useDispatch, useSelector } from "react-redux";
import {Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from "chart.js"
import { data, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";
import {Pie, Bar} from "react-chartjs-2"
import HomeLayout from "../Layouts/Homelayout";
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import PieChart from "../Components/PieChart";
import BarChart from "../Components/BarChart";
import countTestCases from "../Helpers/CountTestCases";



ChartJs.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);




function IndividualDashBoard() {
    
  const location = useLocation();
  const { sampleFile } = location.state || { sampleFile: '' };
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);  
  const [skipped, setSkipped] = useState(0);

  const [chartName, setChartName] = useState("Bar");


  useEffect(() => {
    if (!sampleFile) {
      console.log("No SampleFile data provided");
      return;
    }

    const {p,f,s} = countTestCases(sampleFile);
    
    

    setPassed(p);
    setFailed(f);
    setSkipped(s);

    
  }, [sampleFile]);

  const dataDetails = [passed,failed,skipped];

  
  
  const dashBoardPieData = {
    labels : ["Passed", "Failed", "Skipped"],
    datasets : [
        {
            label : "Details",
            data : dataDetails,
            backgroundColor : ["green", "red", "yellow"],
            borderWidth : 1,
            borderColor : ["green", "red", "yellow"],
            
        }
    ]
  }

  const dashBoardBarData = {
    labels : ["Passed", "Failed", "Skipped"],
    datasets : [
        {
            label : "Details",
            data : dataDetails,
            backgroundColor : ["green", "red", "yellow"],
            borderColor : ["white"],
            borderWidth : 2
        }
    ]
  }

  function handleChartNameChange(){
    setChartName(chartName=="Bar" ? "Pie" : "Bar");
  }


  return (
    <HomeLayout>
      <div className="pt-5 flex flex-col items-center gap-3 text-white px-4 pb-20">
        <h1 className="text-center text-3xl font-semibold text-yellow-500">
            Dashboard
        </h1>

        <div className="flex flex-col gap-5 m-auto mx-10">
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col items-center justify-center gap-5 p-5 shadow-2xl bg-gray-700 rounded-md w-120 max-w-3xl">
              {
                chartName=="Pie" ? <PieChart passed={passed} failed={failed} skipped={skipped} /> : 
                  <BarChart passed={passed} failed={failed} skipped={skipped} />                 
              }
              
            </div>
          </div>
        </div>
        <button onClick={handleChartNameChange} className="bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300 mt-2 py-2 rounded-md font-semibold text-md cursor-pointer text-white px-3">
          Click here to see {chartName=="Pie" ? "Bar" : "Pie"} chart
        </button>
      </div>
    </HomeLayout>
  );
}

export default IndividualDashBoard;
