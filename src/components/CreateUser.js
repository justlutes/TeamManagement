import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { graphql, gql } from "react-apollo";

class CreateUser extends React.Component {
  createUser = () => {
    const idToken = localStorage.getItem("auth0IdToken");
    const accessToken = localStorage.getItem("access_token");
    this.props.auth.lock.getUserInfo(accessToken, (err, profile) => {
      if (err) {
        console.error(err);
      }
      const variables = {
        idToken,
        email: profile.email,
        name: profile.name
      };

      this.props
        .createUser({ variables })
        .then(res => this.props.history.replace("/dashboar"))
        .catch(e => {
          console.error(e);
          this.props.history.replace("/");
        });
    });
  };
  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }

    // redirect if user is logged in or did not finish Auth0 Lock dialog
    if (
      this.props.data.user ||
      window.localStorage.getItem("auth0IdToken") === null
    ) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard"
          }}
        />
      );
    }

    return <div>{this.createUser()}</div>;
  }
}

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $email: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, email: $email) {
      id
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(createUser, { name: "createUser" })(
  graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
    withRouter(CreateUser)
  )
);
