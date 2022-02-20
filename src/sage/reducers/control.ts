import {
  start,
  change,
  next,
  mask,
  score,
  reset,
  level,
  time,
  GameStatActionEnum,
} from "../contants";

import createReducer from "../../utils/createReducer";

type ControlStateType = {
  _TempTime: number;
  controlMask: boolean;
  controlScore: number;
  controlLevel: number;
  controlTime: number;
  gameStat: Omit<GameStatActionEnum, GameStatActionEnum.RESTART>;
};

export default createReducer<ControlStateType>(
  {
    controlMask: true,
    controlScore: 0,
    controlLevel: 1,
    controlTime: 0,
    _TempTime: 0,
    gameStat: GameStatActionEnum.START,
  },
  {
    [GameStatActionEnum.START]: function (deft) {
      deft.controlMask = false;
      deft.gameStat = GameStatActionEnum.RUNNING;
      deft.controlTime = Date.now();
    },

    [GameStatActionEnum.PAUSE]: function (deft) {
      deft._TempTime = deft.controlTime;
      deft.gameStat = GameStatActionEnum.PAUSE;
    },

    [GameStatActionEnum.RUNNING]: function (deft) {
      if (deft._TempTime > 0) {
        deft.controlTime = deft._TempTime;
        deft._TempTime = 0;
      }
      deft.gameStat = GameStatActionEnum.RUNNING;
    },
    [GameStatActionEnum.END]: function (deft) {
      deft.gameStat = GameStatActionEnum.END;
    },
    [GameStatActionEnum.RESTART]: function (deft) {
      deft.controlScore = 0;
      deft.controlLevel = 1;
      deft.controlTime = 0;
    },
    [mask]: function (deft, action) {
      deft.controlMask = !!action.payload;
    },
    [score]: function (deft, action) {
      deft.controlScore = deft.controlScore + action.payload;
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
