import { authHeader } from '../utils';
import env from 'env';

export const teamService = {
    getAll,
    getByUserName,
    getByMaster,
    getOne,
    create,
    update,
    delete: _delete
};

function getAll(page, search) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };
    if (!page) {
        page = 1
    }
    if (!search) {
        search = ''
    }
    return fetch(env.api+'/teams?page=' + page + '&search='+search, requestOptions).then(handleResponse);
}

function getByMaster() {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/teams/masters', requestOptions).then(handleResponse);
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/teams/' + id, requestOptions).then(handleResponse);
}

function create(team) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify(team)
    };

    return fetch(env.api+'/teams', requestOptions).then(handleResponse);
}

function getByUserName(username) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/users/'+username+'/teams', requestOptions).then(handleResponse);
}

function update(team) {
    const requestOptions = {
        method: 'PUT',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify(team)
    }

    return fetch(env.api+'/teams/'+team.id, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        mode: 'CORS',
        headers: authHeader()
    }

    return fetch(env.api+'/teams/' + id, requestOptions).then(handleResponse);
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
