import React from "react";
import styled from "styled-components";

import CreateTeam from "./CreateTeam";
import Team from "./Team";

const TeamRow = ({ teams }) => {
  if (!teams) {
    return <CreateTeam />;
  }
  return (
    <TeamGrid>
      {teams.map(team => (
        <Team
          key={team.id}
          id={team.id}
          name={team.name}
          description={team.description}
          avatar={team.avatar}
        />
      ))}
      <CreateTeam />
    </TeamGrid>
  );
};

const TeamGrid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;
    overflow: auto;
    background-color: transparent;
    justify-content: space-around;
    margin-top: 30px;
`;

export default TeamRow;
