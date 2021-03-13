export const LIST_USERS_REQUEST = 'LIST_USERS_REQUEST'
export const LIST_USERS_FAIL = 'LIST_USERS_FAIL'

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