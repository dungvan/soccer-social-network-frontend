import React, { Component } from 'react';
import { PostCard, ItemGrid } from 'components';
import { Grid } from 'material-ui';
import { postActions, commentActions } from 'actions';
import { connect } from 'react-redux';

class PostExplore extends Component {

  handleSubmitComment = (cmt) => {
    this.props.submitComment(cmt)
  }

  componentWillMount() {
    this.props.getAll(1)
  }

  render() {
    const {items} = this.props;
    if (items.length >0)
    console.log(items[0].comments)
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={8}>
          {
            items.map(post => {
              return (
              <PostCard
                key={post.id}
                postID={post.id}
                star={post.star_flag}
                starCount={post.star_count}
                name={post.user.user_name}
                postDate={new Date(post.created_at)}
                content={post.caption}
                mediaImages={post.image_urls}
                comments={post.comments}
                onSubmitComment={this.handleSubmitComment}
              />
              );
            })
          }
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>

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
  getAll: postActions.getAll,
  delete: postActions.delete
})(PostExplore);