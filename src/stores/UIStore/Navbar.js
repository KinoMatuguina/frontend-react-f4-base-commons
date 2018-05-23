import { observable, action } from 'mobx';

export default class Navbar {

  @observable sideDrawerIsOpen = true;

  constructor(data) {
    Object.assign(this, data);
  }

  @action
  toggleSideDrawer(flag = null) {
    if (flag === 'open') this.sideDrawerIsOpen = true;
    if (flag === 'close') this.sideDrawerIsOpen = false;
    if (!flag) this.sideDrawerIsOpen = !this.sideDrawerIsOpen;
  }
}
