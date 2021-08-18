import maps from "./controlMap"
export const start = "control-start";
export const change = "control-change";
export const next = "control-next";
export const mask = "control-mask";
export const score = "control-score";
export const reset = "control-reset";
export const level = "control-level";
export const time = "control-time";

let uuid = 1
const mapsKeys = Object.keys(maps)
const getNewMap = function () {
    var i = Math.floor(Math.random() * mapsKeys.length)
    var site = maps[mapsKeys[i]];
    var b = site[0].info.b;
    var seat = b ? [4, b] : [4, 0];
    return {
        autoDown: true,
        index: 0,
        next: null,
        uuid: uuid++,
        seat,
        site
    }
}
const controlStartAction = () => {
    var payload = getNewMap()
    payload.next = getNewMap()
    return {
        type: start,
        payload
    }
}

//   Action
const controlChangeAction = (payload) => {
    return {
        type: change,
        payload
    }
}
// 方块  Action
const controlNextAction = (payload) => {
    return {
        type: next,
        payload: getNewMap()
    }
}
// 遮罩  Action
const maskAction = (payload) => {
    return {
        type: mask,
        payload: payload
    }
}
// 分数  Action
const scoreAction = (payload) => {
    return {
        type: score,
        payload: payload
    }
}
// 重置  Action
const resetAction = (payload) => {
    return {
        type: reset
    }
}
// 难度  Action
const levelAction = (payload) => {
    return {
        type: level,
        payload
    }
}
// 时长  Action
const changeTimeAction = (payload) => {
    return {
        type: time,
        payload
    }
}
export default {
    controlStartAction,
    controlChangeAction,
    controlNextAction,
    maskAction,
    scoreAction,
    resetAction,
    levelAction,
    changeTimeAction
}
