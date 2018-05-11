import React, { Component } from "react";
import { connect } from 'react-redux';

import { teamActions, alertActions } from 'actions';
import { RegularCard, ItemGrid } from "components";
import {
  IconButton,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter
} from "material-ui";

import {
  Delete,
} from '@material-ui/icons';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import "assets/jss/material-dashboard-react/tableStyle";
import { TablePagination } from "material-ui";
import { alertConstants } from "../../../constants";

const SweetAlert = withSwalInstance(swal);

export class TeamList extends Component {

  constructor(props) {
    super(props)
    this.State = { page: 1}
  }

  handleDelete = id => {
    this.props.delete(id)
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
    this.props.getAll(page + 1)
  };

  componentWillMount() {
    if (!this.state) {
      this.setState({page: 0})
      this.props.getAll(1)
      return
    }
    this.props.getAll(this.state.page + 1)
  }

  render () {
    const { total, items } = this.props;
    const { page } = this.state;
    return (
      <Grid container>
        <SweetAlert
          show={alert.warning}
          title='Are you sure?'
          text="You won't be able to revert this!"
          type='warning'
          showCancelButton={true}
          confirmButtonColor='#3085d6'
          cancelButtonColor='#d33'
          confirmButtonText='Yes, delete it!'
          onConfirm={this._confirmDelete}
          onCancel={() => {this.props.dispathAlertClear(alertConstants.WARNING_CLEAR)}}
        />
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Simple Table"
            cardSubtitle="Here is a subtitle for this table"
            content={
              <div>
                <Table>
                  <TableHead className="primary TableHeader">
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>User Name</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((team) => {
                      return (
                        <TableRow key={team.id}>
                          <TableCell>{team.id}</TableCell>
                          <TableCell>{team.master.first_name !== '' && !!team.master.lastname !== '' ? team.master.first_name + " " + team.master.last_name:team.master.username}</TableCell>
                          <TableCell>{team.name}</TableCell>
                          <TableCell>{
                            team.description.length > 37 ? team.description.substring(0, 37) + "..." : team.description 
                          }
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" color="secondary" onClick={this.handleDelete.bind(this, team.id)}><Delete /></IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        colSpan={6}
                        count={total}
                        rowsPerPage={10}
                        rowsPerPageOptions={[10]}
                        page={page}
                        onChangePage={this.handleChangePage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            }
          />
        </ItemGrid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const { total, items } = state.teams
  return { total, items };
}

export default connect(mapStateToProps, {
  getAll: teamActions.getAll,
  delete: teamActions.delete,
  dispathAlertWarning: alertActions.warning,
  dispathAlertClear: alertActions.clear
})(TeamList);
