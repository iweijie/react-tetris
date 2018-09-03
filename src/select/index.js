import { createSelector } from "reselect"


let siteMap = [];

const currentMap = state => state.map

const currentGrid = state => state.currentMap

const currentMask = state=>state.contorlMask

// map  当前图
// now  当前移动块
// info 当前移动块信息
// seat 当前移动块位置
const isTranslation = (map,now,info,seat)=>{
    let [l,b] = seat
    let isTranslationLeft = true;
    let isTranslationRight = true;
    // console.log(now)
    // console.log(info)
    // console.log(seat)
    let len = now.length,i = 0;
    for(;i<len;i++){
        let height = b - (len -i - 1)
        if(!now[i].includes(1) || height < 0 || height > 19) continue ;
        let start = now[i].indexOf(1)
        let end = now[i].lastIndexOf(1)
        let arr = map[height]
        console.log(l,"l--------")
        console.log(start,"start--------")
        console.log(end,"end--------")
        console.log(arr,"arr--------")
        if(arr[l + start -1] === 1){
            isTranslationLeft = false
        }
        if(arr[l + end + 1] === 1){
            isTranslationRight = false
        }
    }
    return {
        isTranslationLeft,
        isTranslationRight
    }

}

//  混合当前的 currentMap 到 Map 中
const mixMap = (map, currentMap,currentMask) => {
    // 是否能够变换
    let isTransform = true ;
    // 是否碰撞
    let collide = false;
    // 是否能够左平移
    // let isTranslationLeft = true;
    // 是否能够右平移
    // let isTranslationRight = true;

    let { index, seat, site, autoDown } = currentMap;
    // console.log(currentMap,"111111111111")
    if (!autoDown || !currentMap || !currentMap.site || currentMask) return {
        map,
        isTransform,
        collide,
        isTranslationLeft:false,
        isTranslationRight:false,
    };
    
    let newMap = [...map];
    let now = site[index].map;
    let info = site[index].info;
    let len = now.length - 1;
    let [l, t] = seat;
    let showArr = [];
    now.forEach((v, k) => {
        let s = t - len + k
        if (s >= 0) {
            showArr.push({
                line: s,
                value: v
            })
        }
    })
    for (let i = 0; i < showArr.length; i++) {
        let v = showArr[i];
        let { line, value } = v;
        if (line >= 20) continue;
        let arr = [...newMap[line]];
        let spliceArr;
        if (l >= 0) {
            spliceArr = arr.splice(l, info.len);
            let newspliceArr = spliceArr.map((val, k) => {
                if (val === 1) {
                    isTransform = false
                    if (value[k] === 1) {
                        collide = true
                    }
                }
                return value[k] || val
            })
            arr.splice(l, 0, ...newspliceArr)
        } else {
            let abs = Math.abs(l);
            let len = info.len - abs;
            spliceArr = arr.splice(0, len);
            let newspliceArr = spliceArr.map((val, k) => {
                if (val === 1) {
                    isTransform = false
                    if (value[k + abs] === 1) {
                        collide = true
                    }
                }
                return value[k + abs] || val
            })
            arr.splice(0, 0, ...newspliceArr)

        }
        if (collide) {
            return {
                map:siteMap,
                isTransform,
                collide,
                isTranslationLeft:false,
                isTranslationRight:false,
            }

        }
        newMap.splice(line, 1, arr)
    }
    let isTranslationInfo = isTranslation(map,now,info,seat);
    console.log(isTranslationInfo,"1111111111111")
    siteMap = newMap
    return {
        map:newMap,
        isTransform,
        collide,
        ...isTranslationInfo
    }
}
export const nextMap = createSelector(
    currentMap,
    currentGrid,
    currentMask,
    mixMap
)