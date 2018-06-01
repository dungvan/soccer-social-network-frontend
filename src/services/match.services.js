import { authHeader } from '../utils';
import env from 'env';

export const matchService = {
    getAll,
    getByMaster,
    getByUserName,
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

    return fetch(env.api+'/matches?page=' + page, requestOptions).then(handleResponse);
}

function getByMaster() {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/matches/masters', requestOptions).then(handleResponse);
}

function getByUserName(username) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/users/'+username+'/matches', requestOptions).then(handleResponse);
}

function getByTeam(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/matches/teams/' + id, requestOptions).then(handleResponse);
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/matches/' + id, requestOptions).then(handleResponse);
}

function create(match) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify({
            description: match.description,
            start_date: match.start_date,
            team1_id: match.team1.id,
            team2_id: match.team2.id
        })
    };

    return fetch(env.api+'/matches', requestOptions).then(handleResponse);
}

function update(match) {
    console.log(match)
    const requestOptions = {
        method: 'PUT',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify({team1_goals: Number(match.team1_goals), team2_goals: Number(match.team2_goals)})
    }

    return fetch(env.api+'/matches/'+match.id, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        mode: 'CORS',
        headers: authHeader()
    }

    return fetch(env.api+'/matches/' + id, requestOptions).then(handleResponse);
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
