import React from "react";
import { graphql, gql } from "react-apollo";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import DashboardMenu from "../Dashboard/DashboardMenu";
import DashboardHeader from "../Dashboard//DashboardHeader";
import Content from "./Content";

class Members extends React.Component {
  render() {
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
        <Content groups={this.props.data.Team.teamGroups} />
      </Wrapper>
    );
  }
}

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
})(withRouter(Members));
