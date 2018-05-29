import React, { Component } from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { Card, CardContent, CardHeader, IconButton } from 'material-ui';
import Collapse from 'material-ui/transitions/Collapse';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import {
  ExpandMore
} from '@material-ui/icons';
import winner from 'assets/img/winner.png';

const styles = theme => ({
  card: {
    display: 'inline-block',
    maxWidth: 309,
    borderRadius: 10,
    border: '2px solid #1927d4',
    marginTop: 10,
    marginBottom: 10
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
  team2Winer: {
    marginTop: -20,
    marginLeft: 260
  },
  tournamentTitle: {
    fontSize: '11px',
    fontWeight: 'bold'
  },
  tournamentInfo: {
    fontSize: '11px',
  }
})

class MatchCard extends Component {
  state = {expanded: false}
  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded})
  }
  render() {
    const {
      classes,
      tournament,
      title,
      date,
      user,
      avatar,
     } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar} onClick={() => {console.log("fffffffffffffffff")}}>
                {!!avatar ? <img src={avatar} alt="avatar" /> : <span className={classes.avatarContent}>{user.user_name.substring(0,1).toUpperCase()}</span>}
            </Avatar>
          }
          action={
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
          }
          title={<span style={{fontWeight: 'bold', fontSize: '1rem', marginLeft: -10}}>{title}</span>}
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
          <img src={winner} alt="winner" className={classnames(classes.team2Winer, classes.label)} />
          <div className={classnames(classes.left, classes.lose)}>
            <span className={classes.teamName}>team1</span>
            {this.state.expanded &&
              <span className={classes.score}>1</span>}
          </div>
          <div className={classnames(classes.right, classes.win)}>
            <span className={classes.teamName}>team2</span>
            {this.state.expanded &&
              <span className={classes.score}>2</span>}
          </div>
        </CardContent>
      </Card>
    );
  }
}

MatchCard.protoTypes = {
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired
}

export default withStyles(styles)(MatchCard);