import React, { Component } from "react";
import { connect } from 'react-redux';
import { matchActions, alertActions } from 'actions';
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
} from "@material-ui/core";

import {
  Delete,
} from '@material-ui/icons';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import "assets/jss/material-dashboard-react/tableStyle";
import { TablePagination } from "@material-ui/core";
import { alertConstants } from "../../../constants";
import { isNull } from 'lodash';

const SweetAlert = withSwalInstance(swal);

export class MatchList extends Component {

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
    const { total, items, alert } = this.props;
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
                      <TableCell>Master</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>Team1</TableCell>
                      <TableCell>goals</TableCell>
                      <TableCell>Team2</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((match) => {
                      return (
                        <TableRow key={match.id}>
                          <TableCell>{match.id}</TableCell>
                          <TableCell>{match.master.first_name !== '' && !!match.master.lastname !== '' ? match.master.first_name + " " + match.master.last_name:match.master.username}</TableCell>
                          <TableCell>{match.description.length > 37 ? match.description.substring(0, 37) + "..." : match.description }</TableCell>
                          <TableCell>{new Date(match.start_date).toLocaleDateString()}</TableCell>
                          <TableCell>{match.team1.name}</TableCell>
                          <TableCell>{(!isNull(match.team1_goals) ? match.team1_goals : "-") + " : " + (!isNull(match.team2_goals) ? match.team2_goals : "-")}</TableCell>
                          <TableCell>{match.team2.name}</TableCell>
                          <TableCell>
                            <IconButton size="small" color="secondary" onClick={this.handleDelete.bind(this, match.id)}><Delete /></IconButton>
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
  const { total, items } = state.matches;
  const { alert } = state;
  return { total, items, alert };
}

export default connect(mapStateToProps, {
  getAll: matchActions.getAll,
  delete: matchActions.delete,
  dispathAlertWarning: alertActions.warning,
  dispathAlertClear: alertActions.clear
})(MatchList);
