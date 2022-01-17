import { BlockType } from "../type";
/*
 * map
 * 0 为空
 * 1 为移动块显示的小方块
 *
 * 二位数组为 当前移动块可变换的最小所需空间
 */

/*
 * info 详情
 * h 二位数组高度
 * len 二位数组长度
 * l 左侧空格行数
 * r 右部空格行数
 * t 顶部空格行数
 * b 底部空格行数
 */

// 一  丨
const longMap: BlockType[] = [
  {
    map: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    info: {
      h: 4,
      t: 1,
      b: 2,
      len: 4,
    },
  },
  {
    map: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    info: {
      h: 4,
      l: 1,
      r: 2,
      len: 4,
    },
  },
];

// L
const lMap: BlockType[] = [
  {
    map: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    info: {
      h: 3,
      b: 1,
      len: 3,
    },
  },
  {
    map: [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    info: {
      h: 3,
      l: 1,
      len: 3,
    },
  },
  {
    map: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
    info: {
      h: 3,
      t: 1,
      len: 3,
    },
  },
  {
    map: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    info: {
      h: 3,
      r: 1,
      len: 3,
    },
  },
];

// r l
const rLMap: BlockType[] = [
  {
    map: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    info: {
      h: 3,
      b: 1,
      len: 3,
    },
  },
  {
    map: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    info: {
      h: 3,
      l: 1,
      len: 3,
    },
  },
  {
    map: [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    info: {
      h: 3,
      t: 1,
      len: 3,
    },
  },
  {
    map: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    info: {
      h: 3,
      r: 1,
      len: 3,
    },
  },
];

// z
const zMap: BlockType[] = [
  {
    map: [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    info: {
      h: 3,
      t: 1,
      len: 3,
    },
  },
  {
    map: [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
    info: {
      h: 3,
      r: 1,
      len: 3,
    },
  },
];

// r z
const rZMap: BlockType[] = [
  {
    map: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
    info: {
      h: 3,
      t: 1,
      len: 3,
    },
  },
  {
    map: [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    info: {
      h: 3,
      l: 1,
      len: 3,
    },
  },
];

// 田
const tianMap: BlockType[] = [
  {
    map: [
      [1, 1],
      [1, 1],
    ],
    info: {
      h: 2,
      len: 2,
    },
  },
];

// 山
const sanMap: BlockType[] = [
  {
    map: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    info: {
      h: 3,
      b: 1,
      len: 3,
    },
  },
  {
    map: [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    info: {
      h: 3,
      l: 1,
      len: 3,
    },
  },

  {
    map: [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    info: {
      h: 3,
      t: 1,
      len: 3,
    },
  },
  {
    map: [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    info: {
      r: 1,
      h: 3,
      len: 3,
    },
  },
];

const blockMapInfos: { [k: string]: BlockType[] } = {
  longMap,
  lMap,
  rLMap,
  zMap,
  rZMap,
  tianMap,
  sanMap,
};

export default blockMapInfos;
