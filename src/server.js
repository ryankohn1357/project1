// get all required modules
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// find correct port to use
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// method to call when a request is received
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query); // get all query parameters
  // call appropriate handler method
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
    case '/randomTrivia':
      jsonHandler.randomTrivia(request, response, params);
      break;
    case '/browseTrivia':
      jsonHandler.browseTrivia(request, response, params);
      break;
    case '/addTrivia':
      jsonHandler.addTrivia(request, response, params);
      break;
    default:
      htmlHandler.getNotFound(request, response);
      break;
  }
};
http.createServer(onRequest).listen(port);
