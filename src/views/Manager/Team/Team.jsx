
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { ItemGrid, AsynSelectWrapped } from 'components';
import {
  withStyles,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  Avatar,
} from '@material-ui/core';
import { teamActions } from 'actions';
import { TeamCard } from 'components';
import 'react-select/dist/react-select.css';
import { isEmpty } from 'lodash';
import { userActions } from 'actions';
import { userService } from '../../../services';

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  titleName: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#365899',
  },
  titleUserName: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  userContainer: {
    display: 'block'
  },
  user: {
    display: 'inline-block',
    borderRadius: 3,
    border: '2px solid green',
    margin: 10,
    padding: 10,
    textAlign: 'center'
  },
  userPosition: {
    margin: 'auto',
    display: 'block',
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.875rem',
    fontWeight: 500,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    lineHeight: '1.71429em'
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

class Team extends Component {
  state = {users: [], teamName: '', teamDescription: ''}

	componentWillMount() {
    this.props.getByMaster()
  }

  handleTypeUserChange = value => {
    this.setState({
      users: value,
    });
  };

  handlePositionSelectChange = (index, event) => {
    var users = this.state.users
    users[index].position = event.target.value
    this.setState({ users });
  };

  getOptions = (input) => {
    if (!input) {
			return Promise.resolve({ options: [] });
		}
    return userService.getAll(1, input, []).then(data => {
      return {options: data.users.filter((user) => {user.position = 'any'; return user})}
    })
  }

  renderOption = (option) => {
    return (
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" style={{width:30, height:30}}>
            {!!option.avatar ? <img src={option.avatar} alt="avatar" /> : <span style={{ marginTop: 2.5, fontWeight: 'bold', fontSize: '18px'}}>{option.user_name.substring(0,1).toUpperCase()}</span>}
          </Avatar>
        }
        title={
          <span style={{ fontWeight: 'bold', fontSize: '18px'}} >{option.user_name}<span style={{color: '#717171', marginLeft: 100, fontSize: '14px', fontWeight: 'nomal'}}>{option.email}</span></span>
        }
      />
    );
  }

	render () {
		const { items, classes } = this.props;
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={8}>
          <Card style={{maxWidth: 700, minHeight: 400,marginTop: 10}}>
            <CardHeader
              style={{backgroundColor: '#f1f1f1'}}
              title={
                <span style={{fontWeight: 'bold', color:'#365899'}}>Let's Create A Team</span>
              }
            />
            <CardContent>
              <div style={{display: 'flex'}}>  
                <TextField
                  style={{marginBottom: 20, display: 'inline-block', width: 200, marginLeft: 20}}
                  fullWidth
                  label={"Name"}
                  placeholder={"Your Team Name"}
                  value={this.state.teamName}
                  onChange={(event)=>{this.setState({teamName: event.target.value})}}
                />
                <TextField
                  style={{marginBottom: 20, display: 'inline-block', marginLeft: 20, marginRight: 20}}
                  fullWidth
                  multiline
                  label={"Team Description"}
                  placeholder={"Explain Your Team"}
                  value={this.state.teamDescription}
                  onChange={(event)=>{this.setState({teamDescription: event.target.value})}}
                />
              </div>
              <div className={classes.root} style={{display: 'flex'}}>
                <TextField
                  style={{marginBottom: 20, display: 'inline-block', marginLeft: 20, marginRight: 20}}
                  fullWidth
                  placeholder={null}
                  name="react-select-chip-label"
                  label="Select Multiple Players"
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    inputComponent: AsynSelectWrapped,
                    inputProps: {
                      classes,
                      value:this.state.users,
                      onChange:this.handleTypeUserChange,
                      multi: true,
                      instanceId: 'react-select-chip-label',
                      id: 'react-select-chip-label',
                      loadOptions: this.getOptions,
                      valueKey: 'id',
                      labelKey: 'user_name',
                      optionRenderer: this.renderOption
                    },
                  }}
                />
              </div>
              <div className={classes.userContainer}>
              {this.state.users.map((user, index)=>{
                const position = user.position === 'any'? "any" : user.position
                return (
                  <div key={user.id} className={classes.user}>
                    <span className={classnames(classes.titleName, classes.titleUserName)} onClick={() => {return this.props.history.push('/user/'+user.user_name)}}>{user.user_name}</span>
                    <select
                      className={classes.userPosition}
                      value={position}
                      onChange={this.handlePositionSelectChange.bind(this, index)}
                      name="position"
                    >
                      <option value={'any'}>any</option>
                      <option value={'goalkeeper'}>goalkeeper</option>
                      <option value={'back'}>back</option>
                      <option value={'defender'}>defender</option>
                      <option value={'midfielder'}>midfilder</option>
                      <option value={'winger'}>winger</option>
                      <option value={'stricker'}>stricker</option>
                    </select>
                  </div>
                );
              })}
              </div>
              <div>
              <Button
                color="primary"
                disabled={this.state.users.length < 5 || isEmpty(this.state.teamName)}
                onClick={()=> {this.props.createTeam({players: this.state.users, name: this.state.teamName, description: this.state.teamDescription})}}
              >
              Agree
              </Button>
              <Button
                color="primary"
                disabled={this.state.users.length < 1 || isEmpty(this.state.teamName) || isEmpty(this.state.teamName)}
                onClick={()=>{this.setState({users: [], teamName: '', teamDescription: ''})}}
              >
              Cancle
              </Button>
              </div>
            </CardContent>
          </Card>
        </ItemGrid>
      {items.map((team, index) => {
        return (
          <ItemGrid xs={12} sm={12} md={4} key={team.id}>
          <TeamCard
            history={this.props.history}
            team={team}
          />
          </ItemGrid>
        );
      })}
      </Grid>
    );
	}
}

const mapStateToProps = (state) => {
  const { items } = state.teams;
	return { items }
}

export default connect(mapStateToProps, {
  getByMaster: teamActions.getByMaster,
  searchUser: userActions.searchUser,
  createTeam: teamActions.create
})(withStyles(styles)(Team))