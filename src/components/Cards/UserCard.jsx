import React, { Component } from 'react';
import { withStyles, Card, CardHeader, Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  card: {
    display: 'inline-block',
    backgroundColor: '#fafafa',
    width: 300,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    '&:hover': {
      cursor: 'pointer'
    }
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
  }
})

class UserCard extends Component {
  state = {expanded: false}
  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded})
  }
  render() {
    const {
      classes,
      user
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar} onClick={() => {return this.props.history.push('/user/'+user.user_name)}}>
                {!!user.avatar ? <img src={user.avatar} alt="avatar" /> : <span className={classes.avatarContent}>{user.user_name.substring(0,1).toUpperCase()}</span>}
            </Avatar>
          }
          title={<span className={classes.titleName}>{user.user_name}</span>}
          subheader={user.first_name + " " + user.last_name}
        />
      </Card>
    );
  }
}

UserCard.protoTypes = {
  user: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserCard);