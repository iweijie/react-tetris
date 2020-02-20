import { get } from "lodash";

/*
 * map
 * 0 为空
 * 1 为移动块显示的小方块
 *
 * 二维数组为 当前移动块可变换的最小所需空间
 */
/*
 * info 详情
 *   h 二维数组高度
 *   len 二维数组长度
 *   l 左侧空格行数
 *   r 右部空格行数
 *   t 顶部空格行数
 *   b 底部空格行数
 */
// 当前控制的模块
// long
const longMap = [
	{
		map: [
			[0, 0, 0, 0],
			[1, 1, 1, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],
		info: {
			h: 4,
			t: 1,
			b: 2,
			len: 4
		}
	},
	{
		map: [
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0]
		],
		info: {
			h: 4,
			l: 1,
			r: 2,
			len: 4
		}
	}
];

// L
const lMap = [
	{
		map: [
			[1, 0, 0],
			[1, 1, 1],
			[0, 0, 0]
		],
		info: {
			h: 3,
			b: 1,
			len: 3
		}
	},
	{
		map: [
			[0, 1, 1],
			[0, 1, 0],
			[0, 1, 0]
		],
		info: {
			h: 3,
			l: 1,
			len: 3
		}
	},
	{
		map: [
			[0, 0, 0],
			[1, 1, 1],
			[0, 0, 1]
		],
		info: {
			h: 3,
			t: 1,
			len: 3
		}
	},
	{
		map: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 0]
		],
		info: {
			h: 3,
			r: 1,
			len: 3
		}
	}
];

// r L
const rLMap = [
	{
		map: [
			[0, 0, 1],
			[1, 1, 1],
			[0, 0, 0]
		],
		info: {
			h: 3,
			b: 1,
			len: 3
		}
	},
	{
		map: [
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 1]
		],
		info: {
			h: 3,
			l: 1,
			len: 3
		}
	},
	{
		map: [
			[0, 0, 0],
			[1, 1, 1],
			[1, 0, 0]
		],
		info: {
			h: 3,
			t: 1,
			len: 3
		}
	},
	{
		map: [
			[1, 1, 0],
			[0, 1, 0],
			[0, 1, 0]
		],
		info: {
			h: 3,
			r: 1,
			len: 3
		}
	}
];

// z
const zMap = [
	{
		map: [
			[0, 0, 0],
			[1, 1, 0],
			[0, 1, 1]
		],
		info: {
			h: 3,
			t: 1,
			len: 3
		}
	},
	{
		map: [
			[0, 1, 0],
			[1, 1, 0],
			[1, 0, 0]
		],
		info: {
			h: 3,
			r: 1,
			len: 3
		}
	}
];

// r z
const rZMap = [
	{
		map: [
			[0, 0, 0],
			[0, 1, 1],
			[1, 1, 0]
		],
		info: {
			h: 3,
			t: 1,
			len: 3
		}
	},
	{
		map: [
			[0, 1, 0],
			[0, 1, 1],
			[0, 0, 1]
		],
		info: {
			h: 3,
			l: 1,
			len: 3
		}
	}
];

// 田
const tianMap = [
	{
		map: [
			[1, 1],
			[1, 1]
		],
		info: {
			h: 2,
			len: 2
		}
	}
];

// 山
const sanMap = [
	{
		map: [
			[0, 1, 0],
			[1, 1, 1],
			[0, 0, 0]
		],
		info: {
			h: 3,
			b: 1,
			len: 3
		}
	},
	{
		map: [
			[0, 1, 0],
			[0, 1, 1],
			[0, 1, 0]
		],
		info: {
			h: 3,
			l: 1,
			len: 3
		}
	},

	{
		map: [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0]
		],
		info: {
			h: 3,
			t: 1,
			len: 3
		}
	},
	{
		map: [
			[0, 1, 0],
			[1, 1, 0],
			[0, 1, 0]
		],
		info: {
			r: 1,
			len: 3
		}
	}
];

const blockMaps = {
	longMap,
	lMap,
	rLMap,
	zMap,
	rZMap,
	tianMap,
	sanMap
};

// 补零
const zeroFillKeys = ["h", "len", "l", "r", "t", "b"];

Object.keys(blockMaps).forEach(key => {
	blockMaps[key].forEach(item => {
		zeroFillKeys.forEach(k => {
			if (item.info[k] !== undefined) return;
			item.info[k] = 0;
		});
	});
});

export default blockMaps;
