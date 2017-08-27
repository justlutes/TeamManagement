import React from "react";
import { graphql, gql } from "react-apollo";
import { withRouter, Redirect } from "react-router-dom";

class App extends React.Component {
  _isLoggedIn = () => {
    return this.props.data.user;
  };

  render() {
    if (this.props.data.loading) {
      return <div />;
    }

    if (this._isLoggedIn()) {
      return <Redirect to={`/${this.props.data.user.id}/teamlist`} />;
    }

    return <div>{this.props.auth._showLock()}</div>;
  }
}

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`;

export default graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
  withRouter(App)
);
