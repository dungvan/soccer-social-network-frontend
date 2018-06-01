import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { userActions, alertActions } from 'actions';
import { RegularCard, ItemGrid } from "components";
import {
  IconButton,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination
} from "@material-ui/core";

import {
  Delete,
  Edit
} from '@material-ui/icons';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import "assets/jss/material-dashboard-react/tableStyle";
import { alertConstants } from "../../../constants";

const SweetAlert = withSwalInstance(swal);

export class UserList extends Component {

  constructor(props) {
    super(props)
    this.State = { page: 1}
  }

  delID;

  handleDelete = id => {
    this.props.dispathAlertWarning("Are you sure?")
    this.delID = id
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

  _dateString(date) {
    let dateString = "1990-01-01";
    if (!!date) {
      const day = date.getDate();
      let dayString = day < 10 ? ("0"+day):day;
      const month = date.getMonth()+1;
      let monthString = month < 10 ? ("0"+month):month;
      dateString = date.getFullYear()+"-"+ monthString+"-"+dayString;
    } 
    return dateString
  }

  _confirmDelete = ()=> {
    if (!!this.delID) {
      this.props.delete(this.delID);
      this.props.dispathAlertClear(alertConstants.WARNING_CLEAR)
    }
  }

  render () {
    const { total, items, alert } = this.props;
    const { page } = this.state;
    console.log(items)
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
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((user) => {
                      return (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.user_name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <NavLink to={"/admin/user/"+user.user_name}>
                              <IconButton size="small"><Edit /></IconButton>
                            </NavLink>
                            <IconButton size="small" color="secondary" onClick={this.handleDelete.bind(this, user.id)}><Delete /></IconButton>
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
  const { total, items } = state.users
  const { alert } = state
  return { total, items, alert };
}

export default connect(mapStateToProps, {
  getAll: userActions.getAll,
  delete: userActions.delete,
  dispathAlertWarning: alertActions.warning,
  dispathAlertClear: alertActions.clear
})(UserList);
