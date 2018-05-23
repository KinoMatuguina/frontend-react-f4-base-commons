'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

var _mobx = require('mobx');

var _ClientMiddleware = require('../../middlewares/ClientMiddleware');

var _ClientMiddleware2 = _interopRequireDefault(_ClientMiddleware);

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

var SideDrawer = (_class = function () {
  function SideDrawer(data) {
    _classCallCheck(this, SideDrawer);

    _initDefineProp(this, 'menuData', _descriptor, this);

    _initDefineProp(this, 'isFetching', _descriptor2, this);

    _initDefineProp(this, 'errors', _descriptor3, this);

    Object.assign(this, data);
  }

  _createClass(SideDrawer, [{
    key: 'updateMenuData',
    value: function updateMenuData(data) {
      this.menuData = data;
    }
  }, {
    key: 'updateIsFetching',
    value: function updateIsFetching(bool) {
      this.isFetching = bool;
    }
  }, {
    key: 'updateErrors',
    value: function updateErrors(data) {
      this.errors = data;
    }
  }, {
    key: 'clearErrors',
    value: function clearErrors() {
      this.errors = [];
    }
  }, {
    key: 'loadMenu',
    value: function loadMenu(apiUrl) {
      var self = this;

      self.updateIsFetching(true);

      _ClientMiddleware2.default.get(apiUrl, {}, function (jsonRes) {
        self.updateIsFetching(false);
        console.log("Client req Success");
        console.log(jsonRes);

        if (jsonRes) {
          self.updateMenuData(jsonRes.body || jsonRes);
        }
      }, function (errorMessages) {
        self.updateIsFetching(false);
        self.updateErrors(errorMessages);
      });
    }
  }]);

  return SideDrawer;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'menuData', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'isFetching', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'errors', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, 'updateMenuData', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateMenuData'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateIsFetching', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateIsFetching'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateErrors'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'clearErrors'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadMenu', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'loadMenu'), _class.prototype)), _class);
exports.default = SideDrawer;