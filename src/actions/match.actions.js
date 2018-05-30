import { matchConstants } from '../constants';
import { matchService } from 'services';
import { actions } from './';

export const matchActions = {
  create,
  getAll,
  getBymatchName,
  getByMaster,
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

function getBymatchName(matchname) {
  return dispatch => {
    dispatch(actions.request(matchConstants.GETBY_matchNAME_REQUEST, {match_name: matchname}));
    matchService.getBymatchName(matchname)
    .then(
      data => dispatch(actions.success(matchConstants.GETBY_matchNAME_SUCCESS, data)),
      error => {
        console.log(error)
        if (error.bodyUsed) {
          error.data.then(error => {
            dispatch(actions.failure(matchConstants.GETBY_matchNAME_FAILURE, error, null));
          });
        } else {
          dispatch(actions.failure(matchConstants.GETBY_matchNAME_FAILURE, {message: error.message, errors: null}, null));
        }
      }
    );
  }
}

function getByMaster() {
  return dispatch => {
    dispatch(actions.request(matchConstants.GETBY_MASTER_REQUEST));
    matchService.getByMaster()
    .then(
      data => dispatch(actions.success(matchConstants.GETBY_MASTER_SUCCESS, data)),
      error => {
        console.log(error)
        if (error.bodyUsed) {
          error.data.then(error => {
            dispatch(actions.failure(matchConstants.GETBY_MASTER_FAILURE, error, null));
          });
        } else {
          dispatch(actions.failure(matchConstants.GETBY_MASTER_FAILURE, {message: error.message, errors: null}, null));
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

function update(match) {
  return dispatch => {
    dispatch(actions.request(matchConstants.UPDATE_REQUEST, {match}))
    matchService.update(match)
      .then(
        resp => dispatch(actions.success(matchConstants.UPDATE_SUCCESS, {id: match.id, team1_goals: Number(match.team1_goals), team2_goals: Number(match.team2_goals)})),
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(matchConstants.UPDATE_FAILURE, error, {id: match.id, team1_goals: match.team1_goals, team2_goals: match.team2_goals}));
            });
          } else {
            dispatch(actions.failure(matchConstants.UPDATE_FAILURE, {message: error.message, errors: null}, {id: match.id, team1_goals: match.team1_goals, team2_goals: match.team2_goals}));
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
        match => {
          dispatch(actions.success(matchConstants.DELETE_SUCCESS, {id}));
        },
        error => {
          dispatch(actions.failure(matchConstants.DELETE_FAILURE, error, {id}));
        }
      );
  };
}