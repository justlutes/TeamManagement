import React from "react";
import { graphql, gql } from "react-apollo";
import { withRouter } from "react-router-dom";
import Loading from "react-loading-animation";
import styled from "styled-components";

import DashboardMenu from "./DashboardMenu";
import DashboardHeader from "./DashboardHeader";

class Dashboard extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loading style={loadingStyle} />;
    }

    return (
      <Wrapper>
        <DashboardHeader
          name={this.props.data.Team.name}
          avatar={this.props.data.Team.avatar}
        />
        <DashboardMenu
          path={this.props.location.pathname}
          id={this.props.data.Team.id}
          auth={this.props.auth}
          user={this.props.data.Team.user}
        />
      </Wrapper>
    );
  }
}

const loadingStyle = {
  top: "50vh"
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const teamQuery = gql`
  query teamQuery($id: ID!) {
    Team(id: $id) {
      id
      name
      avatar
      user {
        name
        avatar
      }
    }
  }
`;

export default graphql(teamQuery, {
  options: props => {
    return { variables: { id: props.match.params.teamId } };
  }
})(withRouter(Dashboard));
