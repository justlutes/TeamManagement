import Auth0Lock from "auth0-lock";
import { AUTH_CONFIG } from "./config";
import history from "./history";

export default class Auth {
  constructor() {
    this.lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
      languageDictionary: {
        title: "Team Management"
      },
      theme: {
        primaryColor: "#1A237E",
        displayName: "Team Management"
      },
      closable: false
    });

    this._handleAuthentication();
    this._showLock = this._showLock.bind(this);
    this._logout = this._logout.bind(this);
    this._isAuthenticated = this._isAuthenticated.bind(this);
    this._isLoggedIn = this._isLoggedIn.bind(this);
    this._requiredAuth = this._requiredAuth.bind(this);
  }

  _showLock() {
    this.lock.show({
      container: "home-lock"
    });
  }

  _isLoggedIn() {
    const idToken = localStorage.getItem("auth0IdToken");
    return !!idToken && !!this._isAuthenticated();
  }

  _requiredAuth() {
    if (!this.isLoggedIn()) {
      history.replace("/");
    }
  }

  _handleAuthentication() {
    this.lock.on("authenticated", this._setSession.bind(this));
    this.lock.on("authorization_error", err => {
      console.error(err);
    });
  }

  _setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("auth0IdToken", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);
      // navigate to the home route
      history.replace("/signup");
    }
  }

  _logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth0IdToken");
    localStorage.removeItem("expires_at");
    history.replace("/");
  }

  _isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
