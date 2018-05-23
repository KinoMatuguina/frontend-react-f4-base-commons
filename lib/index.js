'use strict';

var _store = require('./state/store');

var _store2 = _interopRequireDefault(_store);

var _hydrate = require('./state/hydrate');

var _context = require('./state/context');

var _stores = require('./stores');

var BaseStores = _interopRequireWildcard(_stores);

var _ClientMiddleware = require('./middlewares/ClientMiddleware');

var _ClientMiddleware2 = _interopRequireDefault(_ClientMiddleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as BaseUtils from './utils';


module.exports = {
  BaseContext: {
    connect: _context.connect,
    ContextProvider: _context.ContextProvider
  },
  BaseStores: BaseStores,
  BaseStateMethods: {
    initStore: _store2.default,
    rehydrate: _hydrate.rehydrate,
    dehydrate: _hydrate.dehydrate
  },
  BaseMiddlewares: {
    ClientMiddleware: _ClientMiddleware2.default
  }
};