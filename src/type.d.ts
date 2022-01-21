export type MapType = Array<Array<number>>;

export type BlockType = {
  map: MapType;
  /*
   * info 详情
   * h 二位数组高度
   * len 二位数组长度
   * l 左侧空格行数
   * r 右部空格行数
   * t 顶部空格行数
   * b 底部空格行数
   */

  info: {
    t?: number;
    b?: number;
    r?: number;
    l?: number;
    h: number;
    len: number;
  };
};

export type NextBlockMapInfoType = {
  autoDown: boolean;
  index: number;
  next: null | NextBlockMapInfoType;
  uuid: number;
  seat: number[];
  site: BlockType[];
};
export type ObjectKeyType = string | symbol | number;

export type ActionType<K extends ObjectKeyType, T = any> = {
  type: K;
  payload: T;
};

export type Timer = ReturnType<typeof window.setTimeout>;
