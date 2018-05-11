export * from './alert.actions';
export * from './user.actions';
export * from './post.actions';
export * from './team.actions';
function request(type, data) { return { type, data } }
function success(type, data) { return { type, data } }
function failure(type, error, data) { return {type, message: error.message, errors: error.errors, data}}
export const actions = {
    request,
    success,
    failure
}