/**
 * @project hackslay
 * A javascript version of hack.
 * @file server.js
 * This Node.js application file serves the basic webpage and 
 * associated files, as well as serving the actual game file.
 * @author L0j1k
 * @contact L0j1k@L0j1k.com
 * @license GPLv3
 * @version 0.0.1_prealpha
 */

var fs = require('fs');
var http = require('http');
var qs = require('querystring');
var url = require('url');

var _app = {
  mime: {
    css: 'text/css',
    html: 'text/html',
    ico: 'image/x-icon',
    jpg: 'image/jpeg',
    js: 'text/javascript',
    png: 'image/png'
  },
  requestIDLength: 12,
  serverPort: 8010
};

var _genID = function( requestIDLength ) {
  var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var id = '';

  for(var i=0; i<requestIDLength; i++) {
    id += charset.substr(Math.random()*charset.length, 1);;
  }
  return id;
};

var _log = function( data ) {
  console.log(data);
};

var _sendFile = function( file, headers, res ) {
  headers = (typeof(headers) === 'Object') ? headers : {};
  var fileType = file.substr(file.lastIndexOf('.')+1);
  headers['Content-Type'] = _app.mime[fileType];

  fs.readFile(file, function(err, data) {
    if (err) {
      _sendMessage(500, headers, res);
    } else {
      res.writeHead(200, headers);
      res.end(data);
    }
  });
};

var _sendMessage = function( code, headers, res ) {
  headers = (typeof(headers) === 'Object') ? headers : {};
  headers['Content-Type'] = 'text/html';
  msgFore = '<!doctype html><html><head><meta charset="utf-8><title>';
  msgMid = '</title></head><body>';
  msgAft = '</body></html>';

  switch (code) {
    case 403:
      statusCode = 403;
      statusMsg = 'Unauthorized';
      break;
    case 404:
      statusCode = 404;
      statusMsg = 'Resource Not Found';
      break;
    case 405:
      statusCode = 405;
      statusMsg = 'Method Not Supported';
      break;
    case 413:
      statusCode = 413;
      statusMsg = 'Request Entity Too Large';
      break;
    case 420:
      statusCode = 420;
      statusMsg = 'Chill Out';
      break;
    default:
      statusCode = 500;
      statusMsg = 'Internal Server Error';
      break;
  }

  res.writeHead(statusCode, statusMsg, headers);
  res.end(msgFore+statusCode+msgMid+statusCode+': '+statusMsg+msgAft);
};

/**
 * @task instantiate a server instance and serve content
 */
var server = http.createServer(function(req, res) {
  var requestID = _genID(_app.requestIDLength);
  var requestPath = url.parse(req.url).pathname;

  if (req.method == 'GET') {
    _log('['+requestID+'] for ('+requestPath+')');
    if (requestPath == '/favicon.ico') {
      _sendFile('server/favicon.ico', {}, res);
    } else if (requestPath == '/site.js') {
      _sendFile('server/site.js', {}, res);
    } else if (requestPath == '/default.css') {
      _sendFile('server/default.css', {}, res);
    } else if (requestPath == '/hackslay.js') {
      _sendFile('server/hackslay.js', {}, res);
    } else {
      _sendFile('server/index.html', {}, res);
    }

  } else if (req.method == 'POST') {
    _log('['+requestID+'] for ('+requestPath+')');
    if (requestPath == '/action') {
      var requestBody = '';
      req.on('data', function(chunk) {
        requestBody += chunk;
        if (requestBody.length > 1e6) {
          _sendMessage(413, {}, res);
        }
      });
      req.on('end', function() {
        var formData = qs.parse(requestBody);
        ///@todo write a fucking API
      });
    } else {
      _sendMessage(405, {}, res);
    }

  } else {
    _log('['+requestID+'] for ('+requestPath+')');
    _sendMessage(405, {}, res); 
  }
});
server.listen(_app.serverPort);
server.on('error', function(err) {
  _log(err);
});
