/* eslint-disable no-loop-func */
import { createSelector } from "reselect";
import { get, set, forEach } from "lodash";
import { MapType, BlockType } from "../type";

let siteMap: MapType = [];

const currentMap = (state: RootStore) => state.map;

const currentGrid = (state: RootStore) => state.control.currentMap;

const currentMask = (state: RootStore) => state.control.controlMask;

type ReturnCurrentGridType = ReturnType<typeof currentGrid>;

// map  当前图
// now  当前移动块
// info 当前移动块信息
// seat 当前移动块位置
const isTranslation = (
  map: MapType,
  now: MapType,
  info: BlockType["info"],
  seat: number[]
) => {
  let [l = 0, b = 0] = seat;
  let isTranslationLeft = true;
  let isTranslationRight = true;
  let len = now.length,
    i = 0;

  for (; i < len; i++) {
    let height = b - (len - i - 1);
    if (!now[i].includes(1) || height < 0 || height > 19) continue;
    let start = now[i].indexOf(1);
    let end = now[i].lastIndexOf(1);
    let arr = map[height];

    if (arr[l + start - 1] === 1) {
      isTranslationLeft = false;
    }
    if (arr[l + end + 1] === 1) {
      isTranslationRight = false;
    }
  }
  return {
    isTranslationLeft,
    isTranslationRight,
  };
};

type MixMapType = {
  map: MapType;
  isTransform: boolean;
  collide: boolean;
  isTranslationLeft: boolean;
  isTranslationRight: boolean;
};

//  混合当前移动块 到 Map 中
const mixMap = (
  map: MapType,
  currentMap: ReturnCurrentGridType,
  currentMask: boolean
): MixMapType => {
  // 是否能够变换
  let isTransform = true;
  // 是否碰撞
  let collide = false;
  // 是否能够左平移
  // let isTranslationLeft = true;
  // 是否能够右平移
  // let isTranslationRight = true;

  let { index, seat, site, autoDown } = currentMap;

  if (!autoDown || !currentMap || !currentMap.site || currentMask)
    return {
      map,
      isTransform,
      collide,
      isTranslationLeft: false,
      isTranslationRight: false,
    };

  let newMap = [...map];
  let now = site[index].map;
  let info = site[index].info;
  let len = now.length - 1;
  let [l, t] = seat;
  let showArr: { line: number; value: number[] }[] = [];
  now.forEach((v, k) => {
    let s = t - len + k;
    if (s >= 0) {
      showArr.push({
        line: s,
        value: v,
      });
    }
  });
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
          isTransform = false;
          if (value[k] === 1) {
            collide = true;
          }
        }
        return value[k] || val;
      });
      arr.splice(l, 0, ...newspliceArr);
    } else {
      let abs = Math.abs(l);
      let len = info.len - abs;
      spliceArr = arr.splice(0, len);
      let newspliceArr = spliceArr.map((val, k) => {
        if (val === 1) {
          isTransform = false;
          if (value[k + abs] === 1) {
            collide = true;
          }
        }
        return value[k + abs] || val;
      });
      arr.splice(0, 0, ...newspliceArr);
    }
    if (collide) {
      return {
        map: siteMap,
        isTransform,
        collide,
        isTranslationLeft: false,
        isTranslationRight: false,
      };
    }
    newMap.splice(line, 1, arr);
  }
  let isTranslationInfo = isTranslation(map, now, info, seat);
  siteMap = newMap;
  return {
    map: newMap,
    isTransform,
    collide,
    ...isTranslationInfo,
  };
};

export const nextMap = createSelector(
  currentMap,
  currentGrid,
  currentMask,
  mixMap
);

export type NextMapType = ReturnType<typeof nextMap>;
