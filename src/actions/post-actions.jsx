import { FETCH_POST, NEW_POST, DELETE_POST, EDIT_POST } from '../actions/types';

export const fetchPosts = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => dispatch({
            type: FETCH_POST,
            payload: posts
        }));
}

export const createPost = (postData) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: {
            'content-type': "application/json"
        },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(post => dispatch({
        type: NEW_POST,
        payload: post
    })).catch(err => console.log(err));
}

export const editPost = (postData) => dispatch => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postData.id}`, {
        method: "PUT",
        headers: {
            'content-type': "application/json"
        },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(post => dispatch({
        type: EDIT_POST,
        payload: post
    })).catch(err => console.log(err));
}

export const deletePost = (id) => dispatch => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(post => dispatch({
            type: DELETE_POST,
            payload: id
        })
    ).catch(err => console.log(err));
}