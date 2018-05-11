import { alertConstants } from '../constants';

export function alert(state = {success:false, error:false, warning:false, action: ()=>{}, param: ''}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        ...state,
        success: true,
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        ...state,
        error: true,
        message: action.message
      };
    case alertConstants.WARNING:
      return {
        ...state,
        warning: true,
        message: action.message,
        param: action.param
      };
    case alertConstants.SUCCESS_CLEAR:
      return {
        ...state,
        success: false
      };
    case alertConstants.ERROR_CLEAR:
      return {
        ...state,
        error: false
      };
    case alertConstants.WARNING_CONFIRM:
      return {
        ...state,
        warning: false,
      };
    case alertConstants.WARNING_CLEAR:
      return {
        ...state,
        warning: false,
      };
    default:
      return state
  }
}