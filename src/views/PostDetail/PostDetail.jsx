import React, { Component } from 'react';
import { PostCard, ItemGrid } from 'components';
import { Grid } from "@material-ui/core";
import { actions, postActions } from 'actions';
import { connect } from 'react-redux';
import { postConstants } from '../../constants';
import { commentActions } from '../../actions';

class PostDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: {
        id: 0,
        caption: '',
        comments: [],
        created_at: new Date(),
        image_urls: [],
        star_count: 0,
        star_flag: false,
        user: {
          id: 0,
          user_name: '',
          first_name: '',
          last_name: ''
        }
      }
    }
  }

  handleSubmitComment = (cmt) => {
    console.log(cmt)
    this.props.submitComment(cmt)
  }

  handleSubmitUpdatePost = (post) => {
    this.props.updatePost(post)
  }
  handleDeletePost = (id) => {
    this.props.delete(id)
    this.props.history.push("/")
  }

  async componentWillMount(){
    try {
      await this.props.getOne(this.props.match.params.id).then(
        response => {
          this.props.dispatchSuccess(postConstants.GETONE_SUCCESS, {post: response})
          this.setState({
            post: response,
          })
        }
      )
    } catch (e) {
      if (e.bodyUsed) {
        e.data.then(
          error => {
            this.props.dispatchFailure(postConstants.GETONE_FAILURE, error, null)
          }
        )
        console.error(e)
        return
      }
      this.props.dispatchFailure(postConstants.GETONE_FAILURE, {message: e.message, errors: null}, null)
      console.error(e)
    }
  }

  render() {
    const {post} = this.props;
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={6}>
          {post.id && <PostCard
            postID={post.id}
            star={post.star_flag}
            user={post.user}
            starCount={post.star_count}
            postDate={new Date(post.created_at)}
            content={post.caption}
            mediaImages={post.image_urls}
            comments={post.comments}
            enableExpandComment={true}
            onSubmitComment={this.handleSubmitComment}
            onSubmitUpdatePost={this.handleSubmitUpdatePost}
            onSubmitDeletePost={this.handleDeletePost}
            history={this.props.history}
          />}
        </ItemGrid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, newComment, post } = state.posts;
  return { loading, newComment, post }
}

export default connect(mapStateToProps, {
  getOne: postActions.getOne,
  submitComment: commentActions.create,
  updatePost: postActions.update,
  delete: postActions.delete,
  dispatchFailure: actions.failure,
  dispatchSuccess: actions.success
})(PostDetail);