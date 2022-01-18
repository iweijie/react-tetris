import { setInfo, restart } from "../actions";

import { GameActionType } from "../contants";
import createReducer from "../../utils/createReducer";

// 0 ： 无 ；  1 ： 有 ；2 ： 即将消失

// function map(state = creatMap(), action) {
//   switch (action.type) {
//     case setInfo:
//       return action.payload;
//     case restart:
//       return creatMap();
//     default:
//       return state;
//   }
// }
// export default {
//   map,
// };
