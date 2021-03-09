export const USER_DATA_REQUEST = 'USER_DATA_REQUEST'
export const USER_DATA_FAIL = 'USER_DATA_FAIL'
export const USER_DATA_FETCH = 'USER_DATA_FETCH'
export const USER_NEW_IMG_REQUEST = 'USER_NEW_IMG_REQUEST'
export const USER_NEW_IMG_FAIL = 'USER_NEW_IMG_FAIL'
export const USER_DELETE_IMG_REQUEST = 'USER_DELETE_IMG_REQUEST'
export const USER_DELETE_IMG_FAIL = 'USER_DELETE_IMG_FAIL'
import config from '../config'

const urlUser = config.API_URL +'/api/user'

export const userDataAction = () => {
  return (dispatch) => {
    fetch(urlUser, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: USER_DATA_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: USER_DATA_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
      .finally(() => dispatch({
        type: USER_DATA_FETCH
      }))
  }
}

export const addNewProfileImgAction = (imgData) => {
  return (dispatch) => {
    fetch(`${urlUser}/pimg`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        credentials: 'include',
        method: 'POST',
        body: imgData
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: USER_NEW_IMG_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: USER_NEW_IMG_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }));
  }
}

export const deleteProfileImgAction = (imgData) => {
  return (dispatch) => {
    fetch(`${urlUser}/pimg`, {
        headers: {
          'Cache-Control': 'private, max-age=2592000'
        },
        credentials: 'include',
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => dispatch({
        type: USER_DELETE_IMG_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: USER_DELETE_IMG_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }));
  }
}