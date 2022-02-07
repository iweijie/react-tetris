import React, { Component } from "react";
import type { Timer } from "../type";
import get from "lodash/get";

type ControlPropsType = {
  currentMap: any;
  translation: (f: number) => void;
  down: () => void;
  stop: null | (() => void);
  start: () => void;
  restart: () => void;
  transform: () => void;
};

type ControlDataType = {
  timerLeft: Timer | null;
  timerRight: Timer | null;
  timerDown: Timer | null;
  uuid: number;
};

class App extends Component<ControlPropsType> {
  data: ControlDataType;

  constructor(props: ControlPropsType) {
    super(props);
    this.data = {
      timerLeft: null,
      timerRight: null,
      timerDown: null,
      uuid: 0,
    };
  }

  componentDidMount() {
    this.data.uuid = get(this.props, "currentMap.uuid");
  }

  componentWillReceiveProps(nextProps: ControlPropsType) {
    const m = get(nextProps, "currentMap.uuid");
    if (this.data.uuid !== m && this.data.timerDown) {
      this.data.uuid = m;
      this.cancelDown();
    }
  }

  translationLeft = () => {
    let { translation } = this.props;
    if (this.data.timerLeft) {
      this.cancelTranslationLeft();
    }
    this.data.timerLeft = setInterval(() => {
      translation(1);
    }, 80);
  };

  cancelTranslationLeft = () => {
    const { timerLeft } = this.data;
    if (timerLeft) {
      clearInterval(timerLeft);
      this.data.timerLeft = null;
    }
  };

  translationRight = () => {
    let { translation } = this.props;
    if (this.data.timerRight) {
      this.cancelTranslationRight();
    }
    this.data.timerRight = setInterval(() => {
      translation(-1);
    }, 80);
  };

  cancelTranslationRight = () => {
    const { timerRight } = this.data;
    if (timerRight) {
      clearInterval(timerRight);
      this.data.timerRight = null;
    }
  };

  restart = () => {
    let { restart, stop } = this.props;
    if (!stop) return;
    restart();
  };

  down = () => {
    if (this.data.timerDown) return;
    let { down } = this.props;
    this.data.timerDown = setInterval(() => {
      down();
    }, 16);
  };

  cancelDown = () => {
    const { timerDown } = this.data;
    if (timerDown) {
      clearInterval(timerDown);
      this.data.timerDown = null;
    }
  };

  render() {
    const {
      translationRight,
      translationLeft,
      cancelTranslationLeft,
      cancelTranslationRight,
      restart,
    } = this;
    let { down, start, stop, transform } = this.props;

    return (
      <div className="control" style={{ marginTop: "79px" }}>
        <div
          onClick={transform}
          className="_1pg0 _23pZ _2TvZ"
          style={{ top: "0px", left: "374px" }}
        >
          <i className=""></i>
          <em style={{ transform: "translate(0px, 63px) scale(1, 2)" }}></em>
          <span className="_1zCL">旋转</span>
        </div>
        <div
          onClick={down}
          className="_1pg0 _23pZ _2TvZ"
          style={{ top: "180px", left: "374px" }}
        >
          <i className=""></i>
          <em
            style={{
              transform: "translate(0px, -71px) rotate(180deg) scale(1, 2)",
            }}
          ></em>
          <span className="">下移</span>
        </div>
        <div
          onMouseDown={translationLeft}
          onMouseUp={cancelTranslationLeft}
          onTouchStart={translationLeft}
          onTouchEnd={cancelTranslationLeft}
          //   onClick={translationLeft}
          className="_1pg0 _23pZ _2TvZ"
          style={{ top: "90px", left: "284px" }}
        >
          <i className=""></i>
          <em
            style={{
              transform: "translate(60px, -12px) rotate(270deg) scale(1, 2)",
            }}
          ></em>
          <span className="">左移</span>
        </div>
        <div
          onMouseDown={translationRight}
          onMouseUp={cancelTranslationRight}
          onTouchStart={translationRight}
          onTouchEnd={cancelTranslationRight}
          className="_1pg0 _23pZ _2TvZ"
          style={{ top: "90px", left: "464px" }}
        >
          <i className=""></i>
          <em
            style={{
              transform: "translate(-60px, -12px) rotate(90deg) scale(1, 2)",
            }}
          ></em>
          <span className="">右移</span>
        </div>
        <div
          className="_1pg0 _23pZ p4fG"
          style={{ top: "100px", left: "52px" }}
          onMouseDown={this.down}
          onMouseUp={this.cancelDown}
          onTouchStart={this.down}
          onTouchEnd={this.cancelDown}
        >
          <i className=""></i>
          <span className="">掉落 (SPACE)</span>
        </div>
        <div
          onClick={restart}
          className="_1pg0 _3kg_ oW6K"
          style={{ top: "0px", left: "196px" }}
        >
          <i className=""></i>
          <span className="">重玩(R)</span>
        </div>
        <div
          className="_1pg0 disable oW6K"
          style={{ top: " 0px", left: "106px" }}
        >
          <i className=""></i>
          <span className="">音效(S)</span>
        </div>
        <div
          onClick={stop ? stop : () => start()}
          className="_1pg0 RBZg oW6K"
          style={{ top: "0px", left: "16px" }}
        >
          <i className=""></i>
          <span className="">{stop ? "暂停(P)" : "开始"}</span>
        </div>
      </div>
    );
  }
}
export default App;
