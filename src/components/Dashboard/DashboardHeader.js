import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const DashboardHeader = ({ avatar, name }) => {
  return (
    <Wrapper>
      <Avatar src={avatar} />
      <Name to="/teamlist">{name}</Name>
    </Wrapper>
  );
};

const Avatar = styled.img`
    display: inline-block;
    height: 45px;
    width: 45px;
    border-radius: 5px;
`;

const Name = styled(Link)`
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    color: #aa00ff;
    transition: all 333ms ease-in-out;
    &:hover {
        color: rgb(186, 104, 200);
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 325px;
    height: 60px;
    background-color: #4a148c;
    border-radius: 0 0 5px 0;
`;

export default DashboardHeader;
