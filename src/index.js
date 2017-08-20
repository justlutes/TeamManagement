import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";

import "./assets/index.css";
import App from "./App";
import history from "./util/history";
import Auth from "./util/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateUser from "./components/CreateUser";
import Callback from "./components/Callback";
import registerServiceWorker from "./registerServiceWorker";

const auth = new Auth();

const networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cj6jusc2r0hz901914l294xau"
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      // get the authentication token from local storage if it exists
      if (localStorage.getItem("auth0IdToken")) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem("auth0IdToken")}`;
      }
      next();
    }
  }
]);

const client = new ApolloClient({ networkInterface });

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div>
          <Route
            exact
            path="/"
            component={props => <App auth={auth} {...props} />}
          />
          <Route
            path="/signup"
            component={props => <CreateUser auth={auth} />}
          />
          <Route path="/callback" component={Callback} />
          <Route
            path="/dashboard"
            component={props => <Dashboard auth={auth} />}
          />
        </div>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
