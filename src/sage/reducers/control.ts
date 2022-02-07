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
import createReducer from "../../utils/createReducer";

export default createReducer(
  {
    controlMask: true,
    controlScore: 0,
    controlLevel: 1,
    controlTime: 0,
  },
  {
    [mask]: function (deft, action) {
      deft.controlMask = action.payload;
    },
    [score]: function (deft, action) {
      deft.controlScore = deft.controlScore + action.payload;
    },
    [reset]: function (deft, action) {
      deft.controlScore = 0;
      deft.controlLevel = 1;
      deft.controlTime = 0;
    },
    [level]: function (deft, action) {
      if (action.payload < 1) {
        action.payload = 1;
      } else if (action.payload > 6) {
        action.payload = 6;
      }
      deft.controlLevel = action.payload;
    },
    [time]: function (deft, action) {
      deft.controlTime = deft.controlTime + action.payload;
    },
  }
);
