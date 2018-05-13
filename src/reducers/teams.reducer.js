import { teamConstants } from "../constants";

export function teams(state = {items: [], team: {master: {}, players: [], description: ''}, total: 0, page: 1}, action) {
  switch (action.type) {
    case teamConstants.GETALL_REQUEST:
      return {
        ...state,
        page: action.data.page ? action.data.page : 1,
        loading: true
      }
    case teamConstants.GETALL_SUCCESS:
      return {
        ...state,
        total: !!action.data.total ? action.data.total : 0,
        items: action.data.teams,
        loading: true
      }
    case teamConstants.GETALL_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.errors
      };
    case teamConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(team =>
          team.id === action.id
            ? { ...team, deleting: true }
            : team
        )
      };
    case teamConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        total: state.total -1,
        items: state.items.filter(team => team.id !== action.id)
      };
    case teamConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(team => {
          if (team.id === action.data.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...teamCopy } = team;
            // return copy of user with 'deleteError:[error]' property
            return { ...teamCopy, deleteError: action.error };
          }
          return team;
        })
      };
    default:
      return state;
  }
}