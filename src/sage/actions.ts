import getNextBlockMapInfo from "../utils/getNextBlock";
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

const setAction = (payload: any) => {
  return {
    type: setInfo,
    payload,
  };
};

const restartAction = () => {
  return {
    type: restart,
  };
};

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
  setAction,
  restartAction,
};
export type ActionsType = typeof actions;

export default actions; 
