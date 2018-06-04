import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core';
import classnames from 'classnames';
import { red } from '@material-ui/core/colors';
import ImageGridList from '../GridList/ImageGridList';

const styles = theme => ({
  postCard: {
    marginTop: 10,
    marginBottom: 10
  },
  card: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[300],
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
    paddingTop: 3,
  },
  cardComment: {
    display: 'flex',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 2,
    paddingBottom: 8,
    backgroundColor: "#f1f1f1"
  },
  avatarComment: {
    marginTop:10,
    height:32,
    width:32,
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
  line: {
    height:1, margin:0,
    border: 'none',
    flexShink:0,
    backgroundColor:'#0000001f'
  },
  iconComment: {
    width:30,
    height:30
  },
  actionComment: {
    backgroundColor: "#f1f1f1",
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 2,
    paddingBottom: 2
  },
  textComment: {
    fontFamily: 'inherit',
    fontSize: 13,
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    paddingRight:16,
    paddingLeft:16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbdbd',
    borderRadius: 24,
    backgroundColor: '#FFFFFF'
  },
  spanStar: {
    color: '#365899',
    marginLeft: 8,
    marginTop: 2,
    fontSize: 13,
    width: 'auto'
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
  popover: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

class PostFindCard extends React.Component {
  state = {};

  render() {
    const {
      classes,
      mediaImages,
      avatar,
      postDate,
      user
    } = this.props;
    return (
      <div className={classes.postCard} style={{width: 450}}>
        <Card className={classes.card} onClick={()=>{this.props.push("/post/"+this.props.postID)}}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {!!avatar ? <img src={avatar} alt="avatar" /> : <span className={classes.avatarContent}  style={{fontSize: '24px'}}>{user.user_name.substring(0,1).toUpperCase()}</span>}
              </Avatar>
            }
            title={<span className={classnames(classes.titleName, classes.titleUserName)} onClick={() => {return this.props.history.push('/user/'+user.user_name)}}>{user.user_name}</span>}
            subheader={postDate.toLocaleDateString('vi-VN')}
          />
          {
            !!mediaImages &&
            <ImageGridList srcs={mediaImages} />
          }
          <CardContent>
            <Typography component="p">
            {this.props.content}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

PostFindCard.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  postID: PropTypes.any.isRequired,
  content: PropTypes.string.isRequired,
  postDate: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostFindCard);
