const countTestCases = (sampleFile) => {
  // Parse XML
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(sampleFile, 'application/xml');

  // Handle parse errors
  const parserError = xmlDoc.getElementsByTagName('parsererror');
  if (parserError.length > 0) {
    console.error('Error parsing XML:', parserError[0].textContent);
    return { Passed: 0, Failed: 0, Warning: 0, Skipped: 0 };
  }

  // TRX namespace
  const ns = 'http://microsoft.com/schemas/VisualStudio/TeamTest/2010';
  const counters = xmlDoc.getElementsByTagNameNS(ns, 'Counters')[0];

  if (!counters) {
    console.warn('Counters element not found in TRX file.');
    return { Passed: 0, Failed: 0, Warning: 0, Skipped: 0 };
  }

  // Read the needed attributes
  const passed = parseInt(counters.getAttribute('passed') || '0', 10);
  const failed = parseInt(counters.getAttribute('failed') || '0', 10);
  const warning = parseInt(counters.getAttribute('warning') || '0', 10);
  // skipped = notExecuted + notRunnable + disconnected? Here we use notExecuted
  const skipped = parseInt(counters.getAttribute('notExecuted') || '0', 10);

  return {
    Passed: passed,
    Failed: failed,
    Warning: warning,
    Skipped: skipped,
  };
};

export default countTestCases;