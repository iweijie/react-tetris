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
  GameStatActionEnum,
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

const ControlStatAction = (type: GameStatActionEnum) => (payload?: any) => {
  payload = payload || {};

  return {
    type,
    payload,
  };
};

const controlStartAction = ControlStatAction(GameStatActionEnum.START);
const controlPauseAction = ControlStatAction(GameStatActionEnum.PAUSE);
const controlRunningAction = ControlStatAction(GameStatActionEnum.RUNNING);
const controlEndAction = ControlStatAction(GameStatActionEnum.END);
const controlRestartAction = ControlStatAction(GameStatActionEnum.RESTART);

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
  controlPauseAction,
  controlRunningAction,
  controlEndAction,
  controlRestartAction,
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
