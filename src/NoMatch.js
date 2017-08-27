import React from "react";
import styled from "styled-components";
import Loading from "react-loading-animation";

const NoMatch = () => {
  return (
    <Wrapper>
      <Loading style={loadingStyle} />
    </Wrapper>
  );
};

const loadingStyle = {
  top: "50vh"
};

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(hsla(0,0%,100%,.3),hsla(0,0%,100%,0));
`;

export default NoMatch;
