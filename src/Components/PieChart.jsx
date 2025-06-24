import {Chart as ChartJs,ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title} from "chart.js";
import {Pie} from "react-chartjs-2"
import { SiTicktick } from "react-icons/si";
import { ImCross } from "react-icons/im";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { IoIosWarning } from "react-icons/io";
import {FaListAlt,FaBug, FaHourglassHalf, FaBan, FaQuestionCircle, FaCheckDouble, FaTimesCircle, FaPlug, FaCheckCircle, FaSyncAlt, FaClock } from "react-icons/fa";
import { useState } from "react";
import CarouselSlide from "./CaraouselSlide";


const centerTextPlugin = {
  id: 'centerTextPlugin',
  afterDraw: (chart) => {
    const { width, height, ctx } = chart;
    const dataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);

    // Find the only visible segment
    const visibleIndexes = meta.data.map((_, i) => !meta.data[i].hidden);
    const visibleCount = visibleIndexes.filter(Boolean).length;
    const visibleIndex = visibleIndexes.indexOf(true);

    if (visibleCount === 1 && visibleIndex !== -1) {
      const value = dataset.data[visibleIndex];
      const label = chart.data.labels[visibleIndex];

      ctx.save();
      ctx.font = 'bold 20px sans-serif';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${label}: ${value}`, width/2, height/2+25);
      ctx.restore();
    }
  }
};


ChartJs.register(ArcElement, Tooltip, Legend,centerTextPlugin);


function PieChart({testCounts}) {
  const [selectedLegendIndex, setSelectedLegendIndex] = useState(null);

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


  const filteredData = testCaseData.filter(
    item => item.key !== "total" && testCounts[item.key] > 0
  );

  const dashBoardPieData = {
    labels: filteredData.map(item => item.name),
    datasets: [
      {
        label: "Test Case Summary",
        data: filteredData.map(item => testCounts[item.key]),
        backgroundColor: filteredData.map(item => item.color),
        borderColor: "white",
        borderWidth: 0
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
              position: 'top',
              align: 'center',
              fullSize: false,
              labels: {
                color: 'black',
                boxWidth: 20,
                padding: 10,
                usePointStyle: true,
                generateLabels: (chart) => {
                  const data = chart.data;
                  if (data.labels.length && data.datasets.length) {
                    return data.labels.map((label, i) => {
                      const meta = chart.getDatasetMeta(0);
                      const hidden = meta.data[i] && meta.data[i].hidden;

                      return {
                        text: label,
                        fillStyle: data.datasets[0].backgroundColor[i],
                        hidden: hidden,
                        index: i,
                        fontColor: 'black',
                        fontStyle: i === selectedLegendIndex ? 'bold' : 'normal',
                      };
                    });
                  }
                  return [];
                }
              },
              onClick: (e, legendItem, legend) => {
                const chart = legend.chart;
                const index = legendItem.index;
                const meta = chart.getDatasetMeta(0);

                const visibleCount = meta.data.filter((_, i) => !meta.data[i].hidden).length;

                if (visibleCount === 1 && !meta.data[index].hidden) {
                  meta.data.forEach((_, i) => {
                    chart.getDatasetMeta(0).data[i].hidden = false;
                  });
                  setSelectedLegendIndex(null); // Reset selection
                } else {
                  meta.data.forEach((_, i) => {
                    chart.getDatasetMeta(0).data[i].hidden = i !== index;
                  });
                  setSelectedLegendIndex(index); // Set selected index
                }

                chart.update();
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || '';
                  const value = context.raw;
                  return `${label}: ${value}`;
                }
              }
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
      <div className="carousel w-full mt-5 overflow-visible">
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
