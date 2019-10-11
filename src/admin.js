// store all problem reports and suggested trivia
const problemReports = []; // object with both message and source of trivia with problem
const suggestedTrivia = []; // just messages

// returns all problem reports
const getProblemReports = () => problemReports;

// returns all suggested trivia
const getSuggestedTrivia = () => suggestedTrivia;

// adds a new problem report object if the required parameters are there
const createProblemReport = (problemReport) => {
  if (problemReport.message && problemReport.source) {
    problemReports.push(problemReport);
  }
};

// adds a new trivia suggestion
const suggestTrivia = (content) => {
  suggestedTrivia.push(content);
};

// sets a problem report with the given index to null
// we do this instead of removing it from array in order
// to not mess with indexes for future resolutions
const resolveProblemReport = (index) => {
  if (index < problemReports.length && index >= 0) {
    delete problemReports[index];
    return 0;
  }
  return -1;
};

// sets a suggested trivia with the given index to null
// we do this instead of removing it from array in order
// to not mess with indexes for future resolutions
const resolveSuggestedTrivia = (index) => {
  if (index < suggestTrivia.length && index >= 0) {
    delete suggestedTrivia[index];
    return 0;
  }
  return -1;
};

module.exports = {
  getProblemReports,
  getSuggestedTrivia,
  createProblemReport,
  suggestTrivia,
  resolveProblemReport,
  resolveSuggestedTrivia,
};
