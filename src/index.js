import initStore from './state/store';
import { rehydrate, dehydrate } from './state/hydrate'
import { ContextProvider, connect } from './state/context';
import * as BaseStores from './stores';
import ClientMiddleware from './middlewares/ClientMiddleware';

// import * as BaseUtils from './utils';


module.exports = {
  BaseContext: {
    connect,
    ContextProvider
  },
  BaseStores,
  BaseStateMethods: {
    initStore,
    rehydrate,
    dehydrate
  },
  BaseMiddlewares: {
    ClientMiddleware
  }
}
