export enum GameActionType {
  // 开始
  START = "start",
  // 重新开始
  RESTART = "restart",
  // 关闭声音
  CLOSE_AUDIO = "close-audio",
  // 开启声音
  OPEN_AUDIO = "open-audio",
}

export enum ControlActionType {
  // 向下一格
  DOWN = "down",
  // 旋转
  ROTA = "rotating",
  // 到底部
  SPACE = "space",
  // 左移
  LEFT = "left-shift",
  // 右移
  RIGHT = "right-shift",
}

export enum SagaActionType {}

export const setInfo: string = "setInfo";
export const setOldInfo: string = "setOldInfo";
export const restart: string = "restart";
export const start: string = "control-start";
export const change: string = "control-change";
export const next: string = "control-next";
export const mask: string = "control-mask";
export const score: string = "control-score";
export const reset: string = "control-reset";
export const level: string = "control-level";
export const time: string = "control-time";
export const animation: string = "animation";
