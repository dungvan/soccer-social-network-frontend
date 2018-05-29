export * from './alert.actions';
export * from './user.actions';
export * from './post.actions';
export * from './team.actions';
export * from './comment.actions';
export * from './match.actions';
export const actions = {
    request,
    success,
    failure
}

function request(type, data) { return { type, data } }
function success(type, data) { return { type, data } }
function failure(type, error, data) { return {type, message: error.message, errors: error.errors, data}}