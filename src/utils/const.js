import { times } from "lodash";

export const cWidth = 10;
export const cHeight = 20;

// status
export const Running = 1;
export const Stop = 2;
export const Initially = 0;

export const RedList = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
export const CompleteList = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export const PlainList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// 加分项
export const ScoreList = [0, 1, 3, 6, 10];
// 等级项
export const LevelList = [0, 100, 80, 60, 45, 30, 20];

// 0 ： 无 ；  1 ： 有 ；2 ： 即将消失
export const createMap = () => {
	const initData = 0;
	const list = [];
	times(cHeight, index => {
		list[index] = [];
		times(cWidth, i => {
			list[index][i] = initData;
		});
	});
	return list;
};
