import React from "react";
import styled from "styled-components";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import InnerHeader from "./InnerHeader";

class DashboardHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      edited: false
    };
  }

  isSelected = index => this.state.selected.indexOf(index) !== -1;

  handleRowSelection = selected => this.setState({ selected });

  handleCellEdit = () => {
    this.setState({ edited: true });
  };

  render() {
    return (
      <Wrapper>
        <InnerHeader title="dashboard" />
        {/*<BootstrapTable
          data={this.props.data.Team.teamGroups}
          cellEdit={{ mode: "dbclick", afterSaveCell: this.handleCellEdit }}
        >
          <TableHeaderColumn dataField="id" isKey />
          <TableHeaderColumn dataField="key">Team Leader</TableHeaderColumn>
          <TableHeaderColumn dataField="value">Team Member</TableHeaderColumn>
        </BootstrapTable>*/}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #e8e8e8;
    margin-left: -1.6%;
    padding-left: 1.6%;
`;

export default DashboardHome;
