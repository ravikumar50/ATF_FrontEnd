import {Chart as ChartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title} from "chart.js"
import {Pie} from "react-chartjs-2"
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { IoIosWarning } from "react-icons/io";


function PieChart({ Passed, Failed, Warning, Skipped}) {
  const dataDetails = [Passed, Failed, Warning, Skipped];

  const dashBoardPieData = {
    labels: ["Passed", "Failed", "Skipped", "Warning"],
    datasets: [
      {
        label: "Details",
        data: dataDetails,
        backgroundColor: ["green", "red", "gray","#FFBF78"],
        borderWidth: 1,
        borderColor: ["green", "red", "gray", "#FFBF78"],
      },
    ],
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-70 h-70">
        <Pie
          data={dashBoardPieData}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "black",
                },
              },
            },
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-3 mt-5">
        <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-2xl bg-gray-600">
          <div className="flex flex-col">
            <p className="font-semibold">Passed</p>
            <h3 className="text-4xl font-bold">{Passed}</h3>
          </div>
          <SiTicktick className="text-3xl text-green-500" />
        </div>

        <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-2xl bg-gray-600">
          <div className="flex flex-col">
            <p className="font-semibold">Failed</p>
            <h3 className="text-4xl font-bold">{Failed}</h3>
          </div>
          <ImCross className="text-3xl text-red-500" />
        </div>

        <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-2xl bg-gray-600">
          <div className="flex flex-col">
            <p className="font-semibold">Skipped</p>
            <h3 className="text-4xl font-bold">{Skipped}</h3>
          </div>
          <BiSolidSkipNextCircle className="text-3xl text-gray-400" />
        </div>

        <div className="flex items-center justify-center p-5 gap-5 rounded-md shadow-2xl bg-gray-600">
          <div className="flex flex-col">
            <p className="font-semibold">Warning</p>
            <h3 className="text-4xl font-bold">{Warning}</h3>
          </div>
          <IoIosWarning  className="text-3xl" style={{color:"#FFBF78"}} />
        </div>
      </div>
    </div>
  );
}

export default PieChart;
