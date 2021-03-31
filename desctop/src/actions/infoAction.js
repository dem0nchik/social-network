export const LIST_USERS_REQUEST = 'LIST_USERS_REQUEST'
export const LIST_USERS_FAIL = 'LIST_USERS_FAIL'

export const ALL_LIST_USERS_REQUEST = 'ALL_LIST_USERS_REQUEST'
export const ALL_LIST_USERS_FAIL = 'ALL_LIST_USERS_FAIL'

export const GET_USER_IMAGES_SUCCESS = 'GET_USER_IMAGES_SUCCESS'
export const GET_USER_IMAGES_REQUEST = 'GET_USER_IMAGES_REQUEST'
export const GET_USER_IMAGES_FAIL = 'GET_USER_IMAGES_FAIL'

import config from '../config'

const urlInfo = config.API_URL +'/api/info'

export const getListLastUsersAction = () => {
  return (dispatch) => {
    fetch(`${urlInfo}/user`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        credentials: 'include',
        method: 'GET'
      })
      .then(async (response) =>  {
        return dispatch({
          type: LIST_USERS_REQUEST,
          payload: await response.json()
        })
      })
      .catch(() => dispatch({
        type: LIST_USERS_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}

export const getListAllPeopleToViewAction = () => {
  return (dispatch) => {
    fetch(`${urlInfo}/user/all`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        credentials: 'include',
        method: 'GET'
      })
      .then(async (response) =>  {
        return dispatch({
          type: ALL_LIST_USERS_REQUEST,
          payload: await response.json()
        })
      })
      .catch(() => dispatch({
        type: ALL_LIST_USERS_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}


export const getUserImagesAction = (userId) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_IMAGES_REQUEST,
    })

    fetch(`${urlInfo}/user/images`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000',
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({userId})
      })
      .then(async (response) =>  {
        return dispatch({
          type: GET_USER_IMAGES_SUCCESS,
          payload: await response.json()
        })
      })
      .catch(() => dispatch({
        type: GET_USER_IMAGES_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}