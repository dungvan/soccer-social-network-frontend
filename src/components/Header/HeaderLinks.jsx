import React from "react";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  withStyles,
  IconButton,
  Hidden,
  TextField,
  CardHeader
} from "@material-ui/core";
import { Person, Dashboard, Search } from "@material-ui/icons";

import { IconButton as SearchButton, SelectWrapped } from "components";

import headerLinksStyle from "assets/jss/material-dashboard-react/headerLinksStyle";
import { getCurrentUsername } from "../../utils";
import { userService, teamService } from "../../services";

class HeaderLinks extends React.Component {
  state = {
    search: '',
    options: []
  };

  search=''

  handleChange = value => {
    this.setState({search: value.name})
    if (value.type === 'user') {
      window.location.href = '/user/'+value.name
    }
  }

  handleLoad(value) {
    this.setState({options: []})
    this.search = value
    if (!value) {
      return Promise.resolve({options: this.state.options});
    }
    return teamService.getAll(1, value).then(resp => {
      let teamOptions = resp.teams.map(team=>({id: team.id, type: 'team', name: team.name}))
      return userService.getAll(1, value).then(resp => {
        let userOptions = resp.users.map(user=>({id: user.id, type: 'user', name: user.user_name}))
        return {options: [...teamOptions, ...userOptions]}
      })
    })
  };
  
  renderOption = (option) => {
    return (
      <CardHeader
        title={
          <span style={{ fontWeight: 'bold', fontSize: '18px'}} >{option.name}<span style={{color: '#717171', marginLeft: 10, fontSize: '14px', fontWeight: 'nomal'}}>{option.type}</span></span>
        }
      />
    );
  }

  handleSubmit = () => {
    this.props.history.push("/find/?search="+this.search)
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          style={{width: 350}}
          InputProps={{
            inputComponent: SelectWrapped,
            id:"react-select-single",
            inputProps: {
              classes,
              async: true,
              placeholder: "text to search",
              ignoreCase: false,
              name: 'react-select-single',
              instanceId: 'react-select-single',
              onChange: this.handleChange,
              value: this.state.search,
              options: this.state.options,
              valueKey: 'id',
              labelKey: 'name',
              loadOptions: this.handleLoad.bind(this),
              optionRenderer: this.renderOption
            },
          }}
        />
        <SearchButton
          color="white"
          aria-label="edit"
          customClass={classes.margin + " " + classes.searchButton}
          onClick={this.handleSubmit}
        >
          <Search className={classes.searchIcon}

          />
        </SearchButton>
        <NavLink to="/">
        <IconButton
          color="inherit"
          aria-label="Dashboard"
          className={classes.buttonLink}
        >
          <Dashboard className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </IconButton>
        </NavLink>
        <NavLink to={"/user/"+getCurrentUsername()}>
        <IconButton
          color="inherit"
          aria-label="Person"
          className={classes.buttonLink}
        >
          <Person className={classes.links} />
          <Hidden mdUp>
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </IconButton>
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userItems = state.users.items;
  const teamItems = state.teams.items;
  return {
    userItems,
    teamItems
  }
}

export default connect(mapStateToProps, {
})(withStyles(headerLinksStyle)(HeaderLinks));
