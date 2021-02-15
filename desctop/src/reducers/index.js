import {combineReducers} from "redux";
import { autorizeReducer } from "./autorizeReducer";



export const rootReducer = combineReducers({
  autorize: autorizeReducer,
})