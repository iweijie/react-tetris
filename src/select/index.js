import { createSelector } from "reselect"


let siteMap = [];

const currentMap = state => state.map

const currentGrid = state => state.currentMap

const currentMask = state=>state.contorlMask



//  混合当前的 currentMap 到 Map 中
const mixMap = (map, currentMap,currentMask) => {
    let isTransform = true ;
    let collide = false;
    if (!currentMap || !currentMap.site || currentMask) return {
        map,
        isTransform,
        collide
    };
    let { index, seat, site, autoDown } = currentMap;
    if (!autoDown) return {
        map,
        isTransform,
        collide
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
                collide
            }

        }
        newMap.splice(line, 1, arr)
    }
    siteMap = newMap
    return {
        map:newMap,
        isTransform,
        collide
    }
}
export const nextMap = createSelector(
    currentMap,
    currentGrid,
    currentMask,
    mixMap
)