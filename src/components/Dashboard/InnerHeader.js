import React from "react";
import styled from "styled-components";

const InnerHeader = ({ title }) => {
  return (
    <Wrapper>
      <Toolbar>
        <BreadCrumb>
          <Entry>
            {title}
          </Entry>
        </BreadCrumb>
      </Toolbar>
    </Wrapper>
  );
};

const Entry = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: 1px;
    font-size: 14px;
    padding: 2px 10px 0 35px;
    background: #DCDCDC;
    position: relative;
    height: inherit;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 90px;
    transition: all 333ms ease-in-out;
    &:hover {
        background: rgba(0, 0, 0, 0.3);
    }
`;

const BreadCrumb = styled.div`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    height: 30px;
`;

const Toolbar = styled.div`
    box-sizing: border-box;
    height: 100%;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Wrapper = styled.div`
    height: 60px;
    min-height: 60px;
    width: 100%;
    background-color: #e8e8e8;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export default InnerHeader;
