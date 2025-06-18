import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function IndividualDashBoard() {
  
  
  const location = useLocation();
  const SampleFile = location.state?.sampleFile;

  useEffect(() => {
    if (!SampleFile) {
      console.log("No SampleFile data provided");
      return;
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(SampleFile, "application/xml");

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

    const passed = counters.getAttribute("passed");
    const failed = counters.getAttribute("failed");
    const skipped = counters.getAttribute("notExecuted");

    console.log("✅ Passed:", passed);
    console.log("❌ Failed:", failed);
    console.log("⏭️ Skipped:", skipped);
  }, [SampleFile]);

  return <div>Check console for test results</div>;
}

export default IndividualDashBoard;
