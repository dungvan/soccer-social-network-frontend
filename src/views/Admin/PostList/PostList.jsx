import React, { Component } from "react";
import { connect } from 'react-redux';

import { postActions, alertActions } from 'actions';
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
} from "material-ui";

import {
  Delete
} from '@material-ui/icons';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

import "assets/jss/material-dashboard-react/tableStyle";
import { alertConstants } from "../../../constants";

const SweetAlert = withSwalInstance(swal);

export class PostList extends Component {

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

  _dateTimeString(date) {
    date = new Date(date)
    let dateTimeString = date.toString().substring(0,33)
    return dateTimeString
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
          onCancel={()=> {this.props.dispathAlertClear(alertConstants.WARNING_CLEAR)}}
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
                          <TableCell>{post.user.user_name}</TableCell>
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
  const { total, items } = state.posts;
  const { alert } = state ;
  return { total, items, alert };
}

export default connect(mapStateToProps, {
  getAll: postActions.getAll,
  delete: postActions.delete,
  dispathAlertWarning: alertActions.warning,
  dispathAlertClear: alertActions.clear
})(PostList);

