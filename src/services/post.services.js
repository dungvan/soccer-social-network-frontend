import { authHeader } from '../utils';
import env from 'env';

export const postService = {
  uploadImages,
  getAll,
  getByUser,
  upStar,
  downStar,
  getOne,
  create,
  update,
  delete: _delete
};

function uploadImages(files) {
  var formdata = new FormData()
  if (!files || files.length === 0 ) {
    return () => {return Error("no image to send")}
  } 
  formdata.append("image_files", files)
  const requestOptions = {
    method: 'POST',
    mode: 'CORS',
    headers: {...authHeader(), "Content-Type": "multipart/form-data"},
    data: formdata
  }
  return fetch(env.api+"/posts/images", requestOptions).then(handleResponse);
}

function getAll(page) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/posts?page=' + page, requestOptions).then(handleResponse);
}

function getByUser(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/posts/users/' + id, requestOptions).then(handleResponse);
}

function getOne(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'CORS',
        headers: authHeader()
    };

    return fetch(env.api+'/posts/' + id, requestOptions).then(handleResponse);
}

function create(post) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify(post)
    };

    return fetch(env.api+'/posts', requestOptions).then(handleResponse);
}

function update(post) {
    const requestOptions = {
        method: 'PUT',
        mode: 'CORS',
        headers: authHeader(),
        body: JSON.stringify({caption: post.caption, hashtags: post.hashtags})
    }

    return fetch(env.api+'/posts/'+post.id, requestOptions).then(handleResponse);
}

function upStar(post) {
    const requestOptions = {
        method: 'POST',
        mode: 'CORS',
        headers: authHeader()
    }

    return fetch(env.api+'/posts/'+post.id+'/star', requestOptions).then(handleResponse);
}

function downStar(post) {
    const requestOptions = {
        method: 'DELETE',
        mode: 'CORS',
        headers: authHeader()
    }

    return fetch(env.api+'/posts/'+post.id+'/star', requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        mode: 'CORS',
        headers: authHeader()
    }

    return fetch(env.api+'/posts/' + id, requestOptions).then(handleResponse);
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

