import { actions } from "./";
import { teamConstants } from "../constants";
import { teamService } from "services";

export const teamActions = {
  create,
  getAll,
  getByUserID,
  update,
  delete: _delete
};
  
function create(team) {
  return dispatch => {
    dispatch(actions.request(teamConstants.CREATE_REQUEST, {team}));

    teamService.register(team)
      .then(
        resp => {
          dispatch(actions.success(teamConstants.CREATE_SUCCESS, {team}));
        },
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(teamConstants.CREATE_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(teamConstants.CREATE_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function getAll(page) {
  return dispatch => {
    dispatch(actions.request(teamConstants.GETALL_REQUEST, {page}));

    teamService.getAll(page)
      .then(
        data => dispatch(actions.success(teamConstants.GETALL_SUCCESS, data)),
        error => {
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa", error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(teamConstants.GETALL_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(teamConstants.GETALL_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function getByUserID(id) {
  return dispatch => {
    dispatch(actions.request(teamConstants.GETBY_USERID_REQUEST, {user_id: id}));
    return teamService.getByUserName(id)
  }
}

function update(user) {
  return dispatch => {
    dispatch(actions.request(teamConstants.UPDATE_REQUEST, {user}))
    teamService.update(user)
      .then(
        user => dispatch(actions.success(teamConstants.UPDATE_SUCCESS, {user})),
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(teamConstants.UPDATE_FAILURE, error, {user}));
            });
          } else {
            dispatch(actions.failure(teamConstants.UPDATE_FAILURE, {message: error.message, errors: null}, {user}));
          }
        }
      )
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(actions.request(teamConstants.DELETE_REQUEST, {id}));

    teamService.delete(id)
      .then(
        user => {
          dispatch(actions.success(teamConstants.DELETE_SUCCESS, {id}));
        },
        error => {
          dispatch(actions.failure(teamConstants.DELETE_FAILURE, error, {id}));
        }
      );
  };
}