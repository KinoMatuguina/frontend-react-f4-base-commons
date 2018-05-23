import {observable, computed, asStructure, autorun, action} from 'mobx';


import Navbar from './UIStore/Navbar';
import SideDrawer from './UIStore/SideDrawer';

export default class UIStore {

    @observable language = "en_US";
    @observable pendingRequestCount = 0;
    @observable layoutIsShifted = true;
    @observable screenWidth = 1280;

    @observable breakpoints = {
      xs: '(max-width: 767px)',
      su: '(min-width: 768px)',
      sm: '(min-width: 768px) and (max-width: 991px)',
      md: '(min-width: 992px) and (max-width: 1199px)',
      mu: '(min-width: 992px)',
      lg: '(min-width: 1200px)',
    };

    constructor(UIStore) {
      if(UIStore) {
        Object.assign(this, UIStore);
      }
      this.navbar = new Navbar();
      this.sideDrawer = new SideDrawer();

      autorun(() => this.breakpoints.xs
        ? this.navbar.toggleSideDrawer('close')
        : this.navbar.toggleSideDrawer('open')
      );

      autorun(() => this.breakpoints.su && this.navbar.sideDrawerIsOpen
        ? this.shiftLayout('yes')
        : this.shiftLayout('no')
      );

    }

    @action
    updateScreenWidth(width) {
      this.screenWidth = width;
    }

    shiftLayout(flag = null) {
      if (flag === 'yes') this.layoutIsShifted = true;
      if (flag === 'no') this.layoutIsShifted = false;
    }
}
