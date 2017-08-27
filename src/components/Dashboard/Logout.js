import React from "react";
import styled from "styled-components";

const Logout = ({ auth, user }) => {
  const { avatar, name } = user;
  return (
    <Wrapper>
      <Inner>
        <Img src={avatar} />
        <Details>
          <UserName>{name}</UserName>
        </Details>
        <ButtonWrapper>
          <Button onClick={auth._logout}>
            Logout <i className="fa fa-sign-out" aria-hidden="true" />
          </Button>
        </ButtonWrapper>
      </Inner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    background-color: #4a148c;
    color: #fff;
    text-transform: none;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 325px;
    border-radius: 0 5px 0 0;
    z-index: 2;
`;

const Inner = styled.div`
    min-height: 60px;
    height: 60px;
    max-width: 325px;
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

const Details = styled.div`
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

const ButtonWrapper = styled.div`
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
    font-weight: 700;
    padding: 0 2rem;
    text-transform: uppercase;
    background-color: #7b1fa2;
    border: none;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        box-shadow: none;
    }
`;

export default Logout;
