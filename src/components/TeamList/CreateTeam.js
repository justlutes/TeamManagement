import React from "react";
import styled, { keyframes } from "styled-components";
import SkyLight from "react-skylight";
import { graphql, gql } from "react-apollo";

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      projectDesc: "",
      error: false
    };
  }

  onSubmitCreateTeam = event => {
    event.preventDefault();

    if (this.state.projectName === "") {
      this.setState({ error: true });

      return;
    }

    this.refs.createDialog.hide();

    const variables = {
      userId: this.props.data.user.id,
      name: this.state.projectName,
      description: this.state.projectDesc,
      avatar: `http://identicon.org?t=${this.state.projectName}&s=90`
    };

    this.props
      .createTeam({ variables })
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
          title="Create New Project"
          dialogStyles={dialogStyles}
        >
          <FormWrapper onSubmit={this.onSubmitCreateTeam}>
            <FormGroup>
              <FormInput
                error={this.state.error}
                name="project_name"
                value={this.state.projectName}
                onChange={event =>
                  this.setState({
                    projectName: event.target.value,
                    error: false
                  })}
              />
              <FormHighlight />
              <FormBar />
              <FormLabel>Name</FormLabel>
            </FormGroup>
            <FormGroup>
              <FormInput
                name="project_desc"
                value={this.state.projectDesc}
                onChange={event =>
                  this.setState({ projectDesc: event.target.value })}
              />
              <FormHighlight />
              <FormBar />
              <FormLabel>Description</FormLabel>
            </FormGroup>
            <ModalButtonWrapper>
              <Cancel onClick={() => this.refs.createDialog.hide()}>
                Cancel
              </Cancel>
              <Submit type="submit">Next</Submit>
            </ModalButtonWrapper>
          </FormWrapper>
        </SkyLight>
      </div>
    );
  }
}

const inputHighlighter = keyframes`
	from {
		background: #ba68c8;
	}

	to {
		width: 0;
    background: transparent;
	}
`;

const FormHighlight = styled.span`
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
`;

const FormBar = styled.span`
  position: relative;
  display: block;
  width: 300px;
  &:before, &:after {
    content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#ba68c8; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
&:before {
  left: 50%;
}
&:right {
  right: 50%;
}
`;

const FormLabel = styled.label`
  color:#999; 
  font-size:18px;
  font-weight:normal;
  position:absolute;
  pointer-events:none;
  left:5px;
  top:10px;
  transition:0.2s ease all; 
`;

const FormInput = styled.input`
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom: ${props => (props.error ? "2px dotted #d50000" : " 1px solid #757575")};
  &:focus {
    outline: none;
  }
  &:focus ~ ${FormLabel} {
    top:-20px;
  font-size:14px;
  color:#ba68c8;
}
&:focus ~ ${FormBar}:before,
&:focus ~ ${FormBar}:after {
  width: 50%:
}
&:focus ~ ${FormHighlight} {
  animation: ${inputHighlighter} 0.3s ease;
}
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 45px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 200px;
  margin-top: 30px;
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

const ModalButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    padding: 8px;
`;

const Cancel = styled.button`
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    width: 80px;
    height: 30px;
    margin-right: 10px;
    border-radius: 2px;
    background-color: transparent;
    transition: all 333ms ease-in-out;
    &:hover {
        background-color: #ba68c8;
    }
`;

const Submit = Cancel.extend`
    background-color: #7b1fa2;
    color: #fff;
`;

const AddProjectIcon = styled.i`
    color: #fff;
    transition: transform 333ms ease-in-out;
    ${Button}:hover & {
        transform: rotate(90deg);
    }
`;

const userQuery = gql`
  query {
    user {
      id
      teams {
        id
        name
        avatar
        description
      }
    }
  }
`;

const createTeam = gql`
  mutation ($name: String!, $description: String!, $avatar: String!, $userId: ID!){
    createTeam(name: $name, avatar: $avatar, userId: $userId, description: $description) {
    id
    }
  }
`;

export default graphql(createTeam, { name: "createTeam" })(
  graphql(userQuery, { options: { fetchPolicy: "network-only" } })(CreateTeam)
);
