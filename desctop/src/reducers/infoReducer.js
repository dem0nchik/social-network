import { LIST_USERS_FAIL, LIST_USERS_REQUEST } from "../actions/infoAction";

const initialState = {
  listUsers: [],
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

    default:
      break;
  }
  return state
}