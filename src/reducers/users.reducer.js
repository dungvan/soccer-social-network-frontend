import { userConstants } from '../constants';
import { isCurrentUser } from '../utils';

export function users(state = {items: [], user: {}, total: 0, page: 1}, action) {
  switch (action.type) {
    case userConstants.GETBY_USERNAME_REQUEST:
      return {
        ...state,
        username: !!action.data.username ? action.data.username:"",
        loading: true,
      };
    case userConstants.GETBY_USERNAME_SUCCESS:
      return {
        ...state,
        editable: isCurrentUser(action.data.user) || action.data.user.role === "s_admin",
        loading:false,
        user: action.data.user
      };
    case userConstants.GETBY_USERNAME_FAILURE:
      return {
        ...state,
        editable: false,
        loading: false,
        user:{},
        message: action.message,
        errors: action.errors,
        username: !!action.data.username ? action.data.username : ""
      };
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        page: action.data.page ? action.data.page : 1,
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        total: !!action.data.total ? action.data.total : 0,
        items: action.data.users,
        loading: false
      };
    case userConstants.GETALL_FAILURE:
      return { 
        ...state,
        loading: false,
        message: action.message,
        errors: action.error.errors
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.data.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        total: state.total - 1,
        items: state.items.filter(user => user.id !== action.data.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }
          return user;
        })
      };
    default:
      return state
  }
}