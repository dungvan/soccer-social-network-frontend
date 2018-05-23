import { actions } from "./";
import { commentConstants } from "../constants";
import { commentService } from "services";

export const commentActions = {
  create,
  update,
  delete: _delete
};
  
function create(comment) {
  return dispatch => {
    dispatch(actions.request(commentConstants.CREATE_REQUEST, {comment}));

    commentService.create(comment)
      .then(
        resp => {
          console.log(resp)
          dispatch(actions.success(commentConstants.CREATE_SUCCESS, {comment: resp, post_id: comment.post_id}));
        },
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(commentConstants.CREATE_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(commentConstants.CREATE_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function update(comment) {
  return dispatch => {
    dispatch(actions.request(commentConstants.UPDATE_REQUEST, {comment}))
    commentService.update(comment)
      .then(
        comment => dispatch(actions.success(commentConstants.UPDATE_SUCCESS, {comment})),
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(commentConstants.UPDATE_FAILURE, error, {comment}));
            });
          } else {
            dispatch(actions.failure(commentConstants.UPDATE_FAILURE, {message: error.message, errors: null}, {comment}));
          }
        }
      )
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(post_id, id) {
  return dispatch => {
    dispatch(actions.request(commentConstants.DELETE_REQUEST, {post_id, id}));

    commentService.delete(post_id, id)
      .then(
        user => {
          dispatch(actions.success(commentConstants.DELETE_SUCCESS, {post_id, id}));
        },
        error => {
          dispatch(actions.failure(commentConstants.DELETE_FAILURE, error, {post_id, id}));
        }
      );
  };
}