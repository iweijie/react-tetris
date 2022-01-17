import blockMapInfos from "../constans/block";
import { NextBlockMapInfoType } from "../type";

const blockInfoList = Object.keys(blockMapInfos).map(
  (key) => blockMapInfos[key]
);
const { length } = blockInfoList;
let uuid = 1;

/**
 * 获取下一个方块的信息
 * @returns
 */
const getNextBlockMapInfo = function (): NextBlockMapInfoType {
  const i =
    Math.floor(
      Math.random() * length +
        Math.random() * length +
        Math.random() * length +
        Math.random() * length
    ) % length;
  const site = blockInfoList[i];
  const b = site[0].info.b;
  const seat = b ? [4, b] : [4, 0];
  return {
    autoDown: true,
    index: 0,
    next: null,
    uuid: uuid++,
    seat,
    site,
  };
};

export default getNextBlockMapInfo;
