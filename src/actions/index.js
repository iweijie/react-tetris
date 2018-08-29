/**
*作者: weijie
*功能描述: action 集合
*/
import controlAction from "./controlAction"
export const setInfo = "setInfo"
export const setOldInfo = "setOldInfo"

const setAction = (payload)=>{
    return {
        type:setInfo,
        payload
    }
} 

const actions = {
    setAction,
    ...controlAction,
}

export default actions




