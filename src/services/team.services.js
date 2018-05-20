import { authHeader } from '../utils';
import env from 'env';

export const teamService = {
    getAll,
    getByUser,
    getOne,
    create,
    update,
    delete: _delete
};

function getAll(page) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.url+'/teams?page=' + page, requestOptions).then(handleResponse);
}

function getByUser(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.url+'/teams/users/' + id, requestOptions).then(handleResponse);
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.url+'/teams/' + id, requestOptions).then(handleResponse);
}

function create(team) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify(team)
    };

    return fetch(env.url+'/teams', requestOptions).then(handleResponse);
}

function update(team) {
    const requestOptions = {
        method: 'PUT',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify(team)
    }

    return fetch(env.url+'/teams/'+team.id, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        mode: 'CORS',
        headers: authHeader()
    }

    return fetch(env.url+'/teams/' + id, requestOptions).then(handleResponse);
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
