import React from "react";
import styled from "styled-components";

import InnerHeader from "../Dashboard/InnerHeader";
import GroupList from "./GroupList";

class Content extends React.Component {
  render() {
    return (
      <Wrapper>
        <InnerHeader title="add members" />
        {this.props.groups.map(group => (
          <GroupList key={group.id} groupId={group.id} />
        ))}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #e8e8e8;
    margin-left: -1.6%;
    padding-left: 1.6%;
`;

export default Content;
