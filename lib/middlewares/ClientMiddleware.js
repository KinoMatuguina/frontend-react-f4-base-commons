'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _superagentBluebirdPromise = require('superagent-bluebird-promise');

var _superagentBluebirdPromise2 = _interopRequireDefault(_superagentBluebirdPromise);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientMiddleware = function () {
  function ClientMiddleware() {
    _classCallCheck(this, ClientMiddleware);
  }

  _createClass(ClientMiddleware, null, [{
    key: 'handleResponse',
    value: function handleResponse(response, successCB, errorCB) {

      var status = response.status || response.statusCode;
      console.log('STATUS ' + status);
      if (status && !response.error && status >= 200 && status < 300) {
        console.log("OK response");
        successCB && successCB(response);
      } else {
        console.log("Response with errors");
        var errorMessages = this.handleErrorResponse(response);
        errorCB && errorCB(errorMessages);
      }
    }
  }, {
    key: 'parseErrors',
    value: function parseErrors(errObjArray) {

      var parsed = [];

      if (errObjArray && errObjArray.map && errObjArray.length > 0) {

        parsed = errObjArray.map(function (obj) {
          var fieldName = _changeCase2.default.titleCase(obj.field);
          var message = obj.defaultMessage;

          return fieldName + ' ' + message;
        });
      }

      console.log("PARSED");
      console.log(parsed);
      return parsed;
    }
  }, {
    key: 'handleErrorResponse',
    value: function handleErrorResponse(errRes) {
      var errorMessages = void 0;
      console.log("HANDLE ERROR RESPONSE");
      console.log(errRes);

      var body = errRes.body;

      if (body && body.error && body.error.map && body.error.length > 0) {
        errorMessages = this.parseErrors(body.error);
      } else if (body && body.error && body.error.messages) {
        errorMessages = body.error.messages;
      } else if (body && body.error && body.error.code) {
        if (body.error.code === "ECONNREFUSED") {
          errorMessages = ["Service is unavailable at the moment. Please try again later."];
        }
      } else if (body && body.error && body.error.errors) {
        errorMessages = _.map(body.error.errors, function (error) {
          return error.defaultMessage;
        });
      } else if (body && body.error && body.error.error && typeof body.error.error === 'string') {
        errorMessages = [body.error.error];
      }

      return errorMessages;
    }
  }, {
    key: 'upload',
    value: function upload(url, fieldName, file, progressCB, successCB, errorCB) {
      var _this = this;

      console.log('FIELDNAME ' + fieldName);
      console.log("FILE");
      console.log(file.mimetype);
      console.log(file.type);

      _superagentBluebirdPromise2.default.post(url).accept('application/json').withCredentials().field('mimetype', file.mimetype).attach('file', file, 'tmp-upload-file.jpg').on('progress', function (e) {
        console.log(e.loaded + ' of ' + e.total + ' uploaded.');
        progressCB && progressCB(e.loaded, e.total);
      }).promise().then(function (res) {

        _this.handleResponse(res, successCB, errorCB);
      }).catch(function (errRes) {
        console.log("ClientMiddleware error");

        var errorMessages = _this.handleErrorResponse(errRes);

        errorCB && errorCB(errorMessages);
      });
    }
  }, {
    key: 'post',
    value: function post(url, postObj, successCB, errorCB) {
      var _this2 = this;

      _superagentBluebirdPromise2.default.post(url).accept('application/json').withCredentials().send(postObj).promise().then(function (res) {

        _this2.handleResponse(res, successCB, errorCB);
      }).catch(function (errRes) {
        console.log("ClientMiddleware error");

        var errorMessages = _this2.handleErrorResponse(errRes);

        errorCB && errorCB(errorMessages);
      });
    }
  }, {
    key: 'get',
    value: function get(url, queryObj, successCB, errorCB) {
      var _this3 = this;

      _superagentBluebirdPromise2.default.get(url).accept('application/json').withCredentials().query(queryObj).promise().then(function (res) {

        _this3.handleResponse(res, successCB, errorCB);
      }).catch(function (errRes) {
        console.log("ClientMiddleware error");

        var errorMessages = _this3.handleErrorResponse(errRes);

        errorCB && errorCB(errorMessages);
      });
    }
  }, {
    key: 'put',
    value: function put(url, putObj, successCB, errorCB) {
      var _this4 = this;

      _superagentBluebirdPromise2.default.put(url).accept('application/json').withCredentials().send(putObj).promise().then(function (res) {
        _this4.handleResponse(res, successCB, errorCB);
      }).catch(function (errRes) {
        console.log("ClientMiddleware error");

        var errorMessages = _this4.handleErrorResponse(errRes);

        errorCB && errorCB(errorMessages);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(url, id, successCB, errorCB) {
      var _this5 = this;

      var deleteUrl = '' + url + id;

      if (url.slice(-1) !== '/') {
        deleteUrl = url + '/' + id;
      }

      _superagentBluebirdPromise2.default.delete(deleteUrl).accept('application/json').withCredentials().promise().then(function (res) {
        _this5.handleResponse(res, successCB, errorCB);
      }).catch(function (errRes) {
        console.log("ClientMiddleware error");

        var errorMessages = _this5.handleErrorResponse(errRes);

        errorCB && errorCB(errorMessages);
      });
    }
  }]);

  return ClientMiddleware;
}();

exports.default = ClientMiddleware;