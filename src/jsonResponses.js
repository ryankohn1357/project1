const users = {};
let numUsers = 0;

// send a JSON response
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// send a JSON head response
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// send JSON object with users and a successful error code 
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
  return respondJSON(request, response, 200, responseJSON);
};

// send successful error code
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// send a 404 not found error code and message/id
const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseJSON);
};

// send a 404 not found error code with no message/id
const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

// add a user with a given age/name
const addUser = (request, response, params) => {
  const responseJSON = { // default message
    message: 'Created Successfully',
  };
  // if a required parameter is missing, send a 400 bad request error with message/id
  if (!params.age || !params.name) {
    responseJSON.message = 'Name and age are both required.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  // if the user with a given name exists, update it and return 204 updated error code
  for (let i = 0; i < numUsers; i++) {
    const key = `user${String(i + 1)}`;
    if (users[key] && users[key].name === params.name) {
      users[key].age = params.age;
      return respondJSONMeta(request, response, 204);
    }
  }
  // otherwise, add user to users and return 201 created code with default message
  const key = `user${String(numUsers + 1)}`;
  const newUser = { name: params.name, age: params.age };
  users[key] = newUser;
  numUsers++;
  return respondJSON(request, response, 201, responseJSON);
};

module.exports = {
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  addUser,
};
