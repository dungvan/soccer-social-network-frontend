import { tournamentConstants } from "../constants";
import { getCurrentUser } from "../utils";

export function tournaments(state = {items: [], tournament: {master: {}, team1: {}, team2: {}, star_date: null, description: ''}, total: 0, page: 1}, action) {
  switch (action.type) {
    case tournamentConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case tournamentConstants.CREATE_SUCCESS:
      console.log(action)
      return {
        ...state,
        total: state.total + 1,
        items: [{id: action.data.resp.tournament_id, master: getCurrentUser(), ...action.data.tournament}, ...state.items],
        loading: true
      }
    case tournamentConstants.CREATE_FAILURE:
      return {
        ...state,        
        loading: false
      };
    case tournamentConstants.GETALL_REQUEST:
      return {
        ...state,
        page: action.data.page ? action.data.page : 1,
        loading: true
      }
    case tournamentConstants.GETALL_SUCCESS:
      return {
        ...state,
        total: !!action.data.total ? action.data.total : 0,
        items: action.data.tournaments,
        loading: true
      }
    case tournamentConstants.GETALL_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.errors
      };
    case tournamentConstants.GETBY_USERNAME_REQUEST:
    return {
      ...state,
      loading: true
    }
    case tournamentConstants.GETBY_USERNAME_SUCCESS:
      return {
        ...state,
        total: !!action.data.total ? action.data.total : 0,
        items: action.data.tournaments,
        loading: true
      }
    case tournamentConstants.GETBY_USERNAME_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.errors
      };
    case tournamentConstants.GETBY_MASTER_REQUEST:
    return {
      ...state,
      loading: true
    }
    case tournamentConstants.GETBY_MASTER_SUCCESS:
      return {
        ...state,
        total: !!action.data.total ? action.data.total : 0,
        items: action.data.tournaments,
        loading: true
      }
    case tournamentConstants.GETBY_MASTER_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.errors
      };
    case tournamentConstants.UPDATE_REQUEST:
    return {
      ...state,
      loading: true
    }
    case tournamentConstants.UPDATE_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.filter(tournament=>tournament.id!==action.data.id),
          {...state.items.filter(tournament=>tournament.id===action.data.id)[0], team1_goals: action.data.team1_goals, team2_goals: action.data.team2_goals}
        ],
        loading: true
      }
    case tournamentConstants.UPDATE_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.errors
      };
    case tournamentConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case tournamentConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}