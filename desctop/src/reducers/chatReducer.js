import { 
  GET_INFO_CHAT_FAIL, 
  GET_INFO_CHAT_REQUEST, 
  GET_INFO_CHAT_SUCCESS,

  GET_LIST_CHAT_FAIL, 
  GET_LIST_CHAT_REQUEST,

  HANDLE_CHAT_FAIL,

  NEW_MESSAGE_REQUEST,
  NEW_MESSAGE_SUCCESS,
  NEW_MESSAGE_FAIL,

  MESSAGE_FROM_SOCKET,

  GET_WIDGET_LIST_CHAT_REQUEST,
  GET_WIDGET_LIST_CHAT_FAIL,

  INTERLOCUTOR_MESSAGE_FROM_SOCKET_TO_WIDGET,
  INTERLOCUTOR_MESSAGE_FROM_SOCKET_TO_CHATS
} from "../actions/chatAction";

const initialState = {
  redirectUrl: '',
  succesConnect: false,
  chatId: null,
  listChats: [],
  isOnline: false,
  profileImg: '',
  lastDateOnline: '',
  name: '',
  linkToProfile: '',
  fetchToDataChat: true,
  messageList: null,
  widgetList: [],
  error: '',
  messageError: ''
}

let newMessageList = null
let lengthArray = 0

const returnMessageListArray = (messageArray, message, isRead, messageSelf, haveError) => {
  let newMessageList = messageArray

  lengthArray = newMessageList.length-1 <= 0 ? 0 : newMessageList.length-1
  if (lengthArray === 0) {
    newMessageList.push({
      date: new Date(),
      title: new Date().toISOString().substr(0, 10),
      messages: [{
        bodyText: message,
        isRead,
        messageSelf,
        time: new Date(),
        error: haveError
      }]
    })
  } else {
    newMessageList[lengthArray].messages.push({
      bodyText: message,
      isRead,
      messageSelf,
      time: new Date(),
      error: haveError
    })
  }

  return newMessageList
}

export function chatReducer(state = initialState, action) {
  switch (action.type) {

    case HANDLE_CHAT_FAIL:
      return {...state, error: action.payload}

    case GET_LIST_CHAT_REQUEST:
      return {...state, listChats: action.payload}

    case GET_LIST_CHAT_FAIL:
      return {...state, error: action.payload}

    case GET_INFO_CHAT_REQUEST:
      return {...state, fetchToDataChat: false, succesConnect: false}

    case GET_INFO_CHAT_SUCCESS:
      return {
        ...state, 
        isOnline: action.payload.isOnline,
        profileImg: action.payload.profileImg,
        lastDateOnline: action.payload.lastDateOnline,
        name: action.payload.name,
        linkToProfile: action.payload.linkToProfile,
        fetchToDataChat: false,
        chatId: action.payload.chatId,
        succesConnect: true,
        messageList: action.payload.messageList
      }

    case GET_INFO_CHAT_FAIL:
      return {...state, 
        error: action.payload,
        fetchToDataChat: false,
        succesConnect: false
      }

    case NEW_MESSAGE_REQUEST:
      return {...state, 
        messageError: ''
      }
      
    case NEW_MESSAGE_SUCCESS:
      newMessageList = state.messageList.slice(0)
      
      return {...state, 
        messageError: '',
        messageList: returnMessageListArray(newMessageList, action.payload.message, false, true, false)
      }

    case NEW_MESSAGE_FAIL:
      newMessageList = state.messageList.slice(0)

      return {...state, 
        messageError: action.error,
        messageList: returnMessageListArray(newMessageList, action.payload.message, false, true, true)
      }

    case MESSAGE_FROM_SOCKET:
      newMessageList = state.messageList.slice(0).map(el => {
        return {
          ...el,
          messages: el.messages.map(msg => {
            return {
              isRead: msg.messageSelf ? true : msg.isRead,
              bodyText: msg.bodyText,
              messageSelf: msg.messageSelf,
              time: msg.time
            }
          })
        }
      })

      return {...state,
        isOnline: true,
        messageList: returnMessageListArray(newMessageList, action.payload, true, false, false)
      }

    case GET_WIDGET_LIST_CHAT_REQUEST:
      return {...state, widgetList: action.payload}

    case GET_WIDGET_LIST_CHAT_FAIL:
      return {...state, error: action.payload}

    case INTERLOCUTOR_MESSAGE_FROM_SOCKET_TO_WIDGET:
      const newWidgetList = state.widgetList.slice(0)

      if (newWidgetList.length > 0) {
        let hasElement = newWidgetList.find(item => item.chatId == action.payload.chatId)
        const indexElement = newWidgetList.indexOf(hasElement) || 0
        
        if (indexElement >= 0) {
          newWidgetList.unshift(...newWidgetList.splice(indexElement,1))
          newWidgetList.splice(0, 1)
          newWidgetList.unshift({
            chatId: action.payload.chatId,
            name: action.payload.name,
            isOnline: true,
            profileImg: action.payload.profileImg,
            countUnread: +hasElement.countUnread+1
          })
        } else {
            newWidgetList.unshift({
              chatId: action.payload.chatId,
              name: action.payload.name,
              isOnline: true,
              profileImg: action.payload.profileImg,
              countUnread: 1
            })
        }
      } else if (newWidgetList.length === 0) {
        newWidgetList.unshift({
          chatId: action.payload.chatId,
          name: action.payload.name,
          isOnline: true,
          profileImg: action.payload.profileImg,
          countUnread: +hasElement.countUnread+1
        })
      }
      return {...state, widgetList: newWidgetList}

    case INTERLOCUTOR_MESSAGE_FROM_SOCKET_TO_CHATS:
      const newListChats = state.listChats.slice(0)

      if (newListChats.length > 0) {
        let hasElement = newListChats.find(item => item.chatId === action.payload.chatId)
        const indexElement = newListChats.indexOf(hasElement) || 0
        
        if (indexElement >= 0) {
          newListChats.unshift(...newListChats.splice(indexElement,1))
          newListChats.splice(0, 1)
          newListChats.unshift({
            chatId: action.payload.chatId,
            name: action.payload.name,
            isOnline: true,
            profileImg: action.payload.profileImg,
            countUnread: +hasElement.countUnread+1,
            lastMessageText: action.payload.message,
            lastMessageIsRead: false,
            lastMessageDate: new Date().toISOString()
          })
        } else {
          newListChats.unshift({
            chatId: action.payload.chatId,
            name: action.payload.name,
            isOnline: true,
            profileImg: action.payload.profileImg,
            countUnread: 1,
            lastMessageText: action.payload.message,
            lastMessageIsRead: false,
            lastMessageDate: new Date().toISOString()
          })
        }
      } else if (newListChats.length === 0) {
        newListChats.push({
          chatId: action.payload.chatId,
          name: action.payload.name,
          isOnline: true,
          profileImg: action.payload.profileImg,
          countUnread: 1,
          lastMessageText: action.payload.message,
          lastMessageIsRead: false,
          lastMessageDate: new Date().toISOString()
        })
      }
      return {...state, listChats: newListChats} 

    default:
      break;
  }
  return state
}