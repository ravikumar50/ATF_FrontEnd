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
  const total = parseInt(counters.getAttribute('total') || '0', 10);
  const executed = parseInt(counters.getAttribute('executed') || '0', 10);
  const passed = parseInt(counters.getAttribute('passed') || '0', 10);
  const failed = parseInt(counters.getAttribute('failed') || '0', 10);
  const skipped = parseInt(counters.getAttribute('notExecuted') || '0', 10);
  const error = parseInt(counters.getAttribute('error') || '0', 10);
  const timeout = parseInt(counters.getAttribute('timeout') || '0', 10);
  const aborted = parseInt(counters.getAttribute('aborted') || '0', 10);
  const inconclusive = parseInt(counters.getAttribute('passedButRunAborted') || '0', 10);
  const passedButRunAborted = parseInt(counters.getAttribute('passedButRunAborted') || '0', 10);
  const notRunnable = parseInt(counters.getAttribute('notRunnable') || '0', 10);
  const disconnected = parseInt(counters.getAttribute('disconnected') || '0', 10);
  const warning = parseInt(counters.getAttribute('warning') || '0', 10);
  const completed = parseInt(counters.getAttribute('completed') || '0', 10);
  const inProgress = parseInt(counters.getAttribute('inProgress') || '0', 10);
  const pending = parseInt(counters.getAttribute('pending') || '0', 10);
  

  return {
    total : total,
    executed : executed,
    passed : passed,
    failed : failed,
    skipped : skipped,
    error : error,
    timeout : timeout,
    aborted : aborted,
    inconclusive : inconclusive,
    passedButRunAborted : passedButRunAborted,
    notRunnable : notRunnable,
    disconnected : disconnected,
    warning : warning,
    completed : completed,
    inProgress : inProgress,
    pending : pending
  };
};

export default countTestCases;