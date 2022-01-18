import React, { Component } from "react";
// import {debounce} from "util/baseTool"
import { useSetState } from "ahooks";
import get from "lodash/get";

const Control = () => {
  return (
    <div className="control" style={{ marginTop: "79px" }}>
      <div
        // onClick={transform}
        className="_1pg0 _23pZ _2TvZ"
        style={{ top: "0px", left: "374px" }}
      >
        <i className=""></i>
        <em style={{ transform: "translate(0px, 63px) scale(1, 2)" }}></em>
        <span className="_1zCL">旋转</span>
      </div>
      <div
        // onClick={down}
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
        // onMouseDown={translationLeft}
        // onMouseUp={cancelTranslationLeft}
        // onTouchStart={translationLeft}
        // onTouchEnd={cancelTranslationLeft}
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
        // onMouseDown={translationRight}
        // onMouseUp={cancelTranslationRight}
        // onTouchStart={translationRight}
        // onTouchEnd={cancelTranslationRight}
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
        // onMouseDown={this.down}
        // onMouseUp={this.cancelDown}
        // onTouchStart={this.down}
        // onTouchEnd={this.cancelDown}
      >
        <i className=""></i>
        <span className="">掉落 (SPACE)</span>
      </div>
      <div
        // onClick={restart}
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
        // onClick={stop ? stop : () => start()}
        className="_1pg0 RBZg oW6K"
        style={{ top: "0px", left: "16px" }}
      >
        <i className=""></i>
        {/* <span className="">{stop ? "暂停(P)" : "开始"}</span> */}
        <span className="">{"开始"}</span>
      </div>
    </div>
  );
};

export default Control;
