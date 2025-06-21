import {Chart as ChartJs,ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title} from "chart.js";
import { Bar } from "react-chartjs-2";
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { IoIosWarning } from "react-icons/io";
import { FaListAlt,FaBug,FaHourglassHalf,FaBan,FaQuestionCircle,FaCheckDouble,FaTimesCircle,FaPlug,FaCheckCircle,FaSyncAlt,FaClock} from "react-icons/fa";
import CarouselSlide from "./CaraouselSlide";
import { useState } from "react";

ChartJs.register(ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title);

function BarChart({ testCounts }) {
  const testCaseData = [
    { name: "Total", key: "total", icon: <FaListAlt />, color: "white" },
    { name: "Passed", key: "passed", icon: <SiTicktick />, color: "#28a745" },
    { name: "Failed", key: "failed", icon: <ImCross />, color: "#dc3545" },
    { name: "Skipped", key: "skipped", icon: <BiSolidSkipNextCircle />, color: "#6c757d" },
    { name: "Warning", key: "warning", icon: <IoIosWarning />, color: "#ffc107" },
    { name: "Error", key: "error", icon: <FaBug />, color: "#a71d2a" },
    { name: "Timeout", key: "timeout", icon: <FaHourglassHalf />, color: "#6f42c1" },
    { name: "Aborted", key: "aborted", icon: <FaBan />, color: "#fd7e14" },
    { name: "Inconclusive", key: "inconclusive", icon: <FaQuestionCircle />, color: "#adb5bd" },
    { name: "PassedAborted", key: "passedButRunAborted", icon: <FaCheckDouble />, color: "#20c997" },
    { name: "NotRunnable", key: "notRunnable", icon: <FaTimesCircle />, color: "#f5c6cb" },
    { name: "Disconnected", key: "disconnected", icon: <FaPlug />, color: "#5a6268" },
    { name: "Completed", key: "completed", icon: <FaCheckCircle />, color: "#007bff" },
    { name: "InProgress", key: "inProgress", icon: <FaSyncAlt />, color: "#17a2b8" },
    { name: "Pending", key: "pending", icon: <FaClock />, color: "#ffe066" }
  ];

  const activeCards = testCaseData
    .filter(item => testCounts[item.key] > 0)
    .map(item => ({
      name: item.name,
      count: testCounts[item.key],
      icon: item.icon,
      color: item.color
    }));

  const barChartData = activeCards.filter(item => item.name !== "Total");

  const dashBoardBarData = {
    labels: barChartData.map(item => item.name),
    datasets: [
        {
        label: "Details",
        data: barChartData.map(item => item.count),
        backgroundColor: barChartData.map(item => item.color),
        borderColor: "white",
        borderWidth: 2,
        barThickness: 37
        }
    ]
  };


  const groupedSlides = [];
  for (let i = 0; i < activeCards.length; i += 3) {
    groupedSlides.push(activeCards.slice(i, i + 3));
  }

  const [currentSlide, setCurrentSlide] = useState(0); // NEW STATE for arrows

  return (
    <div className="w-full flex flex-col items-center">
      {/* Bar Chart */}
      <div className="h-75 w-full max-w-[700px] relative mb-10">
        <Bar
          data={dashBoardBarData}
          className="absolute h-80 bottom-0 w-full"
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }}
        />
      </div>

      {/* Carousel of Cards with arrows */}
      <div className="carousel w-full overflow-visible">
        {groupedSlides.map((group, index) => (
          <CarouselSlide
            key={index}
            items={group}
            slideNumber={index}
            totalSlides={groupedSlides.length}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
        ))}
      </div>
    </div>
  );
}

export default BarChart;
