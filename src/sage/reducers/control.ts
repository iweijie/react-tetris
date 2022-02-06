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
// import { GameActionType } from "../contants";
import createReducer from "../../utils/createReducer";

export default createReducer(
  {
    nextMap: {
      map: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
      ],
      isTransform: true,
      collide: false,
      isTranslationLeft: true,
      isTranslationRight: true,
    },
    controlMask: false,
    currentMap: {
      autoDown: true,
      index: 0,
      next: {
        autoDown: true,
        index: 0,
        next: null,
        uuid: 3,
        seat: [4, 2],
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
    controlscore: 0,
    controllevel: 1,
    controltime: 1642520016076,
  },
  {
    // [GameActionType.START]: function (dea, action, state) {
    //   return state;
    // },
  }
);

// function currentMap(state = {}, action) {
//   switch (action.type) {
//     case start:
//       return action.payload;
//     case next:
//       return {
//         ...state.next,
//         next: action.payload,
//       };
//     case change:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// }

// function controlMask(state = true, action) {
//   switch (action.type) {
//     case mask:
//       return action.payload;
//     default:
//       return state;
//   }
// }

// function controlscore(state = 0, action) {
//   switch (action.type) {
//     case score:
//       return state + action.payload;
//     case reset:
//       return 0;
//     default:
//       return state;
//   }
// }
// function controllevel(state = 1, action) {
//   switch (action.type) {
//     case level:
//       if (action.payload < 1) {
//         action.payload = 1;
//       } else if (action.payload > 6) {
//         action.payload = 6;
//       }
//       return action.payload;
//     case reset:
//       return 1;
//     default:
//       return state;
//   }
// }
// function controltime(state = 0, action) {
//   switch (action.type) {
//     case time:
//       return state + action.payload;
//     // return state + action.payload.time;
//     case reset:
//       return 0;
//     default:
//       return state;
//   }
// }

// // export default {
// //   currentMap,
// //   controlMask,
// //   controlscore,
// //   controllevel,
// //   controltime,
// // };
