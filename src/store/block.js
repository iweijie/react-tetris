import getNewBlock from "@/utils/blockMaps";
import { createMap } from "@/utils/const";
import { cloneDeep, isObject } from "lodash";

export default {
	namespace: "block",
	state: {
		//运行状态： init:0; running:1;  stop:2;
		status: 2,
		// 等级
		level: 1,
		// 历史最高分，init 状态显示
		topScore: 0,
		// 当前分数，running，stop 状态显示
		score: 0,
		// 地图
		map: createMap(),
		// 完成索引
		completeIndexList: [],
		startTime: 0,
		time: 0,
		// 动画进行中的一个标识，
		isAnimation: false,
		// 记录当前 移动块 的索引 （blockMaps里面某一项数组，里面的一项的索引）；用于变换
		blockIndex: 0,
		// 当前 移动块；
		block: [],
		// 当前 移动块 信息；
		blockInfo: {},
		// 下一项的引用； 和当前state 保持一致
		nextBlock: getNewBlock(),
		// 用于记录当前 移动块 所处的 坐标（以当前块 左上角坐标为基准）
		blockCoord: [],
		// blockMaps 的 某一项引用
		blockSite: {},
		...getNewBlock(),
		// blockCoord: [4,2],
		
	},
	reducers: {
		setStore({ state, rootState }, payload) {
			if (!isObject(payload)) return state;
			return {
				...state,
				...payload
			};
		}
	},
	effects: {
		// async completeAimation({ call, put, state, rootState }, completeIndexList) {
		// 	const {map} = state;
		// 	const clone = cloneDeep(map)
		// 	call('block/setStore',{
		// 		map:
		// 	})
		// }
	}
};
