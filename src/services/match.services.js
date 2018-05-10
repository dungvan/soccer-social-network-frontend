import { authHeader } from '../utils';

export const matchService = {
    getAll,
    getByMaster,
    getByPlayer,
    getByTeam,
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

    return fetch('http://localhost/matches?page=' + page, requestOptions).then(handleResponse);
}

function getByMaster(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch('http://localhost/matches/masters/' + id, requestOptions).then(handleResponse);
}

function getByPlayer(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch('http://localhost/matches/players/' + id, requestOptions).then(handleResponse);
}

function getByTeam(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch('http://localhost/matches/teams/' + id, requestOptions).then(handleResponse);
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch('http://localhost/matches/' + id, requestOptions).then(handleResponse);
}

function create(match) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify(match)
    };

    return fetch('http://localhost/matches', requestOptions).then(handleResponse);
}

function update(match) {
    const requestOptions = {
        method: 'PUT',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify(match)
    }

    return fetch('http://localhost/matches', requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        mode: 'CORS',
        headers: authHeader()
    }

    return fetch('http://localhost/matches/' + id, requestOptions).then(handleResponse);
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
