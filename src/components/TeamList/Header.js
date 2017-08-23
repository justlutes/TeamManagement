import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Nav>
      <div>
        Please Select A Team
      </div>
    </Nav>
  );
};

const Nav = styled.div`
    height: 64px;
    min-height: 64px;
    display: flex;
    font-size: 1.2em;
    align-items: center;
    text-transform: uppercase;
    color: #fff;
    padding-left: 20px;
    letter-spacing: 2px;
    background-color: #4a148c;
`;

export default Header;
