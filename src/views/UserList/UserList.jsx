import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {userActions} from '../../actions';
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
  Edit
} from '@material-ui/icons';

import "assets/jss/material-dashboard-react/tableStyle";
import { TablePagination } from "material-ui";

export class UserList extends Component {

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

  render () {
    const { total, items } = this.props;
    const { page } = this.state;
    return (
      <Grid container>
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
  return { total, items };
}

export default connect(mapStateToProps, {
  getAll: userActions.getAll,
  delete: userActions.delete
})(UserList);
