import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withStyles, Card, CardContent, CardHeader, IconButton, Avatar } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import {
  ExpandMore,
  Check
} from '@material-ui/icons';
import winner from 'assets/img/winner.png';
import draw from 'assets/img/draw.png';
import { isNil } from 'lodash';
import { matchActions } from 'actions';

const styles = theme => ({
  card: {
    display: 'inline-block',
    maxWidth: 309,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  cardActive: {
    backgroundColor: 'pink'
  },
  cardHeader: {
    padding: 3
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

class MatchCard extends Component {
  state = {expanded: false, team1_goals: this.props.goals[1], team2_goals: this.props.goals[2], goalsChanged: false}
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
      this.props.update({id: this.props.matchID, team1_goals: this.state.team1_goals, team2_goals: this.state.team2_goals})
    }
    this.setState({goalsChanged: false, expanded: false})
  }
  render() {
    const {
      classes,
      tournament,
      title,
      date,
      user,
      avatar,
      team,
      goals,
      goalsEditable,
      onClick
    } = this.props;
    this.status = (!isNil(goals[1]) && !isNil(goals[2])) ? (goals[1] > goals[2] ? 'win':(goals[1] !== goals[2] ? 'lose':'draw')):'none'
    return (
      <Card className={classes.card} onClick={onClick}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar} onClick={() => {return this.props.history.push('/user/'+user.user_name)}}>
                {!!avatar ? <img src={avatar} alt="avatar" /> : <span className={classes.avatarContent}>{user.user_name.substring(0,1).toUpperCase()}</span>}
            </Avatar>
          }
          action={
            <div>
              {
                this.state.expanded && goalsEditable &&
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
          title={<span className={classes.titleName}>{title}</span>}
          subheader={!tournament ? date.toLocaleDateString('vi-VN'):date.toLocaleDateString('vi-VN') + ' ' + tournament.name}
        />
        {tournament &&
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <hr className={classes.line} />
            <CardContent>
              <div>
                <span className={classes.tournamentTitle}>Tournament Name: </span>
                <span className={classes.tournamentInfo}>{tournament.name}</span>
              </div>
              <div>
                <span className={classes.tournamentTitle}>Tournament Description: </span>
                <span className={classes.tournamentInfo}>{tournament.description}</span>
              </div>
              <div>
                <span className={classes.tournamentTitle}>Tournament Start: </span>
                <span className={classes.tournamentInfo}>{new Date(tournament.start_date).toLocaleDateString('vi-VN')}</span>
              </div>
              <div>
                <span className={classes.tournamentTitle}>Tournament End: </span>
                <span className={classes.tournamentInfo}>{new Date(tournament.end_date).toLocaleDateString('vi-VN')}</span>
              </div>
            </CardContent>
            <hr className={classes.line} />
          </Collapse>
        }
        <CardContent className={classes.cardContent} style={{paddingBottom: 3}} >
          {this.status !== 'draw' && this.status !== 'none' &&
            <img src={winner} alt="winner" className={classnames(this.status === 'win'? classes.team1Winner : classes.team2Winner, classes.label)} />
          }
          {this.status === 'draw' &&
            <img src={draw} alt="draw" className={classnames(classes.draw, classes.label)} />
          }
          <div className={classnames(classes.left, this.status === 'win'? classes.win : (this.status === 'lose' ? classes.lose :classes.goalsEqual))}>
            <span className={classes.teamName}>{team[1].name}</span>
            {this.state.expanded &&
              (!goalsEditable ?
                <span className={classes.score}>{goals[1]}</span>:<input type="number" value={this.state.team1_goals} onChange={this.handleChangeTeam1Goals.bind(this)} className={classes.score} style={{marginLeft:30, width:75, height:50, paddingLeft:10, paddingTop:10}}/>
              )}
          </div>
          <div className={classnames(classes.right, this.status === 'win'? classes.lose : (this.status === 'lose' ? classes.win :classes.goalsEqual))}>
            <span className={classes.teamName}>{team[2].name}</span>
            {this.state.expanded &&
              (!goalsEditable ?
                <span className={classes.score}>{goals[2]}</span>:<input type="number" value={this.state.team2_goals} onChange={this.handleChangeTeam2Goals.bind(this)} className={classes.score} style={{marginLeft:30, width:75, height:50, paddingLeft:10, paddingTop:10}}/>
              )}
          </div>
        </CardContent>
      </Card>
    );
  }
}

MatchCard.protoTypes = {
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  goals: PropTypes.object.isRequired,
  goalsEditable: PropTypes.bool,
  matchID: PropTypes.any.isRequired
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {
  update: matchActions.update
})(withStyles(styles)(MatchCard));