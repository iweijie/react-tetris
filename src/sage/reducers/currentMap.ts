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

import { MapType, BlockType } from "../../type";
import createReducer from "../../utils/createReducer";

type CurrentMapType = {
  autoDown: boolean;
  index: number;
  next: CurrentMapType | null;
  uuid: number;
  seat: number[];
  site: BlockType[];
};

export default createReducer<CurrentMapType>(
  {
    autoDown: false,
    index: 0,
    next: null,
    uuid: 2,
    seat: [3, 3],
    site: [],
  },
  {
    [start]: function (deft, action) {
      return action.payload;
    },
    [next]: function (deft, action) {
      let data: CurrentMapType;
      if (deft.next) {
        data = { ...deft.next };
        data.next = action.payload;
      } else {
        data = action.payload;
      }

      return data;
    },
    [change]: function (deft, action) {
      return {
        ...deft,
        ...action.payload,
      };
    },
  }
);
