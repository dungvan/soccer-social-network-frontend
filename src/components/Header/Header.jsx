import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@material-ui/icons";
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Button
} from "material-ui";
import cx from "classnames";

import headerStyle from "assets/jss/material-dashboard-react/headerStyle.jsx";

import HeaderLinks from "./HeaderLinks";
import { isAuthenticated } from "../../utils";

function Header({ ...props }) {
  function makeBrand() {
    var name = "";
    if (!!props.routes) {
    props.routes.map((prop, key) => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
      }
      return null;
    });
  }
    return name;
  }
  const { classes, color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses} style={{backgroundColor:'#3a3a6161'}}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button className={classes.title}>
            {makeBrand()}
          </Button>
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
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
