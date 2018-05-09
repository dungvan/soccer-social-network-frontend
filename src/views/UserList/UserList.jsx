import React, { Component } from "react";
import {connect} from 'react-redux';
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
  TableCell
} from "material-ui";

import {
  Delete,
  Edit
} from '@material-ui/icons';

import "assets/jss/material-dashboard-react/tableStyle";

export class UserList extends Component {

  constructor(props) {
    super(props);
  }

  handleDelete(id) {
    this.props.delete(id)
  }

  componentWillMount() {
    this.props.getAll(1)
  }

  render () {
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Simple Table"
            cardSubtitle="Here is a subtitle for this table"
            content={
              <div>
                <Table>
                  <TableHead className={"primary" + " TableHeader"}>
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
                    {this.props.items.map((user) => {
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
  getAll: userActions.getAll, delete: userActions.delete, getByUsername: userActions.getByUsername
})(UserList);

