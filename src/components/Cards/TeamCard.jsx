import React, { Component } from 'react';
import classnames from 'classnames';
import { withStyles, Card, CardContent, CardHeader, IconButton, Avatar } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import {
  ExpandMore
} from '@material-ui/icons';

const styles = theme => ({
  card: {
    display: 'inline-block',
    backgroundColor: '#fafafa',
    width: 300,
    borderRadius: 10,
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
  line: {
    height:1, margin:0,
    border: 'none',
    flexShink:0,
    backgroundColor:'#0000001f'
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
  playerContainer: {
    display: 'block'
  },
  player: {
    width: '35%',
    display: 'inline-block',
    borderRadius: 3,
    border: '2px solid green',
    margin: 10,
    padding: 10,
    textAlign: 'center'
  },
  playerPosition: {
    display: 'block',
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.875rem',
    fontWeight: 500,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    lineHeight: '1.71429em'
  },
  teamTitle: {
    fontSize: '11px',
    fontWeight: 'bold'
  },
  teamInfo: {
    fontSize: '11px',
  },
})

class TeamCard extends Component {
  state = {expanded: false}
  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded})
  }
  render() {
    const {
      classes,
      team
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar} onClick={() => {return this.props.history.push('/user/'+team.master.user_name)}}>
                {!!team.avatar ? <img src={team.avatar} alt="avatar" /> : <span className={classes.avatarContent}>{team.master.user_name.substring(0,1).toUpperCase()}</span>}
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
          title={<span className={classes.titleName}>{team.name}</span>}
          subheader={team.players.length+" members"}
        />
        <hr className={classes.line} />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <div>
            <span className={classes.teamTitle}>Team Description: </span>
            <span className={classes.teamInfo}>{team.description}</span>
          </div>
          </CardContent>
          <hr className={classes.line} />
        </Collapse>
        <div className={classes.playerContainer}>
        {team.players.map((player, index)=>{
          return (index <= 5 || (index > 5 && this.state.expanded)) && (
            <div key={player.id} className={classes.player}>
              <span className={classnames(classes.titleName, classes.titleUserName)} onClick={() => {return this.props.history.push('/user/'+player.user_name)}}>{player.user_name}</span>
              <span className={classes.playerPosition}>{player.position}</span>
            </div>
          );
        })}
        </div>
      </Card>
    );
  }
}

TeamCard.protoTypes = {
  team: PropTypes.object.isRequired,
}

export default withStyles(styles)(TeamCard);