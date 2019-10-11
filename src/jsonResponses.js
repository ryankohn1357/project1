// get all required modules
const trivia = require('./trivia.js');
const admin = require('./admin.js');

// send a JSON response
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// send a head response
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// just return a 200 status code
const randomTriviaMeta = (request, response) => respondJSONMeta(request, response, 200);

// return a JSON object containing an array with a random piece of trivia
const randomTrivia = (request, response) => {
  const triviaToReturn = trivia.getRandomTrivia();
  const responseJSON = {
    triviaToReturn,
  };
  return respondJSON(request, response, 200, responseJSON);
};

// returns a JSON object with an array of trivia 
const browseTrivia = (request, response, params) => {
  // defaults
  let amount = 5;
  let offset = 0;
  if (params.amount) {
    amount = params.amount;
  }
  if (params.offset) {
    offset = params.offset;
  }
  const triviaToReturn = trivia.getTrivia(Number(amount), Number(offset));
  const responseJSON = {
    triviaToReturn,
  };
  return respondJSON(request, response, 200, responseJSON);
};

// just return a 200 status code
const browseTriviaMeta = (request, response) => respondJSONMeta(request, response, 200);

// returns a JSON object with the amount of trivia available
const getTriviaAmount = (request, response) => {
  const triviaAmount = trivia.getTriviaAmount();
  const responseJSON = {
    triviaAmount,
  };
  return respondJSON(request, response, 200, responseJSON);
};

// just return a 200 status code
const getTriviaAmountMeta = (request, response) => respondJSONMeta(request, response, 200);

// adds trivia with the given parameters
const addTrivia = (request, response, params) => {
  const responseJSON = { // default message
    message: 'Created Successfully',
  };
  // if a required parameter is missing, send a 400 bad request error with message/id
  if (!params.content || !params.source || !params.date) {
    responseJSON.message = 'Trivia content, source, and creation date are all required.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  trivia.addTrivia(params.content, params.source, params.date);
  // send a 201 status code with success message
  return respondJSON(request, response, 201, responseJSON);
};

// removes trivia with the given source
const removeTrivia = (request, response, params) => {
  const responseJSON = { // default message
    message: 'Removed Successfully',
  };
  // if a required parameter is missing, send a 400 bad request error with message/id
  if (!params.source) {
    responseJSON.message = 'Source paramter is required.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  trivia.removeTrivia(params.source);
  // send a 204 status code with success message
  return respondJSON(request, response, 204, responseJSON);
};

// returns a JSON object with an array of problem report objects
const getProblemReports = (request, response) => {
  const problemReports = admin.getProblemReports();
  const responseJSON = {
    problemReports,
  };
  return respondJSON(request, response, 200, responseJSON);
};

// just return a 200 status code
const getProblemReportsMeta = (request, response) => respondJSONMeta(request, response, 200);

// creates a new problem report with the given parameters
const createProblemReport = (request, response, params) => {
  const responseJSON = {
    message: 'Created Successfully',
  };
  // if a required parameter is missing, send a 400 bad request error with message/id
  if (!params.message || !params.source) {
    responseJSON.message = 'Message and source parameters required for problem report.';
    respondJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  admin.createProblemReport({ message: params.message, source: params.source });
  // send a 201 status code with success message
  return respondJSON(request, response, 201, responseJSON);
};

// removes a problem report with the given index
const resolveProblemReport = (request, response, params) => {
  const responseJSON = {
    message: 'Problem Report Resolved',
  };
  // if index is missing, send a 400 bad request error with message/id
  if (!params.index) {
    responseJSON.message = 'Missing index parameter for problem report.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  const status = admin.resolveProblemReport(params.index);
  // if index is out of range, send a 400 bad request error with message/id
  if (status === -1) {
    responseJSON.message = 'Index parameter out of range for problem report.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  // send a 204 status code with success message
  return respondJSON(request, response, 204, responseJSON);
};

// returns a JSON object with an array of all suggested trivia
const getSuggestedTrivia = (request, response) => {
  const suggestedTrivia = admin.getSuggestedTrivia();
  const responseJSON = {
    suggestedTrivia,
  };
  return respondJSON(request, response, 200, responseJSON);
};

// just return a 200 status code
const getSuggestedTriviaMeta = (request, response) => respondJSONMeta(request, response, 200);

// adds a new suggestion to the list of suggested trivia
const suggestTrivia = (request, response, params) => {
  const responseJSON = {
    message: 'Suggestion Sent',
  };
  // if there's nothing in the suggestion, send a 400 bad request error with message/id
  if (!params.content) {
    responseJSON.message = 'Missing content parameter for trivia suggestion.';
    respondJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  admin.suggestTrivia(params.content);
  // send a 201 status code with success message
  return respondJSON(request, response, 201, responseJSON);
};

// remove a suggested trivia with the given index from the list
const resolveSuggestedTrivia = (request, response, params) => {
  const responseJSON = {
    message: 'Suggested Trivia Resolved',
  };
    // if index is missing, send a 400 bad request error with message/id
  if (!params.index) {
    responseJSON.message = 'Missing index parameter for suggested trivia.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  const status = admin.resolveSuggestedTrivia(params.index);
  // if index is out of range, send a 400 bad request error with message/id
  if (status === -1) {
    responseJSON.message = 'Index parameter out of range for suggested trivia.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  // send a 204 status code with success message
  return respondJSON(request, response, 204, responseJSON);
};

// just return a 404 status code
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  randomTrivia,
  browseTrivia,
  getTriviaAmount,
  addTrivia,
  removeTrivia,
  getProblemReports,
  createProblemReport,
  resolveProblemReport,
  getSuggestedTrivia,
  suggestTrivia,
  resolveSuggestedTrivia,
  randomTriviaMeta,
  browseTriviaMeta,
  getTriviaAmountMeta,
  getProblemReportsMeta,
  getSuggestedTriviaMeta,
  notFoundMeta,
};
