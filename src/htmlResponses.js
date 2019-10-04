const fs = require('fs');

// read files into memory
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const notFound = fs.readFileSync(`${__dirname}/../client/notFound.html`);
const admin = fs.readFileSync(`${__dirname}/../client/admin.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// returns the homepage
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getNotFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(notFound);
  response.end();
};

const getAdmin = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(admin);
  response.end();
};

// returns the CSS for the homepage
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports = {
  getIndex,
  getNotFound,
  getAdmin,
  getCSS,
};
