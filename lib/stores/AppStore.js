"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppStore = function AppStore(app) {
  _classCallCheck(this, AppStore);

  this.ssrLocation = null;

  Object.assign(this, app);
};

exports.default = AppStore;