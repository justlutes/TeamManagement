import React from "react";
import { graphql, gql } from "react-apollo";
import { withRouter } from "react-router-dom";
import Loading from "react-loading-animation";
import styled from "styled-components";

import DashboardMenu from "./DashboardMenu";
import DashboardHeader from "./DashboardHeader";
import DashboardHome from "./DashboardHome";

class Dashboard extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loading style={loadingStyle} />;
    }

    return (
      <Wrapper>
        <InnerWrapper>
          <DashboardHeader
            name={this.props.data.Team.name}
            avatar={this.props.data.Team.avatar}
          />
          <DashboardMenu
            id={this.props.data.Team.id}
            auth={this.props.auth}
            user={this.props.data.Team.user}
          />
        </InnerWrapper>
        <DashboardHome groups={this.props.data.Team.teamGroups} />
      </Wrapper>
    );
  }
}

const loadingStyle = {
  top: "50vh"
};

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: #f5f5f5;
`;

const teamQuery = gql`
  query teamQuery($id: ID!) {
    Team(id: $id) {
      id
      name
      avatar
      teamGroups {
        id
      }
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
