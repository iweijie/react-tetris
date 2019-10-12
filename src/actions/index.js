/**
*作者: weijie
*功能描述: action 集合
*/
import controlAction from "./controlAction"
export const setInfo = "setInfo"
export const setOldInfo = "setOldInfo"
export const restart = "restart"
const setAction = (payload) => {
    return {
        type: setInfo,
        payload
    }
}


const restartAction = (payload) => {
    return {
        type: restart
    }
}


const actions = {
    setAction,
    restartAction,
    ...controlAction,
}

export default actions




