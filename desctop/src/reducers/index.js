import {combineReducers} from "redux";
import { autorizeReducer } from "./autorizeReducer";
import { userReducer } from "./userReducer";
import { postReducer } from "./postReducer";

export const rootReducer = combineReducers({
  autorize: autorizeReducer,
  user: userReducer,
  post: postReducer
})