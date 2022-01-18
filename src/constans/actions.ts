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

export enum SagaActionType {
  CHANG = "change",
  NEXT = "next",
  MASK = "mask",
  SCORE = "score",
  LEVEL = "level",
  TIME = "time",

  setInfo = "setInfo",
}
