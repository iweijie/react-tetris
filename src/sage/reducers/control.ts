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
import { creatMap } from "./map";
import createReducer from "../../utils/createReducer";

export default createReducer(
  {
    nextMap: {
      map: creatMap(),
      isTransform: false,
      collide: false,
      isTranslationLeft: false,
      isTranslationRight: false,
    },
    controlMask: true,
    currentMap: {
      autoDown: false,
      index: 0,
      next: null,
      uuid: 2,
      seat: [3, 3],
      site: [
        {
          map: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          info: {
            h: 4,
            t: 1,
            b: 2,
            len: 4,
          },
        },
        {
          map: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
          ],
          info: {
            h: 4,
            l: 1,
            r: 2,
            len: 4,
          },
        },
      ],
    },
    controlScore: 0,
    controlLevel: 1,
    controlTime: 0,
  },
  {
    [start]: function (deft, action, state) {
      deft.currentMap = action.payload;
    },
    [next]: function (deft, action, state) {
      if (deft.currentMap.next) {
        deft.currentMap = deft.currentMap.next;
        deft.currentMap.next = action.payload;
      } else {
        deft.currentMap = action.payload;
      }
    },
    [change]: function (deft, action, state) {
      deft.currentMap = {
        ...deft.currentMap,
        ...action.payload,
      };
    },
    [mask]: function (deft, action, state) {
      deft.controlMask = action.payload;
    },
    [score]: function (deft, action, state) {
      deft.controlScore = deft.controlScore + action.payload;
    },
    [reset]: function (deft, action, state) {
      deft.controlScore = 0;
      deft.controlLevel = 1;
      deft.controlTime = 0;
    },
    [level]: function (deft, action, state) {
      if (action.payload < 1) {
        action.payload = 1;
      } else if (action.payload > 6) {
        action.payload = 6;
      }
      deft.controlLevel = action.payload;
    },
    [time]: function (deft, action, state) {
      deft.controlTime = deft.controlTime + action.payload;
    },
  }
);

// // export default {
// //   currentMap,
// //   controlMask,
// //   controlScore,
// //   controlLevel,
// //   controlTime,
// // };
