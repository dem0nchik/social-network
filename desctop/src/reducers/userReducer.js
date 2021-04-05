import { 
  USER_DATA_FAIL,
  USER_DATA_REQUEST,
  USER_DELETE_IMG_FAIL,
  USER_DELETE_IMG_REQUEST,
  USER_NEW_IMG_FAIL,
  USER_NEW_IMG_REQUEST,
  USER_DATA_FETCH,
  SET_SETTINGS_USER_REQUEST,
  SET_SETTINGS_USER_SUCCESS,
  SET_SETTINGS_USER_FAIL
} from "../actions/userAction";

const initialState = {
  id: null,
  name: '',
  surname: '',
  email: '',
  data_created: '',
  profile_img: null,
  isReceive: false,
  friendList: {
    list: [],
    count: 0
  },
  error: '',
  isUserDataFetching: true,
  description: '',
  isSettingFetching: false
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_DATA_REQUEST:
      return {...state,
        id: action.payload.id,
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
        description: action.payload.description,
        data_created: action.payload.data_created,
        profile_img: action.payload.profile_img,
        friendList: {
          list: action.payload.friendList.list,
          count: action.payload.friendList.count
        },
        isReceive: false
      }

    case USER_DATA_FAIL:
        return {...state, error: action.payload}
        
    case USER_DATA_FETCH:
        return {...state, isUserDataFetching: false}

    case USER_NEW_IMG_REQUEST:
        return {...state, profile_img: action.payload.profile_img}

    case USER_NEW_IMG_FAIL:
        return {...state, error: action.payload}

    case USER_DELETE_IMG_REQUEST:
        return {...state, profile_img: action.payload.profile_img}

    case USER_DELETE_IMG_FAIL:
        return {...state, error: action.payload}

    case SET_SETTINGS_USER_REQUEST:
        return {...state, isSettingFetching: true}

    case SET_SETTINGS_USER_SUCCESS:
        return {...state,
        name: action.payload.name,
        surname: action.payload.surname,
        description: action.payload.description,
        isSettingFetching: false
      }

    case SET_SETTINGS_USER_FAIL:
        return {...state, error: action.payload,
          isSettingFetching: false
        }

    default:
      break;
  }
  return state
}