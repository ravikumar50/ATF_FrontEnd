import { useDispatch, useSelector } from "react-redux";
import {Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from "chart.js"
import { data, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";
import HomeLayout from "../Layouts/Homelayout";
import PieChart from "../Components/PieChart";
import BarChart from "../Components/BarChart";
import { toast, ToastContainer } from "react-toastify";



ChartJs.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);




function IndividualDashBoard() {
  
  const location = useLocation();
 
  const navigate = useNavigate();
  const [chartName, setChartName] = useState("Pie");

  const [testCounts, setTestCounts] = useState({
    passed: 0,
    failed: 0,
    skipped: 0,
    warning: 0,
    total: 0,
    executed: 0,
    error: 0,
    timeout: 0,
    aborted: 0,
    inconclusive: 0,
    passedButRunAborted: 0,
    notRunnable: 0,
    disconnected: 0,
    completed: 0,
    inProgress: 0,
    pending: 0
  });

  
  const {fileName} = location.state;


  



  useEffect(() => {
    if (!fileName) {
      toast.error("No file provided.");
      setTimeout(() => {
        navigate("/");
      }, 1500);
      return;
    }

    async function fetchParsedCounts() {
      const loadingToastId = toast.loading("Loading Dashboard...");
      try {
        // const res = await fetch(`https://functionapptry.azurewebsites.net/api/individualCall?fileName=${fileName}`);
                // const fileName = 'sampleTRXFile.txt';
                const url = 'https://functionapptry.azurewebsites.net/api/individualCall';
                console.log(fileName)
                // const url = 'http://localhost:7071/api/individualCall';
                 const res = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fileName: fileName }),
              });
        if (!res.ok) {
          throw new Error("Failed to parse TRX");
        }
        const parsedCounts = await res.json();
        console.log(res)
        console.log(parsedCounts)
        setTestCounts(parsedCounts);
        toast.dismiss(loadingToastId);  // Dismiss loading toast
        toast.success("Dashboard loaded!" ,{autoClose : 1000});
      } catch (err) {
        console.error(err);
        toast.dismiss(loadingToastId);
        toast.error("Failed to parse file.");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    }

    fetchParsedCounts();
  }, [fileName]);

  
  



  function handleChartNameChange(){
    setChartName(chartName=="Bar" ? "Pie" : "Bar");
  }


  return (
    <>
    <HomeLayout>
      <div className="flex items-center justify-center">
        <div className="pt-3 flex flex-col items-center gap-3 text-white px-4">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-center text-3xl font-semibold text-yellow-500">
              Dashboard : 
            </h1>
            <h2 className="text-center text-3xl text-gray-200 font-semibold">
              {fileName}
            </h2>
          </div>

          
            <div className="flex flex-col gap-5 m-auto mx-10">
              <div className="flex justify-center items-center w-full">
                <div className="flex flex-col items-center justify-center gap-5 p-5 shadow-2xl bg-gray-100 rounded-md w-160 max-w-3xl">
                  {
                    chartName=="Pie" ? <PieChart testCounts={testCounts} /> : 
                      <BarChart testCounts={testCounts}  />                 
                  }
                  
                </div>
              </div>
            </div>
            <button onClick={handleChartNameChange} className="bg-blue-600 hover:bg-blue-500 transition-all ease-in-out duration-300 mt-2 py-2 rounded-md font-semibold text-md cursor-pointer text-white px-3">
              Click here to see {chartName=="Pie" ? "Bar" : "Pie"} chart
            </button>
        </div>  
        
      </div>
    </HomeLayout>
    <ToastContainer position="top-center" theme="dark" />
    </>
  );
}

export default IndividualDashBoard;
