import { authHeader } from '../utils';

export const commentService = {
    create,
    update,
    delete: _delete
};

function create(comment) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify({content: comment.content})
    };

    return fetch('http://localhost/posts/'+comment.post_id+'/comments', requestOptions).then(handleResponse);
}

function update(comment) {
    const requestOptions = {
        method: 'PUT',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify({content : comment.content})
    }

    return fetch('http://localhost/posts/'+comment.post_id+'/comments/'+comment.id, requestOptions).then(handleResponse);
}

function _delete(comment) {
    const requestOptions = {
        method: 'DELETE',
        mode: 'CORS',
        headers: authHeader()
    }

    return fetch('http://localhost/posts/'+comment.post_id+'/comments/' + comment.id, requestOptions).then(handleResponse);
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
