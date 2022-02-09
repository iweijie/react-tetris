import { combineReducers } from "redux";
import map from "./map";
import control from "./control";
import currentMap from "./currentMap";
import _listen from "./_listen";

const rootReducer = combineReducers({
  map,
  control,
  currentMap,
  _listen,
});

export default rootReducer;
