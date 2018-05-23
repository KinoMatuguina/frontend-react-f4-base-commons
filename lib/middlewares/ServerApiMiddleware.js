'use strict';

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiHost = _config2.default.apiHost;
var serverApiMiddleware = function serverApiMiddleware(req, res, next) {

  console.log('URL: ' + req.url);

  var options = {
    method: req.method,
    uri: apiHost + req.url,
    headers: req.headers,
    body: req.body,
    resolveWithFullResponse: true,
    json: true
  };

  (0, _requestPromise2.default)(options).then(function (response) {
    console.log("SUCCESS");
    console.log(response);
    res.send(response);
  }).catch(function (err) {
    console.log("ERROR");
    res.send(err);
  });
};

module.exports = serverApiMiddleware;