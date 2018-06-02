import { tournamentConstants } from '../constants';
import { tournamentService } from 'services';
import { actions } from './';

export const tournamentActions = {
  create,
  getAll,
  getByUserName,
  getByMaster,
  getOne,
  update,
  delete: _delete
};

function create(tournament) {
  return dispatch => {
    dispatch(actions.request(tournamentConstants.CREATE_REQUEST, {tournament}));

    tournamentService.create(tournament)
      .then(
        resp => {
          dispatch(actions.success(tournamentConstants.CREATE_SUCCESS, {tournament, resp}));
        },
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(tournamentConstants.CREATE_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(tournamentConstants.CREATE_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function getAll(page) {
  return dispatch => {
    dispatch(actions.request(tournamentConstants.GETALL_REQUEST, {page}));

    tournamentService.getAll(page)
      .then(
        data => dispatch(actions.success(tournamentConstants.GETALL_SUCCESS, data)),
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(tournamentConstants.GETALL_FAILURE, error, null));
            });
          } else {
            dispatch(actions.failure(tournamentConstants.GETALL_FAILURE, {message: error.message, errors: null}, null));
          }
        }
      );
  };
}

function getByUserName(username) {
  return dispatch => {
    dispatch(actions.request(tournamentConstants.GETBY_USERNAME_REQUEST, {user_name: username}));
    tournamentService.getByUserName(username)
    .then(
      data => dispatch(actions.success(tournamentConstants.GETBY_USERNAME_SUCCESS, data)),
      error => {
        console.log(error)
        if (error.bodyUsed) {
          error.data.then(error => {
            dispatch(actions.failure(tournamentConstants.GETBY_USERNAME_FAILURE, error, null));
          });
        } else {
          dispatch(actions.failure(tournamentConstants.GETBY_USERNAME_FAILURE, {message: error.message, errors: null}, null));
        }
      }
    );
  }
}

function getByMaster() {
  return dispatch => {
    dispatch(actions.request(tournamentConstants.GETBY_MASTER_REQUEST));
    tournamentService.getByMaster()
    .then(
      data => dispatch(actions.success(tournamentConstants.GETBY_MASTER_SUCCESS, data)),
      error => {
        console.log(error)
        if (error.bodyUsed) {
          error.data.then(error => {
            dispatch(actions.failure(tournamentConstants.GETBY_MASTER_FAILURE, error, null));
          });
        } else {
          dispatch(actions.failure(tournamentConstants.GETBY_MASTER_FAILURE, {message: error.message, errors: null}, null));
        }
      }
    );
  }
}

function getOne(id){
  return dispath => {
    dispath(actions.request(tournamentConstants.GETONE_REQUEST, {id}))
    return tournamentService.getOne(id)
  }
}

function update(tournament) {
  return dispatch => {
    dispatch(actions.request(tournamentConstants.UPDATE_REQUEST, {tournament}))
    tournamentService.update(tournament)
      .then(
        resp => dispatch(actions.success(tournamentConstants.UPDATE_SUCCESS, {id: tournament.id, team1_goals: Number(tournament.team1_goals), team2_goals: Number(tournament.team2_goals)})),
        error => {
          console.log(error)
          if (error.bodyUsed) {
            error.data.then(error => {
              dispatch(actions.failure(tournamentConstants.UPDATE_FAILURE, error, {id: tournament.id, team1_goals: tournament.team1_goals, team2_goals: tournament.team2_goals}));
            });
          } else {
            dispatch(actions.failure(tournamentConstants.UPDATE_FAILURE, {message: error.message, errors: null}, {id: tournament.id, team1_goals: tournament.team1_goals, team2_goals: tournament.team2_goals}));
          }
        }
      )
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(actions.request(tournamentConstants.DELETE_REQUEST, {id}));

    tournamentService.delete(id)
      .then(
        tournament => {
          dispatch(actions.success(tournamentConstants.DELETE_SUCCESS, {id}));
        },
        error => {
          dispatch(actions.failure(tournamentConstants.DELETE_FAILURE, error, {id}));
        }
      );
  };
}