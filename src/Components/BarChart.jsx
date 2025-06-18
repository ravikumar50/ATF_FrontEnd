import {Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from "chart.js"
import {Bar} from "react-chartjs-2"
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { BiSolidSkipNextCircle } from "react-icons/bi";


function BarChart({passed,failed,skipped}){
    const dataDetails = [passed, failed, skipped];

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

  return(
    <div>
        <div className="h-60 w-full relative">
            <Bar 
                data={dashBoardBarData}
                className="absolute h-80 bottom-0 w-full"
            />
        </div>

        <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-2xl bg-gray-600">
                <div className="flex flex-col">
                    <p className="font-semibold">Passed</p>
                    <h3 className="text-4xl font-bold">{passed}</h3>
                </div>

                <SiTicktick className="text-3xl text-green-500"/>
            </div>

            <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-2xl bg-gray-600">
                <div className="flex flex-col">
                    <p className="font-semibold">Failed</p>
                    <h3 className="text-4xl font-bold">{failed}</h3>
                </div>

                <ImCross className="text-3xl text-red-500"/>
            </div>
            <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-2xl bg-gray-600">
                <div className="flex flex-col">
                    <p className="font-semibold">Skipped</p>
                    <h3 className="text-4xl font-bold">{skipped}</h3>
                </div>

                <BiSolidSkipNextCircle className="text-3xl text-yellow-500"/>
            </div>
        </div>
    </div>
  )
}

export default BarChart;