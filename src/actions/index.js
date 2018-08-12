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
const setOldAction = (payload)=>{
    return {
        type:setOldInfo,
        payload
    }
} 

const actions = {
    setAction,
    setOldAction,
    ...controlAction,
}

export default actions




