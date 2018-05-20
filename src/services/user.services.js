import { authHeader } from '../utils';
import env from 'env';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getByUserName,
    update,
    delete: _delete
};

function register(user) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: {},
        body: JSON.stringify({
            user_name: user.username,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            password: user.password,
            password_confirmation: user.passwordConfirmation})
    };

    return fetch(env.url+'/users/register', requestOptions).then(handleResponse);
}


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: {},
        body: JSON.stringify({ user_name_or_email: username, password: password })
    };

    return fetch(env.url+'/users/login', requestOptions)
        .then(response => {
            if (response.status !== 200) {
                if (response.status === 400) {
                    return Promise.reject({bodyUsed: true, data: response.json()})
                }
                return Promise.reject({bodyUsed: false, message: response.statusText});
            }
            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll(page) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.url+'/users?page=' + page, requestOptions).then(handleResponse);
}

function getByUserName(username) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(env.url+'/users/' + username, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify(user)
    };

    return fetch(env.url+'/users/' + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(env.url+'/users/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (response.status !== 200) {
        if (response.status !== 400) {
            return Promise.reject({bodyUsed: false, message: response.statusText})
        }
        return Promise.reject({bodyUsed: true, data: response.json()});
    }
    return response.json()
}
