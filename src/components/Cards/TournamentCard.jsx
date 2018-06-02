import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withStyles, Card, CardContent, CardHeader, IconButton, Avatar } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import { TeamCard, MatchCard, ItemGrid } from 'components';
import {
  ExpandMore,
  Check
} from '@material-ui/icons';
import { tournamentActions } from 'actions';

const styles = theme => ({
  card: {
    display: 'inline-block',
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  },
  cardActive: {
    backgroundColor: 'pink'
  },
  cardContent: {
    padding: 3,
    display: 'flex'
  },
  avatar: {
    width: 32,
    height: 32,
    boxSizing: 'border-box',
    transitionDuration: '0.4s',
    '&:hover': {
      border: '2px solid #8888dd',
      cursor: 'pointer'
    },
    '&:active': {
      opacity: 0.5
    }
  },
  avatarContent: {
    paddingTop: 2.5
  },
  win: {
    border: '1.5px solid green',
    color: 'green'
  },
  lose: {
    border: '1.5px solid red',
    color: 'red'
  },
  left: {
    marginRight: 1.5,
    width: 150,
    maxHeight: 120
  },
  line: {
    height:1, margin:0,
    border: 'none',
    flexShink:0,
    backgroundColor:'#0000001f'
  },
  right: {
    marginLeft: 1.5,
    width: 150,
    maxHeight: 120
  },
  teamName: {
    display: 'block',
    fontWeight: 'bold',
    textAlign: 'center',
    height: '33.3%',
    lineHeight: '40px',
    verticalAlign: 'middle',
  },
  score: {
    display: 'block',
    textAlign: 'center',
    height: '66.7%',
    lineHeight: '70px',
    verticalAlign: 'middle',
    fontSize: '48px'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginRight: 16,
    marginTop: 8
  },
  check: {
    color: 'green',
    marginRight: 5,
    marginTop: 8
  },
  hiddenCheck: {
    display: 'none'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  iconExpand: {
    width:30,
    height:30
  },
  label: {
    width: 64,
    height: 64,
    position: 'absolute',
    transform: 'rotate(-30deg)',
  },
  team1Winner: {
    marginTop: -20,
    marginLeft: 100
  },
  team2Winner: {
    marginTop: -20,
    marginLeft: 260
  },
  tournamentTitle: {
    fontSize: '11px',
    fontWeight: 'bold'
  },
  tournamentInfo: {
    fontSize: '11px',
  },
  goalsEqual: {
    border: '1.5px solid gray',
    color: 'gray'
  },
  draw: {
    marginTop: -20,
    marginLeft: 120
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
  }
})

class TournamentCard extends Component {
  state = {expanded: false}
  status = 'none'
  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded})
  }
  handleChangeTeam1Goals = (e) => {
    this.setState({team1_goals: e.target.value, goalsChanged: true})
  }
  handleChangeTeam2Goals = (e) => {
    this.setState({team2_goals: e.target.value, goalsChanged: true})
  }
  handleSubmitGoals = () => {
    if (this.state.goalsChanged) {
      this.props.update({id: this.props.tournamentID, team1_goals: this.state.team1_goals, team2_goals: this.state.team2_goals})
    }
    this.setState({goalsChanged: false, expanded: false})
  }
  render() {
    const {
      classes,
      tournament
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar} onClick={() => {return this.props.history.push('/user/'+tournament.master.user_name)}}>
                {!!tournament.master.avatar ? <img src={tournament.master.avatar} alt="avatar" /> : <span className={classes.avatarContent}>{tournament.master.user_name.substring(0,1).toUpperCase()}</span>}
            </Avatar>
          }
          action={
            <div>
              {
                this.state.expanded &&
                <IconButton
                  className={classnames(classes.iconExpand, classes.check)}
                  onClick={this.handleSubmitGoals}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <Check />
                </IconButton>
              }
              <IconButton
                className={classnames(classes.iconExpand, classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMore />
              </IconButton>
            </div>
          }
          title={<span className={classes.titleName}>{tournament.name}</span>}
          subheader={"from " + new Date(tournament.start_date).toLocaleDateString('vi-VN') + " to " + new Date(tournament.end_date).toLocaleDateString('vi-VN')}
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <hr className={classes.line} />
          <CardContent>
            <div>
              <span className={classes.tournamentTitle}>Tournament Description: </span>
              <span className={classes.tournamentInfo}>{tournament.description}</span>
            </div>
            <ItemGrid xs={12} sm={12} md={12} style={{display: 'block'}}>
            {tournament.teams.map(team => (
              <ItemGrid xs={12} sm={12} md={6} key={team.id} style={{display: 'inline-block', width: '100%'}}>
                <TeamCard
                  style={{margin: '10px 60px'}}
                  history={this.props.history}
                  team={team}
                />
              </ItemGrid>
            ))
            }
            </ItemGrid>
            <hr className={classes.line} />
            <ItemGrid xs={12} sm={12} md={12} style={{display: 'block'}}>
            {tournament.matches.map(match => (
              <ItemGrid xs={12} sm={12} md={6} key={match.id} style={{display: 'inline-block', width: '100%'}}>
                <MatchCard
                  history={this.props.history}
                  matchID={match.id}
                  user={tournament.master}
                  title={match.description}
                  date={new Date(match.start_date)}
                  tournament={match.tournament}
                  team={{1: tournament.teams.filter(team => (match.team1_id === team.id))[0], 2: tournament.teams.filter(team => (match.team2_id === team.id))[0]}}
                  goals={{1: match.team1_goals, 2: match.team2_goals}}
                  goalsEditable
                />
              </ItemGrid>
            ))
            }
            </ItemGrid>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

TournamentCard.protoTypes = {
  tournament: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {
  update: tournamentActions.update
})(withStyles(styles)(TournamentCard));