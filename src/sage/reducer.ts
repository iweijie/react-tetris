// import {
//   start,
//   change,
//   next,
//   mask,
//   score,
//   reset,
//   level,
//   time,
// } from "../actions/controlAction";
import { GameActionType } from "./contants";
import createReducer from "../utils/createReducer";

export default createReducer(
  {
    // contorlMask
    isMask: true,
    // currentMap
    currentMap: {},
    score: 0,
    level: 1,
    time: 0,
  },
  {
    [GameActionType.START]: function (dea, action, state) {},
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

// function contorlMask(state = true, action) {
//   switch (action.type) {
//     case mask:
//       return action.payload;
//     default:
//       return state;
//   }
// }

// function contorlscore(state = 0, action) {
//   switch (action.type) {
//     case score:
//       return state + action.payload;
//     case reset:
//       return 0;
//     default:
//       return state;
//   }
// }
// function contorllevel(state = 1, action) {
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
// function contorltime(state = 0, action) {
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
// //   contorlMask,
// //   contorlscore,
// //   contorllevel,
// //   contorltime,
// // };
