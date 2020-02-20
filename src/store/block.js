import { getStore, setStore, createMap } from "@/utils/index";
import blockMaps from "@/utils/blockMaps";
import config from "@/config";
import { cloneDeep } from "lodash";

const mapsKeys = Object.keys(blockMaps);

const getNewMap = function() {
	const i = Math.floor(Math.random() * mapsKeys.length);
	const site = blockMaps[mapsKeys[i]];
	return {
		autoDown: true,
		index: 0,
		block: site[0],
		next: null,
		seat: [4, site[0].info.b],
		site
	};
};

export default {
	namespace: "block",
	state: {
		autoDown: true,
		// 记录当前 移动块 的索引 （blockMaps里面某一项数组，里面的一项的索引）；用于变换
		index: 0,
		// 当前 移动块；
		block: {},
		// 下一项的引用； 和当前state 保持一致
		next: {},
		// 用于记录当前项所处在的位子
		seat: [],
		// blockMaps 的 某一项引用
		site: {},
		...getNewMap()
	},
	reducers: {},
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
