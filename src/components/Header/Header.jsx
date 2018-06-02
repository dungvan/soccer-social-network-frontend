import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@material-ui/icons";
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Button,
  Tabs,
  Tab
} from "@material-ui/core";
import cx from "classnames";

import headerStyle from "assets/jss/material-dashboard-react/headerStyle.jsx";

import HeaderLinks from "./HeaderLinks";
import { isAuthenticated, getCurrentUsername } from "../../utils";

class Header extends React.Component {
  state = {value: 0}
  makeBrand() {
    var name = "";
    if (!!this.props.routes) {
    this.props.routes.map((prop, key) => {
      if (prop.path === this.props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
  }
    return name;
  }
  handlerChange = (event, value) => {
    this.setState({ value });
  };
  render () {
    const { classes, color } = this.props;
    console.log(this.props)
    const appBarClasses = cx({
      [" " + classes[color]]: color
    });
    return (
      <div>
      <AppBar className={classes.appBar + appBarClasses} style={{backgroundColor:'#3a3a6161'}}>
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            { this.props.location.pathname.startsWith('/user/'+getCurrentUsername()) ?
            <Tabs
              value={this.state.value}
              onChange={this.handlerChange}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="auto"
            >
              <Tab label="UserProfile" onClick={()=>{this.props.history.push(function(pathname){var afterUser =pathname.indexOf("/", 6); if (afterUser === -1) return pathname; else return pathname.substring(0, afterUser)}(this.props.location.pathname))}} />
              <Tab label="Teams" onClick={()=>{this.props.history.push(function(pathname){var afterUser = pathname.indexOf("/", 6); if (afterUser === -1) return pathname; else return pathname.substring(0, afterUser)}(this.props.location.pathname)+"/teams")}} />
              <Tab label="Matches" onClick={()=>{this.props.history.push(function(pathname){var afterUser = pathname.indexOf("/", 6); if (afterUser === -1) return pathname; else return pathname.substring(0, afterUser)}(this.props.location.pathname)+"/matches")}} />
            </Tabs>
              :(<Button className={classes.title}>
                {this.makeBrand()}
              </Button>)
            }
          </div>
          <Hidden smDown implementation="css">
          {
            isAuthenticated() && <HeaderLinks />
          }
          </Hidden>
          <Hidden mdUp>
            <IconButton
              className={classes.appResponsive}
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
