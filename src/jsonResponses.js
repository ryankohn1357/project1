const trivia = require('./trivia.js');
const admin = require('./admin.js');

// send a JSON response
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const randomTrivia = (request, response, params) => {
  let triviaToReturn;
  if (!params.tag) {
    triviaToReturn = trivia.getRandomTrivia();
  } else {
    triviaToReturn = trivia.getRandomTrivia(params.tag);
  }
  const responseJSON = {
    triviaToReturn,
  };
  return respondJSON(request, response, 200, responseJSON);
};

const browseTrivia = (request, response, params) => {
  let tag = 'unknown';
  let amount = 10;
  let offset = 0;
  if (params.tag) {
    tag = params.tag;
  }
  if (params.amount) {
    amount = params.amount;
  }
  if (params.offset) {
    offset = params.offset;
  }
  const triviaToReturn = trivia.getTriviaByTag(tag, amount, offset);
  const responseJSON = {
    triviaToReturn,
  };
  return respondJSON(request, response, 200, responseJSON);
};

const addTrivia = (request, response, params) => {
  const responseJSON = { // default message
    message: 'Created Successfully',
  };
  // if a required parameter is missing, send a 400 bad request error with message/id
  if (!params.params.content || !params.source || !params.date) {
    responseJSON.message = 'Trivia content, source, and creation date are all required.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (params.tag) {
    trivia.addTrivia(params.content, params.source, params.date, params.tag);
  } else {
    trivia.addTrivia(params.content, params.source, params.date);
  }
  return respondJSON(request, response, 201, responseJSON);
};

const getProblemReports = (request, response) => {
  const problemReports = admin.getProblemReports();
  const responseJSON = {
    problemReports,
  };
  return respondJSON(request, response, 200, responseJSON);
};

const createProblemReport = (request, response, params) => {
  const responseJSON = {
    message: 'Created Successfully',
  };
  if (!params.message) {
    responseJSON.message = 'Missing message parameter for problem report.';
    respondJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  admin.createProblemReport(params.message);
  return respondJSON(request, response, 201, responseJSON);
};

const resolveProblemReport = (request, response, params) => {
  const responseJSON = {
    message: 'Problem Report Resolved',
  };
  if (!params.index) {
    responseJSON.message = 'Missing index parameter for problem report.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  const status = admin.resolveProblemReport(params.index);
  if (status === -1) {
    responseJSON.message = 'Index parameter out of range for problem report.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const getSuggestedTrivia = (request, response) => {
  const suggestedTrivia = admin.getSuggestedTrivia();
  const responseJSON = {
    suggestedTrivia,
  };
  return respondJSON(request, response, 200, responseJSON);
};

const suggestTrivia = (request, response, params) => {
  const responseJSON = {
    message: 'Suggestion Sent',
  };
  if (!params.source) {
    responseJSON.message = 'Missing source parameter for trivia suggestion.';
    respondJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  admin.suggestTrivia(params.source);
  return respondJSON(request, response, 201, responseJSON);
};

const resolveSuggestedTrivia = (request, response, params) => {
  const responseJSON = {
    message: 'Suggested Trivia Resolved',
  };
  if (!params.index) {
    responseJSON.message = 'Missing index parameter for suggested trivia.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  const status = admin.resolveSuggestedTrivia(params.index);
  if (status === -1) {
    responseJSON.message = 'Index parameter out of range for suggested trivia.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  randomTrivia,
  browseTrivia,
  addTrivia,
  getProblemReports,
  createProblemReport,
  resolveProblemReport,
  getSuggestedTrivia,
  suggestTrivia,
  resolveSuggestedTrivia,
};
