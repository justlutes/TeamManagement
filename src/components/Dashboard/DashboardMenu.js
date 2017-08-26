import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Logout from "./Logout";

class DashboardMenu extends React.Component {
  render() {
    return (
      <MenuWrapper>
        <MenuItem to={`/${this.props.id}/dashboard`}>
          <Wrapper>
            <CustomIcon className="fa fa-area-chart fa-2x" aria-hidden="true" />
            <MenuText>DashBoard</MenuText>
          </Wrapper>
        </MenuItem>
        <MenuItem to={`/${this.props.id}/addmembers`}>
          <Wrapper>
            <CustomIcon className="fa fa-users fa-2x" aria-hidden="true" />
            <MenuText>Members</MenuText>
          </Wrapper>
        </MenuItem>
        <MenuItem to={`/${this.props.id}/setting`}>
          <Wrapper>
            <CustomIcon className="fa fa-gear fa-2x" aria-hidden="true" />
            <MenuText>Settings</MenuText>
          </Wrapper>
        </MenuItem>
        <Logout user={this.props.user} auth={this.props.auth} />
      </MenuWrapper>
    );
  }
}

const MenuText = styled.span`
    width: 180px;
    margin-left: 15px;
    text-transform: uppercase;
    color: #fff;
    font-weight: 700;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
`;

const MenuItem = styled(Link)`
    border-bottom: 1px solid #4a148c;
    width: 100%;
    height: 50px;
    transition: all 333ms ease-in-out;
    text-decoration: none;
    padding-bottom: 20px;
    &:hover {
        background-color: #6a1b9a;
    }
`;

const CustomIcon = styled.i`
    color: #fff;
    transition: transform 333ms ease-in-out;
    ${MenuItem}:hover & {
        transform: scale(1.1);
    }
`;

const MenuWrapper = styled.div`
    display: flex;
    width: 300px;
    max-width: 300px;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #7b1fa2;
`;

export default DashboardMenu;
