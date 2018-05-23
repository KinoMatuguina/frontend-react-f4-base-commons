'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextProvider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

exports.connect = connect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import contextTypes from './contextTypes';

var contextTypes = {
  store: _propTypes2.default.object,
  router: _propTypes2.default.object,
  location: _propTypes2.default.object,
  history: _propTypes2.default.object
};

var ContextProvider = exports.ContextProvider = (_temp = _class = function (_Component) {
  _inherits(ContextProvider, _Component);

  function ContextProvider() {
    _classCallCheck(this, ContextProvider);

    return _possibleConstructorReturn(this, (ContextProvider.__proto__ || Object.getPrototypeOf(ContextProvider)).apply(this, arguments));
  }

  _createClass(ContextProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return this.props.context;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props && this.props.children;
    }
  }]);

  return ContextProvider;
}(_react.Component), _class.propTypes = {
  children: _propTypes2.default.node,
  location: _propTypes2.default.object,
  context: _propTypes2.default.shape(contextTypes)
}, _class.childContextTypes = contextTypes, _temp);

/**
 * Decorate components with context and observable
 * @param component
 * @returns {Function|Class}
 */

function connect(component) {
  if (!component) return contextTypes;
  Object.assign(component, { contextTypes: contextTypes });
  return (0, _mobxReact.observer)(component);
}