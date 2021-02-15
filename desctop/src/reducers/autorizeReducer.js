import {AUTORIZE_FAIL, AUTORIZE_REQUEST, LOGIN_FAIL, LOGIN_REQUEST, REGISTRATION_REQUEST} from '../actions/autorizeAction'
import {REGISTRATION_FAIL} from '../actions/autorizeAction'
const initialState = {
  isAutorize: false,
  message: '',
  error: '',
  isFetch: true,
  fieldsIssues: [],
  registerStatus: null
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
    default:
      break;
  }
  return state
}