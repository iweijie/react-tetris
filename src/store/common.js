import { getStore, setStore, createMap } from "@/utils/index";

export default {
	namespace: "common",
	state: {
		//运行状态： init:0; running:1;  stop:2;
		status: 0,
		// 等级
		level: 1,
		// 历史最高分，init 状态显示
		topScore: 0,
		// 当前分数，running，stop 状态显示
		score: 0,
		// 地图
		map: createMap(),
		startTime: 0,
		time: 0
	},
	reducers: {
		handleChangeWindowState({ state, rootState }, payload) {
			// return {
			// 	...state,
			// 	windowState: payload
			// };
		},
		handleChangeHistoryState({ state, rootState }) {
			// return {
			// 	...state,
			// 	historyState: payload
			// };
		}
	},
	effects: {
		async login({ call, put, state, rootState }, payload) {
			// let userInfo = getStore('userInfo');
			// if (!userInfo) {
			// 	payload = { phone: 18620813846, password: 'zrf9520' };
			// 	userInfo = await requestMap.requestLogin(payload);
			// 	setStore('userInfo', userInfo);
			// }
			// put('common/userInfo', userInfo);
			// return userInfo;
		}
	}
};
