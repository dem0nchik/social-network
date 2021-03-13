import { 
  DELETE_FRIEND_FAIL,
  DELETE_FRIEND_REQUEST,
  FRIEND_DATA_FAIL, 
  FRIEND_DATA_FETCH, 
  FRIEND_DATA_REQUEST, 
  GET_ALL_FRIEND_FAIL, 
  GET_ALL_FRIEND_REQUEST, 
  NEW_FRIEND_FAIL, 
  NEW_FRIEND_REQUEST
} from "../actions/friendAction";

const initialState = {
  id: null,
  name: '',
  surname: '',
  profile_img: null,
  isFriendDataFetching: true,
  isActiveFriend: false,
  friendList: {
    list: [],
    count: 0
  },
  error: ''
}

export function friendReducer(state = initialState, action) {
  switch (action.type) {
    case FRIEND_DATA_REQUEST:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        surname: action.payload.surname,
        profile_img: action.payload.profile_img,
        error: action.payload.err,
        friendList: {
          list: action.payload.friendList.list,
          count: action.payload.friendList.count
        },
        isActiveFriend: action.payload.active
      }

    case FRIEND_DATA_FAIL:
      return {...state, error: action.payload}

    case FRIEND_DATA_FETCH:
        return {...state, isFriendDataFetching: false}

    case NEW_FRIEND_REQUEST:
      return {
        ...state, 
        isActiveFriend: action.payload.active,
        friendList: {
          list: action.payload.friendList.list,
          count: action.payload.friendList.count
        }
      }

    case NEW_FRIEND_FAIL:
      return {...state, error: action.payload}

    case DELETE_FRIEND_REQUEST:
      return {
        ...state, 
        isActiveFriend: action.payload.active,
        friendList: {
          list: action.payload.friendList.list,
          count: action.payload.friendList.count
        }
      }

    case DELETE_FRIEND_FAIL:
      return {...state, error: action.payload}

    case GET_ALL_FRIEND_REQUEST:
      return {
        ...state, 
        isActiveFriend: action.payload.active,
        friendList: {
          list: action.payload.list,
          count: action.payload.count
        }
      }

    case GET_ALL_FRIEND_FAIL:
      return {...state, error: action.payload}

    default:
      break;
  }
  return state
}