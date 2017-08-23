import React from "react";
import { graphql, gql } from "react-apollo";
import { withRouter } from "react-router-dom";

class Dashboard extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return <div>Dashboard</div>;
  }
}

const userQuery = gql`
  query userQuery {
    user {
      name
      email
    }
  }
`;

export default graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
  withRouter(Dashboard)
);
