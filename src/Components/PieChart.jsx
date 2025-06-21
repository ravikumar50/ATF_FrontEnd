import {Chart as ChartJs,ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title} from "chart.js";
import {Pie} from "react-chartjs-2"
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { IoIosWarning } from "react-icons/io";
import {FaBug, FaHourglassHalf, FaBan, FaQuestionCircle, FaCheckDouble, FaTimesCircle, FaPlug, FaCheckCircle, FaSyncAlt, FaClock } from "react-icons/fa";
import CarouselSlide from "./CaraouselSlide";
import { useState } from "react";


ChartJs.register(ArcElement, Tooltip, Legend);


function PieChart({testCounts}) {
  const testCaseData = [
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


  const filteredData = testCaseData.filter(item => testCounts[item.key] > 0);

  const dashBoardPieData = {
    labels: filteredData.map(item => item.name),
    datasets: [
      {
        label: "Test Case Summary",
        data: filteredData.map(item => testCounts[item.key]),
        backgroundColor: filteredData.map(item => item.color),
        borderColor: "white",
        borderWidth: 1
      }
    ]
  };

  const activeCards = testCaseData
    .filter(item => testCounts[item.key] > 0)
    .map(item => ({
      name: item.name,
      count: testCounts[item.key],
      icon: item.icon,
      color: item.color
  }));


  const groupedSlides = [];
  for (let i = 0; i < activeCards.length; i += 3) {
    groupedSlides.push(activeCards.slice(i, i + 3));
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[700px] h-[300px]">

        <Pie
          data={dashBoardPieData}
          options={{
            plugins: {
              legend: {
                position : 'top',
                align : 'center',
                fullSize : false,
                labels: {
                  color: 'black',
                  boxWidth: 20,
                  padding: 10,
                  usePointStyle: true,
                },
              }
            },
            layout: {
              padding: {
                top: 10,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>

      {/* Carousel Slides */}
      <div className="carousel w-full mt-10 overflow-visible">
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

export default PieChart;