import React, { FC, Component } from "react";

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

class App extends Component {
  //   constructor (props) {
  //     super(props)
  //   }
  componentWillMount() {}
  componentWillUnmount() {}
  // 01234567890；10-灰色8；11-灰色：; 12-：;
  classMap = [
    "bg _2hru",
    "bg _2B-l",
    "bg ShGQ",
    "bg _2V1K",
    "bg _3bYF",
    "bg _1Z7B",
    "bg _1-BZ",
    "bg _3_id",
    "bg _3_Z_",
    "bg bNJM",
    "bg _2kln",
    "bg hOfM",
    "bg _2tuY",
  ];

  getScoreCom = (num) => {
    let arr = String(num).split("");
    while (arr.length < 6) {
      arr.unshift(10);
    }
    return arr.map((v) => this.classMap[Number(v)]);
  };
  getTimeCom = (time) => {
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
    return arr.map((v) => this.classMap[Number(v)]);
  };
  render() {
    let { currentMap, score, time, level } = this.props;
    let next = currentMap.next;

    let nextCom;
    if (next) {
      let { index, site } = next;
      let { map, info } = site[index];
      let { b, len } = info;
      b = b || 0;
      let l = len - b - 1;
      nextCom = (
        <div className="_3Wmt">
          <div>
            {map[l - 1].map((v, k) => {
              if (v) {
                return <b key={k} className="c"></b>;
              }
              return <b key={k}></b>;
            })}
          </div>
          <div>
            {map[l].map((v, k) => {
              if (v) {
                return <b key={k} className="c"></b>;
              }
              return <b key={k}></b>;
            })}
          </div>
        </div>
      );
    } else {
      nextCom = <div className="_3Wmt"></div>;
    }
    const content = (
      <div className="_1deS">
        <div>
          <p>最高分</p>
          <div className="iHKP">
            {this.getScoreCom(score).map((v, k) => {
              return <span className={v} key={k}></span>;
            })}
          </div>
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
          <span className={this.classMap[level]}></span>
        </div>
        <p>下一个</p>
        {nextCom}
        <div className="_8hag">
          <div className="bg EHci"></div>
          <div className="bg _37mu"></div>
          <div className="iHKP">
            {this.getTimeCom(time).map((v, k) => {
              return <span className={v} key={k}></span>;
            })}
          </div>
        </div>
      </div>
    );

    return content;
  }
}

export default App;

const Right: FC<{}> = (props) => {
  let { currentMap, score, time, level } = props;
  let next = currentMap.next;

  let nextCom;
  if (next) {
    let { index, site } = next;
    let { map, info } = site[index];
    let { b, len } = info;
    b = b || 0;
    let l = len - b - 1;
    nextCom = (
      <div className="_3Wmt">
        <div>
          {map[l - 1].map((v, k) => {
            if (v) {
              return <b key={k} className="c"></b>;
            }
            return <b key={k}></b>;
          })}
        </div>
        <div>
          {map[l].map((v, k) => {
            if (v) {
              return <b key={k} className="c"></b>;
            }
            return <b key={k}></b>;
          })}
        </div>
      </div>
    );
  } else {
    nextCom = <div className="_3Wmt"></div>;
  }

  return (
    <div className="_1deS">
      <div>
        <p>最高分</p>
        <div className="iHKP">
          {getScoreCom(score).map((v, k) => {
            return <span className={v} key={k}></span>;
          })}
        </div>
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
      {nextCom}
      <div className="_8hag">
        <div className="bg EHci"></div>
        <div className="bg _37mu"></div>
        <div className="iHKP">
          {getTimeCom(time).map((v, k) => {
            return <span className={v} key={k}></span>;
          })}
        </div>
      </div>
    </div>
  );
};
