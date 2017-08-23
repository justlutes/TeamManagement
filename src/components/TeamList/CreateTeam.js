import React from "react";
import styled from "styled-components";
import SkyLight from "react-skylight";
import { graphql, gql } from "react-apollo";

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      projectDesc: ""
    };
  }

  onSubmitCreateTeam = event => {
    this.refs.createDialog.hide();
    event.preventDefault();

    const variables = {
      usersIds: this.props.userId,
      name: this.state.projectName,
      description: this.state.projectDesc,
      avatar: `http://identicon.org?t=${this.state.projectName}&s=90`
    };

    this.props
      .createProject({ variables })
      .then(() => this.props.data.refetch())
      .catch(e => console.error(e));
  };

  render() {
    const dialogStyles = {
      height: "300px"
    };

    return (
      <div>
        <Button onClick={() => this.refs.createDialog.show()}>
          <NewCard>
            <Avatar>
              <AddProjectIcon className="fa fa-plus fa-4x" aria-hidden="true" />
            </Avatar>
            <DisplayName>CREATE NEW TEAM</DisplayName>
          </NewCard>
        </Button>
        <SkyLight
          hideOnOverlayClicked
          ref="createDialog"
          dialogStyles={dialogStyles}
        >
          <h4>Create New Project</h4>
          <form onSubmit={this.onSubmitCreateTeam}>
            <input
              name="project_name"
              placeholder="Name"
              value={this.state.projectName}
              onChange={event =>
                this.setState({ projectName: event.target.value })}
            />
            <input
              name="project_desc"
              placeholder="Description"
              value={this.state.projectDesc}
              onChange={event =>
                this.setState({ projectDesc: event.target.value })}
            />
            <ModalButtonWrapper>
              <Cancel onClick={() => this.refs.createDialog.hide()}>
                Cancel
              </Cancel>
              <Submit type="submit">Next</Submit>
            </ModalButtonWrapper>
          </form>
        </SkyLight>
      </div>
    );
  }
}

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

const ModalButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    padding: 8px;
`;

const Cancel = styled.button`
    border: none;
    text-transform: uppercase;
    width: 80px;
    height: 30px;
    margin-right: 10px;
    border-radius: 2px;
    background-color: transparent;
    transition: all 333ms ease-in-out;
    &:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

const Submit = Cancel.extend`
    background-color: #282d4c;
    color: #fff;
`;

const AddProjectIcon = styled.i`
    color: #fff;
    transition: transform 333ms ease-in-out;
    ${Button}:hover & {
        transform: rotate(90deg);
    }
`;

const createTeam = gql`
  mutation ($name: String!, $description: String!, $avatar: String!, $usersIds: [ID!]){
    createTeam(name: $name, description: $description, avatar: $avatar, usersIds: $usersIds) {
      id
    }
  }
`;

export default graphql(createTeam, { name: "createTeam" })(CreateTeam);
