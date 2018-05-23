import { observable, action } from "mobx";
import ClientMiddleware from '../middlewares/ClientMiddleware';

export default class AuthStore {

  @observable username = '';
  @observable password = '';
  @observable loggingIn = false;
  @observable loggingOut = false;
  @observable loginErrors = [];
  @observable logoutErrors = [];
  @observable sessionUser = null;
  @observable hydrating = false;

  constructor(AuthStore) {
    if(AuthStore) {
      Object.assign(this, AuthStore);
    }
  }

  @action
  updateUsername(username) {
    this.username = username;
  }

  @action
  updatePassword(password) {
    this.password = password;
  }

  @action
  updateLoginErrors(errors) {
    this.loginErrors = errors;
  }

  @action
  updateLogoutErrors(errors) {
    this.logoutErrors = errors;
  }

  @action
  updateSessionUser(user) {
    this.sessionUser = user;
  }

  @action
  updateLoggingIn(bool) {
    this.loggingIn = bool;
  }

  @action
  updateLoggingOut(bool) {
    this.logginOut = bool;
  }

  @action
  clearFields() {
    this.username = '';
    this.password = '';
  }

  @action
  clearLoginErrors() {
    this.loginErrors = [];
  }

  @action
  clearLogoutErrors() {
    this.logoutErrors = [];
  }

  @action
  setField(name, value) {
    this[name] = value;
  }

  @action
  updateHydrating(bool) {
    this.hydrating = bool;
  }

  @action
  hydrateSessionUser(apiUrl, router) {

    let self = this;

    self.updateHydrating(true);

    ClientMiddleware.get(
      apiUrl,
      (jsonRes) => {
        self.updateHydrating(false);
        console.log(jsonRes);

        if(jsonRes && jsonRes.body) {
          self.updateSessionUser(jsonRes.body);
        } else {
          location.replace('/');
        }
      },
      (errorMessages) => {
        self.updateHydrating(false);
        self.updateLoginErrors(errorMessages);
      }
    );
  }

  @action
  login(apiUrl, router, otpRedir, successRedir, errRedir) {
    const self = this;

    self.updateLoggingIn(true);

    ClientMiddleware.post(
      apiUrl,
      { username: self.username, password: self.password},
      (jsonRes) => {
        self.clearLoginErrors();
        self.clearFields();
        self.updateSessionUser(jsonRes.body);
        console.log(jsonRes);

        if(self.sessionUser.isOTPEnabled) {
          self.updateLoggingIn(false);
          router.replace(otpRedir);
        } else {
          window.location.href = successRedir;
        }
      },
      (errorMessages) => {
        self.updateLoggingIn(false);
        self.clearFields();
        self.updateLoginErrors(errorMessages);
      }
    );
  }

  @action
  loginOTP(apiUrl, successRedir) {
    const self = this;

    self.updateLoggingIn(true);

    ClientMiddleware.post(
      apiUrl,
      { username: self.sessionUser.username, code: self.otpCode},
      (jsonRes) => {
        self.clearLoginErrors();
        self.clearFields();
        self.updateSessionUser(jsonRes.body);

        window.location.href = successRedir;
      },
      (errorMessages) => {
        self.updateLoggingIn(false);
        self.clearFields();
        self.updateLoginErrors(errorMessages);
      }
    );
  }

  @action
  logout(apiUrl, logoutRedir) {
    const self = this;

    self.updateLoggingOut(true);

    ClientMiddleware.get(
      apiUrl,
      (jsonRes) => {
        self.updateLoggingOut(false);
        self.clearLogoutErrors();
        // clear sessionUser
        self.updateSessionUser(null);

        //redirect to root
        window.location.replace(logoutRedir)
      },
      (errorMessages) => {
        self.updateLoggingOut(false);
        self.updateLogoutErrors(errorMessages);
      }
    );
  }

}
