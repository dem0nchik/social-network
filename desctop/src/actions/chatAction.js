export const HANDLE_CHAT_FAIL = 'HANDLE_CHAT_FAIL'

export const GET_LIST_CHAT_REQUEST = 'GET_LIST_CHAT_REQUEST'
export const GET_LIST_CHAT_FAIL = 'GET_LIST_CHAT_FAIL'

export const GET_INFO_CHAT_REQUEST = 'GET_INFO_CHAT_REQUEST'
export const GET_INFO_CHAT_SUCCESS = 'GET_INFO_CHAT_SUCCESS'
export const GET_INFO_CHAT_FAIL = 'GET_INFO_CHAT_FAIL'

export const NEW_MESSAGE_REQUEST = 'NEW_MESSAGE_REQUEST'
export const NEW_MESSAGE_SUCCESS = 'NEW_MESSAGE_SUCCESS'
export const NEW_MESSAGE_FAIL = 'NEW_MESSAGE_FAIL'

export const MESSAGE_FROM_SOCKET = 'MESSAGE_FROM_SOCKET'

export const GET_WIDGET_LIST_CHAT_REQUEST = 'GET_WIDGET_LIST_CHAT_REQUEST'
export const GET_WIDGET_LIST_CHAT_FAIL = 'GET_WIDGET_LIST_CHAT_FAIL'

export const INTERLOCUTOR_MESSAGE_FROM_SOCKET_TO_WIDGET = 'INTERLOCUTOR_MESSAGE_FROM_SOCKET_TO_WIDGET'

export const INTERLOCUTOR_MESSAGE_FROM_SOCKET_TO_CHATS = 'INTERLOCUTOR_MESSAGE_FROM_SOCKET_TO_CHATS'

const ROUTING = 'ROUTING'

import config from '../config'

const urlChat = config.API_URL +'/api/chat'

export const handleChatAction = (friendId) => {
  return (dispatch) => {
    fetch(`${urlChat}`, {
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({friendId})
      })
      .then(async (response) =>  {
        const data = await response.json()
        
        dispatch({
          type: ROUTING,
          payload: {
            nextUrl: data.ulr
          }
        })
      })
      .catch(() => dispatch({
        type: HANDLE_CHAT_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}

export const getChatListAction = () => {
  return (dispatch) => {
    fetch(`${urlChat}/allchat`, {
        credentials: 'include',
        method: 'POST',
      })
      .then(async (response) =>  {
        return dispatch({
          type: GET_LIST_CHAT_REQUEST,
          payload: await response.json()
        })
      })
      .catch(() => dispatch({
        type: GET_LIST_CHAT_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}

export const getChatWidgetListAction = () => {
  return (dispatch) => {
    fetch(`${urlChat}/widget`, {
        credentials: 'include',
        method: 'POST',
      })
      .then(async (response) =>  {
        return dispatch({
          type: GET_WIDGET_LIST_CHAT_REQUEST,
          payload: await response.json()
        })
      })
      .catch(() => dispatch({
        type: GET_WIDGET_LIST_CHAT_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}


export const getInfoOfChatAction = (chatId) => {
  return (dispatch) => {
    dispatch({
      type: GET_INFO_CHAT_REQUEST
    })

    fetch(`${urlChat}/id/${chatId}`, {
        credentials: 'include',
        method: 'POST',
      })
      .then(async (response) =>  {
        const data = await response.json()
        
        if (data.err) {
          dispatch({
            type: ROUTING,
            payload: {
              nextUrl: data.urlToChats
            }
          })
        }        

        dispatch({
          type: GET_INFO_CHAT_SUCCESS,
          payload: data
        })
      })
      .catch(() => dispatch({
        type: GET_INFO_CHAT_FAIL,
        error: true,
        payload: new Error('Ошибка авторизации')
      }))
  }
}


export const sendMessageAction = (dataToSocket, socket) => {
  return (dispatch) => {
    dispatch({
      type: NEW_MESSAGE_REQUEST
    })

    fetch(`${urlChat}/newmsg`, {
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
          message: dataToSocket.message, 
          chatId: dataToSocket.chatId
        })
      })
      .then(async (response) =>  {
        socket.emit('MESSAGE:ADD', dataToSocket)

        return dispatch({
          type: NEW_MESSAGE_SUCCESS,
          payload: await response.json()
        })
      })
      .catch(() => dispatch({
        type: NEW_MESSAGE_FAIL,
        error: true,
        payload: {
          message,
          error: new Error('Ошибка авторизации')
        }
      }))
  }
}


export const messageFromSocketAction = (message) => {
  return (dispatch) => {
    dispatch({
      type: MESSAGE_FROM_SOCKET,
      payload: message
    })
  }
}

export const newMessageInterlocutorFromSocketToWidgetAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: INTERLOCUTOR_MESSAGE_FROM_SOCKET_TO_WIDGET,
      payload: data
    })
  }
}

export const newMessageInterlocutorFromSocketToChatsAction = (data) => {
  return (dispatch) => {
    dispatch({
      type: INTERLOCUTOR_MESSAGE_FROM_SOCKET_TO_CHATS,
      payload: data
    })
  }
}
