'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

var _mobx = require('mobx');

var _ClientMiddleware = require('../middlewares/ClientMiddleware');

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

var AuthStore = (_class = function () {
  function AuthStore(_AuthStore) {
    _classCallCheck(this, AuthStore);

    _initDefineProp(this, 'username', _descriptor, this);

    _initDefineProp(this, 'password', _descriptor2, this);

    _initDefineProp(this, 'loggingIn', _descriptor3, this);

    _initDefineProp(this, 'loggingOut', _descriptor4, this);

    _initDefineProp(this, 'loginErrors', _descriptor5, this);

    _initDefineProp(this, 'logoutErrors', _descriptor6, this);

    _initDefineProp(this, 'sessionUser', _descriptor7, this);

    _initDefineProp(this, 'hydrating', _descriptor8, this);

    if (_AuthStore) {
      Object.assign(this, _AuthStore);
    }
  }

  _createClass(AuthStore, [{
    key: 'updateUsername',
    value: function updateUsername(username) {
      this.username = username;
    }
  }, {
    key: 'updatePassword',
    value: function updatePassword(password) {
      this.password = password;
    }
  }, {
    key: 'updateLoginErrors',
    value: function updateLoginErrors(errors) {
      this.loginErrors = errors;
    }
  }, {
    key: 'updateLogoutErrors',
    value: function updateLogoutErrors(errors) {
      this.logoutErrors = errors;
    }
  }, {
    key: 'updateSessionUser',
    value: function updateSessionUser(user) {
      this.sessionUser = user;
    }
  }, {
    key: 'updateLoggingIn',
    value: function updateLoggingIn(bool) {
      this.loggingIn = bool;
    }
  }, {
    key: 'updateLoggingOut',
    value: function updateLoggingOut(bool) {
      this.logginOut = bool;
    }
  }, {
    key: 'clearFields',
    value: function clearFields() {
      this.username = '';
      this.password = '';
    }
  }, {
    key: 'clearLoginErrors',
    value: function clearLoginErrors() {
      this.loginErrors = [];
    }
  }, {
    key: 'clearLogoutErrors',
    value: function clearLogoutErrors() {
      this.logoutErrors = [];
    }
  }, {
    key: 'setField',
    value: function setField(name, value) {
      this[name] = value;
    }
  }, {
    key: 'updateHydrating',
    value: function updateHydrating(bool) {
      this.hydrating = bool;
    }
  }, {
    key: 'hydrateSessionUser',
    value: function hydrateSessionUser(apiUrl, router) {

      var self = this;

      self.updateHydrating(true);

      _ClientMiddleware2.default.get(apiUrl, function (jsonRes) {
        self.updateHydrating(false);
        console.log(jsonRes);

        if (jsonRes && jsonRes.body) {
          self.updateSessionUser(jsonRes.body);
        } else {
          location.replace('/');
        }
      }, function (errorMessages) {
        self.updateHydrating(false);
        self.updateLoginErrors(errorMessages);
      });
    }
  }, {
    key: 'login',
    value: function login(apiUrl, router, otpRedir, successRedir, errRedir) {
      var self = this;

      self.updateLoggingIn(true);

      _ClientMiddleware2.default.post(apiUrl, { username: self.username, password: self.password }, function (jsonRes) {
        self.clearLoginErrors();
        self.clearFields();
        self.updateSessionUser(jsonRes.body);
        console.log(jsonRes);

        if (self.sessionUser.isOTPEnabled) {
          self.updateLoggingIn(false);
          router.replace(otpRedir);
        } else {
          window.location.href = successRedir;
        }
      }, function (errorMessages) {
        self.updateLoggingIn(false);
        self.clearFields();
        self.updateLoginErrors(errorMessages);
      });
    }
  }, {
    key: 'loginOTP',
    value: function loginOTP(apiUrl, successRedir) {
      var self = this;

      self.updateLoggingIn(true);

      _ClientMiddleware2.default.post(apiUrl, { username: self.sessionUser.username, code: self.otpCode }, function (jsonRes) {
        self.clearLoginErrors();
        self.clearFields();
        self.updateSessionUser(jsonRes.body);

        window.location.href = successRedir;
      }, function (errorMessages) {
        self.updateLoggingIn(false);
        self.clearFields();
        self.updateLoginErrors(errorMessages);
      });
    }
  }, {
    key: 'logout',
    value: function logout(apiUrl, logoutRedir) {
      var self = this;

      self.updateLoggingOut(true);

      _ClientMiddleware2.default.get(apiUrl, function (jsonRes) {
        self.updateLoggingOut(false);
        self.clearLogoutErrors();
        // clear sessionUser
        self.updateSessionUser(null);

        //redirect to root
        window.location.replace(logoutRedir);
      }, function (errorMessages) {
        self.updateLoggingOut(false);
        self.updateLogoutErrors(errorMessages);
      });
    }
  }]);

  return AuthStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'username', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'password', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'loggingIn', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'loggingOut', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'loginErrors', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'logoutErrors', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'sessionUser', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'hydrating', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'updateUsername', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateUsername'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updatePassword', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updatePassword'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateLoginErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateLoginErrors'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateLogoutErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateLogoutErrors'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateSessionUser', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateSessionUser'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateLoggingIn', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateLoggingIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateLoggingOut', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateLoggingOut'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearFields', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'clearFields'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearLoginErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'clearLoginErrors'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clearLogoutErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'clearLogoutErrors'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setField', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setField'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateHydrating', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'updateHydrating'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hydrateSessionUser', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'hydrateSessionUser'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'login', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'login'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loginOTP', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'loginOTP'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'logout', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'logout'), _class.prototype)), _class);
exports.default = AuthStore;