import {
	noop,
	isEmpty,
	isObject,
	includes,
	forEach,
	cloneDeep,
	findIndex,
	findLastIndex
} from "lodash";
import getNewBlock from "@/utils/blockMaps";
import { store, reducers } from "../store";
import {
	cHeight,
	cWidth,
	Running,
	Stop,
	Initially,
	RedList,
	CompleteList,
	PlainList,
	ScoreList,
	LevelList,
	createMap
} from "@/utils/const";
import { engine } from "@/utils/index";

export class Control {
	constructor() {
		//  控制下落
		this.downTime = 0;
		// this.diedState = false;
		// 动画标识
		// this.isAnimate = false;
		// 暂停
		this.stop = null;
		// 更新时间
		this.updateTime = 0;
		// 控制下落速度
		this.speed = 100;
		this.currentLevel = 100;
	}

	setStoreData(payload) {
		if (!isObject(payload)) return;
		console.log("payload：", payload);
		reducers.block.setStore(payload);
	}

	getStoreData() {
		const storeData = store.getState();
		return storeData.block;
	}

	init() {
		this.setLevel();
	}

	setLevel = () => {
		const { level } = this.getStoreData();
		// this.speed = LevelList[level];
		this.speed = 1000;
	};

	start() {
		const { status, time } = this.getStoreData();
		if (status === Running) return;
		this.init();
		const startTime = status === Stop ? Date.now() - time : Date.now();
		this.setStoreData({
			startTime
		});
		this.stop = engine(this.running.bind(this));
		return this.stop;
	}
	stop() {}

	running() {
		const { isAnimation } = this.getStoreData();
		if (isAnimation) return;
		// 下落
		this.down();
		// 设置时间
		// this.setTime();
	}

	down() {
		const store = this.getStoreData();
		// this.downTime++;
		// if (this.speed > this.downTime) return;
		// this.downTime = 0;
		// if (this.isGameOver()) {
		// 	debugger;
		// 	this.gameOverHandle();
		// 	return;
		// }
		// 判断是否能下落
		if (!this.canDown()) {
			// 不能下落就合并到 map
			this.merge();
			return;
		}
		// 能就 下落一格
		this.setStoreData({
			blockCoord: [store.blockCoord[0], store.blockCoord[1] + 1]
		});
	}
	// 快速下落
	fastDown() {
		this.speed = 1;
	}
	// 取消快速下洛
	cancelFastDown() {
		const { level } = this.getStoreData();
		this.speed = LevelList[level];
	}

	isGameOver() {
		const { blockInfo, blockCoord } = this.getStoreData();
		const [left, top] = blockCoord;
		const { t, b, len } = blockInfo;
		return top + t <= 0;
	}

	async gameOverHandle() {
		// this.stop();
		this.setStoreData({
			block: []
		});
		await this.gameOverAnimate();

		this.setStoreData({
			map: createMap()
		});
	}

	// 死亡动画
	gameOverAnimate = () => {
		const { map } = this.getStoreData();
		// CompleteList,
		// PlainList,
		let timerId;
		let index = cHeight - 1;
		return new Promise(resolve => {
			timerId = setInterval(() => {
				map[index] = CompleteList;
				this.setStoreData({
					map: [...map]
				});
				index--;
				if (index < 0) {
					clearInterval(timerId);
					index = 0;
					timerId = setInterval(() => {
						map[index] = PlainList;
						this.setStoreData({
							map: [...map]
						});
						index++;
						if (index >= cHeight) {
							clearInterval(timerId);
							resolve();
						}
					}, 40);
				}
			}, 40);
		});
	};
	// 判断是否能下落
	canDown() {
		const { block, blockInfo, blockCoord, map } = this.getStoreData();
		const { t, b, l, r, len, h } = blockInfo;
		let [left, top] = blockCoord;

		// 是否到底部
		if (top + h - b >= cHeight) return false;

		// 将当前 坐标高度 + 1 ； 看是否有与其他项重合， 有则不能下落； 无即可下落
		top += 1;
		// x： 横坐标； y： 纵坐标；
		// top + t  缩小循环范围 ；
		for (let y = top + t; y < top + h - b; y++) {
			for (let x = left + l; x < left + len - r; x++) {
				if (map[y][x] === 1 && block[y - top][x - left] === 1) return false;
			}
		}
		return true;
	}
	// 将当前移动块 合并到 map 中
	async merge() {
		let {
			block,
			blockInfo,
			blockCoord,
			map,
			nextBlock,
			score,
			completeIndexList
		} = this.getStoreData();
		const { t, b, l, r, len, h } = blockInfo;
		let [left, top] = blockCoord;
		// 合并
		// x： 横坐标； y： 纵坐标；
		// top + t  缩小循环范围 ；
		for (let y = top + t; y < top + h - b; y++) {
			for (let x = left + l; x < left + len - r; x++) {
				if (block[y - top][x - left]) {
					map[y][x] = block[y - top][x - left];
				}
			}
		}
		// 获取完成项的索引列表
		const indexList = this.getCompleteIndexList(map);
		if (!isEmpty(indexList)) {
			// 加分
			score += ScoreList[indexList.length];

			this.setStoreData({
				completeIndexList: indexList,
				isAnimation: true,
				map,
				block: []
			});
			// 动画动作 预计 900ms
			await new Promise(resolve => {
				setTimeout(resolve, 900);
			});
			// 移除 已完成的项
			forEach(indexList, index => {
				map[index] = null;
			});
			map = map.filter(Boolean);

			forEach(indexList, index => {
				map.unshift(PlainList);
			});
		}

		this.setStoreData({
			...nextBlock,
			map: cloneDeep(map),
			nextBlock: getNewBlock(),
			score,
			isAnimation: false,
			completeIndexList: []
		});
	}
	// 获取完成项的 index
	getCompleteIndexList(map) {
		const indexList = [];
		forEach(map, (item, key) => {
			if (!includes(item, 0)) {
				indexList.push(key);
			}
		});
		return indexList;
	}
	// 左右移动  0：左； 1：右；
	move(direction) {
		const { blockCoord } = this.getStoreData();
		let [left, top] = blockCoord;
		if (!direction && this.canLeftMove()) {
			// 左移一格
			this.setStoreData({
				blockCoord: [left - 1, top]
			});
		} else if (direction && this.canRightMove()) {
			// 右移一格
			this.setStoreData({
				blockCoord: [left + 1, top]
			});
		}
	}
	// 检测是否能左平移
	canLeftMove() {
		const { block, blockInfo, blockCoord, map } = this.getStoreData();
		const { t, b, l, r, len, h } = blockInfo;
		let [left, top] = blockCoord;
		// 设置边界，不能够超出
		if (left + l - 1 < 0) return false;
		for (let y = top + t; y <= top + h - b; y++) {
			const index = findIndex(map[y], Boolean);
			if (index === -1) continue;
			const x = left + index;
			if (map[y][x - 1]) return false;
		}
		return true;
	}
	// 检测是否能左平移
	canRightMove() {
		const { block, blockInfo, blockCoord, map } = this.getStoreData();
		const { t, b, l, r, len, h } = blockInfo;
		let [left, top] = blockCoord;
		// 设置边界，不能够超出
		if (left + len - r + 1 > cWidth) return false;
		for (let y = top + t; y <= top + h - b; y++) {
			const index = findLastIndex(map[y], Boolean);
			if (index === -1) continue;
			const x = left + index;
			if (map[y][x + 1]) return false;
		}
		return true;
	}
	// 变换
	transform = () => {
		const {
			blockIndex,
			blockInfo,
			blockCoord,
			map,
			blockSite
		} = this.getStoreData();
		const { t, b, l, r, len, h } = blockInfo;
		let [left, top] = blockCoord;
		// 判断当前块所处范围类是否 在 map中有显示的小方块（也就是是否包含有1 的值），没有即可变换
		for (let y = top; y <= top + h; y++) {
			if (y < 0) continue;
			for (let x = left; x < left + len; x++) {
				if (map[y][x] === undefined || map[y][x]) return;
			}
		}
		const index = (blockIndex + 1) % blockSite.length;

		// 设置移动块信息
		this.setStoreData({
			// blockCoord: [store.blockCoord[0], store.blockCoord[1] + 1]
			blockIndex: index,
			block: blockSite[index].map,
			blockInfo: blockSite[index].info
		});
	};

	// 提升等级
	updateLevel = next => {
		var { levelAction, contorllevel, contorltime } = next;
		var now = Date.now();
		if (now - contorltime - contorllevel * 60 * 1000 > 2 * 60 * 1000) {
			levelAction(++contorllevel);
		}
	};

	decoratorHandle = fn => {
		let { maskAction, contorlMask } = this.props;
		let arr = [32, 37, 39, 38, 40];
		return e => {
			if (!arr.includes(e.keyCode)) return;
			if (!this.stop) {
				if (contorlMask) {
					maskAction(false);
				}
				this.start();
			} else {
				fn(e);
			}
		};
	};

	// 控制键盘事件
	keyFlag = true;
	keydownHandle = e => {
		if (!this.keyFlag) return;
		this.keyFlag = false;
		switch (e.keyCode) {
			case 32:
				this.speed = 1;
				return;
			case 37:
				return this.translation(1);
			case 39:
				return this.translation(-1);
			case 38:
				return this.transform();
			case 40:
				this.speed = 1;
				return;
			default:
				return;
		}
	};
	keyupHandle = e => {
		this.keyFlag = true;
		switch (e.keyCode) {
			case 32:
				this.speed = this.currentLevel;
				return;
			case 40:
				this.speed = this.currentLevel;
				return;
			default:
				return;
		}
	};
	reStart = () => {
		this.props.restartAction();
	};
}

export default new Control();
