import React from "react";
import styled from "styled-components";

import CreateTeam from "./CreateTeam";
import Team from "./Team";

const TeamRow = ({ userID, teams }) => {
  if (!teams) {
    return <CreateTeam userID={userID} />;
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
      <CreateTeam userID={userID} />
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
    justify-content: space-evenly;
`;

export default TeamRow;
