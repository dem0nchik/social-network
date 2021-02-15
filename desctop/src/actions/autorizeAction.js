export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST'
export const REGISTRATION_FAIL = 'REGISTRATION_FAIL'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const AUTORIZE_REQUEST = 'AUTORIZE_REQUEST'
export const AUTORIZE_FAIL = 'AUTORIZE_FAIL'
import config from '../config'

const urlAutorize = config.DOMAIN +'/api/autorize'


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