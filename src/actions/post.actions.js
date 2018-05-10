import { postConstants } from '../constants';
import { postService } from '../services';
import { actions } from './';

export const postActions = {
  create,
  getAll,
  getByUserID,
  update,
  delete: _delete
};

function create(post) {
  return dispatch => {
    dispatch(actions.request(postConstants.CREATE_REQUEST, {post}));

    postService.register(post)
      .then(
        resp => {
          dispatch(actions.success(postConstants.CREATE_SUCCESS, {post}));
        },
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(postConstants.CREATE_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(postConstants.CREATE_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function getAll(page) {
  return dispatch => {
    dispatch(actions.request(postConstants.GETALL_REQUEST, {page}));

    postService.getAll(page)
      .then(
        data => dispatch(actions.success(postConstants.GETALL_SUCCESS, data)),
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(postConstants.GETALL_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(postConstants.GETALL_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function getByUserID(id) {
  return dispatch => {
    dispatch(actions.request(postConstants.GETBY_USERID_REQUEST, {user_id: id}));
    return postService.getByUserName(id)
  }
}

function update(user) {
  return dispatch => {
    dispatch(actions.request(postConstants.UPDATE_REQUEST, {user}))
    postService.update(user)
      .then(
        user => dispatch(actions.success(postConstants.UPDATE_SUCCESS, {user})),
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(postConstants.UPDATE_FAILURE, error, {user}));
            });
          } else {
            dispatch(actions.failure(postConstants.UPDATE_FAILURE, {message: error.message, errors: null}, {user}));
          }
        }
      )
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(actions.request(postConstants.DELETE_REQUEST, {id}));

    postService.delete(id)
      .then(
        user => {
          dispatch(actions.success(postConstants.DELETE_SUCCESS, {id}));
        },
        error => {
          dispatch(actions.failure(postConstants.DELETE_FAILURE, error, {id}));
        }
      );
  };
}