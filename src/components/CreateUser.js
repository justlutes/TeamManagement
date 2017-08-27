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
        name: profile.name,
        avatar: profile.picture
      };

      this.props
        .createUser({ variables })
        .then(res =>
          this.props.history.replace(`/${this.props.data.user.id}/teamlist`)
        )
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
            pathname: `/${this.props.data.user.id}/teamlist`
          }}
        />
      );
    }

    return <div>{this.createUser()}</div>;
  }
}

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $email: String!, $avatar: String){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, email: $email, avatar: $avatar) {
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

// export default graphql(createUser, { name: "createUser" })(
//   graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
//     withRouter(CreateUser)
//   )
// );

export default graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
  graphql(createUser, { name: "createUser" })(withRouter(CreateUser))
);
