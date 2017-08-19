import React, { Component } from "react";
import { graphql, gql } from "react-apollo";
import { withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.auth.showLock();
  }
  render() {
    return <div id="home-lock" />;
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
