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
      closable: false,
      oidcConformant: true,
      auth: {
        redirectUrl: AUTH_CONFIG.callbackUrl,
        responseType: "token id_token",
        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        params: {
          scope: "openid profile email"
        }
      }
    });

    this.handleAuthentication();
    this.showLock = this.showLock.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.requiredAuth = this.requiredAuth.bind(this);
  }

  showLock() {
    this.lock.show({
      container: "home-lock"
    });
  }

  isLoggedIn() {
    const idToken = localStorage.getItem("auth0IdToken");
    return !!idToken && !!this.isAuthenticated();
  }

  requiredAuth() {
    if (!this.isLoggedIn()) {
      history.replace("/");
    }
  }

  handleAuthentication() {
    this.lock.on("authenticated", this.setSession.bind(this));
    this.lock.on("authorization_error", err => {
      console.error(err);
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("auth0IdToken", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);
      // navigate to the home route
      history.replace("/dashboard");
    }
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth0IdToken");
    localStorage.removeItem("expires_at");
    history.replace("/");
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
