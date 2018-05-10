import React, { Component } from "react";
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';

import {postActions} from '../../actions';
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
    console.log(page)
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

  _dateTimeString(date) {
    date = new Date(date)
    let dateTimeString = date.toString().substring(0,33)
    return dateTimeString
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
                      <TableCell>User ID</TableCell>
                      <TableCell>Caption</TableCell>
                      <TableCell>Post Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((post) => {
                      return (
                        <TableRow key={post.id}>
                          <TableCell>{post.id}</TableCell>
                          <TableCell>{post.user_id}</TableCell>
                          <TableCell>{
                            post.caption.length < 37 ? post.caption : (post.caption.substring(0,26) + '...')
                          }</TableCell>
                          <TableCell>{this._dateTimeString(post.created_at)}</TableCell>
                          <TableCell>
                            <IconButton size="small" color="secondary" onClick={this.handleDelete.bind(this, post.id)}><Delete /></IconButton>
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
  const { total, items } = state.posts
  return { total, items };
}

export default connect(mapStateToProps, {
  getAll: postActions.getAll,
  delete: postActions.delete
})(UserList);

