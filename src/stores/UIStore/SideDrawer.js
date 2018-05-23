import { observable, action } from 'mobx';
import ClientMiddleware from '../../middlewares/ClientMiddleware';

export default class SideDrawer {

  @observable menuData = null;
  @observable isFetching = false;
  @observable errors = [];

  constructor(data) {
    Object.assign(this, data);
  }

  @action
  updateMenuData(data) {
    this.menuData = data;
  }

  @action
  updateIsFetching(bool) {
    this.isFetching = bool;
  }

  @action
  updateErrors(data) {
    this.errors = data;
  }

  @action
  clearErrors() {
    this.errors = [];
  }

  @action
  loadMenu(apiUrl) {
    let self = this;

    self.updateIsFetching(true);

    ClientMiddleware.get(
      apiUrl,
      {}, 
      (jsonRes) => {
        self.updateIsFetching(false);
        console.log("Client req Success");
        console.log(jsonRes);

        if(jsonRes) {
          self.updateMenuData(jsonRes.body || jsonRes);
        }

      },
      (errorMessages) => {
        self.updateIsFetching(false);
        self.updateErrors(errorMessages);
      }
    );
  }

}
