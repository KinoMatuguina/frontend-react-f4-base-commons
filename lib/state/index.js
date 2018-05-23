'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UIStore = require('../stores/UIStore');

var _UIStore2 = _interopRequireDefault(_UIStore);

var _AuthStore = require('../stores/AuthStore');

var _AuthStore2 = _interopRequireDefault(_AuthStore);

var _AppStore = require('../stores/AppStore');

var _AppStore2 = _interopRequireDefault(_AppStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state) {
  return {
    ui: new _UIStore2.default(state.ui),
    auth: new _AuthStore2.default(state.auth),
    app: new _AppStore2.default(state.app)
  };
};