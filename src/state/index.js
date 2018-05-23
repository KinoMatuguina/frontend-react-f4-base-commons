import UIStore from '../stores/UIStore';
import AuthStore from '../stores/AuthStore';
import AppStore from '../stores/AppStore';


export default (state) => ({
  ui: new UIStore(state.ui),
  auth: new AuthStore(state.auth),
  app: new AppStore(state.app)
});
