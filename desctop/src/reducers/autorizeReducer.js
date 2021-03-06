import {AUTORIZE_FAIL, AUTORIZE_REQUEST, 
  LOGIN_FAIL, LOGIN_REQUEST, REGISTRATION_REQUEST, 
  SET_READING_MODAL, 
  SET_TOGGLE_FORM, 
  VERIFY_USER_FAIL, VERIFY_USER_REQUEST, VIEW_MESSAGE_VERIFY
} from '../actions/autorizeAction'
import {REGISTRATION_FAIL} from '../actions/autorizeAction'

const initialState = {
  isAutorize: false,
  message: '',
  error: '',
  isFetch: true,
  fieldsIssues: [],
  registerStatus: null,
  verifyUser: false,
  formName: 'login',
  readingModal: false
}

export function autorizeReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {...state,
          message: action.payload.message,
          fieldsIssues: action.payload.fieldsIssues,
          registerStatus: action.payload.registerStatus,
          error: '',
          isFetch: false,
        }

    case REGISTRATION_FAIL:
      return {...state, isFetch: false, error: action.payload}

    case LOGIN_REQUEST:
      return {...state,
          isAutorize: action.payload.isAutorize,
          message: action.payload.message,
          fieldsIssues: action.payload.fieldsIssues,
          error: '',
          isFetch: false,
        }

    case LOGIN_FAIL:
      return {...state, error: action.payload}

    case AUTORIZE_REQUEST:
      return {...state,
          isAutorize: action.payload.isAutorize,
          isFetch: false,
          error: ''
        }

    case AUTORIZE_FAIL:
      return {...state, isFetch: false, error: action.payload}

    case VERIFY_USER_REQUEST:
      return {...state, 
          verifyUser: action.payload.verifyUser, 
          isFetch: false
        }

    case VERIFY_USER_FAIL:
      return {...state, isFetch: false, error: action.payload}

    case VIEW_MESSAGE_VERIFY:
      return {...state, verifyUser: false, isFetch: false}

    case SET_TOGGLE_FORM:
      return {...state, formName: action.payload, isFetch: false}

    case SET_READING_MODAL:
      return {...state, readingModal: action.payload, isFetch: false}
      
    default:
      break;
  }
  return state
}