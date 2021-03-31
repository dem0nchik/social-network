import { 
  ALL_LIST_USERS_FAIL, 
  ALL_LIST_USERS_REQUEST,
  GET_USER_IMAGES_FAIL,
  GET_USER_IMAGES_REQUEST,
  GET_USER_IMAGES_SUCCESS,
  LIST_USERS_FAIL, 
  LIST_USERS_REQUEST,
} from "../actions/infoAction";

const initialState = {
  listUsers: [],
  listAllusers: [],
  imagesUser: [],
  fetchingImages: true,
  error: ''
}

export function infoReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_USERS_REQUEST:
      return {
        ...state,
        listUsers: action.payload.listUsers
      }

    case LIST_USERS_FAIL:
      return {...state, error: action.payload}

    case GET_USER_IMAGES_REQUEST:
      return {...state, fetchingImages: true}

    case GET_USER_IMAGES_SUCCESS:
      return {
        ...state, imagesUser: action.payload.imagesUser,
        fetchingImages: false
      }

    case GET_USER_IMAGES_FAIL:
      return {...state, error: action.payload,
        fetchingImages: false
      }

    case ALL_LIST_USERS_REQUEST:
      return {
        ...state,
        listAllusers: action.payload.listAllusers
      }

    case ALL_LIST_USERS_FAIL:
      return {...state, error: action.payload}

    default:
      break;
  }
  return state
}