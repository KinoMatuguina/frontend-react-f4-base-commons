'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

var _mobx = require('mobx');

var _Navbar = require('./UIStore/Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _SideDrawer = require('./UIStore/SideDrawer');

var _SideDrawer2 = _interopRequireDefault(_SideDrawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var UIStore = (_class = function () {
  function UIStore(_UIStore) {
    var _this = this;

    _classCallCheck(this, UIStore);

    _initDefineProp(this, 'language', _descriptor, this);

    _initDefineProp(this, 'pendingRequestCount', _descriptor2, this);

    _initDefineProp(this, 'layoutIsShifted', _descriptor3, this);

    _initDefineProp(this, 'screenWidth', _descriptor4, this);

    _initDefineProp(this, 'breakpoints', _descriptor5, this);

    if (_UIStore) {
      Object.assign(this, _UIStore);
    }
    this.navbar = new _Navbar2.default();
    this.sideDrawer = new _SideDrawer2.default();

    (0, _mobx.autorun)(function () {
      return _this.breakpoints.xs ? _this.navbar.toggleSideDrawer('close') : _this.navbar.toggleSideDrawer('open');
    });

    (0, _mobx.autorun)(function () {
      return _this.breakpoints.su && _this.navbar.sideDrawerIsOpen ? _this.shiftLayout('yes') : _this.shiftLayout('no');
    });
  }

  _createClass(UIStore, [{
    key: 'updateScreenWidth',
    value: function updateScreenWidth(width) {
      this.screenWidth = width;
    }
  }, {
    key: 'shiftLayout',
    value: function shiftLayout() {
      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (flag === 'yes') this.layoutIsShifted = true;
      if (flag === 'no') this.layoutIsShifted = false;
    }
  }]);

  return UIStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'language', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return "en_US";
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'pendingRequestCount', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'layoutIsShifted', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'screenWidth', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 1280;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'breakpoints', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return {
      xs: '(max-width: 767px)',
      su: '(min-width: 768px)',
      sm: '(min-width: 768px) and (max-width: 991px)',
      md: '(min-width: 992px) and (max-width: 1199px)',
      mu: '(min-width: 992px)',
      lg: '(min-width: 1200px)'
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, 'updateScreenWidth', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateScreenWidth'), _class.prototype)), _class);
exports.default = UIStore;