export enum GameStatActionEnum {
  // 开始
  START = "begin",
  // 暂停
  PAUSE = "pause",
  // 重新开始
  RESTART = "restart",
  // 运行
  RUNNING = "running",
  // 结束
  END = "end",
}

export enum AudioActionEnum {
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

export enum DownActionType {
  // 向下一格
  DOWN = "down",
  // 旋转
}

export enum SagaActionType {}

export const setInfo: string = "setInfo";
export const setOldInfo: string = "setOldInfo";
export const start = GameStatActionEnum.START;
export const pause = GameStatActionEnum.PAUSE;
export const restart = GameStatActionEnum.RESTART;
export const running = GameStatActionEnum.RUNNING;
export const end = GameStatActionEnum.END;
export const change: string = "control-change";
export const next: string = "control-next";
export const mask: string = "control-mask";
export const score: string = "control-score";
export const reset: string = "control-reset";
export const level: string = "control-level";
export const time: string = "control-time";
export const animation: string = "animation";
