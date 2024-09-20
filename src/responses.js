const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  response.write(content);

  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, 200, index, 'text/html');
};

const getCSS = (request, response) => {
  respond(request, response, 200, css, 'text/css');
};

const success = (request, response) => {
  const responseJSON = {
    message: 'this is a successful response',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This is a successful response</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const badRequest = (request, response) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';

    if (!request.query.valid || request.query.valid !== 'true') {
      responseXML = `${responseXML} <message>Missing valid query parameter set to true</message>`;
      responseXML = `${responseXML} <id>badRequest</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 400, responseXML, 'text/xml');
    }

    responseXML = `${responseXML} <message>This request has the required parameters</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  if (!request.query.valid || request.query.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    return respond(request, response, 400, JSON.stringify(responseJSON), 'application/json');
  }

  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const unauthorized = (request, response) => {
  const responseJSON = {
    message: 'You have successfully viewed the content',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';

    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
      responseXML = `${responseXML} <message>Missing loggedIn query parameter set to yes</message>`;
      responseXML = `${responseXML} <id>unauthorized</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 401, responseXML, 'text/xml');
    }

    responseXML = `${responseXML} <message>You have successfully viewed the content</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';

    return respond(request, response, 401, JSON.stringify(responseJSON), 'application/json');
  }

  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'you do not have access to this content',
    id: 'Forbidden',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>you do not have access to this content</message>`;
    responseXML = `${responseXML} <id>Forbidden</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  return respond(request, response, 403, JSON.stringify(responseJSON), 'application/json');
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'internal server error. something went wrong.',
    id: 'Internal Server Error',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>internal server error. something went wrong.</message>`;
    responseXML = `${responseXML} <id>Internal Server Error</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  return respond(request, response, 500, JSON.stringify(responseJSON), 'application/json');
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'a get request for this page has not been implemented yet. check again later for updated content.',
    id: 'Not Implemented',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>a get request for this page has not been implemented yet. check again later for updated content.</message>`;
    responseXML = `${responseXML} <id>Not Implemented</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  return respond(request, response, 501, JSON.stringify(responseJSON), 'application/json');
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'the page you are looking for was not found.',
    id: 'Resource Not Found',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>the page you are looking for was not found.</message>`;
    responseXML = `${responseXML} <id>Resource Not Found</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  return respond(request, response, 404, JSON.stringify(responseJSON), 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
  getIndex,
  getCSS,
};
