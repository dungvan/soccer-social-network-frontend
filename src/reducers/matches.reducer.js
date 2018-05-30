import { matchConstants } from "../constants";

export function matches(state = {items: [], match: {master: {}, team1: {}, team2: {}, star_date: null, description: ''}, total: 0, page: 1}, action) {
  switch (action.type) {
    case matchConstants.GETALL_REQUEST:
      return {
        ...state,
        page: action.data.page ? action.data.page : 1,
        loading: true
      }
    case matchConstants.GETALL_SUCCESS:
      return {
        ...state,
        total: !!action.data.total ? action.data.total : 0,
        items: action.data.matches,
        loading: true
      }
    case matchConstants.GETALL_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.errors
      };
    case matchConstants.GETBY_USERNAME_REQUEST:
    return {
      ...state,
      loading: true
    }
    case matchConstants.GETBY_USERNAME_SUCCESS:
      return {
        ...state,
        total: !!action.data.total ? action.data.total : 0,
        items: action.data.matches,
        loading: true
      }
    case matchConstants.GETBY_USERNAME_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.errors
      };
    case matchConstants.GETBY_MASTER_REQUEST:
    return {
      ...state,
      loading: true
    }
    case matchConstants.GETBY_MASTER_SUCCESS:
      return {
        ...state,
        total: !!action.data.total ? action.data.total : 0,
        items: action.data.matches,
        loading: true
      }
    case matchConstants.GETBY_MASTER_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.errors
      };
    case matchConstants.UPDATE_REQUEST:
    return {
      ...state,
      loading: true
    }
    case matchConstants.UPDATE_SUCCESS:
    console.log(...state.items.filter(match=>match.id!==action.data.id))
      return {
        ...state,
        items: [
          ...state.items.filter(match=>match.id!==action.data.id),
          {...state.items.filter(match=>match.id===action.data.id)[0], team1_goals: action.data.team1_goals, team2_goals: action.data.team2_goals}
        ],
        loading: true
      }
    case matchConstants.UPDATE_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.errors
      };
    case matchConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case matchConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}