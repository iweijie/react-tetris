import {
  start,
  change,
  next,
  mask,
  score,
  reset,
  level,
  time,
} from "../contants";
import music from "../../utils/music";
import createReducer from "../../utils/createReducer";

// 专门用作监听 action， 做一些操作

export default createReducer(null, {
  [start]: function (deft, action) {
    console.log("music", music);
  },
});
