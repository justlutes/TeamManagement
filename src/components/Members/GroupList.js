import React from "react";
import { graphql, gql } from "react-apollo";
import Loading from "react-loading-animation";
import styled from "styled-components";

class GroupList extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Loading />;
    }
    if (
      !this.props.data.TeamGroup.leader || !this.props.data.TeamGroup.member
    ) {
      return null;
    }

    const { leader, member } = this.props.data.TeamGroup;
    return (
      <Wrapper>
        <LeaderWrapper>
          <Name>{leader.name}</Name>
          <Title>{leader.title}</Title>
        </LeaderWrapper>
        <MemberWrapper>
          <Name>{member.name}</Name>
          <Title>{member.title}</Title>
        </MemberWrapper>
      </Wrapper>
    );
  }
}

const Title = styled.span`
    font-weight: 400;
    color: #757575;
    font-style: italic;
`;

const Name = styled.span`
    text-transform: uppercase;
    font-weight: 700;
    color: #7b1fa2;
`;

const LeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    padding: 20px;
`;

const MemberWrapper = LeaderWrapper.extend`
    border-left: 1px solid #4a148c;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    border-bottom: 1px solid #4a148c;
`;

const groupQuery = gql`
    query groupQuery($id: ID!) {
        TeamGroup(id: $id) {
            leader {
                name
                title
            }
            member {
                name
                title
            }
        }
    }
`;

export default graphql(groupQuery, {
  options: props => {
    return { variables: { id: props.groupId } };
  }
})(GroupList);
