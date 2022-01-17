import getNextBlockMapInfo from "../utils/getNextBlock";
import {
  SagaActionType,
  GameActionType,
  ControlActionType,
} from "../constans/actions";
import { ActionType } from "../type";

// export const start = "control-start";
// export const change = "control-change";
// export const next = "control-next";
// export const mask = "control-mask";
// export const score = "control-score";
// export const reset = "control-reset";
// export const level = "control-level";
// export const time = "control-time";

const controlStartAction = () => {
  const payload = getNextBlockMapInfo();
  payload.next = getNextBlockMapInfo();
  return {
    type: GameActionType.START,
    payload,
  };
};

//   Action
const controlChangeAction = (payload: any) => {
  return {
    type: SagaActionType.CHANG,
    payload,
  };
};
// 方块  Action
const controlNextAction = () => {
  return {
    type: SagaActionType.NEXT,
    payload: getNextBlockMapInfo(),
  };
};
// 遮罩  Action
const maskAction = (payload: boolean) => {
  return {
    type: SagaActionType.MASK,
    payload: payload,
  };
};
// 分数  Action
const scoreAction = (payload: number) => {
  return {
    type: SagaActionType.SCORE,
    payload,
  };
};
// 重置  Action
const resetAction = () => {
  return {
    type: GameActionType.RESTART,
  };
};
// 难度  Action
const levelAction = (payload: number) => {
  return {
    type: SagaActionType.LEVEL,
    payload,
  };
};
// 时长  Action
const changeTimeAction = (payload: number) => {
  return {
    type: SagaActionType.TIME,
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