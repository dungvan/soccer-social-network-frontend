import { matchConstants } from '../constants';
import { matchService } from 'services';
import { actions } from './';

export const matchActions = {
  create,
  getAll,
  getByUserName,
  getOne,
  update,
  delete: _delete
};


function create(match) {
  return dispatch => {
    dispatch(actions.request(matchConstants.CREATE_REQUEST, {match}));

    matchService.create(match)
      .then(
        resp => {
          dispatch(actions.success(matchConstants.CREATE_SUCCESS, {match}));
        },
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(matchConstants.CREATE_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(matchConstants.CREATE_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function getAll(page) {
  return dispatch => {
    dispatch(actions.request(matchConstants.GETALL_REQUEST, {page}));

    matchService.getAll(page)
      .then(
        data => dispatch(actions.success(matchConstants.GETALL_SUCCESS, data)),
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(matchConstants.GETALL_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(matchConstants.GETALL_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function getByUserName(username) {
  return dispatch => {
    dispatch(actions.request(matchConstants.GETBY_USERID_REQUEST, {user_name: username}));
    matchService.getByUserName(username)
    .then(
      data => dispatch(actions.success(matchConstants.GETBY_USERID_SUCCESS, data)),
      error => {
        console.log(error)
        if (error.bodyUsed) {
          error.data.then(error => {
            dispatch(actions.failure(matchConstants.GETBY_USERID_FAILURE, error, null));
          });
        } else {
          dispatch(actions.failure(matchConstants.GETBY_USERID_FAILURE, {message: error.message, errors: null}, null));
        }
      }
    );
  }
}

function getOne(id){
  return dispath => {
    dispath(actions.request(matchConstants.GETONE_REQUEST, {id}))
    return matchService.getOne(id)
  }
}

function update(user) {
  return dispatch => {
    dispatch(actions.request(matchConstants.UPDATE_REQUEST, {user}))
    matchService.update(user)
      .then(
        user => dispatch(actions.success(matchConstants.UPDATE_SUCCESS, {user})),
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(matchConstants.UPDATE_FAILURE, error, {user}));
            });
          } else {
            dispatch(actions.failure(matchConstants.UPDATE_FAILURE, {message: error.message, errors: null}, {user}));
          }
        }
      )
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(actions.request(matchConstants.DELETE_REQUEST, {id}));

    matchService.delete(id)
      .then(
        user => {
          dispatch(actions.success(matchConstants.DELETE_SUCCESS, {id}));
        },
        error => {
          dispatch(actions.failure(matchConstants.DELETE_FAILURE, error, {id}));
        }
      );
  };
}