import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MatchCard, ItemGrid, TeamCard, SelectWrapped } from 'components';
import {
  Grid,
  withStyles,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Avatar
} from '@material-ui/core';
import { matchActions } from 'actions';
import { isEmpty } from 'lodash';
import { teamService } from '../../../services';

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
      backgroundColor: '#fff',
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


class Match extends Component {
  state = {team1: null, team2: null, teamCreate: [], descriptionCreate: '', dateStartCreate: new Date().toLocaleDateString()}

	componentWillMount() {
    this.props.getByMaster()
  }

  handleTypeTeamChange = (value) => {
    this.setState({teamCreate: value})
  }

  handleShowTeamName = (index) => {
    let {team1, team2} = this.props.items[index]
    this.setState({team1, team2})
  }

  getOptions = (input) => {
    if (!input) {
			return Promise.resolve({ options: [] });
		}
    return teamService.getAll(1, input).then(data => {
      return {options: data.teams}
    })
  }

  renderOption = (option) => {
    return (
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" style={{width:30, height:30}}>
            {!!option.avatar ? <img src={option.avatar} alt="avatar" /> : <span style={{ marginTop: 2.5, fontWeight: 'bold', fontSize: '18px'}}>{option.master.user_name.substring(0,1).toUpperCase()}</span>}
          </Avatar>
        }
        title={
          <span style={{ fontWeight: 'bold', fontSize: '18px'}} >{option.name}<span style={{color: '#717171', marginLeft: 100, fontSize: '14px', fontWeight: 'nomal'}}>{option.master.user_name}</span></span>
        }
      />
    );
  }

  _dateString(date) {
    let dateString = "1990-01-01";
    if (!!date) {
      date = new Date(date)
      const day = date.getDate();
      let dayString = day < 10 ? ("0"+day):day;
      const month = date.getMonth()+1;
      let monthString = month < 10 ? ("0"+month):month;
      dateString = date.getFullYear()+"-"+ monthString+"-"+dayString;
    } 
    return dateString
  }

	render () {
    const { items, classes } = this.props;
    return (
      <Grid container>
      <ItemGrid xs={12} sm={12} md={4}>
          <Card style={{maxWidth: 700, minHeight: 320,marginTop: 10, width: 309}}>
            <CardHeader
              style={{backgroundColor: '#f1f1f1'}}
              title={
                <span style={{fontWeight: 'bold', color:'#365899'}}>Let's Create A Match</span>
              }
            />
            <CardContent>
              <div className={classes.root} style={{display: 'flex'}}>
                <TextField
                  style={{marginBottom: 20, display: 'inline-block', marginLeft: 20, marginRight: 20}}
                  fullWidth
                  name="react-select-chip-label"
                  label="Select Two Team"
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    inputComponent: SelectWrapped,
                    inputProps: {
                      classes,
                      async: true,
                      value:this.state.teamCreate,
                      onChange:this.handleTypeTeamChange,
                      multi: true,
                      ignoreCase: false,
                      instanceId: 'react-select-chip-label',
                      id: 'react-select-chip-label',
                      loadOptions: this.getOptions,
                      valueKey: 'id',
                      labelKey: 'name',
                      optionRenderer: this.renderOption
                    },
                  }}
                />
              </div>
              <TextField
                style={{marginBottom: 20, marginLeft: 20, maxWidth: 220}}
                fullWidth
                multiline
                label={"Match Description"}
                placeholder={"Explain The Match"}
                value={this.state.descriptionCreate}
                onChange={(event)=>{this.setState({descriptionCreate: event.target.value})}}
              />
              <TextField
                style={{marginBottom: 20, marginLeft: 20, maxWidth: 220}}
                fullWidth
                multiline
                label={"Date Start"}
                InputLabelProps={{
                  shrink: true
                }}
                placeholder={"Explain The Match"}
                InputProps={{
                  inputComponent: 'input',
                  inputProps: {
                    type: 'date'
                  },
                  value: this._dateString(this.state.dateStartCreate),
                  onChange: (event)=>{this.setState({dateStartCreate: event.target.value})}
                }}
              />
              <div>
              <Button
                color="primary"
                disabled={this.state.teamCreate.length < 2 || isEmpty(this.state.descriptionCreate) || isEmpty(this.state.dateStartCreate)}
                onClick={()=> {this.props.createMatch({description: this.state.descriptionCreate, start_date: new Date(this.state.dateStartCreate), team1: this.state.teamCreate[0], team2: this.state.teamCreate[1]})}}
              >
              Agree
              </Button>
              <Button
                color="primary"
                disabled={this.state.teamCreate.length > 0 || isEmpty(this.state.descriptionCreate)}
                onClick={()=>{this.setState({users: [], teamName: '', teamDescription: ''})}}
              >
              Cancle
              </Button>
              </div>
            </CardContent>
          </Card>
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={8}>
          <div style={{display: "flex"}}>
            <ItemGrid xs={12} sm={12} md={6}>
            {this.state.team1 &&
              <TeamCard
                history={this.props.history}
                team={this.state.team1}
              />
            }
            </ItemGrid>
            <ItemGrid xs={12} sm={12} md={6}>
            {this.state.team2 &&
              <TeamCard
                history={this.props.history}
                team={this.state.team2}
              />
            }
            </ItemGrid>
          </div>
        </ItemGrid>
        <div style={{overflow: 'scroll', display: 'block', maxHeight: 400, width: '100%'}}>
        {
          items.map((match, index) => {
            return (
              <ItemGrid xs={12} sm={12} md={4} key={match.id} style={{display: 'inline-block'}}>
                <MatchCard
                  history={this.props.history}
                  matchID={match.id}
                  user={match.master}
                  title={match.description}
                  date={new Date(match.start_date)}
                  tournament={match.tournament}
                  team={{1: match.team1, 2:match.team2}}
                  goals={{1: match.team1_goals, 2: match.team2_goals}}
                  goalsEditable
                  onClick={this.handleShowTeamName.bind(this, index)}
                />
              </ItemGrid>
            );
          })
        }
        </div>
      </Grid>
    );
	}
}

const mapStateToProps = (state) => {
  const { items } = state.matches;
	return { items }
}

export default connect(mapStateToProps, {
  getByMaster: matchActions.getByMaster,
  createMatch: matchActions.create
})(withStyles(styles)(Match))