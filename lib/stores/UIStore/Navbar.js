'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor;

var _mobx = require('mobx');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var Navbar = (_class = function () {
  function Navbar(data) {
    _classCallCheck(this, Navbar);

    _initDefineProp(this, 'sideDrawerIsOpen', _descriptor, this);

    Object.assign(this, data);
  }

  _createClass(Navbar, [{
    key: 'toggleSideDrawer',
    value: function toggleSideDrawer() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (flag === 'open') this.sideDrawerIsOpen = true;
      if (flag === 'close') this.sideDrawerIsOpen = false;
      if (!flag) this.sideDrawerIsOpen = !this.sideDrawerIsOpen;
    }
  }]);

  return Navbar;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'sideDrawerIsOpen', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'toggleSideDrawer', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'toggleSideDrawer'), _class.prototype)), _class);
exports.default = Navbar;