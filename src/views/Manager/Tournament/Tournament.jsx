import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ItemGrid } from 'components';
import {
  Grid,
  withStyles,
  CardHeader,
  Avatar
} from '@material-ui/core';
import { tournamentActions } from 'actions';
import { tournamentService } from '../../../services';
import TournamentCard from '../../../components/Cards/TournamentCard';

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


class Match extends Component {
  state = {tournament1: null, tournament2: null, tournamentCreate: [], descriptionCreate: '', dateStartCreate: new Date().toLocaleDateString()}

	componentWillMount() {
    this.props.getByMaster()
  }

  handleTypeTeamChange = (value) => {
    this.setState({tournamentCreate: value})
  }

  handleShowTeamName = (index) => {
    let {tournament1, tournament2} = this.props.items[index]
    this.setState({tournament1, tournament2})
  }

  getOptions = (input) => {
    if (!input) {
			return Promise.resolve({ options: [] });
		}
    return tournamentService.getAll(1, input).then(data => {
      return {options: data.tournaments}
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
    const { items } = this.props;
    return (
      <Grid container>
      {items.map(tournament => (
        <ItemGrid xs={12} sm={12} md={12} key={tournament.id}>
          <TournamentCard
            history={this.props.history}
            tournament={tournament}
          />
        </ItemGrid>
      ))
      }
      
      </Grid>
    );
	}
}

const mapStateToProps = (state) => {
  const { items } = state.tournaments;
	return { items }
}

export default connect(mapStateToProps, {
  getByMaster: tournamentActions.getByMaster,
  createMatch: tournamentActions.create
})(withStyles(styles)(Match))