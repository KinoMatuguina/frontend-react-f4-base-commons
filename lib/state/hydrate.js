'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dehydrate = dehydrate;
exports.rehydrate = rehydrate;

var _jsonStringifySafe = require('json-stringify-safe');

var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);

var _mobx = require('mobx');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 Dehydrate (on server)
*/
function dehydrate(store) {
  // convert store to json
  return (0, _jsonStringifySafe2.default)((0, _mobx.toJS)(store, true));
}

/**
  Rehydrate (on client)
*/
// from rfx stack

function rehydrate(injectState) {
  // inject initial state into stores
  console.log(window.__STATE);
  return (0, _store2.default)(window.__STATE, injectState);
}