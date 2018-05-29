import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import { Input } from 'material-ui';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Popover from 'material-ui/Popover';
import red from 'material-ui/colors/red';
import ImageGridList from '../GridList/ImageGridList';
import CommentCard from './CommentCard.jsx';
import {
  Star,
  StarBorder,
  ExpandMore,
  MoreVert
} from '@material-ui/icons';
import { postService } from '../../services';
import { isCurrentUser } from '../../utils';

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
    paddingTop: 3
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
  }
});

class PostCard extends React.Component {
  currStarCount = this.props.starCount;
  state = {disablePopover: true, expanded: !!this.props.enableExpandComment, star: !!this.props.star, comment: '', starCount: this.currStarCount, disableUpdatePost: true, content: this.props.content };

  handleExpandClick = () => {
    return !this.props.enableExpandComment ? this.setState({ expanded: !this.state.expanded }) : null;
  };

  handleStarClick = () => {
    const newStarCount = this.state.star ? () => {this.currStarCount--; let id = this.props.postID;
      postService.downStar({id}) ; return this.currStarCount} : () => {this.currStarCount++;let id = this.props.postID;
        postService.upStar({id})  ;return this.currStarCount} ;
    this.setState({ star: !this.state.star, starCount: newStarCount() });
  };

  handleCommentKeyPress = (event) => {
    event.preventDefault()
    if (event.which === 13) {
      if (event.shiftKey ) {
        this.setState({comment: this.state.comment + '\n'})
      } else {
        const cmt = {post_id: this.props.postID,content:event.target.value}
        this.props.onSubmitComment(cmt)
        this.setState({comment: ''})
      }
    }
  }

  handlePostKeyPress = (event) => {
    event.preventDefault()
    if (event.which === 13) {
      if (event.shiftKey ) {
        this.setState({content: this.state.content + '\n'})
      } else {
        const post = {id: this.props.postID, caption:event.target.value, hashtags: this._findHashtags(event.target.value)}
        this.props.onSubmitUpdatePost(post)
        this.setState({disableUpdatePost: true})
      }
    }
  }

  handleUpdate = () => {
    this.setState({disableUpdatePost: true})
  }

  handleDelete = () => {

  }

  handleUpdateChange = (e) => {
    this.setState({content: e.target.value})
  }

  handleChange = (e) => {
    this.setState({comment: e.target.value})
  }

  _findHashtags(caption) {
    var hashtags = [];
    for (var i = 0; i < caption.length; i++) {
      if (caption[i] === '#') {
        console.log(i)
        var hashtag='';
        for (var j = i+1; j < caption.length; j++) {
          if (j === caption.length-1) {
            if (caption[j] === ' '){
              return hashtags;
            }
            hashtag+=caption[j];
            hashtags.push(hashtag);
            return hashtags;
          }

          if (caption[j] === ' ') {
            if (j === i + 1) {
              i = j + 1;
              break;
            }
            i = j + 1;
            hashtags.push(hashtag);
            break;
          }
          hashtag+=caption[j];
        }
      }
    }
    return hashtags;
  }

  render() {
    const {
      classes,
      mediaImages,
      avatar,
      postDate,
      comments,
      user
    } = this.props;
    const { star, comment, starCount } = this.state;
    return (
      <div className={classes.postCard}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {!!avatar ? <img src={avatar} alt="avatar" /> : <span className={classes.avatarContent}  style={{fontSize: '24px'}}>{user.user_name.substring(0,1).toUpperCase()}</span>}
              </Avatar>
            }
            action={
              <div>
              <IconButton onClick={()=>{this.setState({disablePopover: !this.state.disablePopover})}}>
                <MoreVert />
              </IconButton>
              <Popover 
                open={!this.state.disablePopover}
                onClose={()=>{this.setState({disablePopover: true})}}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <Typography onClick={()=>{this.setState({disablePopover: true, disableUpdatePost:false})}}>edit</Typography>
                <Typography onClick={()=>{this.props.onSubmitDeletePost(this.props.postID); this.setState({disablePopover: true})}}>delete</Typography>
              </Popover>
              </div>
            }
            title={<span style={{fontWeight: 'bold'}}>{user.user_name}</span>}
            subheader={postDate.toLocaleDateString('vi-VN')}
          />
          {
            !!mediaImages &&
            <ImageGridList srcs={mediaImages} />
          }
          <CardContent>
            {
              this.state.disableUpdatePost ? 
              <Typography component="p">
              {this.state.content}
              </Typography> :
              isCurrentUser(user) &&
              <Input
                fullWidth
                multiline
                onChange={this.handleUpdateChange.bind(this)}
                value={this.state.content}
                onKeyPress={this.handlePostKeyPress.bind(this)}
              />
            }
          </CardContent>
          <CardActions className={classnames(classes.actions, classes.actionComment)} disableActionSpacing>
            <IconButton className={classes.iconComment} aria-label="Add to favorites" onClick={this.handleStarClick}>
              {
                !!star ? <Star style={{color:'#efbf10'}} /> : <StarBorder style={{color:'#efbf10'}} />
              }
            </IconButton>
            <span className={classes.spanStar}>{starCount + " star, " + comments.length + " comment"}</span>
            <IconButton
              className={classnames(classes.iconComment, classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMore />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <hr className={classes.line} />
            {!!comments && comments.length > 0 &&
              <div style={{backgroundColor: "#f1f1f1"}} >
              {
                comments.map((comt, key) => {
                  return (
                    <CommentCard comment={comt} key={comt.id} />
                  );
                })
              }
              </div>
            }
          </Collapse>
          <div className={classes.cardComment}>
            <Avatar
              className={classnames(classes.avatar, classes.avatarComment)}
              aria-label="Recipe"
            >
             {!!avatar ? <img src={avatar} alt="avatar" /> : <span style={{paddingTop:2.5}}>{user.user_name.substring(0,1).toUpperCase()}</span>}
            </Avatar>
            <Input
              className={classnames(classes.textComment, classes.TextField)}
              fullWidth={true}
              id="textarea"
              multiline
              rowsMax={10}
              disableUnderline={true}
              value={comment}
              onKeyPress={this.handleCommentKeyPress.bind(this)}
              onChange={this.handleChange.bind(this)}
              placeholder="Write a comment..."
            />
          </div>
        </Card>
      </div>
    );
  }
}

PostCard.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  postID: PropTypes.any.isRequired,
  content: PropTypes.string.isRequired,
  postDate: PropTypes.object.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  starCount: PropTypes.number.isRequired,
  enableExpandComment: PropTypes.bool,
  onSubmitComment: PropTypes.func.isRequired,
  onSubmitUpdatePost: PropTypes.func.isRequired,
  onSubmitDeletePost: PropTypes.func.isRequired,
};

export default withStyles(styles)(PostCard);
