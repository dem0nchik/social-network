export const FRIEND_DATA_REQUEST = 'FRIEND_DATA_REQUEST'
export const FRIEND_DATA_FAIL = 'USER_DELETE_IMG_REQUEST'
export const FRIEND_DATA_FETCH = 'USER_DELETE_IMG_FAIL'

export const NEW_FRIEND_REQUEST = 'NEW_FRIEND_REQUEST'
export const NEW_FRIEND_SUCCESS = 'NEW_FRIEND_SUCCESS'
export const NEW_FRIEND_FAIL = 'NEW_FRIEND_FAIL'

export const DELETE_FRIEND_REQUEST = 'DELETE_FRIEND_REQUEST'
export const DELETE_FRIEND_SUCCESS = 'DELETE_FRIEND_SUCCESS'
export const DELETE_FRIEND_FAIL = 'DELETE_FRIEND_FAIL'

export const GET_ALL_FRIEND_REQUEST = 'GET_ALL_FRIEND_REQUEST'
export const GET_ALL_FRIEND_FAIL = 'GET_ALL_FRIEND_FAIL'

import config from '../config'

const urlFriend = config.API_URL +'/api/friend'

export const friendDataAction = (friendId) => {
  return (dispatch) => {
    fetch(`${urlFriend}/${+friendId}`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        method: 'POST',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: FRIEND_DATA_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: FRIEND_DATA_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
      .finally(() => dispatch({
        type: FRIEND_DATA_FETCH
      }))
  }
}


export const addNewFriendAction = (friendId) => {
  return (dispatch) => {
    dispatch({
      type: NEW_FRIEND_REQUEST,
    })

    fetch(`${urlFriend}/user/${+friendId}`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        method: 'POST',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: NEW_FRIEND_SUCCESS,
        payload: data
      }))
      .catch(() => dispatch({
        type: NEW_FRIEND_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}

export const removeFriendAction = (friendId) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_FRIEND_REQUEST,
    })

    fetch(`${urlFriend}/user/${+friendId}`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        method: 'DELETE',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: DELETE_FRIEND_SUCCESS,
        payload: data
      }))
      .catch(() => dispatch({
        type: DELETE_FRIEND_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}


export const getAllFriendListAction = () => {
  return (dispatch) => {
    fetch(`${urlFriend}/all`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        method: 'POST',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: GET_ALL_FRIEND_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: GET_ALL_FRIEND_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}


export const getFriendListToViewAction = (userId) => {
  return (dispatch) => {
    fetch(`${urlFriend}/all/${userId}`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        method: 'POST',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: GET_ALL_FRIEND_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: GET_ALL_FRIEND_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}
