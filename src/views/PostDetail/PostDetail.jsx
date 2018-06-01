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
    this.props.submitComment(cmt)
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

  componentWillReceiveProps() {
    if (!!this.props.newComment) {
      this.setState({...this.state.post, comments: [...this.state.post.comments, this.props.newComment]})
    }
  }

  render() {
    const {post} = this.state;
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={6}>
          <PostCard
            postID={post.id}
            star={post.star_flag}
            starCount={post.star_count}
            name={post.user.user_name}
            postDate={new Date(post.created_at)}
            content={post.caption}
            mediaImages={post.image_urls}
            comments={post.comments}
            enableExpandComment={true}
            onSubmitComment={this.handleSubmitComment}
            history={this.props.history}
          />
        </ItemGrid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, newComment } = state.posts;
  return { loading, newComment }
}

export default connect(mapStateToProps, {
  getOne: postActions.getOne,
  submitComment: commentActions.create,
  delete: postActions.delete,
  dispatchFailure: actions.failure,
  dispatchSuccess: actions.success
})(PostDetail);