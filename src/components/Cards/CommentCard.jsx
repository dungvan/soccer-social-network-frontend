import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import {
  Close,
  Star,
  StarBorder
} from '@material-ui/icons';
import { isCurrentUser } from 'utils';
import { commentService } from 'services';

const styles = theme => {
  return {
    avatar: {
      backgroundColor: red[300],
    },
    cardComment: {
      display: 'flex',
      paddingLeft: 24,
      paddingRight: 24,
      paddingTop: 2,
      paddingBottom: 2,
      backgroundColor: "#f1f1f1"
    },
    avatarComment: {
      marginTop:10,
      height:32,
      width:32
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
      verticalAlign: 'middle',
      fontFamily: 'inherit',
      fontSize: 13,
      marginTop:10,
      marginLeft:10,
      marginRight:10,
      marginBottom: 6,
      paddingRight:16,
      paddingTop: 7,
      paddingBottom: 2,
      paddingLeft:16,
      borderRadius: 24,
      backgroundColor: '#FFFFFF'
    },
    favLink: {
      color: '#365899',
      display: 'inline-block',
      fontSize: 13,
      width: 'auto',
    }
  }
}

class CommentCard extends Component {

  state={star: !!this.props.comment.star_flag, starCount: this.props.comment.star_count, deleted: false}
  currStarCount = this.props.comment.star_count
  handleStarClick = () => {
    const newStarCount = this.state.star ? () => {
      this.currStarCount--;
      let id = this.props.comment.id;
      commentService.downStar({post_id:this.props.comment.post_id,id}) ; return this.currStarCount
    } : () => {
      this.currStarCount++;
      let id = this.props.comment.id;
      commentService.upStar({post_id:this.props.comment.post_id,id})  ;return this.currStarCount
    };
    this.setState({ star: !this.state.star, starCount: newStarCount() });
  };
  handleDelete = () => {
    let id = this.props.comment.id;
    commentService.delete({post_id:this.props.comment.post_id,id})
    this.setState({deleted: true})
  }

  render () {
    const { classes, comment } = this.props;
    const { deleted, star, starCount } = this.state;
    if (deleted) {
      return null;
    }
    return (
      <div className={classes.cardComment}>
        <Avatar
          className={classnames(classes.avatar, classes.avatarComment)}
          aria-label="Recipe"
        >
        {!!comment.avatar ? <img src={comment.avatar} alt="avatar" /> : comment.user.user_name.substring(0,1).toUpperCase()}
        </Avatar>
        <div>
          <div style={{display: 'flex'}}>
            <Typography
              className={classnames(classes.textComment, classes.TextField)}
            >
              <span style={{fontSize:14, fontWeight: 'bold', color: '#365899'}}><a>{comment.user.user_name}</a> </span>{comment.content}
            </Typography>
            <IconButton style={{display:'flex', width:24, height:24, marginTop:14}} aria-label="close" onClick={this.handleStarClick}>
            {!!star ? <Star style={{color:'#efbf10'}} /> : <StarBorder style={{color:'#efbf10'}} />}
            </IconButton>
            <IconButton style={{display:'flex', width:24, height:24, marginTop:14}} aria-label="close" onClick={this.handleDelete}>
            { isCurrentUser(comment.user) &&
              <Close style={{width:16, height:16}} />
            }  
            </IconButton>
          </div>
          <div style={{marginLeft:27, lineHeight:'12px', marginBottom:2, marginTop:-3}}>
            <div className={classes.favLink}><a >{starCount + " Favorite"}</a>,   <span>{new Date(comment.created_at).toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    );
  }
}

CommentCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CommentCard);
