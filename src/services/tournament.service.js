import { authHeader } from '../utils';
import env from 'env';

export const tournamentService = {
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

    return fetch(env.api+'/tournaments?page=' + page, requestOptions).then(handleResponse);
}

function getByMaster() {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/tournaments/masters', requestOptions).then(handleResponse);
}

function getByUserName(username) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/users/'+username+'/tournaments', requestOptions).then(handleResponse);
}

function getByTeam(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/tournaments/teams/' + id, requestOptions).then(handleResponse);
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/tournaments/' + id, requestOptions).then(handleResponse);
}

function create(tournament) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify({
            description: tournament.description,
            start_date: tournament.start_date,
            team1_id: tournament.team1.id,
            team2_id: tournament.team2.id
        })
    };

    return fetch(env.api+'/tournaments', requestOptions).then(handleResponse);
}

function update(tournament) {
    console.log(tournament)
    const requestOptions = {
        method: 'PUT',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify({team1_goals: Number(tournament.team1_goals), team2_goals: Number(tournament.team2_goals)})
    }

    return fetch(env.api+'/tournaments/'+tournament.id, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        mode: 'CORS',
        headers: authHeader()
    }

    return fetch(env.api+'/tournaments/' + id, requestOptions).then(handleResponse);
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
