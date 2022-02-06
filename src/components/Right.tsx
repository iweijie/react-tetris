import React, { FC, useMemo } from "react";
import { map } from "lodash";
import { classMap } from "../constans/common";

const getScoreCom = (num: number): string[] => {
  const arr = String(num).split("");
  while (arr.length < 6) {
    arr.unshift("10");
  }
  return arr.map((v) => classMap[Number(v)]);
};

const getTimeCom = (time: number) => {
  var difference = Math.round(time / 1000);
  var minute = Math.floor(difference / 60);
  var second = difference % 60;
  var arr = [];
  if (minute < 10) {
    arr.push(0, minute);
  } else {
    arr.push(Math.floor(minute / 10), minute % 10);
  }
  arr.push(12);
  if (second < 10) {
    arr.push(0, second);
  } else {
    arr.push(Math.floor(second / 10), second % 10);
  }
  return arr.map((v) => classMap[Number(v)]);
};

const Right: FC<any> = (props) => {
  let { currentMap, score, time, level } = props;
  let next = currentMap.next;

  const Score = useMemo(() => {
    return (
      <div className="iHKP">
        {getScoreCom(score).map((v, k) => {
          return <span className={v} key={k}></span>;
        })}
      </div>
    );
  }, [score]);

  const Time = useMemo(() => {
    return (
      <div className="iHKP">
        {getTimeCom(time).map((v, k) => {
          return <span className={v} key={k}></span>;
        })}
      </div>
    );
  }, [time]);

  const Next = useMemo(() => {
    if (next) {
      let { index, site } = next;
      let { map: list, info } = site[index];
      let { b, len } = info;
      b = b || 0;
      let l = len - b - 1;
      return (
        <div className="_3Wmt">
          <div>
            {map(list[l - 1], (v, k) => {
              if (v) {
                return <b key={k} className="c"></b>;
              }
              return <b key={k}></b>;
            })}
          </div>
          <div>
            {map(list[l], (v, k) => {
              if (v) {
                return <b key={k} className="c"></b>;
              }
              return <b key={k}></b>;
            })}
          </div>
        </div>
      );
    }

    return <div className="_3Wmt"></div>;
  }, [next]);

  return (
    <div className="_1deS">
      <div>
        <p>最高分</p>
        {Score}
      </div>
      <p>起始行</p>
      <div className="iHKP">
        <span className="bg _2kln"></span>
        <span className="bg _2kln"></span>
        <span className="bg _2kln"></span>
        <span className="bg _2kln"></span>
        <span className="bg _2kln"></span>
        <span className="bg _2hru"></span>
      </div>
      <p>级别</p>
      <div className="iHKP">
        <span className={classMap[level]}></span>
      </div>
      <p>下一个</p>
      {Next}
      <div className="_8hag">
        <div className="bg EHci"></div>
        <div className="bg _37mu"></div>
        {Time}
      </div>
    </div>
  );
};

export default Right;
