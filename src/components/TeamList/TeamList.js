import React from "react";
import { graphql, gql } from "react-apollo";
import { withRouter, Redirect } from "react-router-dom";
import styled from "styled-components";
import Loading from "react-loading-animation";

import Header from "./Header";
import Footer from "../../Footer";
import TeamRow from "./TeamRow";

const loadingStyle = {
  top: "50vh"
};

class TeamList extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loading style={loadingStyle} />;
    }

    if (!this.props.data.user) {
      return <Redirect to="/" />;
    }

    return (
      <Wrapper>
        <Header />
        <Grid>
          <TeamRow teams={this.props.data.user.teams} />
        </Grid>
        <Footer
          auth={this.props.auth}
          name={this.props.data.user.name}
          picture={this.props.data.user.avatar}
          fullWidth={"fullwidth"}
        />
      </Wrapper>
    );
  }
}

const userQuery = gql`
  query {
    user {
      name
      avatar
      teams {
        id
        name
        avatar
        description
      }
    }
  }
`;

const Grid = styled.div`
  flex-grow: 1;
  height: 100%;
`;

const Wrapper = styled.div`
  background-color: #f1f5f9;
  display: flex;
  height: 100%;
  flex-direction: column;
`;

export default graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
  withRouter(TeamList)
);
