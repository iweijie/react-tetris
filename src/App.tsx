import React, { Component } from "react";
import produce from "immer";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import type { Timer, mergeType } from "./type";
import { nextMap, NextMapType } from "./select";
import Tetris from "./components/Tetris";
import Control from "./components/Control";
import "./index.css";

import actions, { ActionsType } from "./sage/actions";
import { MapType } from "./type";

type AppStateProps = {
  map: RootStore["map"]["map"];
  currentMap: RootStore["control"]["currentMap"];
  controltime: number;
  controlMask: boolean;
  controlscore: number;
  controllevel: number;
  nextMap: NextMapType;
};

type AppProps = mergeType<AppStateProps, ActionsType>;

class App extends Component<AppProps> {
  state = {
    // 1  PC  0 移动
    isPC: 1,
    style: {
      paddingTop: "101px",
      paddingBottom: "59px",
      marginTop: "-569px",
      transform: "scale(0.8)",
    },
  };
  diedState = false;
  redArr = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
  completeArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  plainArr = () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // 加分项
  scoreMap = [0, 1, 3, 6, 10];
  // 等级项
  levelMap = [0, 100, 80, 60, 45, 30, 20];
  // 动画标识
  isAnimate = false;
  // 暂停
  stop: null | (() => void) = null;
  // 更新时间
  updateTime = 0;
  // 控制下落速度
  speed = 100;
  currentLevel = 100;
  time = 0;

  // 碰撞检测函数
  handleCollide = (map: MapType) => {
    const { controlNextAction, setAction, controlChangeAction } = this.props;
    this.speed = this.currentLevel;
    controlChangeAction({
      autoDown: false,
    });
    if (this.isGameOver()) {
      return this.gameOver();
    }
    let componentIndexList = this.isComplete(map);
    if (!isEmpty(componentIndexList)) {
      if (typeof this.stop === "function") {
        this.stop();
      }
      this.completeAnimate(map, componentIndexList).then(() => {
        this.start();
        this.complete(map, componentIndexList);
      });
      return;
    }

    setAction(map);
    controlNextAction();
  };
  // 完结动画
  gameOver = () => {
    const { controlStartAction, maskAction } = this.props;
    if (this.diedState) return;
    this.isAnimate = true;
    this.stop && this.stop();
    this.diedState = true;
    this.gameOverAnimate().then(() => {
      this.isAnimate = false;
      maskAction(true);
      controlStartAction();
    });
  };
  // 检测是否有已完成的
  isComplete = (map: MapType): number[] => {
    let arr = [];
    for (let i = 0; i < map.length; i++) {
      if (!map[i].includes(0)) {
        arr.push(i);
      }
    }
    return arr;
  };
  // 是否GG
  isGameOver = () => {
    let { currentMap } = this.props;
    let { index, seat, site } = currentMap;
    let { info } = site[index];
    let bottom = seat[1];
    let { t = 0, b = 0, len } = info;
    return len - t - b >= bottom;
  };
  // 死亡动画
  gameOverAnimate = () => {
    let { map, setAction } = this.props;
    let len = map.length - 1,
      i = len,
      timerId: Timer,
      newmap = map;
    return new Promise((resolve) => {
      timerId = setInterval(() => {
        newmap = [...newmap];
        newmap[i] = this.completeArr;
        setAction(newmap);
        i--;
        if (i < 0) {
          clearInterval(timerId);
          i = 0;
          timerId = setInterval(() => {
            newmap = [...newmap];
            newmap[i] = this.plainArr();
            setAction(newmap);
            i++;
            if (i > len) {
              clearInterval(timerId);
              resolve(void 0);
            }
          }, 40);
        }
      }, 40);
    });
  };
  // 已完成动画
  completeAnimate = (map: MapType, arr: number[]) => {
    this.isAnimate = true;
    return new Promise((resolve) => {
      this.glitter(map, arr);
      setTimeout(() => {
        this.isAnimate = false;
        resolve(void 0);
      }, 900);
    });
  };
  // 完成事件
  complete = (map: MapType, arr: number[]) => {
    let { setAction, controlNextAction, scoreAction } = this.props;
    arr = arr.sort((a, b) => {
      return b - a;
    });
    arr.forEach((v) => {
      map.splice(v, 1);
    });
    arr.forEach((v) => {
      map.unshift(this.plainArr());
    });
    // 设置 map
    setAction(map);
    // 加分
    scoreAction(this.scoreMap[arr.length]);
    // 增加下一个
    controlNextAction();
  };
  // 闪烁
  glitter = (map: MapType, arr: number[]) => {
    let { setAction } = this.props;

    const newMap = produce(map, (draft) => {
      arr.forEach((v) => {
        draft[v] = this.redArr;
      });
    });
    setAction(newMap);
  };
  delayed = 0;
  // 开始
  start = () => {
    if (this.stop || this.isAnimate) return;
    if (this.diedState) {
      this.diedState = false;
      let { resetAction } = this.props;
      resetAction();
    }
    let { controltime, changeTimeAction } = this.props;
    if (controltime === 0) {
      changeTimeAction(Date.now());
    } else if (this.delayed) {
      changeTimeAction(Date.now() - this.delayed);
      this.delayed = 0;
    }
    let flag = true;
    let { autoDown } = this;
    let callback: null | (() => void) = () => {
      this.updateTime++;
      if (this.updateTime >= 60) {
        this.updateTime = 0;
        this.setState({});
      }
      if (flag) {
        autoDown();
        if (callback) {
          requestAnimationFrame(callback);
        }
      } else {
        callback = null;
      }
    };
    requestAnimationFrame(callback);
    this.stop = () => {
      this.delayed = Date.now();
      flag = false;
      this.stop = null;
      this.setState({});
    };
  };
  decoratorHandle = (fn: (...arg: any[]) => any) => {
    let { maskAction, controlMask } = this.props;
    let arr = [32, 37, 39, 38, 40];
    return (e: KeyboardEvent) => {
      if (!arr.includes(e.keyCode)) return;
      if (!this.stop) {
        if (controlMask) {
          maskAction(false);
        }
        this.start();
      } else {
        fn(e);
      }
    };
  };

  selfStarting = () => {
    let { maskAction, controlMask } = this.props;
    if (!this.stop) {
      if (controlMask) {
        maskAction(false);
      }
      this.start();
    }
  };
  // 变换
  transform = () => {
    var { isTransform } = this.props.nextMap;
    if (!isTransform) return;
    let { currentMap, controlChangeAction } = this.props;
    let { index, site, seat } = currentMap;
    let [left, bottom] = seat;
    let info = site[index].info;
    if (left < 0 || left + info.len > 10) return;
    if (bottom > 19) return;
    if (index + 1 >= site.length) {
      index = 0;
    } else {
      index += 1;
    }
    controlChangeAction({
      index,
    });
  };
  // 平移 flag  1 左； -1 右
  translation = (flag = 1 | -1) => {
    let { currentMap, controlChangeAction, nextMap } = this.props;
    let { isTranslationLeft, isTranslationRight } = nextMap;
    let { index, site, seat } = currentMap;
    let { info } = site[index];
    let [left] = seat;
    let newLeft;
    if (flag === 1) {
      if (!isTranslationLeft) return;
      if (left > 0 || -(info.l || 0) < left) {
        newLeft = left - 1;
      }
    } else {
      if (!isTranslationRight) return;
      if (left < 10 - info.len || 10 > left + info.len - (info.r || 0)) {
        newLeft = left + 1;
      }
    }
    if (newLeft !== undefined) {
      controlChangeAction({
        seat: [newLeft, seat[1]],
      });
    }
  };

  autoDown = () => {
    this.time++;
    if (this.time < this.speed) return;
    this.down();
  };
  down = () => {
    this.time = 0;
    let { currentMap, controlChangeAction, nextMap } = this.props;
    let { index, site, seat, autoDown } = currentMap;
    if (!autoDown) return;
    let { info } = site[index];
    let top = seat[1];
    let bottom = info.b || 0;
    if (top - Number(bottom) < 19) {
      controlChangeAction({
        seat: [seat[0], top + 1],
      });
    } else {
      this.handleCollide(nextMap.map);
    }
  };
  // 提升等级
  // updateLevel = (next) => {
  //   var { levelAction, controllevel, controltime } = next;
  //   var now = Date.now();
  //   if (now - controltime - controllevel * 60 * 1000 > 2 * 60 * 1000) {
  //     levelAction(++controllevel);
  //   }
  // };
  isDeviceTypePc = () => {
    return !/Android|webOS|iPhone|iPod|BlackBerry/i.test(
      window.navigator.userAgent
    );
  };
  componentDidMount() {
    document.addEventListener(
      "keydown",
      this.decoratorHandle(this.keydownHandle)
    );
    document.addEventListener("keyup", this.keyupHandle);
    var { controlStartAction, controllevel } = this.props;
    this.speed = this.currentLevel = this.levelMap[controllevel];
    controlStartAction();
    if (!this.isDeviceTypePc()) {
      this.setState({
        isPC: 0,
        style: { ...this.state.style, transform: "scale(1)" },
      });
    }
  }
  componentWillReceiveProps(next: AppProps) {
    if (next.controllevel !== this.props.controllevel) {
      this.speed = this.currentLevel = this.levelMap[next.controllevel];
    }
  }
  componentDidUpdate() {
    this.updateTime = 0;
    var { collide, map } = this.props.nextMap;
    if (collide) {
      this.handleCollide(map);
    }
  }
  // 控制键盘事件
  keyFlag = true;
  keydownHandle = (e: KeyboardEvent) => {
    if (!this.keyFlag) return;
    this.keyFlag = false;
    switch (e.keyCode) {
      case 32:
        this.speed = 1;
        return;
      case 37:
        return this.translation(1);
      case 39:
        return this.translation(-1);
      case 38:
        return this.transform();
      case 40:
        this.speed = 1;
        return;
      default:
        return;
    }
  };
  keyupHandle = (e: KeyboardEvent) => {
    this.keyFlag = true;
    switch (e.keyCode) {
      case 32:
        this.speed = this.currentLevel;
        return;
      case 40:
        this.speed = this.currentLevel;
        return;
      default:
        return;
    }
  };

  reStart = () => {
    this.props.restartAction();
  };
  render() {
    let {
      stop,
      translation,
      down,
      transform,
      decoratorHandle,
      selfStarting,
      gameOver,
    } = this;
    let {
      currentMap,
      nextMap,
      controlMask,
      controlscore,
      controltime,
      controllevel,
    } = this.props;
    let time;
    if (controltime) {
      time = Date.now() - controltime;
    } else {
      time = 0;
    }
    return (
      <div className="wrap" style={this.state.style}>
        <Tetris
          time={time}
          level={controllevel}
          score={controlscore}
          isMask={controlMask}
          currentMap={currentMap}
          map={nextMap.map}
        />
        <Control
          currentMap={currentMap}
          down={down}
          stop={stop}
          start={selfStarting}
          restart={gameOver}
          transform={transform}
          translation={translation}
        />
      </div>
    );
  }
}

const mapStateToProps = (store: RootStore, ownProps: any) => {
  return {
    nextMap: nextMap(store),
    map: store.map.map,
    controlMask: store.control.controlMask,
    currentMap: store.control.currentMap,
    controlscore: store.control.controlscore,
    controllevel: store.control.controllevel,
    controltime: store.control.controltime,
    ...ownProps,
  };
};

export default connect(mapStateToProps, actions)(App);
