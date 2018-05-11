import { alertConstants } from '../constants';

export const alertActions = {
    success,
    error,
    warning,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function warning(message, param) {
    return { type: alertConstants.WARNING, message };
}

function clear(type) {
    return { type };
}