import maps from "./controlMap"
export const start = "control-start";
export const change = "control-change";
export const next = "control-next";

const mapsKeys = Object.keys(maps)
const getNewMap = function(){
    var i = Math.floor(Math.random()*7)
    var site = maps[mapsKeys[i]];
    var b = site[0].info.b;
    var seat = b ? [4,b]:[4,0];
    return  {
        autoDown:true,
        index:0,
        next:null,
        seat,
        site
    }
}
const controlStartAction = ()=>{
    var payload = getNewMap()
    payload.next = getNewMap()
    return {
        type:start,
        payload
    }
}

const controlChangeAction = (payload)=>{
    return {
        type:change,
        payload
    }
}
const controlNextAction = (payload)=>{
    return {
        type:next,
        payload:getNewMap()
    }
}

export default { 
    controlStartAction,
    controlChangeAction,
    controlNextAction
}
 