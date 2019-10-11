const fs = require('fs');

// read files into memory
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const notFound = fs.readFileSync(`${__dirname}/../client/notFound.html`);
const admin = fs.readFileSync(`${__dirname}/../client/admin.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const reportProblemImage = fs.readFileSync(`${__dirname}/../client/images/report-a-problem-triangle.png`);
const problemReportedImage = fs.readFileSync(`${__dirname}/../client/images/reported-triangle.png`);

// returns the homepage
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// returns the default page for unrecognized requests
const getNotFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(notFound);
  response.end();
};

// returns the admin page where admins can add/remove trivia,
// respond to problem reports and suggestions
const getAdmin = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(admin);
  response.end();
};

// returns the CSS for the homepage
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// return report a problem icon
const getReportProblemImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(reportProblemImage);
  response.end();
};

// return problem reported icon
const getProblemReportedImage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(problemReportedImage);
  response.end();
};

module.exports = {
  getIndex,
  getNotFound,
  getAdmin,
  getCSS,
  getReportProblemImage,
  getProblemReportedImage,
};
