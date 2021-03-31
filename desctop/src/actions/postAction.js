export const NEW_POST_USER_REQUEST = 'NEW_POST_USER_REQUEST'
export const NEW_POST_USER_SUCCESS = 'NEW_POST_USER_SUCCESS'
export const NEW_POST_USER_FAIL = 'NEW_POST_USER_FAIL'

export const FIRST_GET_POST_USER_REQUEST = 'FIRST_GET_POST_USER_REQUEST'
export const FIRST_GET_POST_USER_FAIL = 'FIRST_GET_POST_USER_FAIL'
export const FIRST_GET_POST_USER_FETCHING = 'FIRST_GET_POST_USER_FETCHING'

export const ELSE_GET_POST_USER_REQUEST = 'ELSE_GET_POST_USER_REQUEST'
export const ELSE_GET_POST_USER_FAIL = 'ELSE_GET_POST_USER_FAIL'
export const ELSE_GET_POST_USER_FETCHING = 'ELSE_GET_POST_USER_FETCHING'

export const FETCHING_ELSE_POST_USER = 'FETCHING_ELSE_POST_USER'

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST'
export const LIKE_POST_FAIL = 'LIKE_POST_FAIL'

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST'
export const UNLIKE_POST_FAIL = 'UNLIKE_POST_FAIL'

export const COMMENT_TO_POST_REQUEST = 'COMMENT_TO_POST_REQUEST'
export const COMMENT_TO_POST_FAIL = 'COMMENT_TO_POST_FAIL'

export const MORE_COMMENT_TO_POST_REQUEST = 'MORE_COMMENT_TO_POST_REQUEST'
export const MORE_COMMENT_TO_POST_FAIL = 'MORE_COMMENT_TO_POST_FAIL'

import config from '../config'

const urlPost = config.API_URL +'/api/post'

export const addNewPostUserAction = (postData) => {
  return (dispatch) => {
    dispatch({
      type: NEW_POST_USER_REQUEST,
    })

    fetch(`${urlPost}/add/user`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        credentials: 'include',
        method: 'POST',
        body: postData
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: NEW_POST_USER_SUCCESS,
        payload: data
      }))
      .catch(() => dispatch({
        type: NEW_POST_USER_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }));
  }
}

export const addNewCommentToPostAction = (commentData, postId) => {
  return (dispatch) => {
    fetch(`${urlPost}/comment/${postId}`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000',
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({commentData})
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: COMMENT_TO_POST_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: COMMENT_TO_POST_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }));
  }
}

export const getFirstPostUserAction = (userId) => {
  return (dispatch) => {
    fetch(`${urlPost}/user/${userId}?page=1`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        credentials: 'include',
        method: 'GET'
      })
      .then(async (response) =>  {
        return dispatch({
          type: FIRST_GET_POST_USER_REQUEST,
          payload: {
            data: await response.json(),
            totalCount: response.headers.get('x-total-count')
          }
        })
      })
      .catch(() => dispatch({
        type: FIRST_GET_POST_USER_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
      .finally(() => dispatch({
        type: FIRST_GET_POST_USER_FETCHING
      }))
  }
}

export const getElsePostUserAction = (userId, pageNumber) => {
  return (dispatch) => {
    fetch(`${urlPost}/user/${userId}?page=${pageNumber}`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        credentials: 'include',
        method: 'GET'
      })
      .then(async (response) =>  {
        return dispatch({
          type: ELSE_GET_POST_USER_REQUEST,
          payload: {
            data: await response.json(),
            totalCount: response.headers.get('x-total-count')
          }
        })
      })
      .catch(() => dispatch({
        type: ELSE_GET_POST_USER_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
      .finally(() => dispatch({
        type: ELSE_GET_POST_USER_FETCHING
      }))
  }
}

export const fetchingElsePostAction = () => {
  return (dispatch) => {
   dispatch({
      type: FETCHING_ELSE_POST_USER
    })
  }
}

export const likePostAction = (postId) => {
  return (dispatch) => {
    fetch(`${urlPost}/like/${postId}`, {
        credentials: 'include',
        method: 'POST',
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: LIKE_POST_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: LIKE_POST_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}

export const unlikePostAction = (postId) => {
  return (dispatch) => {
    fetch(`${urlPost}/unlike/${postId}`, {
        credentials: 'include',
        method: 'POST',
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: UNLIKE_POST_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: UNLIKE_POST_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}

export const getMoreCommentToPostAction = (postId) => {
  return (dispatch) => {
    fetch(`${urlPost}/comment/more/${postId}`, {
        credentials: 'include',
        method: 'POST',
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: MORE_COMMENT_TO_POST_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: MORE_COMMENT_TO_POST_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}