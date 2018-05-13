import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';

import { Header, Footer, Sidebar } from "components";
import { AuthRoutes, authSidebar } from "routes/Auth/authRoutes.jsx"
import { AdminRoutes, adminSidebar } from "routes/Admin/adminRoutes.jsx";
import { isAuthenticated, isSuperAdmin } from "utils/auth-user";
import appStyle from "assets/jss/material-dashboard-react/appStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { alertActions, userActions } from "../actions";
import { alertConstants } from "../constants";

const SweetAlert = withSwalInstance(swal);

class App extends React.Component {
  state = {
    mobileOpen: false
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  componentDidMount() {
    if(navigator.platform.indexOf('Win') > -1){
      // eslint-disable-next-line
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0;
  }
  render() {
    const { classes, alert, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <SweetAlert
          show={alert.success}
          type='success'
          title='Your work has been saved'
          showConfirmButton={true}
          onComfirm={()=> { this.props.dispathAlertClear(alertConstants.SUCCESS_CLEAR)}}
        />
        <SweetAlert
          show={alert.error}
          type='error'
          title='Oops...'
          text='Something went wrong!'
          onComfirm={()=> { this.props.dispathAlertClear(alertConstants.SUCCESS_CLEAR)}}
          onClose={()=> this.props.dispathAlertClear(alertConstants.ERROR_CLEAR)}
        />
        <Sidebar
          routes={
            isAuthenticated() ? (
              isSuperAdmin()? adminSidebar: null
            ):authSidebar
          }
          logoText={"Soccer Social"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={
              isAuthenticated() ? (
                isSuperAdmin()? adminSidebar: null
              ):authSidebar
            }
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              {
                isAuthenticated() ? (
                  isSuperAdmin() ? <AdminRoutes />:null
                ):<AuthRoutes />
              }
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const { alert } = state;
  return { alert }
}

export default connect(mapStateToProps, {
  deleteUser: userActions.delete,
  dispathAlertClear: alertActions.clear
})(withStyles(appStyle)(App));

