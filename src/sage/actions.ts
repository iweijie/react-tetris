import getNextBlockMapInfo from "../utils/getNextBlock";
import {
  SagaActionType,
  GameActionType,
  ControlActionType,
} from "../constans/actions";
import { ActionType } from "../type";
import {
  restart,
  setInfo,
  start,
  change,
  next,
  mask,
  score,
  reset,
  level,
  time,
} from "./contants";
// export const start = "control-start";
// export const change = "control-change";
// export const next = "control-next";
// export const mask = "control-mask";
// export const score = "control-score";
// export const reset = "control-reset";
// export const level = "control-level";
// export const time = "control-time";

// const setAction = (payload) => {
//   return {
//     type: setInfo,
//     payload,
//   };
// };

// const restartAction = () => {
//   return {
//     type: restart,
//   };
// };

// const controlStartAction = () => {
//   const payload = getNextBlockMapInfo();
//   payload.next = getNextBlockMapInfo();
//   return {
//     type: GameActionType.START,
//     payload,
//   };
// };

// //   Action
// const controlChangeAction = (payload: any) => {
//   return {
//     type: SagaActionType.CHANG,
//     payload,
//   };
// };
// // 方块  Action
// const controlNextAction = () => {
//   return {
//     type: SagaActionType.NEXT,
//     payload: getNextBlockMapInfo(),
//   };
// };
// // 遮罩  Action
// const maskAction = (payload: boolean) => {
//   return {
//     type: SagaActionType.MASK,
//     payload: payload,
//   };
// };
// // 分数  Action
// const scoreAction = (payload: number) => {
//   return {
//     type: SagaActionType.SCORE,
//     payload,
//   };
// };
// // 重置  Action
// const resetAction = () => {
//   return {
//     type: GameActionType.RESTART,
//   };
// };
// // 难度  Action
// const levelAction = (payload: number) => {
//   return {
//     type: SagaActionType.LEVEL,
//     payload,
//   };
// };
// // 时长  Action
// const changeTimeAction = (payload: number) => {
//   return {
//     type: SagaActionType.TIME,
//     payload,
//   };
// };

const controlStartAction = () => {
  var payload = getNextBlockMapInfo();
  payload.next = getNextBlockMapInfo();
  return {
    type: start,
    payload,
  };
};

//   Action
const controlChangeAction = (payload: any) => {
  return {
    type: change,
    payload,
  };
};

// 方块  Action
const controlNextAction = () => {
  return {
    type: next,
    payload: getNextBlockMapInfo(),
  };
};
// 遮罩  Action
const maskAction = (payload: boolean) => {
  return {
    type: mask,
    payload,
  };
};
// 分数  Action
const scoreAction = (payload: number) => {
  return {
    type: score,
    payload: payload,
  };
};
// 重置  Action
const resetAction = () => {
  return {
    type: reset,
  };
};
// 难度  Action
const levelAction = (payload: number) => {
  return {
    type: level,
    payload,
  };
};
// 时长  Action
const changeTimeAction = (payload: number) => {
  return {
    type: time,
    payload,
  };
};

const actions = {
  controlStartAction,
  controlChangeAction,
  controlNextAction,
  maskAction,
  scoreAction,
  resetAction,
  levelAction,
  changeTimeAction,
};

export default actions;
