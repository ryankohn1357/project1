const problemReports = [];
const suggestedTrivia = [];

const getProblemReports = () => problemReports;

const getSuggestedTrivia = () => suggestedTrivia;

const createProblemReport = (message) => {
  problemReports.push(message);
};

const suggestTrivia = (source) => {
  suggestedTrivia.push(source);
};

const resolveProblemReport = (index) => {
  if (index < problemReports.length && index >= 0) {
    delete problemReports[index];
    return 0;
  }
  return -1;
};

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
