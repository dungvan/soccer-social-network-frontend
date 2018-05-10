import { postConstants } from "../constants";

export function posts(state = {items: [], post: {}, total: 0, page: 1}, action) {
  switch (action.type) {
    case postConstants.GETALL_REQUEST:
      return {
        ...state,
        page: action.data.page ? action.data.page : 1,
        loading: true
      }
    case postConstants.GETALL_SUCCESS:
      return {
        ...state,
        total: !!action.data.total ? action.data.total : 0,
        items: action.data.posts,
        loading: true
      }
    case postConstants.GETALL_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.errors
      };
    default:
      return state;
  }
}