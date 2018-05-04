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
            first_name: user.firstName,
            last_name: user.lastName,
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
            if (response.status !== 200) { 
                return Promise.reject(response.json());
            }
            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user, {};
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

    return fetch(process.env.SSN_API + '/users', requestOptions).then(handleResponse);
}

function getByUserName(username) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost/users/' + username, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        mode: 'CORS',
        headers: { ...authHeader() },
        body: JSON.stringify({city:user.city, country: user.country, first_name: user.firstName, last_name: user.lastName, birthday: user.birthday, about: user.about, quote: user.quote})
    };

    return fetch('http://localhost/users/' + user.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('http://localhost/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    if (response.status !== 200) {
        return Promise.reject(response.json());
    }
    return response.json()
}
