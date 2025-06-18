import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PieChart } from '@mui/x-charts';

const whiteLegendTheme = createTheme({
  components: {
    MuiChartsLegend: {
      styleOverrides: {
        root: {
          // This targets the overall legend container
          color: "#fff",
          // Now target the individual labels inside it
          "& .MuiChartsLegend-label": {
            color: "#fff",         // white text
            fontSize: "16px",      // larger font size
            fontWeight: "bold",    // bold weight
          },
        },
      },
    },
  },
});

function IndividualDashBoard() {
    
  const location = useLocation();
  const { sampleFile } = location.state || { sampleFile: '' };
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);  
  const [skipped, setSkipped] = useState(0);
  useEffect(() => {
    if (!sampleFile) {
      console.log("No SampleFile data provided");
      return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sampleFile, "application/xml");

    const parserError = xmlDoc.getElementsByTagName("parsererror");
    if (parserError.length > 0) {
      console.error("Error parsing XML:", parserError[0].textContent);
      return;
    }

    const namespace = "http://microsoft.com/schemas/VisualStudio/TeamTest/2010";
    const counters = xmlDoc.getElementsByTagNameNS(namespace, "Counters")[0];

    if (!counters) {
      console.log("Counters tag not found");
      return;
    }

    // const passed = counters.getAttribute("passed");
    // const failed = counters.getAttribute("failed");
    // const skipped = counters.getAttribute("notExecuted");
    setPassed(counters.getAttribute("passed"));
    setFailed(counters.getAttribute("failed"));
    setSkipped(counters.getAttribute("notExecuted"));

    
  }, [sampleFile]);

  return (
  <ThemeProvider theme={whiteLegendTheme}>
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Test Result Summary
          </h2>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: passed, label: "Passed" },
                  { id: 1, value: skipped, label: "Skipped" },
                  { id: 2, value: failed, label: "Failed" },
                ],
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { additionalRadius: -10, color: "gray" },
                cornerRadius: 4,
                // slice‐center labels (you already have these white)
                labelComponent: ({ label, value, x, y }) => (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#fff"
                    fontSize="12px"
                    fontWeight="600"
                  >
                    {label} ({value})
                  </text>
                ),
              },
            ]}
            width={400}
            height={400}
            // move legend inside or to bottom if you prefer
            legend={{ position: "right" }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default IndividualDashBoard;
