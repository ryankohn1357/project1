// get all required modules
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// find correct port to use
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// handle HEAD requests
const handleHead = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsersMeta(request, response);
  } else if (parsedUrl.pathname === '/notReal') {
    jsonHandler.notRealMeta(request, response);
  } else {
    jsonHandler.notRealMeta(request, response);
  }
};

// handle POST requests
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
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

      // pass to our addUser function
      jsonHandler.addUser(request, res, bodyParams);
    });
  }
};

// handle GET requests
const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else if (parsedUrl.pathname === '/notReal') {
    jsonHandler.notReal(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

// method to call when a request is received
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  // call appropriate handler method
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else if (request.method === 'HEAD') {
    handleHead(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);
