import {combineReducers} from "redux";
import { autorizeReducer } from "./autorizeReducer";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { friendReducer } from "./friendReducer";
import { infoReducer } from "./infoReducer";
import { chatReducer } from "./chatReducer";

export const rootReducer = combineReducers({
  autorize: autorizeReducer,
  user: userReducer,
  post: postReducer,
  friend: friendReducer,
  info: infoReducer,
  chat: chatReducer
})