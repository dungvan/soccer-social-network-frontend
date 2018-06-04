import React, { Component } from 'react';
import { PostCard, ItemGrid } from 'components';
import { Grid, CardHeader } from "@material-ui/core";
import { postActions, commentActions } from 'actions';
import { connect } from 'react-redux';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class PostProfile extends Component {
  state = {createType: 'status', disablePost: false, caption: "", openImageUpload: false, rows: 1, disableSubmit: false, image_names:[], disabledImageUpload: false}
  handleSubmitComment = (cmt) => {
    this.props.submitComment(cmt)
  }
  handleSubmitUpdatePost = (post) => {
    this.props.updatePost(post)
  }
  handleDeletePost = (id) => {
    this.props.delete(id)
  }

  handleSubmitPost = () => {
    const hashtags = this._findHashtags(this.state.caption);
    const { caption, createType } = this.state;
    const image_names = this.state.image_names;
    const image_urls = this.image_urls;
    this.props.create({caption, type: createType, hashtags, image_names, image_urls});
    this.setState({caption: '', disabledImageUpload: true, openImageUpload: false})
  }

  handlePostChange = (e) => {
    if (e.target.value === '' || e.target.value === null || e.target.value === 'undefined'){
      this.setState({caption: e.target.value})
    } else {
      this.setState({caption: e.target.value})
    }
  }

  componentWillMount() {
    this.props.getByUser(this.props.match.params.username)
  }

  render() {
    const {items} = this.props;
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={8}>
          <CardHeader
            style={{marginTop:10}}
            title={<span style={{fontWeight: 'bold', color:'#365899'}}>Status Posts</span>}
          />
          {
            items.map(post => {
              return (
              post.type === 'status' &&
              <PostCard
                key={post.id}
                postID={post.id}
                user={post.user}
                star={post.star_flag}
                starCount={post.star_count}
                postDate={new Date(post.created_at)}
                content={post.caption}
                mediaImages={post.image_urls}
                comments={post.comments}
                onSubmitComment={this.handleSubmitComment}
                onSubmitUpdatePost={this.handleSubmitUpdatePost}
                onSubmitDeletePost={this.handleDeletePost}
                history={this.props.history}
              />
              );
            })
          }
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
        <CardHeader
          style={{marginTop:10}}
          title={<span style={{fontWeight: 'bold', color:'#365899'}}>Talent Wanted</span>}
        />
        {
          items.map(post => {
            return (
              post.type === 'talent-wanted' &&
              <PostCard
                key={post.id}
                postID={post.id}
                user={post.user}
                star={post.star_flag}
                starCount={post.star_count}
                postDate={new Date(post.created_at)}
                content={post.caption}
                comments={post.comments}
                onSubmitComment={this.handleSubmitComment}
                onSubmitUpdatePost={this.handleSubmitUpdatePost}
                onSubmitDeletePost={this.handleDeletePost}
              />
            )
          })
        }
        </ItemGrid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const {items} = state.posts;
  return { items }
}

export default connect(mapStateToProps, {
  submitComment: commentActions.create,
  updatePost: postActions.update,
  uploadImages: postActions.uploadImages,
  create: postActions.create,
  getByUser: postActions.getByUser,
  delete: postActions.delete
})(PostProfile);