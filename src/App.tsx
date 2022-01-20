import React, { Component } from "react";
import { connect } from "react-redux";
import Tetris from "./components/Tetris";
import Control from "./components/Control";
import "./index.css";
// class App extends Component {
//   state = {
//     // 1  PC  0 移动
//     isPC: 1,
//     style: {
//       paddingTop: "101px",
//       paddingBottom: "59px",
//       marginTop: "-569px",
//       transform: "scale(0.8)",
//     },
//   };
//   diedState = false;
//   redArr = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
//   completeArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
//   plainArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//   // 加分项
//   scoreMap = [0, 1, 3, 6, 10];
//   // 等级项
//   levelMap = [0, 100, 80, 60, 45, 30, 20];
//   // 动画标识
//   isAnimate = false;
//   // 暂停
//   stop = null;
//   // 更新时间
//   updateTime = 0;
//   // 控制下落速度
//   speed = 100;
//   currentLevel = 100;
//   time = 0;

//   render() {
//     let {
//       stop,
//       translation,
//       down,
//       transform,
//       decoratorHandle,
//       selfStarting,
//       gameOver,
//     } = this;
//     let {
//       currentMap,
//       nextMap,
//       contorlMask,
//       contorlscore,
//       contorltime,
//       contorllevel,
//     } = this.props;
//     let time;
//     if (contorltime) {
//       time = Date.now() - contorltime;
//     } else {
//       time = 0;
//     }
//     return (
//     );
//   }
// }

const App = () => {
  return (
    <div className="wrap">
      <Tetris />
      <Control />
    </div>
  );
};

const mapStateToProps = (store: RootStore, ownProps) => {
  return {};
  return {
    nextMap: nextMap(store),
    map: store.map,
    contorlMask: store.contorlMask,
    currentMap: store.currentMap,
    contorlscore: store.contorlscore,
    contorllevel: store.contorllevel,
    contorltime: store.contorltime,
    ...ownProps,
  };
};

export default connect(mapStateToProps)(App);
