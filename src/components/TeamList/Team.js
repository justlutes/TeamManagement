import React from "react";
import styled from "styled-components";
import history from "../../util/history";

const Team = ({ avatar, description, id, name }) => {
  return (
    <div>
      <Button onClick={() => history.replace(`/${id}/dashboard`)}>
        <NewCard>
          <Avatar>
            <AvatarImg src={avatar} />
          </Avatar>
          <DisplayName>{name}</DisplayName>
          <Description>{description}</Description>
        </NewCard>
      </Button>
    </div>
  );
};

const AvatarImg = styled.img`
    max-width: 80px;
    max-height: 80px;
`;

const Button = styled.button`
    height: 320px;
    width: 260px;
    margin-bottom: 20px;
    background-color: transparent;
    border: none;
    outline: 0;
    padding: 0;
    transition-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
    &:hover {
        box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
    }
`;

const NewCard = styled.div`
    background: #7b1fa2;
    width: 260px;
    height: 320px;
    margin-right: 20px;
    margin-bottom: 20px;
    color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23);
`;

const Avatar = styled.span`
    width: 90px;
    height: 90px;
    margin-top: 30px;
    margin-bottom: auto;
    align-self: center;
`;

const DisplayName = styled.span`
    white-space: normal;
    margin-bottom: 40px;
    font-size: 1.8em;
    font-weight: 700;
    margin-top: 10px;
    text-overflow: ellipsis;
    text-align: center;
    padding: 0 10px;
    color: #fff;
`;

const Description = styled.p`
    padding-bottom: 10px;
    text-align: none;
    color: #fff;
`;

export default Team;
