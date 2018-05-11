import { userConstants } from '../constants';
import { userService } from '../services';
import { actions, alertActions } from './';

export const userActions = {
  login,
  logout,
  register,
  getAll,
  update,
  getByUsername,
  delete: _delete
};

function login(username, password) {
  return dispatch => {
    dispatch(actions.request(userConstants.LOGIN_REQUEST, {user: { username, password }}));
    return userService.login(username, password)
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(actions.request(userConstants.REGISTER_REQUEST, {user}));
    userService.register(user)
      .then(
        resp => {
          dispatch(actions.success(userConstants.REGISTER_SUCCESS, {user}));
          dispatch(alertActions.success(resp))
        },
        error => {
          console.log(error)
          dispatch(alertActions.error("some thing wen't wrong!"))
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(userConstants.REGISTER_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(userConstants.REGISTER_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function getAll(page) {
  return dispatch => {
    dispatch(actions.request(userConstants.GETALL_REQUEST, {page}));

    userService.getAll(page)
      .then(
        data => dispatch(actions.success(userConstants.GETALL_SUCCESS, data)),
        error => {
          console.log(error)
          dispatch(alertActions.error("some thing wen't wrong!"))
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(userConstants.GETALL_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(userConstants.GETALL_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function getByUsername(username) {
  return dispatch => {
    dispatch(actions.request(userConstants.GETBY_USERNAME_REQUEST, {username}));
    return userService.getByUserName(username)
  }
}

function update(user) {
  return dispatch => {
    dispatch(actions.request(userConstants.UPDATE_REQUEST, {user}));
    userService.update(user)
      .then(
        user => {
          dispatch(actions.success(userConstants.UPDATE_SUCCESS, {user}));
          dispatch(alertActions.success(user));
        },
        error => {
          console.log(error)
          dispatch(alertActions.error("some thing wen't wrong!"))
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(userConstants.UPDATE_FAILURE, error, {user}));
            });
          } else {
            dispatch(actions.failure(userConstants.UPDATE_FAILURE, {message: error.message, errors: null}, {user}));
          }
        }
      )
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(actions.request(userConstants.DELETE_REQUEST, {id}));

    userService.delete(id)
      .then(
        user => {
          dispatch(actions.success(userConstants.DELETE_SUCCESS, {id}));
        },
        error => {
          dispatch(actions.failure(userConstants.DELETE_FAILURE, error, {id}));
        }
      );
  };
}