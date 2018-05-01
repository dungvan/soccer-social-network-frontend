import { authHeader } from '../utils';

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
            full_name: user.fullName,
            birthday: user.birthday,
            password: user.password,
            password_confirmation: user.passwordConfirmation})
    };

    return fetch('http://localhost/users/register', requestOptions).then(handleResponse);
}


function login(username, password) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: {},
        body: JSON.stringify({ user_name_or_email: username, password: password })
    };

    return fetch('http://localhost/users/login', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
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

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(process.env.SOCCER_SOCIAL_NETWORK_API + '/users', requestOptions).then(handleResponse);
}

function getByUserName(username) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(process.env.SOCCER_SOCIAL_NETWORK_API + '/users/' + username, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(process.env.SOCCER_SOCIAL_NETWORK_API + '/users/' + user.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(process.env.SOCCER_SOCIAL_NETWORK_API + '/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}