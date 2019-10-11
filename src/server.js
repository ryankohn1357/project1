// get all required modules
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// find correct port to use
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// handle all post requests
const handlePost = (parsedUrl, request, response) => {
  const res = response;
  const body = []; // array to store data bytes

  // handle errors with 400 code
  request.on('error', (err) => {
    console.dir(err);
    res.statusCode = 400;
    res.end();
  });

  // read data bytes in chunks and store them in array
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    // convert array to string
    const bodyString = Buffer.concat(body).toString();
    // parse string into params object
    const bodyParams = query.parse(bodyString);
    if (parsedUrl.pathname === '/suggestTrivia') {
      jsonHandler.suggestTrivia(request, response, bodyParams);
    } else if (parsedUrl.pathname === '/createProblemReport') {
      jsonHandler.createProblemReport(request, response, bodyParams);
    } else if (parsedUrl.pathname === '/resolveProblemReport') {
      jsonHandler.resolveProblemReport(request, response, bodyParams);
    } else if (parsedUrl.pathname === '/resolveSuggestedTrivia') {
      jsonHandler.resolveSuggestedTrivia(request, response, bodyParams);
    } else if (parsedUrl.pathname === '/addTrivia') {
      jsonHandler.addTrivia(request, response, bodyParams);
    } else if (parsedUrl.pathname === '/removeTrivia') {
      jsonHandler.removeTrivia(request, response, bodyParams);
    }
  });
};

// handle all get requests
const handleGet = (parsedUrl, request, response) => {
  const params = query.parse(parsedUrl.query);
  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/admin':
      htmlHandler.getAdmin(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    case '/reportProblemImage.png':
      htmlHandler.getReportProblemImage(request, response);
      break;
    case '/problemReportedImage.png':
      htmlHandler.getProblemReportedImage(request, response);
      break;
    case '/randomTrivia':
      jsonHandler.randomTrivia(request, response);
      break;
    case '/browseTrivia':
      jsonHandler.browseTrivia(request, response, params);
      break;
    case '/triviaAmount':
      jsonHandler.getTriviaAmount(request, response);
      break;
    case '/suggestedTrivia':
      jsonHandler.getSuggestedTrivia(request, response);
      break;
    case '/problemReports':
      jsonHandler.getProblemReports(request, response);
      break;
    default:
      htmlHandler.getNotFound(request, response);
      break;
  }
};

// handle all head requests
const handleHead = (parsedUrl, request, response) => {
  switch (parsedUrl.pathname) {
    case '/randomTrivia':
      jsonHandler.randomTriviaMeta(request, response);
      break;
    case '/browseTrivia':
      jsonHandler.browseTriviaMeta(request, response);
      break;
    case '/triviaAmount':
      jsonHandler.getTriviaAmountMeta(request, response);
      break;
    case '/suggestedTrivia':
      jsonHandler.getSuggestedTriviaMeta(request, response);
      break;
    case '/problemReports':
      jsonHandler.getProblemReportsMeta(request, response);
      break;
    default:
      jsonHandler.notFoundMeta(request, response);
      break;
  }
};

// method to call when a request is received
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  // call appropriate handler method
  if (request.method === 'GET') {
    handleGet(parsedUrl, request, response);
  } else if (request.method === 'POST') {
    handlePost(parsedUrl, request, response);
  } else if (request.method === 'HEAD') {
    handleHead(parsedUrl, request, response);
  }
};

http.createServer(onRequest).listen(port);
