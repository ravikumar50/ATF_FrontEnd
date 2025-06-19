const countTestCases = (sampleFile) => {
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

  const p = counters.getAttribute("passed");
  const f = counters.getAttribute("failed");
  const s = counters.getAttribute("notExecuted");
  

  return {p, f, s};
};

export default countTestCases;
