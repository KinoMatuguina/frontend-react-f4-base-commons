"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, inject) {
  if (state) store = inject(state);
  return store;
};

var store = null;