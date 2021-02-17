export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST'
export const REGISTRATION_FAIL = 'REGISTRATION_FAIL'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const AUTORIZE_REQUEST = 'AUTORIZE_REQUEST'
export const AUTORIZE_FAIL = 'AUTORIZE_FAIL'
export const VERIFY_USER_REQUEST = 'VERIFY_USER_REQUEST'
export const VERIFY_USER_FAIL = 'VERIFY_USER_FAIL'
import config from '../config'

const urlAutorize = config.API_URL +'/api/autorize'


export const registrationUserAction = (body) => {
  return (dispatch) => {
    fetchAutorize(body, dispatch, 'registarion')
  }
}

export const loginUserAction = (body) => {
  return (dispatch) => {
    fetchAutorize(body, dispatch, 'login')
  }
}

export const isAutorizeAction = () => {
  return (dispatch) => {
    fetch(urlAutorize, {credentials: 'include'})
      .then(response => response.json())
      .then(data => dispatch({
        type: AUTORIZE_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: AUTORIZE_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }));
  }
}

export const verifyUserAction = (idToken) => {
  return (dispatch) => {
    fetch(`${urlAutorize}/verify?idToken=${idToken}`)
      .then(response => response.json())
      .then(data => dispatch({
        type: VERIFY_USER_REQUEST,
        payload: data
      }))
      .catch(() => dispatch({
        type: VERIFY_USER_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }));
  }
}

const fetchAutorize = (body, dispatch, type) => {
  fetch(`${urlAutorize}/${type}`, {
    headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json' 
    }, 
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((data) => dispatch({
      type: type === 'login' ? LOGIN_REQUEST : REGISTRATION_REQUEST,
      payload: data
    }))
    .catch(() => dispatch({
      type: type === 'login' ? LOGIN_FAIL : REGISTRATION_FAIL,
      error: true,
      payload: new Error('Ошибка авторизации')
    }));
}
