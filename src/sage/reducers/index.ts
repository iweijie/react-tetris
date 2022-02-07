import { combineReducers } from "redux";
import map from "./map";
import control from "./control";
import currentMap from "./currentMap";

const rootReducer = combineReducers({
  map,
  control,
  currentMap,
});

export default rootReducer;
