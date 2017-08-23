import React from "react";
import styled from "styled-components";
import { graphql, gql } from "react-apollo";

const Footer = ({ auth, name, picture }) => {
  return (
    <UserMenu>
      <UserBox>
        <Img src={picture} />
        <UserDetails>
          <UserName>{name}</UserName>
        </UserDetails>
        <Logout>
          <Button onClick={auth._logout}>Logout</Button>
        </Logout>
      </UserBox>
    </UserMenu>
  );
};

const userQuery = gql`
  query userQuery {
    user {
      name
      avatar
    }
  }
`;

const UserMenu = styled.div`
    background-color: #4a148c;
    color: #fff;
    text-transform: none;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 300px;
`;

const UserBox = styled.div`
    min-height: 50px;
    height: 50px;
    max-width: 300px;
    display: flex;
    flex-direction: row;
    padding: 15px;
    align-items: center;
`;

const Img = styled.img`
    color: rgb(255, 255, 255);
    background-color: rgb(188, 188, 188);
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 50%;
    height: 40px;
    width: 40px;
`;

const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 18px;
`;

const UserName = styled.span`
    font-size: 1.1em;
    max-width: 170px;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const Logout = styled.div`
    display: inline-block;
    position: relative;
    margin-top: 0;
`;

const Button = styled.button`
    color: #fff;
    cursor: pointer;
    transition: background-color 0.333s;
    outline: 0;
    border-radius: 2px;
    height: 36px;
    line-height: 36px;
    padding: 0 2rem;
    text-transform: uppercase;
    background-color: #7b1fa2;
    border: none;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        box-shadow: none;
    }
`;

export default graphql(userQuery, { options: { fetchPolicy: "network-only" } })(
  Footer
);
