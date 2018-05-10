import React from "react";
import PropTypes from "prop-types";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";

import { Header, Footer, Sidebar } from "components";
import { AuthRoutes, authSidebar } from "routes/Auth/authRoutes.jsx"
import { AdminRoutes, adminSidebar } from "routes/Admin/adminRoutes.jsx";
import { isAuthenticated, isSuperAdmin } from "utils/auth-user";
import appStyle from "assets/jss/material-dashboard-react/appStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

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
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
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

export default withStyles(appStyle)(App);
