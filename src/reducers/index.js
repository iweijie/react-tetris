import { combineReducers } from "redux";
import map from "./map";
import controlReducer from "./controlReducer";

const rootReducer = combineReducers({
  ...map,
  ...controlReducer,
});

export default rootReducer;
