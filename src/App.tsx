import React, { Component } from "react";
import produce from "immer";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import type { Timer, mergeType } from "./type";
import { nextMap, NextMapType } from "./select";
import Tetris from "./components/Tetris";
import Control from "./components/Control";
import engine from "./utils/engine";
import "./index.css";

import actions, { ActionsType } from "./sage/actions";
import { MapType } from "./type";

type AppStateProps = {
  map: RootStore["map"];
  currentMap: RootStore["currentMap"];
  controlTime: number;
  controlMask: boolean;
  controlScore: number;
  controlLevel: number;
  nextMap: NextMapType;
};

type AppProps = mergeType<AppStateProps, ActionsType>;

type AppState = any;

// 检测是否有已完成的
const hasComplete = (map: MapType): number[] => {
  let arr = [];
  for (let i = 0; i < map.length; i++) {
    if (!map[i].includes(0)) {
      arr.push(i);
    }
  }
  return arr;
};
// 是否GG
const hasGameOver = (currentMap: AppStateProps["currentMap"]) => {
  let { index, seat, site } = currentMap;
  let { info } = site[index];
  let bottom = seat[1];
  let { t = 0, b = 0, len } = info;
  return len - t - b >= bottom;
};

const keyCodeList = [32, 37, 39, 38, 40];

class App extends Component<AppProps, AppState> {
  // down：正常下落； quick：快速下落；duang：一落到底
  downState: "down" | "quick" | "duang";
  /**
   * begin: 未开始
   * pause: 暂停中
   * running: 运行时
   * end: 已结束
   */
  gameState: "begin" | "pause" | "running" | "end";

  isGameOverAnimate: boolean;

  constructor(props: AppProps) {
    super(props);
    this.downState = "down";
    this.gameState = "begin";
    // 动画完结标识
    this.isGameOverAnimate = false;
    this.state = {
      // 1  PC  0 移动
      isPC: 1,
      style: {
        paddingTop: "101px",
        paddingBottom: "59px",
        marginTop: "-569px",
        transform: "scale(0.8)",
      },
    };
  }
  diedState = false;
  redArr = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
  completeArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  plainArr = () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // 加分项
  scoreMap = [0, 1, 3, 6, 10];
  // 等级项
  levelMap = [0, 100, 80, 60, 45, 30, 20];
  // 暂停
  stop: null | (() => void) = null;
  // 控制下落速度
  speed = 100;
  currentLevel = 100;
  time = 0;

  // 碰撞检测函数
  handleCollide = (map: MapType) => {
    const { controlNextAction, setAction, controlChangeAction, currentMap } =
      this.props;
    this.downState = "down";
    controlChangeAction({
      autoDown: false,
    });
    if (hasGameOver(currentMap)) {
      return this.handleGameOver();
    }
    const completeIndexList = hasComplete(map);
    if (!isEmpty(completeIndexList)) {
      if (typeof this.stop === "function") {
        this.stop();
      }
      this.handleCompleteAnimate(map, completeIndexList).then(() => {
        this.start();
        this.handleCompleted(map, completeIndexList);
      });
      return;
    }

    setAction(map);
    controlNextAction();
  };
  // 完结
  handleGameOver = () => {
    const { controlStartAction, maskAction } = this.props;
    if (this.gameState === "end") return;
    this.gameState = "end";
    this.isGameOverAnimate = true;
    this.stop && this.stop();
    this.handleGameOverAnimate().then(() => {
      this.isGameOverAnimate = false;
      maskAction(true);
      controlStartAction();
    });
  };

  // 死亡动画
  handleGameOverAnimate = () => {
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
  handleCompleteAnimate = (map: MapType, arr: number[]) => {
    this.isGameOverAnimate = true;
    return new Promise((resolve) => {
      this.glitter(map, arr);
      setTimeout(() => {
        this.isGameOverAnimate = false;
        resolve(void 0);
      }, 900);
    });
  };
  // 完成事件
  handleCompleted = (map: MapType, arr: number[]) => {
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
    // TODO 更新时间
    const { changeTimeAction } = this.props;

    changeTimeAction(Date.now());

    // 下落
    const remove = engine.addListener({
      HZ: 1000,
      // 监听事件
      listener: () => {
        if (this.downState !== "down") return;
        this.down.apply(this);
      },
    });

    // 快速下落
    const remove2 = engine.addListener({
      HZ: 15,
      // 监听事件
      listener: () => {
        if (this.downState !== "quick") return;
        this.down.apply(this);
      },
    });

    // 一落到底
    const remove3 = engine.addListener({
      HZ: 1,
      // 监听事件
      listener: () => {
        if (this.downState !== "duang") return;
        this.down.apply(this);
      },
    });

    this.stop = () => {
      this.stop = null;
      remove();
      remove2();
      remove3();
      this.setState({});
    };
  };
  decoratorHandle = (fn: (...arg: any[]) => any) => {
    const { maskAction, controlMask } = this.props;
    return (e: KeyboardEvent) => {
      if (!keyCodeList.includes(e.keyCode)) return;
      if (!this.stop) {
        if (controlMask) {
          maskAction(false);
        }
        this.selfStarting();
      } else {
        fn(e);
      }
    };
  };

  selfStarting = () => {
    const { maskAction, controlMask } = this.props;
    if (this.isGameOverAnimate) return;
    if (this.gameState === "begin" || this.gameState === "end") {
      if (controlMask) {
        maskAction(false);
      }
      this.start();
      this.gameState = "running";
    }

    if (this.gameState === "pause") {
      let { resetAction } = this.props;
      resetAction();
    }
  };
  // 变换
  transform = () => {
    var { isTransform } = this.props.nextMap;
    if (!isTransform) return;
    const { currentMap, controlChangeAction } = this.props;
    const { site, seat } = currentMap;
    let { index } = currentMap;
    const [left, bottom] = seat;
    const { info } = site[index];
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

  down = () => {
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
  //   var { levelAction, controlLevel, controlTime } = next;
  //   var now = Date.now();
  //   if (now - controlTime - controlLevel * 60 * 1000 > 2 * 60 * 1000) {
  //     levelAction(++controlLevel);
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
    var { controlStartAction } = this.props;
    controlStartAction();
    if (!this.isDeviceTypePc()) {
      this.setState({
        isPC: 0,
        style: { ...this.state.style, transform: "scale(1)" },
      });
    }
  }
  // componentWillReceiveProps(next: AppProps) {
  //   if (next.controlLevel !== this.props.controlLevel) {
  //     this.speed = this.currentLevel = this.levelMap[next.controlLevel];
  //   }
  // }
  componentDidUpdate() {
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
        this.downState = "duang";
        return;
      case 37:
        return this.translation(1);
      case 39:
        return this.translation(-1);
      case 38:
        return this.transform();
      case 40:
        this.downState = "quick";

        return;
      default:
        return;
    }
  };
  keyupHandle = (e: KeyboardEvent) => {
    this.keyFlag = true;
    switch (e.keyCode) {
      case 32:
      case 40:
        this.downState = "down";
        return;
      default:
        return;
    }
  };

  reStart = () => {
    this.props.restartAction();
  };
  render() {
    const { stop, translation, down, transform, selfStarting, handleGameOver } =
      this;
    const {
      currentMap,
      nextMap,
      controlMask,
      controlScore,
      controlTime,
      controlLevel,
    } = this.props;
    let time;
    if (controlTime) {
      time = Date.now() - controlTime;
    } else {
      time = 0;
    }
    return (
      <div className="wrap" style={this.state.style}>
        <Tetris
          time={time}
          level={controlLevel}
          score={controlScore}
          isMask={controlMask}
          currentMap={currentMap}
          map={nextMap.map}
        />
        <Control
          currentMap={currentMap}
          down={down}
          stop={stop}
          start={selfStarting}
          restart={handleGameOver}
          transform={transform}
          translation={translation}
        />
      </div>
    );
  }
}

const mapStateToProps = (store: RootStore) => {
  return {
    nextMap: nextMap(store),
    map: store.map,
    controlMask: store.control.controlMask,
    currentMap: store.currentMap,
    controlScore: store.control.controlScore,
    controlLevel: store.control.controlLevel,
    controlTime: store.control.controlTime,
  };
};

export default connect(mapStateToProps, actions)(App);
